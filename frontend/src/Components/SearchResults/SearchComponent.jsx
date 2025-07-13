import { useState,useEffect,useCallback } from 'react'
import debounce from 'lodash/debounce';
import { useDispatch,useSelector } from 'react-redux';
import { addRequest } from '../../_store/queueSlice';
import { clearResults,setQuery } from '../../_store/searchSlice';
import { searchYouTube } from '../../_store/searchThunks';
import { addRequestToFirestore } from '../../_store/queueThunks';
import ResultListComponent from './ResultListComponent';



export default function SearchComponent({  }) {
    const dispatch = useDispatch();
    const { results, loading, error, query } = useSelector(state => state.search);

    const addRequests = async (request) => {
    try {
        await dispatch(addRequestToFirestore(request)).unwrap();
        addRequest(request);
    }catch (error) {
        console.error('Failed to add request:', error);
        alert('Failed to add request service is down');
    }
    }
    
    const handleSearch = (e) => {
        const value = e.target.value;
        dispatch(setQuery(value));
        debouncedSearchYouTube(value);
    };


    const debouncedSearchYouTube = useCallback(
        debounce((q) => {
            if (q) {
                dispatch(searchYouTube(q));
            } else {
                dispatch(clearResults());
            }
        }, 3000),
        [dispatch]
    );


      useEffect(() => {
        return () => {
            debouncedSearchYouTube.cancel();
            dispatch(clearResults());
        };
    }, [debouncedSearchYouTube, dispatch]);

    return (
        <>
        <form action="" className='flex flex-row h-10 gap-1 w-full'>
            <input
                value={query}
                type="text"
                onChange={handleSearch}
                className="w-full h-full rounded-lg p-2 border mb-4"
                placeholder="Search for a song..."
            />
        </form>
        <ResultListComponent results={results} loading={loading} error={error} addRequests={ addRequests }/>
        </>
    )
}