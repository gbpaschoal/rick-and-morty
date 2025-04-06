import * as React from 'react';
import Header from './components/Header';
import Characters from './components/Characters';

export default function App() {
  return (
    <div className='w-full'>
      <div className='fixed top-0 left-0 z-3 w-full'>
        <Header/>
      </div>
      <Characters/>
    </div>

  );
}
