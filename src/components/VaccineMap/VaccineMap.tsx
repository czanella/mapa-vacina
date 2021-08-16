import { useEffect, useMemo, useRef } from 'react';
import LoadingMessage from '../LoadingMessage';
import { useGetVaccinationStatusesQuery } from '../../redux/apis';
import { useAppSelector } from '../../redux/hooks';
import {
  isGmapsApiLoadedSelector,
  isGmapsApiErrorSelector,
} from '../../redux/slices/gmaps';
import icons from './icons';

import styles from './VaccineMap.module.scss';

const VaccineMap = () => {
  const { data, isLoading: loadingVaccineData } =
    useGetVaccinationStatusesQuery('');
  const isGmapsLoaded = useAppSelector(isGmapsApiLoadedSelector);
  const isGmapsApiError = useAppSelector(isGmapsApiErrorSelector);
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
        disableDefaultUI: true,
      });
    }
  }, [isGmapsLoaded]);

  // Converts the marker images to GMaps Icons
  const markerIcons = useMemo(() => {
    if (!isGmapsLoaded) {
      return null;
    }

    const mi: Record<string, google.maps.Icon> = {};
    Object.keys(icons).forEach((iconKey) => {
      mi[iconKey] = {
        url: icons[iconKey],
        size: new google.maps.Size(110, 210),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(11, 42),
        scaledSize: new google.maps.Size(22, 42),
      };
    });

    return mi;
  }, [isGmapsLoaded]);

  // Updates the markers
  useEffect(() => {
    if (!markerIcons || !data) {
      return;
    }

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
  }, [markerIcons, data]);

  // Should we display a loading message?
  let loadingMessage: string = '';

  if (!isGmapsLoaded && !isGmapsApiError) {
    loadingMessage = 'Carregando mapa...';
  } else if (loadingVaccineData) {
    loadingMessage = 'Carregando dados dos postos de vacinação...';
  }

  return (
    <div className={styles.mapContainer}>
      <div className={styles.map} ref={mapNode} />
      {loadingMessage ? (
        <LoadingMessage className={styles.message} message={loadingMessage} />
      ) : null}
    </div>
  );
};

export default VaccineMap;
