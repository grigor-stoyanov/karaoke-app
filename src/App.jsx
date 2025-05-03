import { useState } from 'react';
import Fuse from 'fuse.js';
// import {QRCode} from 'qrcode.react';
import SongData from './data/song_data.json'
import './App.css';
import SongRequestBlock from './Components/SongApprovalBlock';
import SongSearchBlock from './Components/SongSearchBlock';


const songs = SongData;
const fuse = new Fuse(songs, { keys: ['title', 'artist'] });
function App() {
  const [queue, setQueue] = useState([]);
  const [adminMode, setAdminMode] = useState(false);



  const approveRequest = (index) => {
    const updated = [...requests];
    const approved = updated.splice(index, 1)[0];
    approved.status = 'approved';
    setRequests(updated);
    setQueue(prev => [...prev, approved]);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
     <SongSearchBlock/>

      <h2 className="text-xl mt-6 font-semibold">Queue</h2>
      <ol className="list-decimal pl-4">
        {queue.map((song, i) => (
          <li key={i}>{song.title} - {song.artist}</li>
        ))}
      </ol>

     <SongRequestBlock/>

      {/* <button
        onClick={() => setAdminMode(!adminMode)}
        className="mt-4 px-4 py-2 rounded"
      >
        {adminMode ? 'Exit Admin Mode' : 'Enter Admin Mode'}
      </button>

      <div className="mt-6">
        <p>Scan QR to access:</p>
        <QRCode value="https://your-username.github.io/karaoke-app/" />
      </div> */}
    </div>
  );
}

export default App;
