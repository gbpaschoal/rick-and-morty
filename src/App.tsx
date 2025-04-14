import Header from './components/Header';
import * as Router from 'react-router-dom';
import * as Icon from './assets/icons'
import Filter from './components/Filter';

export default function App() {
  return (
    <div className='w-full px-[var(--gutter)]'>
      <div className='fixed top-0 left-0 z-3 w-full px-[var(--gutter)]'>
        <Header/>
      </div>
      <div className="my-[8rem]">
        <Router.Outlet/>
      </div>
      <div className="bg-special z-3 fixed bottom-0 w-full pointer-events-none px-[var(--gutter)]
      flex gap-x-2 justify-end py-5 *:pointer-events-auto">
        <button
          className="p-5 bg-[var(--primary)]
          rounded-full justify-self-start">
          <Icon.ArrowToUp className="size-7 fill-[var(--light)]"/>
        </button>
        <Filter/>
      </div>
    </div>

  );
}
