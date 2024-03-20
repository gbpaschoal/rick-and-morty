import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header
      className="fixed top-0 flex items-center justify-between
    w-full px-5 py-4 bg-gray-900 z-5">
      <Link
        to={'characters'}
        className="font-semibold hover:text-light-100 text-light-400
        text-large">
        Rick and Morty
      </Link>
      <Link
        to={'favorites'}
        className="btn motion-linear
      hover:bg-primary-100">
        Favorites
      </Link>
    </header>
  );
}
