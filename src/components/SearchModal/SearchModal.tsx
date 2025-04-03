import React from 'react';
import OverlayModal from '../OverlayModal';
import SearchResults from './SearchResults';
import * as Icon from './../../assets/icons';
import { getAllCharacters } from './../../services/rick-and-morty.api';
import { ICharacter } from './../../types/Characters';
import _ from 'lodash';

export default function SearchModal({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) {
  const [charactersList, setCharactersList] = React.useState<ICharacter[]>([]);
  const [q, setQ] = React.useState('');
  const [error, setError] = React.useState<null | string>(null);

  const inputSearchRef = React.useRef<null | HTMLInputElement>(null);
  const controllerRef = React.useRef<AbortController | null>(null);

  const fetchCharactersByQuery = async (q: string): Promise<void> => {
    controllerRef.current && controllerRef.current.abort();

    if (q.trim() === '') {
      setCharactersList([]);
      setError(null);
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
      setError(q);
    }
  };

  const delayedFetchCharacters = _.debounce(fetchCharactersByQuery, 250);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    delayedFetchCharacters(q);
  }, [q]);

  return (
    <OverlayModal isOpen={isOpen} onClose={onClose}>
      <div
        className="mt-12 w-full max-w-xl
      max-h-[400px] bg-gray-800 rounded-xl border-2
      border-gray-500/50 flex flex-col">
        <div className="w-full border-b-2 border-gray-500/50 px-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center">
              <div className="w-full flex items-center gap-x-2">
                <Icon.Search className="mt-[1px] fill-gray-200" />
                <input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                  }}
                  className="w-full h-14 outline-none border-none bg-transparent flex-1 text-light-100 placeholder:text-light-300/60"
                  type="text"
                  placeholder="Search Characters"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setQ('')}
                type="button"
                role="button"
                aria-label="Clear Input"
                aria-controls="search input"
                title="Clear">
                <Icon.Close className="fill-gray-200 hover:fill-light-200" />
              </button>
            </div>
          </form>
        </div>
        <div className="w-full h-[300px] pb-5 flex flex-col justify-center items-center">
          {error && charactersList.length === 0 && (
            <span className="text-lg text-light-100/60 inline-flex gap-x-1">
              Not found: <h2 className="text-lg text-light-200">"{error}"</h2>
            </span>
          )}
          {charactersList.length > 0 && (
            <SearchResults results={charactersList} />
          )}
        </div>
      </div>
    </OverlayModal>
  );
}
