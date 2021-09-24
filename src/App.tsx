import { useEffect } from 'react';
import Header from './components/Header';
import VaccineMap from './components/VaccineMap';
import AboutModal from './components/AboutModal';
import { useGetVaccinationStatusesQuery } from './redux/apis';

import styles from './App.module.scss';

const REFETCH_INTERVAL: number = parseFloat(
  process.env.REACT_APP_REFETCH_INTERVAL ?? '10'
); // minutes

const App = () => {
  // Fetches the vaccination data and refreshes the data once every 10 minutes
  const { refetch } = useGetVaccinationStatusesQuery('');
  useEffect(() => {
    const intervalId = window.setInterval(
      refetch,
      REFETCH_INTERVAL * 60 * 1000
    );

    return () => window.clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className={styles.app}>
      <Header />
      <VaccineMap />
      <AboutModal />
    </div>
  );
};

export default App;
