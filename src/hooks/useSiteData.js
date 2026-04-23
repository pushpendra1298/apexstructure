import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://118.139.160.194/backend'; // Adjust based on your environment

export function useSiteData() {
  const [data, setData] = useState({
    settings: {
      phone_number: '+917970147690',
      email: 'apexstructureconsultant@gmail.com',
      address: 'Gwalior, Madhya Pradesh, India',
      whatsapp: '+917970147690'
    },
    services: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_site_data.php`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          setData({
            settings: json.settings,
            services: json.services,
            loading: false,
            error: null
          });
        } else {
          setData(prev => ({ ...prev, loading: false, error: json.message }));
        }
      })
      .catch(err => {
        console.error('Error fetching site data:', err);
        setData(prev => ({ ...prev, loading: false, error: 'Connection error' }));
      });
  }, []);

  return data;
}
