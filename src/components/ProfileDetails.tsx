import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/userContext';

interface Props {
  username: string;
  queryRepo: string;
}

const filterRepos = (query: string, values: string[]) => (
  values.some((value) => value?.includes(query))
);

const ProfileDetails = ({ username, queryRepo }: Props) => {
  const [repos, setRepos] = useState<Array<Record<string, string>>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userData } = useContext(UserContext);

  useEffect(() => {
    async function getGitHubUserRepos() {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_GITHUB_API}${username}/repos?type=all&sort=updated&per_page=100`);

      try {
        const fetchedRepos = await response.json();
        if (fetchedRepos.message) {
          setError(fetchedRepos.message);
        } else {
          setRepos(fetchedRepos);
          setError('');
        }
      } catch (incomeError: unknown) {
        let errorMessage = 'Something unexpected happened. Try later';
        if (incomeError instanceof Error) {
          errorMessage = incomeError.message;
        }

        setError(errorMessage);
      }
      setLoading(false);
    }

    if (username) {
      getGitHubUserRepos();
    }
  }, [username]);

  if (error) {
    return (
      <div>
        <span>{error}</span>
      </div>
    );
  }

  const renderRepos = repos?.reduce((prevRepos: Array<React.ReactNode>, currRepo) => {
    if (queryRepo && !filterRepos(queryRepo, [currRepo.name, currRepo.description])) {
      return prevRepos;
    }

    return prevRepos.concat((
      <li key={currRepo.id}>
        <div>
          <a href={currRepo.html_url} target="_blank" rel="noreferrer noopener">
            <h2>{currRepo.name}</h2>
            <div>
              <p>{currRepo.description}</p>
              <h4>{currRepo.forks_count}</h4>
              <h4>{currRepo.stargazers_count}</h4>
            </div>
          </a>
        </div>
      </li>
    ));
  }, []);

  return (
    <div>
      <div>
        <div>
          <img
            src={userData?.avatar_url || ''}
            alt={`${userData?.avatar_url} of ${userData?.name}`}
          />
        </div>
        <div>
          <h2>{userData?.name || username}</h2>
          <div>
            <h3>{userData?.bio || 'No biography'}</h3>
            <h4>
              Followers
              {' '}
              {userData?.followers}
            </h4>
            <h4>
              Following
              {' '}
              {userData?.following}
            </h4>
            <h5>{userData?.x}</h5>
            <h5>
              Join in
              {' '}
              {(userData?.created_at && new Date(userData.created_at).toDateString()) || 'never'}
            </h5>
            {userData?.email && <a href={`mailto:${userData.email}`}>{userData.email}</a>}
          </div>
        </div>
      </div>
      <div>
        {loading ? <h3>Loading...</h3>
          : (
            <nav>
              <ul>
                {renderRepos}
              </ul>
            </nav>
          )}
      </div>
    </div>
  );
};

export default ProfileDetails;
