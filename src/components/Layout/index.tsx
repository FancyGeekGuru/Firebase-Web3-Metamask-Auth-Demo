import React from 'react';
import './index.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='background-main-color d-flex flex-column flex-fill wrapper'>
      <main className='d-flex flex-column flex-grow-1'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
