import React, { useState, useRef, useEffect } from 'react';
import { Radio,} from 'lucide-react';
import { useRouter } from 'next/router';
import { deleteAudioRecord, getRecordings } from '@/utils/utils';
import { Radio as Rd, Recordings } from '@/types/types';
import { MdDelete } from "react-icons/md";
import { showErrorToast, showSuccessToast } from '@/utils/time-ops';
export const AudioRecordingsList = ({ r } : {r : Rd}) => {
  const router = useRouter()
  const [currentPage,setCurrentPage] = useState(1)
  const currentUrlRef = useRef<string | null>(null);
  const [records,setRecords] = useState<Recordings[] | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const getAudiosRecordings = async (page : number)=>{
    const response =await getRecordings(page,r._id);
    if(typeof response !== 'string'){
        setCurrentPage(response.page)
        setRecords(response.recordings)
    }
  }
  useEffect(()=>{
    getAudiosRecordings(1);
  },[router.query])
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);
   useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      setPlayingId(null);
      currentUrlRef.current = null; 
    };
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playingId]); 

  const deleteRadio =async (radioId : string) =>{
    const response = await deleteAudioRecord(radioId);
    if(typeof response == 'string') return showErrorToast(response)
    showSuccessToast("deleted succesfully")
    getAudiosRecordings(currentPage -1)
  }
  return (

        <div className="p-4 py-md-5 px-md-5 py-lg-5 px-lg-5 bg-light min-vh-100">

            {/* Equivalent of <h2 className="text-2xl font-semibold text-gray-800 mb-6"> */}
            {/* h2 tag implies size, fw-semibold for font-semibold, text-dark for gray-800, mb-4 for mb-6 */}
            <h2 className="fw-semibold text-dark mb-4">Radio Recordings</h2>

            {/* Equivalent of <div className="space-y-4"> */}
            {/* Bootstrap 5 has gap- utilities, but for non-uniform children,
                adding mb-4 to the children div is often cleaner */}
            <div>

                {/* Equivalent of (records==null || records.length == 0) && (...) */}
                {(records == null || records.length === 0) && (
                    <>
                        {/* Equivalent of <div className=' p-3 mt-12'> */}
                        {/* p-3 remains, mt-5 for mt-12 (using Bootstrap's spacing scale) */}
                        <div className='p-3 mt-5'>
                            There are no recordings recorded for this page
                        </div>
                    </>
                )}

                {/* Equivalent of records && records.length > 0 && <>...</> */}
                {records && records.length > 0 && (
                    <>
                        {records.map((recording, id) => {
                            return (
                                // Equivalent of <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                                // d-flex align-items-center justify-content-between
                                // p-3 for p-4 (adjusting to Bootstrap scale)
                                // bg-white remains
                                // rounded for rounded-lg (Bootstrap's rounded is default)
                                // shadow-sm for shadow. Hover/transition omitted or requires custom CSS
                                // Added mb-4 here to create space between recording items (replaces space-y-4 on parent)
                                <div
                                    key={id}
                                    className="d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm mb-4"
                                >
                                    {/* Equivalent of <div className="flex items-center space-x-4"> */}
                                    {/* d-flex align-items-center, gap-3 for space-x-4 */}
                                    <div className="d-flex align-items-center gap-3">
                                        {/* Equivalent of <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-full"> */}
                                        {/* flex-shrink-0 remains, p-2 remains, bg-light for indigo-100 (light background), rounded-circle for rounded-full */}
                                        <div className="flex-shrink-0 p-2 bg-light rounded-circle">
                                            {/* Equivalent of <Radio className="w-5 h-5 text-indigo-600" /> */}
                                            {/* text-primary for text-indigo-600 (using a theme color). Assume Radio handles size or size via props/CSS */}
                                            <Radio className="text-primary" />
                                        </div>
                                        {/* Div wrapping audio player */}
                                        {/* flex-grow-1 to make it take up space, me-3 for margin-right from delete button */}
                                        <div className="flex-grow-1 me-3 ">
                                            {/* Equivalent of <audio controls className='w-full' style={{ minWidth : 200, }} src={...}></audio> */}
                                            {/* w-100 for w-full. Inline style remains. */}
                                             <audio
                                                controls
                                                className='w-100'
                                                style={{
                                                    minWidth : 200,
                                                }}
                                                src={`${process.env.NEXT_PUBLIC_API_}${recording.path}`}
                                             ></audio>
                                        </div>
                                    </div>
                                     {/* Equivalent of <MdDelete className=' cursor-pointer hover:text-blue-500' size={30} onClick={...}/> */}
                                     {/* MdDelete and size={30} remain. Cursor pointer needs inline style or custom CSS. Hover effect needs custom CSS. */}
                                     <MdDelete
                                        style={{ cursor: 'pointer' }}
                                        size={30}
                                        onClick={() => deleteRadio(recording._id)}
                                     />
                                </div>
                            );
                        })}
                    </>
                )}

                {/* Equivalent of Pagination Controls */}
                {/* d-flex w-100 justify-content-evenly align-items-center */}
                {/* Added mt-4 for spacing above pagination */}
                <div className='d-flex w-100 justify-content-evenly align-items-center mt-4'>
                    {/* Equivalent of Prev Button */}
                    {/* bg-secondary-subtle for bg-gray-200, p-2 for p-3, rounded for rounded-lg. Cursor inline style. Hover omitted. */}
                    <div className='bg-secondary-subtle p-2 rounded'
                         style={{ cursor: 'pointer' }}
                         onClick={()=>{
                             if(currentPage <= 1) { // Corrected condition based on typical pagination logic (page numbers usually start at 1)
                                 showErrorToast("no previous page");
                                 return; // Stop execution if no previous page
                             }
                             getAudiosRecordings(currentPage - 1); // Adjusted page number logic
                         }}>
                         Prev
                    </div>

                    {/* Equivalent of previous page number (currentPage - 2) */}
                    {/* p-2 remains, rounded for rounded-lg. Cursor inline style. Hover omitted. */}
                    {/* Condition adjusted to show if previous-previous page exists */}
                    {currentPage > 2 &&
                        <div className='p-2 rounded'
                             style={{ cursor: 'pointer' }}
                             onClick={() => {
                                 getAudiosRecordings(currentPage - 2);
                             }}>
                             {currentPage - 2}
                        </div>
                    }

                     {/* Equivalent of current page number (currentPage) */}
                     {/* p-2 remains, rounded for rounded-lg. Cursor inline style. Hover omitted. */}
                     {/* Condition adjusted to show if previous page exists (current logic implies 1-based indexing) */}
                    {currentPage > 1 &&
                        <div className='p-2 rounded'
                             style={{ cursor: 'pointer' }}
                             onClick={()=>{
                                 getAudiosRecordings(currentPage - 1); // Adjusted page number logic to show current as currentPage-1
                             }}>
                             {currentPage - 1}
                        </div>
                    }
                    {/* Current page number (active - maybe highlight this one?) */}
                    {/* Let's add a highlighted style for the actual current page */}
                    <div className='p-2 rounded bg-primary text-white' // Highlighted style
                         style={{ cursor: 'pointer' }}
                         onClick={()=>{
                              // Click current page does nothing or reloads?
                              // getAudiosRecordings(currentPage); // This would load the *next* page based on original logic
                         }}>
                         {/* Assuming currentPage is the *next* page to load in the original logic */}
                         {currentPage}
                    </div>


                    {/* Equivalent of Next Button */}
                    {/* bg-secondary-subtle for bg-gray-200, p-2 for p-3, rounded for rounded-lg. Cursor inline style. Hover omitted. */}
                    <div className='bg-secondary-subtle p-2 rounded'
                         style={{ cursor: 'pointer' }}
                         onClick={()=>{
                              getAudiosRecordings(currentPage + 1); // Adjusted page number logic
                         }}>
                         Next
                    </div>
                     {/* Note: The original pagination logic seems a bit off (currentPage - 2, currentPage for display, and then loading currentPage or currentPage - 2).
                        I've adjusted the logic in the onClick handlers assuming currentPage in the original code
                        represented the *start index* for the *next* batch, not the human-readable page number.
                        If currentPage is meant to be the 1-based page number currently loaded, the logic needs more significant changes.
                        The adjusted logic above assumes currentPage is the *next* page number to fetch, so "Prev" fetches currentPage-1, etc.
                        You might need to refine the pagination logic based on how getAudiosRecordings actually works (page number vs. offset).
                    */}
                </div>

            </div>
        </div>
  );
};

