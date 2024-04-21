import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/assets/icons';
import SearchModal from '../SearchModal/SearchModal';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header
      className="fixed top-0 left-0 z-3 bg-[--background] flex items-center
      justify-between w-full">
      {isOpen && (
        <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      <Link to={'/'}>
        <Icon.Logo
          className="fill-light-300/80 hover:fill-light-100
          motion-opacity sm:size-[52px]"
        />
      </Link>
      <Link
        to={'/favorites'}
        className="hidden sm:inline-flex btn hover:bg-primary-100
        transition-opacity duration-100 ease-linear">
        Favorites
      </Link>
      <div className="flex gap-x-4 sm:hidden">
        <button
          onClick={() => setIsOpen(true)}
          role="button"
          aria-label="Open Search Modal"
          aria-controls="search-modal">
          <Icon.Search />
        </button>
        <Link to={'/favorites'}>
          <Icon.Fav />
        </Link>
      </div>
    </header>
  );
}
