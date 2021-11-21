import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../scss/ProfilePreview.module.scss';

interface Props {
    username: string;
}

type User = Record<string, string> | null;

const ProfilePreview = ({ username }: Props) => {
  const [userData, setUserData] = useState<User>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function getGitHubUser() {
      const response = await fetch(`${process.env.REACT_APP_GITHUB_API}${username}`);

      try {
        const data = await response.json();
        if (data.message) {
          setError(data.message);
        } else {
          setUserData(data);
          setError('');
        }
      } catch (message) {
        setError(`Got: ${message}`);
      }
    }

    if (username) {
      getGitHubUser();
    }
  }, [username]);

  if (error || !userData) {
    return (
      <div>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to={`profile/${username}`}>
        <div>
          <div>
            <img
              className={styles.avatar}
              src={userData.avatar_url}
              alt={`${userData.avatar_url} of ${userData.name}`}
            />
          </div>
          <div><h2>{userData.name || username}</h2></div>
          <div>
            Repos:
            {' '}
            {userData.public_repos}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProfilePreview;
