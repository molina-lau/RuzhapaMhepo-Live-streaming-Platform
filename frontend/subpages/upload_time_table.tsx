import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { Radio, TimeTableItem } from '@/types/types';
import { addMinutes, convertTimeToDate, showErrorToast, showSuccessToast } from '@/utils/time-ops';
import { Toaster } from 'react-hot-toast';
import { getAllRadios, getDeviceId, getListToRadios, getSession } from '@/utils/utils';
import { TbLoader } from 'react-icons/tb';
import { IoMdRefresh } from 'react-icons/io';
export default function UploadTimeTable() {
    const date2 = new Date()
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState(date2)
    const [loading, setLoading] = useState(false)
    const [constAdd, setConstantAdd] = useState(30)
    const [endTime, setEndTime] = useState("10:00");
    const [startTime, setStartTime] = useState("10:00");
    const [listLoading, setIsListLoading] = useState(true)
    const [selectedRadio, setSelectedRadio] = useState<string>("")
    const [radioStations, setRadioStations] = useState<Radio[]>([])
    const [selectedList, setSelectedList] = useState<TimeTableItem[]>([])
    useEffect(() => {
        setStartTime(date2.getHours().toFixed(0) + ":" + date2.getMinutes().toString())
        setEndTime(addMinutes(date2, constAdd))
        getRadiosAsDropDown()
    }, [])
    const getRadiosAsDropDown = async () => {
        setIsListLoading(true)
        const list = getListToRadios()
        if (list.length === 0) {
            await getListByPage(1)
        }
        setIsListLoading(false)
        if (list.length > 0) {
            setSelectedRadio(list[0]._id)
        }
        setRadioStations(list)
    }
    const getListByPage = async (page: number) => {
        const response = await getAllRadios(page);
        setIsListLoading(false)
        return response
    }
    const addItem = () => {
        if (selectedRadio == '') showErrorToast("Radio selected not found cant add");
        const sdate = convertTimeToDate(startTime, date).getTime()
        const unixStartTime = Math.floor(sdate / 1000);
        const edate = convertTimeToDate(endTime, date).getTime()
        const unixEndTime = Math.floor(edate / 1000);
        selectedList.push({
            id: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
            desc: desc,
            labelEnd: endTime,
            endTime: unixEndTime,
            labelStart: startTime,
            startTime: unixStartTime,
            radioId: selectedRadio,
            radioLabel: ''
        })
        setDesc("")
        setStartTime(endTime);
        setEndTime(addMinutes(convertTimeToDate(endTime, date2), constAdd))
        showSuccessToast("event added")
    }
    const uploadTimeTable = async () => {
        if (selectedList.length === 0) return showErrorToast("There are no events added | Please add events add upload")
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}events/upload`, {
                method: 'POST',
                headers: {
                    "Authorization": getSession(),
                    "x-device-id": getDeviceId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selectedList),
            });
            setLoading(false)
            if (response.ok) {
                setSelectedList([])
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
    }
    return (
       <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem', // Equivalent to gap-4
    padding: '1rem', // Equivalent to p-4
  }}
>
  {/* Assuming Toaster is a component that doesn't use Tailwind classes directly */}
  <Toaster />
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', // Equivalent to grid-cols-1
      gap: '1rem', // Equivalent to gap-4
      // md:grid-cols-2 and lg:grid-cols-3 are responsive and not directly translatable to inline styles.
      // This would require media queries or conditional styling based on screen size in a real app.
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gridColumn: 'span 3 / span 3', // Equivalent to col-span-3
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {listLoading ? (
          <>
            {/* animate-spin requires a CSS animation definition, not direct inline style */}
            <TbLoader className="animate-spin" size={20} />
          </>
        ) : (
          <div className="">
            <label
              htmlFor="radio-station"
              style={{
                marginBottom: '0.5rem', // Equivalent to mb-2
                fontSize: '0.875rem', // Equivalent to text-sm
                fontWeight: '500', // Equivalent to font-medium
                color: 'rgb(55 65 81)', // Equivalent to text-gray-700
              }}
            >
              Select Radio Station
            </label>
            <div
              style={{
                display: 'flex',
                width: '100%', // Equivalent to w-full
                alignItems: 'center',
              }}
            >
              <select
                id="radio-station"
                value={selectedRadio}
                style={{
                  width: '100%', // Equivalent to w-full
                  padding: '0.5rem', // Equivalent to p-2
                  border: '1px solid rgb(209 213 219)', // Equivalent to border border-gray-300
                  borderRadius: '0.375rem', // Equivalent to rounded-md
                  // focus: styles are pseudo-classes and not directly translatable
                  outline: 'none', // Equivalent to focus:outline-none
                  // boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)', // Equivalent to focus:ring-2 focus:ring-blue-500 (approximation)
                }}
                onChange={(e) => setSelectedRadio(e.target.value)}
              >
                {radioStations.map((e, i) => (
                  <option value={e._id} key={i}>
                    {e.radioTitle}
                  </option>
                ))}
              </select>
              <div
                style={{
                  padding: '0.75rem', // Equivalent to p-3
                  backgroundColor: 'rgb(243 244 246)', // Equivalent to bg-gray-100
                }}
                onClick={async () => {
                  setIsListLoading(true);
                  await getListByPage(1);
                  const list = getListToRadios();
                  setRadioStations(list);
                  setIsListLoading(false);
                }}
              >
                {/* animate-spin requires a CSS animation definition */}
                <IoMdRefresh className={listLoading ? ' animate-spin' : ''} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
<div className='flex-container row'>
    <div
    className='col-lg-4 w-fit col-12 col-md-6'
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label
        htmlFor="date"
        style={{
          marginBottom: '0.5rem', // Equivalent to mb-2
          fontSize: '0.875rem', // Equivalent to text-sm
          fontWeight: '500', // Equivalent to font-medium
          color: 'rgb(55 65 81)', // Equivalent to text-gray-700
        }}
      >
        Select Date
      </label>
      {/* Assuming DatePicker is a component that handles its own styling or accepts style props */}
      <DatePicker
        className="w-100 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        selected={date}
        onChange={(date) => setDate(date!)}
      />
    </div>
    <div
    className='col-lg-4 w-fit col-12 col-md-6'
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label
        htmlFor="start-time"
        style={{
          marginBottom: '0.5rem', // Equivalent to mb-2
          fontSize: '0.875rem', // Equivalent to text-sm
          fontWeight: '500', // Equivalent to font-medium
          color: 'rgb(55 65 81)', // Equivalent to text-gray-700
        }}
      >
        Start Time
      </label>
      <div
        style={{
          position: 'relative', // Equivalent to relative
        }}
      >
        {/* Assuming TimePicker is a component that handles its own styling or accepts style props */}
        <TimePicker
          onChange={(value) => setStartTime(value || '')}
          value={startTime}
          className="w-100  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div
    className='col-lg-4 w-fit col-12 col-md-6'
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label
        htmlFor="end-time"
        style={{
          marginBottom: '0.5rem', // Equivalent to mb-2
          fontSize: '0.875rem', // Equivalent to text-sm
          fontWeight: '500', // Equivalent to font-medium
          color: 'rgb(55 65 81)', // Equivalent to text-gray-700
        }}
      >
        End Time
      </label>
      {/* Assuming TimePicker is a component that handles its own styling or accepts style props */}
      <TimePicker
        onChange={(value) => setEndTime(value || '')}
        value={endTime}
        className="w-100  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
</div>
  </div>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <label
      htmlFor="description"
      style={{
        marginBottom: '0.5rem', // Equivalent to mb-2
        fontSize: '0.875rem', // Equivalent to text-sm
        fontWeight: '500', // Equivalent to font-medium
        color: 'rgb(55 65 81)', // Equivalent to text-gray-700
      }}
    >
      Event Description
    </label>
    <textarea
      id="description"
      rows={4}
      value={desc}
      style={{
        width: '100%', // Equivalent to w-full
        padding: '0.5rem', // Equivalent to p-2
        border: '1px solid rgb(209 213 219)', // Equivalent to border border-gray-300
        borderRadius: '0.375rem', // Equivalent to rounded-md
        // focus: styles are pseudo-classes and not directly translatable
        outline: 'none', // Equivalent to focus:outline-none
        // boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)', // Equivalent to focus:ring-2 focus:ring-blue-500 (approximation)
      }}
      placeholder="Add a description for the event..."
      onChange={(e) => setDesc(e.target.value)}
    ></textarea>
  </div>
  <button
    style={{
      paddingLeft: '1rem', // Equivalent to px-4
      paddingRight: '1rem', // Equivalent to px-4
      paddingTop: '0.5rem', // Equivalent to py-2
      paddingBottom: '0.5rem', // Equivalent to py-2
      color: 'white',
      backgroundColor: 'rgb(59 130 246)', // Equivalent to bg-blue-500
      borderRadius: '0.375rem', // Equivalent to rounded-md
      // hover: and focus: styles are pseudo-classes and not directly translatable
      // hover:backgroundColor: 'rgb(37 99 235)', // Equivalent to hover:bg-blue-600
      outline: 'none', // Equivalent to focus:outline-none
      // boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)', // Equivalent to focus:ring-2 focus:ring-blue-500 (approximation)
    }}
    onClick={() => addItem()}
  >
    Add Event
  </button>
  <div
    style={{
      padding: '1rem', // Equivalent to p-4
      border: '1px solid rgb(209 213 219)', // Equivalent to border border-gray-300
      borderRadius: '0.375rem', // Equivalent to rounded-md
      backgroundColor: 'rgb(243 244 246)', // Equivalent to bg-gray-100
    }}
  >
    <p
      style={{
        marginBottom: '0.5rem', // Equivalent to mb-2
        fontSize: '0.875rem', // Equivalent to text-sm
        color: 'rgb(55 65 81)', // Equivalent to text-gray-700
      }}
    >
      You are now uploading to the server... {selectedList.length} Events
    </p>
    <button
      style={{
        paddingLeft: '1rem', // Equivalent to px-4
        paddingRight: '1rem', // Equivalent to px-4
        paddingTop: '0.5rem', // Equivalent to py-2
        paddingBottom: '0.5rem', // Equivalent to py-2
        color: 'white',
        backgroundColor: 'rgb(34 197 94)', // Equivalent to bg-green-500
        borderRadius: '0.375rem', // Equivalent to rounded-md
        // hover: and focus: styles are pseudo-classes and not directly translatable
        // hover:backgroundColor: 'rgb(22 163 74)', // Equivalent to hover:bg-green-600
        outline: 'none', // Equivalent to focus:outline-none
        // boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.5)', // Equivalent to focus:ring-2 focus:ring-green-500 (approximation)
      }}
      onClick={() => {
        if (loading) return;
        uploadTimeTable();
      }}
    >
      {loading ? (
        // animate-spin requires a CSS animation definition
        <TbLoader className="animate-spin" size={20} />
      ) : (
        <> Upload All Events</>
      )}
    </button>
  </div>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <label
      htmlFor="selected-items"
      style={{
        marginBottom: '0.5rem', // Equivalent to mb-2
        fontSize: '0.875rem', // Equivalent to text-sm
        fontWeight: '500', // Equivalent to font-medium
        color: 'rgb(55 65 81)', // Equivalent to text-gray-700
      }}
    >
      Created Events
    </label>
    <ul
      style={{
        listStyleType: 'disc', // Equivalent to list-disc
        paddingLeft: '1.25rem', // Equivalent to pl-5
      }}
    >
      {selectedList.map((item, index) => (
        <li
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem', // Equivalent to p-2
            marginBottom: '0.5rem', // Equivalent to mb-2
            border: '1px solid rgb(209 213 219)', // Equivalent to border border-gray-300
            borderRadius: '0.375rem', // Equivalent to rounded-md
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Equivalent to shadow-sm
            backgroundColor: 'rgb(249 250 251)', // Equivalent to bg-gray-50
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.875rem', // Equivalent to text-sm
                fontWeight: '500', // Equivalent to font-medium
                color: 'rgb(31 41 55)', // Equivalent to text-gray-800
              }}
            >
              {item.labelStart} - {item.labelEnd}
            </p>
            <p
              style={{
                fontSize: '0.875rem', // Equivalent to text-sm
                color: 'rgb(75 85 99)', // Equivalent to text-gray-600
              }}
            >
              {item.desc}
              <div>
                {radioStations.find((radio) => radio._id === item.radioId)
                  ?.radioTitle || 'Unknown Radio'}
              </div>
            </p>
          </div>
          <button
            style={{
              paddingLeft: '0.5rem', // Equivalent to px-2
              paddingRight: '0.5rem', // Equivalent to px-2
              paddingTop: '0.25rem', // Equivalent to py-1
              paddingBottom: '0.25rem', // Equivalent to py-1
              fontSize: '0.875rem', // Equivalent to text-sm
              color: 'white',
              backgroundColor: 'rgb(239 68 68)', // Equivalent to bg-red-500
              borderRadius: '0.375rem', // Equivalent to rounded-md
              // hover: and focus: styles are pseudo-classes and not directly translatable
              // hover:backgroundColor: 'rgb(220 38 38)', // Equivalent to hover:bg-red-600
              outline: 'none', // Equivalent to focus:outline-none
              // boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.5)', // Equivalent to focus:ring-2 focus:ring-red-500 (approximation)
            }}
            onClick={() => {
              const updatedList = selectedList.filter((_, i) => i !== index);
              setSelectedList(updatedList);
            }}
          >
            Cancel
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>

    )
}
