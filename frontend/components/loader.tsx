import React from 'react'
import { TbLoader } from 'react-icons/tb'

export function DefaultLoader() {
    return (
        <><TbLoader className=' animate-spin' size={20} style={{
            animation :'spin 2s linear infinite'
        }} /></>
    )
}
