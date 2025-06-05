import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './compo/Navbar';
import HomePage from './compo/HomePage';
import Pastes from './compo/Pastes';
import ViewPaste from './compo/ViewPaste';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
        <div>
          <Navbar />
          <HomePage />
        </div>
    },
    {
      path:"/pastes",
      element:
        <div>
          <Navbar />
          <Pastes />
        </div>
    },
    {
      path:"/paste/:id",
      element:
        <div>
          <Navbar />
          <ViewPaste />
        </div>
    },

  ]
);

function App() {

  return (
    <div className=''>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
