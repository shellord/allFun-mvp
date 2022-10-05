import React, { PropsWithChildren } from 'react';

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex h-[100vh] justify-center items-center'>{children}</div>
  );
};

export default Container;
