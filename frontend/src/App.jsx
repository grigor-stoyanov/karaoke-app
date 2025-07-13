import SongSearchPage from './Pages/SongSearchPage';
import { useSyncQueue } from './Hooks/useSyncQueue'; 

function App() {
  useSyncQueue()

  const callExpress = () => {
    fetch('http://localhost:5000').then(
      (res)=>res.json()
    ).then(data=>console.log(data))
    .catch(error=>console.log(error));
  }
  console.log('synced')
  return (
    <div className="p-4 w-screen">
     <SongSearchPage/>
     <button onClick={callExpress}>CALL EXPRESSSSS!</button>
    </div>
  );
}

export default App;