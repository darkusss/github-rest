import React from 'react';
import ProfileDetails from './ProfileDetails';
import Search from './Search';

interface Props {
  username: string;
  queryRepo: string;
  handleQueryRepo: (repoName: string) => void;
}

const ProfileView = ({ username, queryRepo, handleQueryRepo }: Props) => (
  <div>
    <Search query={queryRepo} handleQuery={handleQueryRepo} />
    <ProfileDetails username={username} queryRepo={queryRepo} />
  </div>
);

export default ProfileView;
