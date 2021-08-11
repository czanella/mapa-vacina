import { useEffect } from 'react';
import { Loader as GMapsLoader } from '@googlemaps/js-api-loader';
import VaccineMap from './components/VaccineMap';
import { gmapsApiLoaded } from './redux/slices/gmaps';
import { useAppDispatch } from './redux/hooks';

import styles from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  // Loads the Google Maps API
  useEffect(() => {
    const loadGmaps = async () => {
      const loader = new GMapsLoader({
        apiKey: process.env.REACT_APP_GMAPS_KEY ?? '',
        version: 'weekly',
      });

      try {
        await loader.load();
        dispatch(gmapsApiLoaded());
      } catch (err) {
        console.error('Error loading GMaps api', err);
      }
    };

    loadGmaps();
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <VaccineMap />
    </div>
  );
}

export default App;
