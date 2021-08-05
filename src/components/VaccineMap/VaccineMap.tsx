import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { isGmapsApiLoadedSelector } from '../../redux/slices/gmaps';

import styles from './VaccineMap.module.scss';

const VaccineMap = () => {
  const isGmapsLoaded = useAppSelector(isGmapsApiLoadedSelector);
  const mapNode = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);

  // Builds the map
  useEffect(() => {
    if (isGmapsLoaded) {
      map.current = new google.maps.Map(mapNode.current as HTMLDivElement, {
        center: {
          lat: -23.533773,
          lng: -46.62529,
        },
        zoom: 10,
      });
    }
  }, [isGmapsLoaded]);

  return <div className={styles.map} ref={mapNode} />;
};

export default VaccineMap;
