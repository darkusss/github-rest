import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import styles from '../scss/ProfilePreview.module.scss';

interface Props {
    username: string;
}

const ProfilePreview = ({ username }: Props) => {
  const [error, setError] = useState<string>('');
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    async function getGitHubUser() {
      const response = await fetch(`${process.env.REACT_APP_GITHUB_API}${username}`);

      try {
        const data = await response.json();
        if (data.message) {
          setError(data.message);
        } else {
          if (setUserData) {
            setUserData(data);
          }
          setError('');
        }
      } catch (incomeError: unknown) {
        let errorMessage = 'Something unexpected happened. Try later';
        if (incomeError instanceof Error) {
          errorMessage = incomeError.message;
          setError(errorMessage);
        }
      }
    }

    if (username) {
      getGitHubUser();
    }
  }, [username]);

  if (error) {
    return (
      <div className={styles.container}>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!userData?.login
        ? <span>Hello!</span>
        : (
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
        )}
    </div>
  );
};

export default ProfilePreview;
