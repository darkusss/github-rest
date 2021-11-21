import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import styles from './scss/App.module.scss';

const App = () => (
  <div className={styles.App}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile/:userId" element={<Profile />} />
    </Routes>
  </div>
);

export default App;
