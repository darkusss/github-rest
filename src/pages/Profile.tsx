import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProfileView from '../components/ProfileView';

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryRepo, setQueryRepo] = useState<string>(searchParams.get('query') || '');

  const handleQueryRepo = (repoName: string) => {
    setQueryRepo(repoName);
    setSearchParams({ query: repoName });
  };

  const params = useParams();
  return (
    <ProfileView
      username={params.userId || ''}
      queryRepo={queryRepo}
      handleQueryRepo={handleQueryRepo}
    />
  );
};

export default Profile;
