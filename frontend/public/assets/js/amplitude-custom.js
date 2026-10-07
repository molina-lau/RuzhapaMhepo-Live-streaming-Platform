Amplitude.init({
  "songs": [
    {
      "name": "Business Podcast Episode 01",
      "artist": "Timothy K. Aguilar",
      "album": "Business Podcast",
      "url": "assets/img/audio/01.mp3",
      "cover_art_url": "assets/img/audio/01.jpg",
      "id": "d1",
    },
    {
      "name": "Education Podcast Episode 02",
      "artist": "Donna C. Nichols",
      "album": "Education Podcast",
      "url": "assets/img/audio/01.mp3",
      "cover_art_url": "assets/img/audio/02.jpg",
      "id": "d2",
    },
    {
      "name": "Business Podcast Episode 03",
      "artist": "Alvin K. Beveridge",
      "album": "Travel Podcast",
      "url": "assets/img/audio/01.mp3",
      "cover_art_url": "assets/img/audio/03.jpg",
      "id": "d3",
    },
  ],
});



// playlist toggle

$('.show-playlist').on('click', function () {
  $('#playlist-container').toggle();
});

$('.close-playlist').on('click', function () {
  $('#playlist-container').hide();
});


var songsToAdd = [
  {
    "name": "Mindset In Our Life Ep:1",
    "artist": "Linda Clarke",
    "album": "Life Story",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/show/01.jpg",
    "id": "n1",
  },
  {
    "name": "The Outdoors & Survival Ep:2",
    "artist": "Jhon Henry",
    "album": "Travel",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/show/02.jpg",
    "id": "n2",
  },
  {
    "name": "Form A Podcast Club Ep:3",
    "artist": "Daniel Lorado",
    "album": "Technology",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/show/03.jpg",
    "id": "n3",
  },
  {
    "name": "Business Improvement Ep:4",
    "artist": "Edward Monso",
    "album": "Business",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/show/04.jpg",
    "id": "n4",
  },
  {
    "name": "Evaluate Your Fields Ep:5",
    "artist": "Hulie Lowel",
    "album": "Self Growth",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/show/05.jpg",
    "id": "n5",
  },
  {
    "name": "Make Podcast Unique Ep:6",
    "artist": "Debora Myers",
    "album": "Comedy",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/show/06.jpg",
    "id": "n6",
  },
  {
    "name": "Music Podcast Ideas Ep:7",
    "artist": "Terry Burke",
    "album": "Music",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/show/07.jpg",
    "id": "n7",
  },
  {
    "name": "Teach People Skills Ep:8",
    "artist": "Alex Vielo",
    "album": "Education",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/show/08.jpg",
    "id": "n8",
  },
  {
    "name": "Mindset In Our Life Ep:1",
    "artist": "Linda Clarke",
    "album": "Life Story",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/episode/01.jpg",
    "id": "n9",
  },
  {
    "name": "Mindset In Our Life Ep:2",
    "artist": "Linda Clarke",
    "album": "Life Story",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/episode/02.jpg",
    "id": "n10",
  },
  {
    "name": "Mindset In Our Life Ep:3",
    "artist": "Linda Clarke",
    "album": "Life Story",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/episode/03.jpg",
    "id": "n11",
  },
  {
    "name": "Mindset In Our Life Ep:4",
    "artist": "Linda Clarke",
    "album": "Life Story",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/episode/04.jpg",
    "id": "n12",
  },
  {
    "name": "Mindset In Our Life Ep:5",
    "artist": "Linda Clarke",
    "album": "Life Story",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/episode/05.jpg",
    "id": "n13",
  },
  {
    "name": "Mindset In Our Life Ep:6",
    "artist": "Linda Clarke",
    "album": "Life Story",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/episode/06.jpg",
    "id": "n14",
  },
  {
    "name": "Mindset In Our Life Ep:7",
    "artist": "Linda Clarke",
    "album": "Life Story",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/episode/07.jpg",
    "id": "n15",
  },
  {
    "name": "Mindset In Our Life Ep:8",
    "artist": "Linda Clarke",
    "album": "Life Story",
    "url": "assets/img/audio/01.mp3",
    "cover_art_url": "assets/img/episode/08.jpg",
    "id": "n16",
  },
];



$('.player-btn').on('click', function (e) {

  if (Amplitude.getSongs().length === 0) {
    $('.playlist-content').html('');
  }

  var songToAddIndex = $(this).attr('data-song-add');
  var index = Amplitude.getSongs().findIndex(item => item.id === songsToAdd[songToAddIndex].id);
  if (index === -1) {
    var newIndex = Amplitude.addSong(songsToAdd[songToAddIndex]);
    appendToSongDisplay(songsToAdd[songToAddIndex], newIndex);
    Amplitude.playSongAtIndex(newIndex);
    Amplitude.bindNewElements();
    setPlayButtonView(songToAddIndex);
  } else {
    console.log('Already added in playlist!');
  }

});


// flobal play/pause button view
function setPlayButtonView(index) {
  $('[data-song-add]').removeClass('active');
  $('[data-song-add=' + index + ']').addClass('active');
}


// appends the song to the display
function appendToSongDisplay(song, index) {

  $('.playlist-content').append(`
      <div class="playlist-item">
        <div class="playlist-song amplitude-song-container amplitude-play-pause" data-amplitude-song-index="${index}">
          <img src="${song.cover_art_url}"/>
          <div class="playlist-song-meta">
            <span class="playlist-song-name">${song.name}</span>
            <span class="playlist-artist-album">${song.artist}</span>
          </div>
        </div>
        <button type="button" class="playlist-remove" data-remove-id="${song.id}"><i class="far fa-xmark"></i></button>
      </div>
    `);

}


// playlist remove song
$('.playlist-content').on("click", '.playlist-remove', function (e) {
  e.stopPropagation();
  var id = $(this).attr('data-remove-id');
  var $item = $(this).closest('.playlist-item');
  var index = Amplitude.getSongs().findIndex(song => song.id === id);

  if (index > -1) {
    $item.remove();
    Amplitude.removeSong(index);
    if (Amplitude.getSongs().length === 0) {
      $('.playlist-content').html(`<div class="col-sm-8 col-10 mx-auto mt-5 text-center">
            <i class="far fa-music mb-3"></i>
            <p>No songs, album or playlist are added on lineup.</p>
            </div>`);
    }
  }
});


// for volume progress
const audioPlayerContainer = document.getElementById('player-volume');
const volumeSlider = document.getElementById('volume-slider');
const volumeBtn = document.getElementById('amplitude-mute');

const showRangeProgress = (rangeInput) => {
  audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

showRangeProgress(volumeSlider);

volumeSlider.addEventListener('input', (e) => {
  showRangeProgress(e.target);
});

volumeBtn.addEventListener('click', () => {
  showRangeProgress(volumeSlider);
});



// player hide show
$('.audio-player-hide').on('click', function(){
  $('.audio-player').toggleClass('show');
  $('#playlist-container').hide();
});


