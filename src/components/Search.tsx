import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
    query: string;
    handleQuery: (searchQuery: string) => void;
}

const Search = ({ query, handleQuery }: Props) => {
  const [, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleQuery(searchQuery);
      setSearchParams({ user: searchQuery });
    }, 650);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input value={searchQuery} onChange={handleSearchQuery} />
    </div>
  );
};

export default Search;
