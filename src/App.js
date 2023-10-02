import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { fetchAndSetUser, isTokenExpired } from './store/userSlice';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loginStatus = useSelector((state) => state.user.loginStatus); 

  useEffect(() => {
    console.log(localStorage);
    const token = localStorage.getItem('access_token');
    if (token && !isTokenExpired(token)) {
        setLoading(true);
        dispatch(fetchAndSetUser())
            .finally(() => setLoading(false));
    }
}, [dispatch]);

  if(loading) {
    return <div>...loading</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={loginStatus ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/main" element={loginStatus ? <MainPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
