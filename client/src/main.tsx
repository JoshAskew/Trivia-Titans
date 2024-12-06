import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Provider } from "../src/components/ui/provider.tsx";
import App from './App.tsx';
//import Home from './pages/Home.tsx';
//import Contribute from './pages/Contribute.tsx';
//import SignIn from '../pages/SignIn.tsx';  
import ErrorPage from '../pages/ErrorPage.tsx';
//import Game from '../pages/Game.tsx';
import QuizCard from './components/QuizCard.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <QuizCard/>
      }
    ]
  }
])

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(

    <Provider>
      <RouterProvider router={router} />
   </Provider>

  );
}
