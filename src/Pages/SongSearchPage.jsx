import SearchComponent from '../Components/SearchResults/SearchComponent';
import ResultListComponent from '../Components/SearchResults/ResultListComponent';
import QueueListComponent from '../Components/Queue/QueueListComponent';
import MyRequestsComponent from '../Components/Requests/MyRequestsComponent';
import QRCodeComponent from '../Components/Util/QRCodeComponent';
import NavigationElement from '../Components/Util/NavigationElement';

export default function SongSearchPage() {
  
  return (
    <> 
      <NavigationElement/>   
      <div className="flex flex-col items-center justify-between mt-8">
      <h1 id='top' className="text-2xl font-bold mb-4 pointer-events-none">Karaoke++</h1>
      <SearchComponent/>
      <QueueListComponent/>
      <MyRequestsComponent/>
      <QRCodeComponent/>
      </div>
      </>
  );
}