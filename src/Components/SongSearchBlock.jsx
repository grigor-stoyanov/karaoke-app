import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SongData from '../data/song_data.json';
import YoutubeData from '../data/youtube_data.json';
import YoutubeResultItem from './YoutubeResultItem';
import './YoutubeResultItem.css';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const SEARCH_DELAY = 2000;

export default function SongSearchBlock() {
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

  const submitHandler = (e) => {
    e.preventDefault();
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
  }


  const requestSong = (song) => {
    setRequests(prev => [...prev, { ...song, status: 'pending' }]);
  };

  useEffect(() => {
    return () => {
      searchSongs.cancel();
    };
  }, [searchSongs]);

  return (
    <div className="flex flex-col items-center justify-between p-4 border-b">
      <h1 className="text-2xl font-bold mb-4">Karaoke++</h1>
      <form action="" className='flex flex-row h-10 gap-1' onSubmit={submitHandler}>
        <input
          value={inputValue}
          type="text"
          onChange={handleSearch}
          className="w-full h-full rounded-lg p-2 border mb-4"
          placeholder="Search for a song..."
        />
        <button className='button-primary' type='submit'>
          <MagnifyingGlassIcon className="h-5 w-5  " />
        </button>
      </form>
      <ul className='w-full m-4 p-2 list-none flex-col justify-items-center'>
        {loading && <li>Loading...</li>}
        {results && results.length === 0 && !loading && <li>No results</li>}
        {results && results.map((song) => (
         <YoutubeResultItem key={song.id.videoId} video={song}/>
      ))}
      </ul>
    </div>
  );
}