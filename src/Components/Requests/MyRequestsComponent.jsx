import SongRequestItem from "./SongRequestItem"

export default function MyRequestsComponent({requests,setRequests}){
    return (
        <>
        <h3 id="requests" className="text-xl mt-6 font-semibold pointer-events-none">My Requests</h3>
        <hr className="w-full"></hr>
        <ol className="list-decimal pl-4 w-full">
           {requests.map((song, i) => (
            <SongRequestItem song={song} key={i} setRequests={setRequests}/>
           ))}
         </ol>
        </>
    )
}