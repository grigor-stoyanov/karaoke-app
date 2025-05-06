export default function QueueListComponent(){
    return (
        <>
        <h2  id="queue" className="text-xl mt-6 font-semibold pointer-events-none">Queue</h2>
        <hr className="w-full"></hr>
        <ol className="list-decimal pl-4">
        {[].map((song, i) => (
            <li key={i}>{song}</li>
        ))}
        </ol>
        </>
    )
}