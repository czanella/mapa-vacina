import { useEffect } from 'react';
import { Loader as GMapsLoader } from '@googlemaps/js-api-loader';
import VaccineMap from './components/VaccineMap';
import {
  gmapsApiLoaded,
  gmapsApiError,
  isGmapsApiErrorSelector,
} from './redux/slices/gmaps';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { useGetVaccinationStatusesQuery } from './redux/apis';

import styles from './App.module.scss';

const REFETCH_INTERVAL: number = parseFloat(
  process.env.REACT_APP_REFETCH_INTERVAL ?? '10'
); // minutes

function App() {
  const dispatch = useAppDispatch();
  const isGmapsApiError = useAppSelector(isGmapsApiErrorSelector);

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
        dispatch(gmapsApiError());
      }
    };

    loadGmaps();
  }, [dispatch]);

  // Fetches the vaccination data and refreshes the data once every 10 minutes
  const { refetch } = useGetVaccinationStatusesQuery('');
  useEffect(() => {
    if (isGmapsApiError) {
      return;
    }

    const intervalId = window.setInterval(
      refetch,
      REFETCH_INTERVAL * 60 * 1000
    );

    return () => window.clearInterval(intervalId);
  }, [isGmapsApiError, refetch]);

  return (
    <div className={styles.app}>
      <div className={styles.header}>Mapa da Vacina</div>
      <VaccineMap />
    </div>
  );
}

export default App;
