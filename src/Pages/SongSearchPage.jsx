import { useState, useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import YoutubeData from '../_data/youtube_data.json'
// import {QRCode} from 'qrcode.react';
import SongData from '../_data/song_data.json'
import YoutubeResultItem from '../Components/YoutubeResultItem';
import SongRequestBlock from '../Components/SongApprovalBlock';
import './SongSearchPage.css';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const SEARCH_DELAY = 3000;

export default function SongSearchPage() {
  const inputRef = useRef();
  const [queue, setQueue] = useState([]);
  const [adminMode, setAdminMode] = useState(false);


  const approveRequest = (index) => {
    const updated = [...requests];
    const approved = updated.splice(index, 1)[0];
    approved.status = 'approved';
    setRequests(updated);
    setQueue(prev => [...prev, approved]);
  };


  const isFirstRender = useRef(true);
  const [activeVideoId,setActiveVideoId] = useState('');
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const handleSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchSongs(value);
  };

  const searchSongs = useCallback(
    debounce((value) => {
      console.log('executed');
      setQuery(value);
    }, SEARCH_DELAY), []
  );

  const submitHandler = (e,value) => {
    e.preventDefault();
    setQueue(prev=>[...prev,value])
  }



  useEffect(() => {
    return () => {
      searchSongs.cancel();
    };
  }, [searchSongs]);

  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; 
    }

    if (!query) return;

    setLoading(true);
    setResults(null);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query + ' karaoke'
      )}&type=video&maxResults=3&key=${API_KEY}`
    ).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
      .then((data) => {
        setResults(data.items);
        setLoading(false);
      })
      .catch((err) => {
        if(err.status=403) {
          setResults(YoutubeData);
          setLoading(false);
        }else{
          console.error(err);
          setLoading(false);
        }
      });
  },
    [query])

  return (
    <div className="flex flex-col items-center justify-between p-4 border-b">
      <h1 className="text-2xl font-bold mb-4">Karaoke++</h1>
      <form action="" className='flex flex-row h-10 gap-1' onSubmit={(e)=>submitHandler(e,inputRef.current.value)}>
        <input
          ref={inputRef}
          value={inputValue}
          type="text"
          onChange={handleSearch}
          className="w-full h-full rounded-lg p-2 border mb-4"
          placeholder="Search for a song..."
        />
        <button className='button-primary' type='submit'>
          <MusicalNoteIcon className="h-5 w-5  " />
        </button>
      </form>
      <ul className='w-[85%] m-4 p-2 list-none flex-col justify-items-center'>
        {loading && <span class="loader"></span>}
        {results && results.length === 0 && !loading && <li>No results</li>}
        {results && results.map((song) => (
         <YoutubeResultItem activeVideoId={activeVideoId} setActiveVideoId={setActiveVideoId} setQueue={setQueue} key={song.id.videoId} video={song}/>
      ))}
      </ul>


      <h2 className="text-xl mt-6 font-semibold">Queue</h2>
      <ol className="list-decimal pl-4">
        {queue.map((song, i) => (
          <li key={i}>{song}</li>
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