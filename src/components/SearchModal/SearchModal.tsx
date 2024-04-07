import React from 'react';
import SearchResults from './SearchResults';
import Icon from '@/assets/icons';

export default function SearchModal({ onClose }) {
  const [query, setQuery] = React.useState('');

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-3 backdrop-blur-2xl flex justify-center px-4">
      <div
        className="search-modal w-full max-w-xl max-h-[400px] bg-gray-800
      mt-[3rem] rounded-xl border-2 border-gray-500/50 flex flex-col">
        <div className="w-full border-b-2 border-gray-500/50 px-4">
          <form>
            <div className="flex items-center">
              <div className="w-full flex items-center gap-x-2">
                <Icon.Search className="mt-[1px] fill-gray-200" />
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-14 outline-none border-none bg-transparent flex-1
        text-light-100 placeholder:text-light-300/60"
                  type="text"
                  placeholder="Search Characters"
                  autoFocus
                />
              </div>
              <button onClick={onClose} className="close-btn">
                <Icon.Close className="fill-gray-200" />
              </button>
            </div>
          </form>
        </div>
        <SearchResults q={query} />
      </div>
    </div>
  );
}
