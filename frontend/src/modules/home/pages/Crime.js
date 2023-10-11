import React from 'react';
import Header from '../components/Header';
import LineChart from '../components/LineChart';
import { ReactComponent as LocationIcon } from '../../../assets/location-share.svg';
import Footer from '../components/Footer';

const Crime = () => {
  return (
    <div className='page' style={{ position: 'relative' }}>
      <div className='content'>
        <Header />
        <div className='d-flex align-center mt-40'>
          <LocationIcon className='mr-4' />
          <div className='mr-8 crime-title'>Crime</div>
          <div className='line' />
        </div>
        <div className='burglary-container mt-18'>
          <div className='burglary'>Burglary</div>
        </div>
        <div className='chart-container d-flex justify-center align-center'>
          <LineChart />
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Crime;
