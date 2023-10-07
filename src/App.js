import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { fetchAndSetUser, isTokenExpired } from './store/userSlice';
import { setLikedProductsFromLocalStorage } from './store/productSlice';  // Import your action
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loginStatus = useSelector((state) => state.user.loginStatus); 

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && !isTokenExpired(token)) {
      setLoading(true);
      dispatch(fetchAndSetUser())
      .finally(() => {
        setLoading(false);

        // Load liked products from localStorage
        const savedLikedProducts = localStorage.getItem('likedProducts');
        if (savedLikedProducts) {
          const parsedLikedProducts = JSON.parse(savedLikedProducts);
          dispatch(setLikedProductsFromLocalStorage(parsedLikedProducts));
        }
      });
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
