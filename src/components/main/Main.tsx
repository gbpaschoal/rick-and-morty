import React from 'react';
import * as Icon from '@/assets/icons';

import FilterModal from '@/components/Filter/FilterModal';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Main() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const verifyScrollHeight = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener('scroll', verifyScrollHeight);
    return () => document.removeEventListener('scroll', verifyScrollHeight);
  }, []);

  return (
    <main
      className="mt-[--header-height] w-full relative
    flex flex-col items-center">
      <React.Suspense
        fallback={
          <div className="mx-auto text-center text-light-100">Loading</div>
        }>
        <Outlet />
      </React.Suspense>
      <nav
        className="fixed bottom-0 z-2 w-full flex justify-end px-6 pb-6 pt-12s
      bg-[linear-gradient(180deg,#0000,#0000004d)] drop-shadow-2xl">
        <div className="w-max flex gap-x-2">
          {isOpen && location.pathname === '/' && <FilterModal />}
          <button
            onClick={() => window.scrollTo(0, 0)}
            className={`motion-transform grid place-items-center
        relative ${isVisible ? 'opacity-100' : 'opa'} mx-auto p-4 rounded-full
        bg-gray-500 hover:bg-gray-400`}>
            <Icon.ArrowToUp />
          </button>
          {location.pathname === '/' && (
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="motion-transform grid place-items-center
         mx-auto p-4 rounded-full
        bg-primary-300 hover:bg-primary-100">
              {isOpen ? (
                <Icon.Close className="fill-light-300 size-8 md:size-8 font-bold" />
              ) : (
                <Icon.Filter className="fill-light-300 size-8 md:size-8 font-bold" />
              )}
            </button>
          )}
        </div>
      </nav>
    </main>
  );
}
