import { useState, useEffect } from 'react';

const API_BASE_URL = '/backend'; // Using relative path for HTTPS compatibility

export function useSiteData() {
  const [data, setData] = useState({
    settings: {
      phone_number: '+917970147690',
      email: 'apexstructureconsultant@gmail.com',
      address: 'Gwalior, Madhya Pradesh, India',
      whatsapp: '+917970147690'
    },
    services: [],
    reviews: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_site_data.php`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(json => {
        if (json.status === 'success') {
          setData({
            settings: json.settings || {},
            services: json.services || [],
            reviews: json.reviews || [],
            loading: false,
            error: null
          });
        } else {
          throw new Error(json.message || 'Unknown API error');
        }
      })
      .catch(err => {
        console.error('Error fetching site data:', err);
        setData(prev => ({ ...prev, loading: false, error: err.message }));
      });
  }, []);

  return data;
}
