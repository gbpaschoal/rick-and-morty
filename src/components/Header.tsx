import React from 'react';
import { Link } from 'react-router-dom';
import * as Icon from './../assets/icons';
import SearchModal from './SearchModal/SearchModal';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 z-3 bg-gray-900 w-full">
      {isOpen && (
        <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}

      <nav className="flex-x justify-between">
        <Link to={'/'}>
          <Icon.Logo
            className="fill-light-300/80 hover:fill-light-100
          sm:size-[52px]"
          />
        </Link>
        <div className="flex-x gap-x-4 sm:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-full"
            title="Search Modal"
            role="button"
            aria-label="Open Search Modal"
            aria-controls="search-modal">
            <Icon.Search className="fill-light-100/60" />
          </button>
          <Link to={'/favorites'} className="p-2 rounded-full">
            <Icon.Fav className="fill-light-100/60" />
          </Link>
        </div>
        <Link
          to={'/favorites'}
          className="hidden sm:inline-block border-2 border-primary-300 hover:border-primary-100
          py-2 px-4 rounded-md
        text-light-200 font-semibold">
          Favorites
        </Link>
      </nav>
    </header>
  );
}
