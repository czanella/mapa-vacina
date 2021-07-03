import { useEffect } from 'react';
import styles from './App.module.scss';
import geocodes from './data/geocodes.json';

function App() {
  useEffect(() => {
    console.log(geocodes);
  }, []);

  return (
    <div className={styles.app}>
      Yo!
    </div>
  );
}

export default App;
