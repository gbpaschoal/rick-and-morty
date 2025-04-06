import { Link } from 'react-router-dom';
import * as Icon from './../assets/icons';

export default function Header() {

  return (
    <header className="">
      <nav className="flex items-center justify-between">
        <Link to={'/'}>
          <Icon.Logo
            className="fill-light-300/80 hover:fill-light-100
          sm:size-[52px]"
          />
        </Link>
        <div className="flex items-center gap-x-4 sm:hidden">
          <button
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
          className="hidden sm:inline-block py-2 px-4 rounded-md font-semibold">
          Favorites
        </Link>
      </nav>
    </header>
  );
}
