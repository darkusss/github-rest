import React, { useState, useEffect } from 'react';

interface Props {
    query: string;
    handleQuery: (searchQuery: string) => void;
}

const Search = ({ query, handleQuery }: Props) => {
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleQuery(searchQuery);
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
