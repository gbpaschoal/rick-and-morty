import React from 'react';
import SearchResults from './SearchResults';
import OverlayModal from '../OverlayModal';
import * as Icon from '@/assets/icons';
import { getAllCharacters } from '@/services/rick-and-morty.api';

export default function SearchModal({ onClose, isOpen }) {
  const [charactersList, setCharactersList] = React.useState<ICharacter[]>([]);
  const controllerRef = React.useRef<AbortController | null>(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchCharactersByQuery = async (q: string): Promise<void> => {
    controllerRef.current && controllerRef.current.abort();

    if (q.trim() === '') {
      setCharactersList([]);
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const { results } = await getAllCharacters(
        `?name=${q}`,
        controller.signal
      );
      if (results) setCharactersList(results);
    } catch (error) {
      setCharactersList([]);
    }
  };

  const delayedFetchCharacters = debounce(fetchCharactersByQuery, 400);

  React.useEffect(() => {
    if (isOpen && document.body.style.overflowY !== 'hidden') {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <OverlayModal>
      <div
        onClick={onClose}
        className="absolute -z-1 backdrop-blur-2xl w-full h-screen"
        aria-expanded={isOpen}></div>
      <div
        className="mt-[3rem] w-full max-w-xl
      max-h-[400px] bg-gray-800 rounded-xl border-2
      border-gray-500/50 flex flex-col">
        <div className="w-full border-b-2 border-gray-500/50 px-4">
          <form>
            <div className="flex items-center">
              <div className="w-full flex items-center gap-x-2">
                <Icon.Search className="mt-[1px] fill-gray-200" />
                <input
                  onChange={(e) => delayedFetchCharacters(e.target.value)}
                  className="w-full h-14 outline-none border-none bg-transparent flex-1 text-light-100 placeholder:text-light-300/60"
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
        <SearchResults results={charactersList} />
      </div>
    </OverlayModal>
    // <div className="fixed inset-0 z-4 flex flex-col items-center px-4">
    // </div>
  );
}
