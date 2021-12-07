import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HomeView from '../components/HomeView';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState(searchParams.get('user') || '');
  const handleUsername = (newUsername: string) => {
    if (newUsername) {
      setSearchParams({ user: newUsername });
      setUsername(newUsername);
    }
  };

  return (
    <HomeView
      searchQuery={username}
      handleSearchQuery={handleUsername}
      username={username}
    />
  );
};

export default Home;
