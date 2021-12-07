import React from 'react';

interface User {
  userData?: Record<string, string>;
  setUserData?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const UserContext = React.createContext<User>({});

export default UserContext;
