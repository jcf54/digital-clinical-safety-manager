import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import { UserAuthProvider } from './contexts/UserAuthContext';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import '../index.css'
import '@mantine/core/styles.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
    </>
  ), { basename: import.meta.env.BASE_URL }
)

function App() {
  return (
    <MantineProvider theme={theme}>
      <UserAuthProvider>
        <RouterProvider router={router}  />
      </UserAuthProvider>
    </MantineProvider>
  )
}

export default App;
