import { useEffect, useRef } from 'react';
import { useGetVaccinationStatusesQuery } from '../../redux/apis';
import { useAppSelector } from '../../redux/hooks';
import { isGmapsApiLoadedSelector } from '../../redux/slices/gmaps';
import colors from './colors';
import marker from './marker';

import styles from './VaccineMap.module.scss';

const VaccineMap = () => {
  const { data } = useGetVaccinationStatusesQuery('');
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
    if (!isGmapsLoaded || !data) {
      return;
    }

    const markers = data.map(
      ({ posicao, equipamento, status_fila }) =>
        new google.maps.Marker({
          position: posicao,
          title: equipamento,
          map: map.current,
          icon: {
            ...marker,
            fillColor: colors[status_fila] || '#000',
          },
        })
    );

    return () => {
      markers.forEach((m) => m.setMap(null));
    };
  }, [isGmapsLoaded, data]);

  return <div className={styles.map} ref={mapNode} />;
};

export default VaccineMap;
