import { useEffect } from 'react';
import styles from './App.module.scss';
import geocodes from './data/geocodes.json';
import { useGetVaccinationStatusesQuery } from './redux/apis';

function App() {
  useEffect(() => {
    console.log(geocodes);
  }, []);

  const { data, error, isLoading } = useGetVaccinationStatusesQuery('');

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
