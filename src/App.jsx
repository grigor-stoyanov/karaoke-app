import SongSearchPage from './Pages/SongSearchPage';
import { useSyncQueue } from './Hooks/useSyncQueue'; 

function App() {
  useSyncQueue()
  console.log('synced')
  return (
    <div className="p-4 w-screen">
     <SongSearchPage/>
    </div>
  );
}

export default App;