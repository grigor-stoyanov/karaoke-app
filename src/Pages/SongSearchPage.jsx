import { useState } from 'react';
import SearchComponent from '../Components/SearchComponent';
import ResultListComponent from '../Components/SearchResults/ResultListComponent';
import QueueListComponent from '../Components/Queue/QueueListComponent';
import MyRequestsComponent from '../Components/Requests/MyRequestsComponent';
import QRCodeComponent from '../Components/QRCodeComponent';

export default function SongSearchPage() {
  const [requests, setRequests] = useState([]);
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-2xl font-bold mb-4 pointer-events-none">Karaoke++</h1>
      <SearchComponent setRequests={setRequests} query={query} setQuery={setQuery} setResults={setResults} setLoading={setLoading}/>
      <ResultListComponent results={results} loading={loading} setRequests={setRequests}/>
      <QueueListComponent/>
      <MyRequestsComponent requests={requests} setRequests={setRequests}/>
      <QRCodeComponent/>
      </div>
  );
}