package manager

import (
	"context"
	"encoding/binary"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	// Import the go-mp3 library for decoding (aliased to avoid conflict)
	// Library for MP3 decoding
	"github.com/go-audio/audio"
	wav "github.com/go-audio/wav"
	mp3 "github.com/hajimehoshi/go-mp3"

	// Library for MP3 decodin
	"openchains.com/cutfm/interfaces"
)

// record microservice by openchains
func (m *Manager) StartRecording(user *interfaces.User, lister interfaces.Radio) (*interfaces.UserSession, error) {
	sessionId := strconv.FormatInt(time.Now().UnixMicro(), 10)
	uploadDir := "./uploads/record/" + user.Email
	err := os.MkdirAll(uploadDir, os.ModePerm)
	if err != nil {
		return nil, errors.New("failed to create directory")
	}
	join := filepath.Base(fmt.Sprintf("%v.mp3", sessionId))
	path := filepath.Join(uploadDir, join)
	pathDB := "/uploads/record/" + user.Email + "/" + join
	outputFile, err := os.Create(path)
	if err != nil {
		return nil, errors.New("failed to write output file")
	}
	resp, err := http.Get(lister.Path)
	if err != nil {
		return nil, fmt.Errorf("error connecting to stream URL %s: %v ", lister.Path, err)
	}
	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("received non-OK HTTP status")
	}
	userSession := interfaces.UserSession{
		User:      user,
		Counter:   5,
		Stop:      false,
		SessionId: user.Email + sessionId,
	}
	mutextMap.data[user.Email+sessionId] = userSession
	m.DB.Recordings().InsertOne(context.Background(), interfaces.Recording{
		Path:     pathDB,
		FullPath: path,
		Email:    user.Email,
		Radio:    lister,
		RadioId:  lister.Id.Hex(),
	})
	go runAsybchronousTask(resp, outputFile, user.Email+sessionId)
	return &userSession, nil
}
func runAsybchronousTask(resp *http.Response, outputFile *os.File, email string) {
	defer resp.Body.Close()
	defer outputFile.Close()
	mp3Decoder, err := mp3.NewDecoder(resp.Body)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating MP3 decoder: %v\n", err)
		return
	}
	wavEncoder := wav.NewEncoder(outputFile /* mp3Decoder.SampleRate()*/, 44100*2, 16, 1, 1)
	byteBuf := make([]byte, 4096)
	intBuf := audio.IntBuffer{
		Format: &audio.Format{ // Create an audio.Format struct
			SampleRate:/* mp3Decoder.SampleRate()*/ 44100 * 2, // Get SampleRate from the decoder
			NumChannels:                                       1, // Get Channels from the decoder
		},
	}
	for {
		k, ok := mutextMap.data[email]
		if !ok {
			break
		}
		if ok {
			if k.Counter < 0 {
				break
			}
			if k.Stop {
				break
			}
		}
		n, err := mp3Decoder.Read(byteBuf)
		if err != nil {
			if err == io.EOF {
				break // End of stream
			}
			fmt.Fprintf(os.Stderr, "Error reading from MP3 decoder: %v\n", err)
			return
		}
		if n == 0 {
			continue
		}
		bytesPerSample := 2 // 16 bits = 2 bytes
		samplesRead := n / bytesPerSample
		if cap(intBuf.Data) < samplesRead {
			intBuf.Data = make([]int, samplesRead)
		}
		intBuf.Data = intBuf.Data[:samplesRead]
		byteIndex := 0
		for i := 0; i < samplesRead; i++ {
			sample16 := int16(binary.LittleEndian.Uint16(byteBuf[byteIndex : byteIndex+2]))
			intBuf.Data[i] = int(sample16)
			byteIndex += bytesPerSample
		}

		// Write the int samples from the audio buffer to the WAV encoder
		if err := wavEncoder.Write(&intBuf); err != nil {
			fmt.Fprintf(os.Stderr, "Error writing to WAV encoder: %v\n", err)
			return
		}
	}
	if err := wavEncoder.Close(); err != nil {
		fmt.Fprintf(os.Stderr, "Error closing WAV encoder: %v\n", err)
		return
	}
	fmt.Println("recording added")
}
func (m *Manager) SessionRun() {
	for {
		for k, _ := range mutextMap.data {
			listener := mutextMap.data[k]
			listener.Counter--
			mutextMap.data[k] = listener
			time.Sleep(time.Minute)
		}
	}
}
