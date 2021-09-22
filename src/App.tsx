import { useEffect } from 'react';
import Header from './components/Header';
import VaccineMap from './components/VaccineMap';
import CookieConsent from './components/CookieConsent';
import { useGetVaccinationStatusesQuery } from './redux/apis';
import { useAppSelector } from './redux/hooks';
import { hasCookieConsentSelector } from './redux/slices/cookieConsent';

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

  // Activates analytics if user gives consent
  const hasConsent = useAppSelector(hasCookieConsentSelector);
  useEffect(() => {
    if (!hasConsent) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_ANALYTICS_KEY}`;
    document.head.appendChild(script);

    gtag('js', new Date());
    gtag('config', process.env.REACT_APP_ANALYTICS_KEY ?? '');
  }, [hasConsent]);

  return (
    <div className={styles.app}>
      <Header />
      <VaccineMap />
      <CookieConsent />
    </div>
  );
};

export default App;
