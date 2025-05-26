import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../_store/firebase.js';
import { useSelector,useDispatch } from 'react-redux';
import { setAdminActive } from '../_store/adminThunks.js';


export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('admin') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (admins.some(admin => admin.email === result.user.email)) {
        try {
          dispatch(setAdminActive(result.user.email));
        } 
        catch (error) {
          console.error('Error setting admin as active:', error);
        }
        navigate('/admin/dashboard');
      } else {
        await auth.signOut();
        setErrorMsg('Only authorized admins can access this page.');
      }
    } catch (error) {
      setErrorMsg('Invalid email or password.');
      console.error('Email login failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (admins.some(admin => admin.email === result.user.email)) {
        dispatch(setAdminActive(result.user.email));
        navigate('/admin/dashboard');
      } else {
        await auth.signOut();
        setErrorMsg('Only authorized admins can access this page.');
      }
    } catch (error) {
      setErrorMsg('Google login failed.');
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="bg-[var(--color-muted)] p-8 rounded-lg shadow-md w-full max-w-md border border-[var(--color-border)]">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {errorMsg && (
          <div className="text-[var(--color-danger)] mb-4 text-sm text-center">{errorMsg}</div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)] rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)] rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-white py-2 px-4 rounded hover:bg-[var(--color-primary-hover)] transition"
          >
            Sign in with Email
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <hr className="w-full border-[var(--color-border)]" />
          <span className="px-3 text-sm">or</span>
          <hr className="w-full border-[var(--color-border)]" />
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="inline-flex items-center gap-2 px-3 py-1 text-sm text-[var(--color-text)] border border-[var(--color-border)] rounded hover:bg-[var(--color-muted)]"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="h-4 w-4"
            />
            Google Login
          </button>
        </div>
      </div>
    </div>
  );
}
