import { Podcasts, User } from '@/types/types';
import { showErrorToast, showSuccessToast } from '@/utils/time-ops';
import { getAllPodcasts, likePodcast, saveUserToLocalStorage } from '@/utils/utils';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import { useUserState } from '@/stores/user-state';
import { DefaultLoader } from '@/components/loader';

export const PodcastLister = ({ items }: { items: Podcasts[] }) => {
    const user = useUserState()
    const [loading,setLoading]=useState(false)
    const [likeId,setLikeId]= useState("")
    const likeInitiate = async(likeId : string)=>{
        setLoading(true)
        setLikeId(likeId)
        const response = await likePodcast(likeId)
        setLoading(false)
        setLikeId("")
        if(typeof response === 'string') return showErrorToast(response)
        saveUserToLocalStorage(response.payload.user)
        showSuccessToast(response.message)
        useUserState.setState(response.payload.user as User)
    }
    return (
        <div className="space-y-6">
               <Toaster />
            {items.length>0 && <>{items.map((item, i) => (
                <div
                    key={i}
                    className="
                        flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl
                        bg-white dark:bg-slate-900/90
                        shadow-md border border-slate-100 dark:border-slate-800
                        transition-all duration-300
                        hover:shadow-lg hover:scale-[1.01] hover:bg-white/90 dark:hover:bg-slate-900/80
                        cursor-pointer
                    "
                >
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_}${item!.picture}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-2 flex-1 justify-items-start" onClick={() => Router.push(item.website)}>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                            {item.title}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            By {item.presenter}
                        </p>
                    </div>
                    <div className='cursor-pointer hover:bg-blue-400 hover:text-white p-2 rounded-3xl' onClick={()=>{
                        likeInitiate(item._id)
                    }}>
                        {loading && likeId == item._id && <><DefaultLoader/></>}
                        {Array.isArray(user.podcasts)
                                    ? (user.podcasts.some(obj => obj._id === item._id)  ? <FaHeart className='text-red-500'/> : <><FaRegHeart  className='' size={20}/></>)
                                    : <> <FaRegHeart  className='' size={20}/></>}
                    </div>
                </div>
            ))}</>}
            {items.length == 0 && 
            <div className=' w-full p-6 flex justify-center items-center'>
             There are no podcasts found!
            </div>
            }
        </div>
    );
};

export const PodcastWidget = () => {
    const [nextPage, setNextPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [podcastItems, setPodcastsItems] = useState([])
    const getPodcasts = async (page: number) => {
        setLoading(true)
        const response = await getAllPodcasts(page,'')
        setLoading(false)
        if (typeof response != 'string') {
            setNextPage(response.page)
            setHasMore(response.hasMore)
            return setPodcastsItems(response.podcasts);
        }
        showErrorToast(response)
    }
    useEffect(() => {
        getPodcasts(1)
    }, [])
    return (
        <div className=" bg-gray-100 dark:bg-slate-900 p-4 sm:p-8 flex items-center justify-center">
            <div className="w-full max-w-3xl">
                <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                    Featured Podcasts
                </h4>
                {loading ? <DefaultLoader /> : <PodcastLister items={podcastItems} />}
                <div className='flex justify-evenly items-center p-3 cursor-pointer'>
                    <div onClick={() => {
                        if (nextPage <= 2) {
                            return showErrorToast("This is the first page")
                        }
                        getPodcasts(nextPage - 2)
                    }} className={`flex items-center justify-center px-6 py-2 ${nextPage <= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-3xl gap-x-2`}> <TbPlayerTrackPrevFilled /> prev</div>
                    <div className='flex gap-x-3'>
                        {nextPage > 1 && <div className='cursor-pointer flex items-center justify-center px-6 py-2 bg-gray-200 border-blue-500 border-2'>{nextPage - 1}</div>}
                        {nextPage > 1 && <div className='cursor-pointer flex items-center justify-center px-6 py-2 bg-gray-200' onClick={() => {
                            if (!hasMore) return showErrorToast("No more pages left")
                            getPodcasts(nextPage)
                        }}>{nextPage}</div>}
                        {nextPage > 1 && <div className='cursor-pointer flex items-center justify-center px-6 py-2 bg-gray-200' onClick={() => {
                            if (!hasMore) return showErrorToast("No more pages left")
                            getPodcasts(nextPage + 1)
                        }}>{nextPage + 1}</div>}
                    </div>
                    <div
                        onClick={() => {
                            if (!hasMore) return showErrorToast("No more pages left")
                            getPodcasts(nextPage)
                        }}
                        className={` cursor-pointer flex items-center justify-center px-6 py-2 ${hasMore ? 'bg-blue-500 text-white' : 'bg-gray-200'} cursor-pointer  rounded-3xl gap-x-2`}><TbPlayerTrackNextFilled /> next</div>
                </div>
            </div>
        </div>

    );
};

