import React, { useState, useMemo, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UserContext from './contexts/userContext';
import styles from './scss/App.module.scss';
import Layout from './layout/Layout';

const RequireUser = ({ children }: { children: JSX.Element }) => {
  const { userData } = useContext(UserContext);

  if (!userData?.login) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  const [userData, setUserData] = useState({});

  const contextValue = useMemo(() => ({ userData, setUserData }), [userData]);

  return (
    <UserContext.Provider value={contextValue}>
      <div className={styles.App}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="profile/:userId"
              element={(
                <RequireUser>
                  <Profile />
                </RequireUser>
              )}
            />
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>

  );
};

export default App;
