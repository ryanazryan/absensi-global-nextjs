import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SiswaPage = () => {
  const [kehadiranData, setKehadiranData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/kehadiran'); 
        setKehadiranData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      {/* Render your component using kehadiranData */}
    </div>
  );
};

export default SiswaPage;
