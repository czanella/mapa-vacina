import { useEffect } from 'react';
import { Loader as GMapsLoader } from '@googlemaps/js-api-loader';
import VaccineMap from './components/VaccineMap';
import { gmapsApiLoaded } from './redux/slices/gmaps';
import { useAppDispatch } from './redux/hooks';
import { useGetVaccinationStatusesQuery } from './redux/apis';

import styles from './App.module.scss';

const REFETCH_LENGTH = 10; // minutes

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

  // Fetches the vaccination data and refreshes the data once every 10 minutes
  const { refetch } = useGetVaccinationStatusesQuery('');
  useEffect(() => {
    const intervalId = window.setInterval(refetch, REFETCH_LENGTH * 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className={styles.app}>
      <VaccineMap />
    </div>
  );
}

export default App;
