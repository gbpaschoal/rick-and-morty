import React from 'react';
import Icon from '@/assets/icons';
import FilterModal from '@/components/Filter/FilterModal';
import { Outlet } from 'react-router-dom';
// import { MainModal } from '../Modal';
import { useLocation } from 'react-router-dom';

export default function Main() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const scrollButtonRef = React.useRef<null | HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    const verifyScrollHeight = () => {
      if (window.scrollY > 200) {
        scrollButtonRef.current?.classList.remove('opacity-0');
        scrollButtonRef.current?.classList.add('opacity-100');
      } else {
        scrollButtonRef.current?.classList.remove('opacity-100');
        scrollButtonRef.current?.classList.add('opacity-0');
      }
    };

    document.addEventListener('scroll', verifyScrollHeight);
    return () => document.removeEventListener('scroll', verifyScrollHeight);
  }, []);

  return (
    <main
      className="mt-[--header-height] w-full relative
    flex flex-col items-center">
      {/* <MainModal /> */}
      <React.Suspense
        fallback={
          <div className="mx-auto text-center text-light-100">Loading</div>
        }>
        <Outlet />
      </React.Suspense>
      <nav className="fixed bottom-4 z-2 w-full flex justify-end px-6">
        <div className="w-max flex gap-x-2">
          {isOpen && location.pathname === '/' && <FilterModal />}
          <button
            ref={scrollButtonRef}
            onClick={scrollToTop}
            className="motion-transform grid place-items-center
        relative opacity-0 mx-auto p-4 rounded-full
        bg-gray-500 hover:bg-gray-400">
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
