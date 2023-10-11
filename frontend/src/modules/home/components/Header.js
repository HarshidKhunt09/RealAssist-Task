import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

const Header = () => {
  return (
    <div>
      <div className='d-flex justify-between mb-8'>
        <div>
          <Logo width={92} height={16} />
        </div>
        <div className='address'>123 Main Street, Dover, NH 03820-46678</div>
      </div>
      <div className='line' />
    </div>
  );
};

export default Header;
