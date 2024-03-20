import { useState } from 'react';

export const useError = (Error) => {
  const [error, setError] = useState();

  setError(Error);

  return error;
};
