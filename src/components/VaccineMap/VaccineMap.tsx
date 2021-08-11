import { useEffect, useRef } from 'react';
import { useGetVaccinationStatusesQuery } from '../../redux/apis';
import { useAppSelector } from '../../redux/hooks';
import { isGmapsApiLoadedSelector } from '../../redux/slices/gmaps';
import icons from './icons';

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

    const markerIcons: Record<string, google.maps.Icon> = {};
    Object.keys(icons).forEach((iconKey) => {
      markerIcons[iconKey] = {
        url: icons[iconKey],
        size: new google.maps.Size(110, 210),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(11, 42),
        scaledSize: new google.maps.Size(22, 42),
      };
    });

    const markers = data.map(
      ({ posicao, equipamento, status_fila }) =>
        new google.maps.Marker({
          position: posicao,
          title: equipamento,
          map: map.current,
          icon: markerIcons[status_fila],
        })
    );

    return () => {
      markers.forEach((m) => m.setMap(null));
    };
  }, [isGmapsLoaded, data]);

  return <div className={styles.map} ref={mapNode} />;
};

export default VaccineMap;
