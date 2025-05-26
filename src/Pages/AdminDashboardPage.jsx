
import { auth } from '../_store/firebase.js';
import { useNavigate } from 'react-router-dom';
import {endAllAdminSessions} from '../_store/adminThunks.js';
import { useDispatch } from 'react-redux';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(endAllAdminSessions());
      await auth.signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          End Session
        </button>
      </div>
      
      {/* Add your admin controls here */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Session Controls</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Start Session
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          End Session
        </button>
      </div>
    </div>
  );
}