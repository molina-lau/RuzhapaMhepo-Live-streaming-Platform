import { Radio, UserSession } from '@/types/types'
import { showErrorToast, showSuccessToast } from '@/utils/time-ops'
import { refreshSession, startRecording, stopSession } from '@/utils/utils'
import React, { useState } from 'react'
import { TbPlayerRecordFilled } from 'react-icons/tb'
import { DefaultLoader } from './loader'

export default function RecordButton({ radio, className }: { radio: Radio , className : string}) {
    const [recording, setIsRecording] = useState(false)
    const [session, setAudioSession] = useState<UserSession | null>(null)
    const [loading, setLoading] = useState(false)
    let myInterval: NodeJS.Timeout;
    const initiateRecord = async () => {
        setLoading(true)
        const response = await startRecording(radio)
        setLoading(false)
        if (typeof response === 'string') {
            return showErrorToast(response)
        }
        showSuccessToast("recording started")
        setIsRecording(true)
        setAudioSession(response)
        myInterval = setInterval(async () => {
            const data = await refreshSession(response)
            if (typeof data === 'string') {
                showErrorToast(data)
                setIsRecording(false)
                setAudioSession(null)
                clearInterval(myInterval)
                return
            }
        }, 30000);
    }
    const initiateStop = async () => {
        if (session == null) return
        setLoading(true)
        const data = await stopSession(session)
        if (typeof data === 'string') {
            showErrorToast(data)
        }else
        showSuccessToast("recording stopped")
        setLoading(false)
        setIsRecording(false)
        setAudioSession(null)
    }
    return (
        <div onClick={() => {
                if (!recording && session == null) {
                    return initiateRecord()
                }
                return initiateStop()
            }} className={`bg-gray-200 p-1  ${className}`} >
            <button style={{
                border : 0,
                padding : 10,
                borderRadius : "50%",
                background: "#e5e7eb"
            }}>
                {loading ? <DefaultLoader/> :
                 <TbPlayerRecordFilled style={{
                    animation : recording ? 'scale 500ms linear infinite' : ''
                 }} className={` text-red-500 ${recording ? 'text-danger' : ''}`} size={20} />}
            </button>
        </div>
    )
}
