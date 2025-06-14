
import React, { useState, useEffect } from 'react';
import { auth } from './src/firebase'; // Assuming firebase.ts is in src/
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn("Firebase auth is not initialized. Authentication will not work.");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Error in onAuthStateChanged:", error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!auth) {
      alert("認証サービスが初期化されていません。");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // setUser will be updated by onAuthStateChanged
    } catch (error) {
      console.error("Google login error:", error);
      alert("ログイン中にエラーが発生しました。");
    }
  };

  const handleLogout = async () => {
    if (!auth) {
      alert("認証サービスが初期化されていません。");
      return;
    }
    try {
      await signOut(auth);
      // setUser will be updated by onAuthStateChanged to null
    } catch (error) {
      console.error("Logout error:", error);
      alert("ログアウト中にエラーが発生しました。");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
        <div role="status" aria-live="polite" className="text-slate-700 text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">財務会計Anki</h1>
          {user ? (
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="text-xs sm:text-sm" aria-label="ログインユーザー名">
                {user.displayName || user.email || 'ユーザー'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg transition-colors duration-150 ease-in-out text-xs sm:text-sm"
                aria-label="ログアウト"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors duration-150 ease-in-out text-sm sm:text-base"
              aria-label="ログイン"
            >
              ログイン
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        {user ? (
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-green-500 mb-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-2">
              ようこそ、{user.displayName || user.email || 'ユーザー'}さん。
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              デッキをアップロードしてください。
            </p>
            {/* CSV Upload component will go here in the next step */}
          </div>
        ) : (
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-slate-500 mb-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-2">
              ようこそ！
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              学習を始めるにはログインしてください。
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
