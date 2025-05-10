export default function QueueListComponent({songs}){
    
    console.log(songs);
    return (
        <>
        <h2  id="queue" className="text-xl mt-6 font-semibold pointer-events-none">Queue</h2>
        <hr className="w-full"></hr>
        <ol className="list-decimal pl-4">
        {songs.map((song, i) => (
            <li key={i}>{song.song}</li>
        ))}
        </ol>
        </>
    )
}