import { useEffect, useMemo } from 'react';
import { Loader as GMapsLoader } from '@googlemaps/js-api-loader';
import VaccineMap, { IVaccinePoint } from './components/VaccineMap';
import { useGetVaccinationStatusesQuery } from './redux/apis';
import { gmapsApiLoaded } from './redux/slices/gmaps';
import { useAppDispatch } from './redux/hooks';
import geocodesJson from './data/geocodes.json';

import styles from './App.module.scss';

interface IGeocodeValue {
  endereco: string;
  latitude: number;
  longitude: number;
}
const geocodes: Record<string, IGeocodeValue> = geocodesJson;

function App() {
  const dispatch = useAppDispatch();

  // Loads the vaccination status query
  const {
    data: vaccineData,
    error,
    isLoading,
  } = useGetVaccinationStatusesQuery('');

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

  const vaccinePoints = useMemo<IVaccinePoint[]>(() => {
    const vps: IVaccinePoint[] = [];

    if (vaccineData) {
      vaccineData.data.forEach((vd) => {
        const geocode = geocodes[vd.equipamento];
        if (geocode) {
          vps.push({
            position: {
              lat: geocode.latitude,
              lng: geocode.longitude,
            },
            title: vd.equipamento,
          });
        }
      });
    }

    return vps;
  }, [vaccineData]);

  return (
    <div className={styles.app}>
      <VaccineMap vaccinePoints={vaccinePoints} />
    </div>
  );
}

export default App;
