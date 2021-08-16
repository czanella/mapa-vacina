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
import ErrorMessage from '../ErrorMessage';

const VaccineMap = () => {
  const {
    data,
    isLoading: loadingVaccineData,
    error: vaccineDataError,
  } = useGetVaccinationStatusesQuery('');
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

  // Builds/updates the markers
  const markers = useMemo(() => {
    if (!markerIcons || !data) {
      return null;
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

    return markers;
  }, [markerIcons, data]);

  useEffect(() => {
    if (!markers) {
      return;
    }

    markers.forEach((m) => m.setMap(map.current));

    return () => {
      markers.forEach((m) => m.setMap(null));
    };
  }, [markers]);

  // Should we display a loading message?
  let loadingMessage: string = '';

  if (!isGmapsLoaded && !isGmapsApiError) {
    loadingMessage = 'Carregando mapa...';
  } else if (loadingVaccineData) {
    loadingMessage = 'Carregando dados dos postos de vacinação...';
  }

  // Should we display an error message?
  let errorMessage: string = '';

  if (isGmapsApiError) {
    errorMessage =
      'Erro ao carregar mapa. Por favor, tente novamente mais tarde.';
  } else if (vaccineDataError) {
    errorMessage =
      'Erro ao carregar dados dos postos de vacinação. Por favor, tente novamente mais tarde.';
  }

  return (
    <div className={styles.mapContainer}>
      <div className={styles.map} ref={mapNode} />
      {loadingMessage && !errorMessage ? (
        <LoadingMessage className={styles.message} message={loadingMessage} />
      ) : null}
      {errorMessage ? (
        <ErrorMessage className={styles.message} message={errorMessage} />
      ) : null}
    </div>
  );
};

export default VaccineMap;
