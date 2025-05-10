import { useSelector } from "react-redux"

export default function QueueListComponent({}){
    const songs = useSelector(state => state.queue.requests);
    return (
        <>
        <h2  id="queue" className="text-xl mt-6 font-semibold pointer-events-none">Queue</h2>
        <hr className="w-full"></hr>
        <ol className="list-decimal pl-4">
        {songs && songs.filter((request)=>request.status === 'Approved').map((song, i) => (
            <li key={i}>{song.song}</li>
        ))}
        </ol>
        </>
    )
}