import SongRequests from "../data/song_data.json";

export default function SongRequestBlock({  }) {
    const requests = SongRequests;
    const adminMode = false;
    return adminMode && (
    <div className="flex items-center justify-between p-4 border-b">
     <h2 className="text-xl mt-6 font-semibold">Pending Requests</h2>
      <ol className="list-decimal pl-4">
        {requests.map((song, i) => (
          <li key={i}>
            {song.title} - {song.artist}
            {adminMode && (
              <button
                onClick={() => []}
                className="ml-2 px-2 py-1 rounded"
              >
                Approve
              </button>
            )}
          </li>
        ))}
      </ol>
        </div>
    );
    }