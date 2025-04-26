import { Outlet } from 'react-router-dom';
import "../styles/index.css";
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
