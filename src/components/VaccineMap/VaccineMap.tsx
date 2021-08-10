// https://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { isGmapsApiLoadedSelector } from '../../redux/slices/gmaps';

import styles from './VaccineMap.module.scss';

export interface IVaccinePoint {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

interface IVaccineMapProps {
  vaccinePoints?: IVaccinePoint[];
}

const VaccineMap = ({ vaccinePoints }: IVaccineMapProps) => {
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

  // Updates the markers
  useEffect(() => {
    if (!isGmapsLoaded || !vaccinePoints) {
      return;
    }

    const markers = vaccinePoints.map(({ position, title }) => {
      return new google.maps.Marker({ position, title, map: map.current });
    });

    return () => {
      markers.forEach((m) => m.setMap(null));
    };
  }, [isGmapsLoaded, vaccinePoints]);

  return <div className={styles.map} ref={mapNode} />;
};

export default VaccineMap;
