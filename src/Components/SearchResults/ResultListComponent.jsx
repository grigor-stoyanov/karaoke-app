import { useState } from "react";
import defaultVideo from '../../_data/default_video.json';
import YoutubeResultItem from './YoutubeResultItem';
import './ResultListComponent.css'


export default function ResultListComponent({results,loading,addRequests,error}){
    const [activeVideoId,setActiveVideoId] = useState('');
    console.log(error)
    return (
        <ul className='w-full flex m-1 p-1 list-none place-items-center flex-col justify-items-center'>
        {loading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        {error && !loading && 
         <YoutubeResultItem preview={false} activeVideoId={activeVideoId} setActiveVideoId={setActiveVideoId} addRequests={addRequests} key={defaultVideo.id.videoId} video={defaultVideo}/>}
        {results && results.map((song) => (
         <YoutubeResultItem preview={true} activeVideoId={activeVideoId} setActiveVideoId={setActiveVideoId} addRequests={addRequests} key={song.id.videoId} video={song}/>
      ))}
      </ul>
    )
}