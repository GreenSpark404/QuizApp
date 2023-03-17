import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App';
import LoginPage from './components/LoginPage';
import QuizGameplayPage from './components/QuizGameplayPage';
import QuizControlGameplayPage from './components/QuizControlGameplayPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/quizSession/*",
        element: <QuizGameplayPage />,
    },
    {
        path: "/quizControlSession/*",
        element: <QuizControlGameplayPage />,
    },
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
