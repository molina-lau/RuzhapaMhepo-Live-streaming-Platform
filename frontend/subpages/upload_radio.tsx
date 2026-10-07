import { showErrorToast, showSuccessToast } from '@/utils/time-ops';
import { getDeviceId, getSession } from '@/utils/utils';
import React, { useRef } from 'react'
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { TbLoader } from 'react-icons/tb';

export default function UploadRadio() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [path, setAudioPath] = useState('')
    const [radioFM, setRadioFM] = useState('');
    const [loading, setLoading] = useState(false)
    const [radioTitle, setRadioTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState<File | null>(null);
    const handleSubmit = async () => {
        if (!radioTitle.trim() || !radioFM.trim() || !description.trim()) {
            showErrorToast('Please fill in all fields before submitting.');
            return;
        }
        if (!path.trim()) {
            return showErrorToast("radio audio path should not be missing")
        }
        setLoading(true)
        const formData = new FormData();
        formData.append('path', path);
        formData.append('radioFM', radioFM);
        formData.append('radioTitle', radioTitle);
        formData.append('description', description);
        if (picture) {
            formData.append('files', picture);
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/upload`, {
                method: 'POST',
                headers: {
                    "Authorization": getSession(),
                    "x-device-id": getDeviceId(),
                },
                body: formData,
            });
            setLoading(false)
            if (response.ok) {
                setRadioTitle('');
                setRadioFM('');
                setAudioPath('')
                setDescription('');
                setPicture(null);
                fileInputRef.current!.value = '';
                return showSuccessToast('Upload successful!');
            }
            if (response.status == 401 || response.status == 400) {
                const { message } = await response.json();
                return showErrorToast(message)
            }
            return showErrorToast(`The was error : ${response.status}`)
        } catch (error) {
            setLoading(false)
            return showErrorToast(`There was error : ${error}`);
        }
    };
    return (
      <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.25rem', // Equivalent to p-5
    fontFamily:
      'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', // Equivalent to font-sans
  }}
>
  {/* Assuming Toaster is a component that doesn't use Tailwind classes directly */}
  <Toaster />
  <h1
    style={{
      fontSize: '1.5rem', // Equivalent to text-2xl
      fontWeight: '700', // Equivalent to font-bold
      color: 'rgb(34 197 94)', // Equivalent to text-green-500
      marginBottom: '1.25rem', // Equivalent to mb-5
    }}
  >
    Upload Radio Station
  </h1>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem', // Equivalent to gap-4
      width: '100%', // Equivalent to w-full
      maxWidth: '28rem', // Equivalent to max-w-md
    }}
  >
    <label
      style={{
        fontWeight: '600', // Equivalent to font-semibold
        fontSize: '1.125rem', // Equivalent to text-lg
      }}
    >
      Radio Title:
      <input
        type="text"
        value={radioTitle}
        onChange={(e) => setRadioTitle(e.target.value)}
        placeholder="Enter radio title"
        style={{
          width: '100%', // Equivalent to w-full
          padding: '0.5rem', // Equivalent to p-2
          marginTop: '0.25rem', // Equivalent to mt-1
          borderRadius: '0.25rem', // Equivalent to rounded
          border: '1px solid rgb(209 213 219)', // Equivalent to border border-gray-300
          // focus: styles are pseudo-classes and not directly translatable
          outline: 'none', // Equivalent to focus:outline-none
          // boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.5)', // Equivalent to focus:ring-2 focus:ring-green-500 (approximation)
        }}
      />
    </label>
    <label
      style={{
        fontWeight: '600', // Equivalent to font-semibold
        fontSize: '1.125rem', // Equivalent to text-lg
      }}
    >
      Radio FM:
      <input
        type="text"
        value={radioFM}
        onChange={(e) => setRadioFM(e.target.value)}
        placeholder="Enter radio FM"
        style={{
          width: '100%', // Equivalent to w-full
          padding: '0.5rem', // Equivalent to p-2
          marginTop: '0.25rem', // Equivalent to mt-1
          borderRadius: '0.25rem', // Equivalent to rounded
          border: '1px solid rgb(209 213 219)', // Equivalent to border border-gray-300
          // focus: styles are pseudo-classes and not directly translatable
          outline: 'none', // Equivalent to focus:outline-none
          // boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.5)', // Equivalent to focus:ring-2 focus:ring-green-500 (approximation)
        }}
      />
    </label>
    <label
      style={{
        fontWeight: '600', // Equivalent to font-semibold
        fontSize: '1.125rem', // Equivalent to text-lg
      }}
    >
      Audio Source:
      <input
        type="text"
        value={path}
        onChange={(e) => setAudioPath(e.target.value)}
        placeholder="Enter Uri of the Audio source"
        style={{
          width: '100%', // Equivalent to w-full
          padding: '0.5rem', // Equivalent to p-2
          marginTop: '0.25rem', // Equivalent to mt-1
          borderRadius: '0.25rem', // Equivalent to rounded
          border: '1px solid rgb(209 213 219)', // Equivalent to border border-gray-300
          // focus: styles are pseudo-classes and not directly translatable
          outline: 'none', // Equivalent to focus:outline-none
          // boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.5)', // Equivalent to focus:ring-2 focus:ring-green-500 (approximation)
        }}
      />
    </label>
    <label
      style={{
        fontWeight: '600', // Equivalent to font-semibold
        fontSize: '1.125rem', // Equivalent to text-lg
      }}
    >
      Description:
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        style={{
          width: '100%', // Equivalent to w-full
          padding: '0.5rem', // Equivalent to p-2
          marginTop: '0.25rem', // Equivalent to mt-1
          borderRadius: '0.25rem', // Equivalent to rounded
          border: '1px solid rgb(209 213 219)', // Equivalent to border border-gray-300
          resize: 'none', // Equivalent to resize-none
          height: '6rem', // Equivalent to h-24 (assuming 1rem = 16px, 24 * 0.25rem = 6rem)
          // focus: styles are pseudo-classes and not directly translatable
          outline: 'none', // Equivalent to focus:outline-none
          // boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.5)', // Equivalent to focus:ring-2 focus:ring-green-500 (approximation)
        }}
      />
    </label>
    <label
      style={{
        fontWeight: '600', // Equivalent to font-semibold
        fontSize: '1.125rem', // Equivalent to text-lg
      }}
    >
      Upload Picture:
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
        style={{
          marginTop: '0.25rem', // Equivalent to mt-1
        }}
      />
    </label>
    <button
      type="submit"
      onClick={() => handleSubmit()}
      style={{
        paddingTop: '0.5rem', // Equivalent to py-2
        paddingBottom: '0.5rem', // Equivalent to py-2
        paddingLeft: '1rem', // Equivalent to px-4
        paddingRight: '1rem', // Equivalent to px-4
        backgroundColor: 'rgb(34 197 94)', // Equivalent to bg-green-500
        color: 'white',
        borderRadius: '0.25rem', // Equivalent to rounded
        // hover: and focus: styles are pseudo-classes and not directly translatable
        // hover:backgroundColor: 'rgb(22 163 74)', // Equivalent to hover:bg-green-600
        outline: 'none', // Equivalent to focus:outline-none
        // boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.5)', // Equivalent to focus:ring-2 focus:ring-green-500 (approximation)
      }}
    >
      {loading ? (
        // animate-spin requires a CSS animation definition
        <TbLoader className="animate-spin" size={20} />
      ) : (
        <>Upload</>
      )}
    </button>
    {picture && (
      <div
        style={{
          marginTop: '1rem', // Equivalent to mt-4
        }}
      >
        <h2
          style={{
            fontSize: '1.125rem', // Equivalent to text-lg
            fontWeight: '600', // Equivalent to font-semibold
          }}
        >
          Preview:
        </h2>
        <img
          src={URL.createObjectURL(picture)}
          alt="Uploaded Preview"
          style={{
            marginTop: '0.5rem', // Equivalent to mt-2
            width: '100%', // Equivalent to w-full
            maxWidth: '12rem', // Equivalent to max-w-xs (assuming 1rem = 16px, 48 * 0.25rem = 12rem)
            borderRadius: '0.25rem', // Equivalent to rounded
            border: '1px solid rgb(209 213 219)', // Equivalent to border border-gray-300
          }}
        />
        <button
          type="button"
          onClick={() => {
            setPicture(null);
            fileInputRef.current!.value = '';
          }}
          style={{
            marginTop: '0.5rem', // Equivalent to mt-2
            paddingTop: '0.25rem', // Equivalent to py-1
            paddingBottom: '0.25rem', // Equivalent to py-1
            paddingLeft: '0.75rem', // Equivalent to px-3
            paddingRight: '0.75rem', // Equivalent to px-3
            backgroundColor: 'rgb(239 68 68)', // Equivalent to bg-red-500
            color: 'white',
            borderRadius: '0.25rem', // Equivalent to rounded-md
            // hover: and focus: styles are pseudo-classes and not directly translatable
            // hover:backgroundColor: 'rgb(220 38 38)', // Equivalent to hover:bg-red-600
            outline: 'none', // Equivalent to focus:outline-none
            // boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.5)', // Equivalent to focus:ring-2 focus:ring-red-500 (approximation)
          }}
        >
          Remove Picture
        </button>
      </div>
    )}
  </div>
</div>
    )
}
