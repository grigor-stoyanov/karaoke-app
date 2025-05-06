import { useState } from "react";
import YoutubeResultItem from './YoutubeResultItem';
import './ResultListComponent.css'


export default function ResultListComponent({results,loading,setRequests}){
    const [activeVideoId,setActiveVideoId] = useState('');

    return (
        <ul className='w-full flex m-1 p-1 list-none place-items-center flex-col justify-items-center'>
        {loading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        {results && results.length === 0 && !loading && <li className='pointer-events-none'>No results found</li>}
        {results && results.map((song) => (
         <YoutubeResultItem activeVideoId={activeVideoId} setActiveVideoId={setActiveVideoId} setRequests={setRequests} key={song.id.videoId} video={song}/>
      ))}
      </ul>
    )
}