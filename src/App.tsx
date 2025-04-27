import Header from './components/Header';
import * as Router from 'react-router-dom';
import NavFooter from './components/NavFooter';
import { SearchPortal } from './components/Search';

export default function App() {
  return (
    <div className='wrapper w-full'>
      <SearchPortal/>
      <Header/>
      <div className="my-24">
        <Router.Outlet/>
      </div>
      <NavFooter/>
    </div>
  );
}
