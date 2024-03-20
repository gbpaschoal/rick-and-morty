import { Suspense, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { ArrowToUp } from '@/assets/icons/main/ArrowToUp';

export default function Main() {
  const scrollButtonRef = useRef<null | HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const verifyScrollHeight = () => {
      if (window.scrollY > 200) {
        scrollButtonRef.current?.classList.remove('bottom-[-20%]');
        scrollButtonRef.current?.classList.add('bottom-4');
      } else {
        scrollButtonRef.current?.classList.remove('bottom-4');
        scrollButtonRef.current?.classList.add('bottom-[-20%]');
      }
    };

    document.addEventListener('scroll', verifyScrollHeight);
    return () => document.removeEventListener('scroll', verifyScrollHeight);
  }, []);

  return (
    <main
      className="px-5 mt-header-height w-full relative
    flex flex-col items-center">
      <Suspense
        fallback={
          <div className="mx-auto text-center text-light-100">Loading</div>
        }>
        <Outlet />
      </Suspense>
      <nav className="relative z-1 bottom-32 w-full bg-red flex justify-end">
        <button
          ref={scrollButtonRef}
          onClick={scrollToTop}
          className="motion-transform  grid place-items-center
        bottom-[-20%] mx-auto p-4 rounded-full
        bg-gray-500 hover:bg-gray-400">
          <ArrowToUp className="fill-light-100 size-6 md:size-8 font-bold" />
        </button>
        <button
          ref={scrollButtonRef}
          onClick={scrollToTop}
          className="motion-transform grid place-items-center
         mx-auto p-4 rounded-full
        bg-gray-500 hover:bg-gray-400">
          <ArrowToUp className="fill-light-100 size-6 md:size-8 font-bold" />
        </button>
      </nav>
    </main>
  );
}
