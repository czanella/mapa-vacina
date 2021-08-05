import { useEffect } from 'react';
import { Loader as GMapsLoader } from '@googlemaps/js-api-loader';
import styles from './App.module.scss';
import { useGetVaccinationStatusesQuery } from './redux/apis';

function App() {
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
      } catch (err) {
        console.error('Error loading GMaps api', err);
      }
    };

    loadGmaps();
  }, []);

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
