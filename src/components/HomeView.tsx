import React from 'react';
import Search from './Search';
import ProfilePreview from './ProfilePreview';

interface Props {
    searchQuery: string;
    username: string;
    handleSearchQuery: (searchQuery: string) => void;
}

const HomeView = ({ searchQuery, handleSearchQuery, username }: Props) => (
  <div>
    <Search query={searchQuery} handleQuery={handleSearchQuery} />
    <ProfilePreview username={username} />
  </div>
);

export default HomeView;
