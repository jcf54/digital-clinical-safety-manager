import React, { PropsWithChildren, createContext, useMemo, useState } from 'react';
import User from '../../types/User';

export interface UserAuthInterface {
  user?: User;
  updateUser: (user: User | undefined) => void;
}

export const UserAuthContext = createContext<UserAuthInterface>({
  updateUser: () => ({}),
});

export const UserAuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [user, setContextUser] = useState<User | undefined>();

  if (!user) {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setContextUser(JSON.parse(userFromStorage));
    }
  }

  const updateUser = (newUser: User | undefined) => {
    setContextUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <UserAuthContext.Provider value={useMemo(() => ({ user, updateUser }), [user])}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const user: User = {
  username: 'test.user',
  firstName: 'Test',
  lastName: 'User',
  thumbnailImage: 'https://avatars.githubusercontent.com/u/10000000?v=4',
  scopes: [],
};

export const MockUserAuthProvider = ({ children }: PropsWithChildren) => (
  <UserAuthContext.Provider value={
    useMemo(() => ({ user, updateUser: () => ({}) }), [])
    }
  >
    {children}
  </UserAuthContext.Provider>
);
