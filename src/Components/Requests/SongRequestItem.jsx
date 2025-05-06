import { XMarkIcon } from '@heroicons/react/24/solid';

export default function SongRequestItem({ song, setRequests }) {
  status = "Pending"

  const statusStyles = {
    Pending: 'text-yellow-500',
    Approved: 'text-blue-500',
    Completed: 'text-green-500',
  };
  const onCancel = (e,song) => {
    e.preventDefault();
    setRequests((prev)=>{
        return prev.filter(ele=>ele!==song);
    })
  }

  return (
    <li className="flex justify-between items-center py-2 border-b border-gray-200">
      <span className="truncate w-2/3 font-medium pointer-events-none">{song}</span>
      <span className={`text-sm ${statusStyles[status] || 'text-gray-400'} border rounded p-1 pointer-events-none`}>
        {status}
      </span>
      <a
        href="javascript:void(0)"
        onClick={(e) => onCancel(e,song)}
        className="ml-4 color-danger text-red-500 hover:text-red-700"
        aria-label="Cancel Request"
      >
        <XMarkIcon className="h-5 w-5" />
      </a>
    </li>
  );
}
