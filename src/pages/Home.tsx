import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import Search from '../components/Search';
import ProfilePreview from '../components/ProfilePreview';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState(searchParams.get('user') || '');
  const handleUsername = (newUsername: string) => setUsername(newUsername);

  return (
    <Layout>
      <div>
        <Search query={username} handleQuery={handleUsername} />
        <ProfilePreview username={username} />
      </div>
    </Layout>
  );
};

export default Home;
