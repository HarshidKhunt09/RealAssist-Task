import React, { useState } from 'react';
import '../home.css';
import { ReactComponent as PrintIcon } from '../../../assets/printer.svg';
import api from '../../../lib/axios';

const Home = () => {
  const [loading, setLoading] = useState(false);

  const handlePrint = () => {
    if (!loading) {
      setLoading(true);
      api
        .get('pdf', {
          responseType: 'blob',
        })
        .then((response) => {
          const blobUrl = window.URL.createObjectURL(response?.data);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = 'Report.pdf';
          a.click();
          window.URL.revokeObjectURL(blobUrl);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error fetching data:', error);
        });
    }
  };

  return (
    <>
      <div className='print-page d-flex align-center justify-center'>
        <button
          className='print d-flex align-center justify-center'
          onClick={handlePrint}
        >
          {loading ? (
            'Loading...'
          ) : (
            <>
              <PrintIcon className='mr-8' />
              Print
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Home;
