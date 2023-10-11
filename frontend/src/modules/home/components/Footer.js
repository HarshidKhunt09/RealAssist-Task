import React from 'react';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <div>
      <div className='line mb-8' />
      <div className='d-flex justify-between mb-8'>
        <div className='report-date'>
          Report Generated on {dayjs().format('MMMM D, YYYY')}
        </div>
        <div className='address'>
          RealAssistProperty Report | Page 1
          <span className='total-page'> of 25</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
