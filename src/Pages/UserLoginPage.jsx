import { useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {useAdminOnlineCheck} from '../Hooks/useAdminOnlineCheck';

export default function UserLogin() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
  e.preventDefault();
  const nickname = inputRef.current?.value.trim();
  if (nickname) {
    sessionStorage.setItem('userNickname', nickname)
    navigate('/queue');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="bg-[var(--color-muted)] p-8 rounded-lg shadow-md w-full max-w-md border border-[var(--color-border)]">
        <h1 className="text-2xl font-bold mb-6 text-center">Enter Your Nickname</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              ref={inputRef}
              placeholder="Your nickname"
              className="w-full px-4 py-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            Join Queue
          </button>
        </form>
      </div>
    </div>
  );
}