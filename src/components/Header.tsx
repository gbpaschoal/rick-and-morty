import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../assets/icons/Icon';
import { SearchModalContext } from './Search';

export default function Header() {
  const { openModal } = React.useContext(SearchModalContext)
  return (
    <header className="wrapper fixed top-0 left-0 z-3 w-full bg-[var(--bg-main)]
    flex gap-x-4 justify-between items-center py-2">
      <Link to="/" className="size-[3rem] sm:size-[3.5rem]">
        <Icon.Logo className="max-w-full cursor-pointer fill-gray-400 hover:fill-gray-200"/>
      </Link>
      <div className="sm:hidden flex gap-2">
        <button
        onClick={openModal}
        className="p-2 rounded-full">
          <Icon.Search className="size-[1.5rem] fill-gray-400" />
        </button>
        <Link to="fav" className="p-2 rounded-full">
          <Icon.Fav className="size-[1.5rem] fill-gray-400" />
        </Link>
      </div>
      <div className="max-sm:hidden">
        <Link to="fav" className="inline-grid place-items-center
        bg-primary py-2 px-4 md:py-3 md:px-5
        rounded-full cursor-pointer">
          Favorites
        </Link>
      </div>
    </header>
  );
}
