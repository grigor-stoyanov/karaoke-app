import SongRequestItem from "./SongRequestItem"
import { useDispatch, useSelector } from "react-redux";
import { removeRequest } from "../../_store/queueSlice";
import { removeRequestFromFirestore } from "../../_store/queueThunks";

export default function MyRequestsComponent({}){
      const dispatch = useDispatch();
      const requests = useSelector(state => state.queue.requests);
      const removeRequests = async (requestId) => {
         try {
          await dispatch(removeRequestFromFirestore(requestId)).unwrap();
          removeRequest(requestId);
        }catch (error) {
          console.error('Failed to add request:', error);
          alert('Failed to remove request service is down');
        }
      }


    return (
        <>
        <h3 id="requests" className="text-xl mt-6 font-semibold pointer-events-none">My Requests</h3>
        <hr className="w-full"></hr>
        <ol className="list-decimal pl-4 w-full">
           {requests && requests.map((song, i) => (
            <SongRequestItem song={song.song} id={song.id} key={i} removeRequests={removeRequests}/>
           ))}
         </ol>
        </>
    )
}