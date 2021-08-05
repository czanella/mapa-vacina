import { useEffect } from 'react';
import { Loader as GMapsLoader } from '@googlemaps/js-api-loader';
import styles from './App.module.scss';
import { useGetVaccinationStatusesQuery } from './redux/apis';
import { gmapsApiLoaded } from './redux/slices/gmaps';
import { useAppDispatch } from './redux/hooks';

function App() {
  const dispatch = useAppDispatch();

  // Loads the vaccination status query
  const { data, error, isLoading } = useGetVaccinationStatusesQuery('');

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
      <p>
        {isLoading ? 'Loading...' : null}
        {error ? `Error! ${error}` : null}
        {data ? JSON.stringify(data, null, 2) : null}
      </p>
    </div>
  );
}

export default App;
