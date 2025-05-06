import { useRef, useEffect, useCallback, useState } from 'react'
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import YoutubeData from '../_data/youtube_data.json'


const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const SEARCH_DELAY = 3000;

export default function SearchComponent({ setRequests, query, setQuery, setResults, setLoading }) {
    const [inputValue, setInputValue] = useState('');
    const isFirstRender = useRef(true);
    const inputRef = useRef();
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


    const submitHandler = (e, value) => {
        e.preventDefault();
        setRequests((prev) => {
            const exists = prev.some((req) => req === value);
            return exists ? prev : [...prev, value];
        })
    }

    useEffect(() => {
        return () => {
            searchSongs.cancel();
        };
    }, [searchSongs]);

    // TODO: move into an Async Slice
    useEffect(() => {
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
                if (err.status = 403) {
                    setResults(YoutubeData);
                    setLoading(false);
                } else {
                    console.error(err);
                    setLoading(false);
                }
            });
    },
        [query])

    return (
        <form action="" className='flex flex-row h-10 gap-1' onSubmit={(e) => submitHandler(e, inputRef.current.value)}>
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
    )
}