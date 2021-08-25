import { useCallback, useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import GMap from '../Maps/GMap';
import LoadingMessage from '../LoadingMessage';
import { useGetVaccinationStatusesQuery } from '../../redux/apis';
import { icons, iconGeometry } from './icons';
import ErrorMessage from '../ErrorMessage';
import { IVaccinePoint } from '../../types';
import { IInfoWindow } from '../Maps/types';

import styles from './VaccineMap.module.scss';
import VaccinePointBox from '../VaccinePointBox';

const buildContent = (data: IVaccinePoint) => {
  return renderToStaticMarkup(<VaccinePointBox data={data} />);
};

const VaccineMap = () => {
  const {
    data,
    isLoading: loadingVaccineData,
    error: vaccineDataError,
  } = useGetVaccinationStatusesQuery('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [isMapApiError, setIsMapApiError] = useState(false);
  const [infoWindow, setInfoWindow] = useState<IInfoWindow | null>(null);

  // Builds/updates the markers data
  const markersData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return data.map((vaccinePoint) => ({
      position: vaccinePoint.posicao,
      title: vaccinePoint.equipamento,
      icon: icons[vaccinePoint.status_fila],
      onClick: () => {
        setInfoWindow({
          content: buildContent(vaccinePoint),
          position: vaccinePoint.posicao,
          offset: [0, -iconGeometry.scaledSize[1] - 5],
          onClose: () => setInfoWindow(null),
        });
      },
    }));
  }, [data]);

  // Callbacks for the GMap component
  const onReady = useCallback(() => {
    setIsMapReady(true);
  }, []);

  const onError = useCallback(() => {
    setIsMapApiError(true);
  }, []);

  // Should we display a loading message?
  let loadingMessage: string = '';

  if (!isMapReady && !isMapApiError) {
    loadingMessage = 'Carregando mapa...';
  } else if (loadingVaccineData) {
    loadingMessage = 'Carregando dados dos postos de vacinação...';
  }

  // Should we display an error message?
  let errorMessage: string = '';

  if (isMapApiError) {
    errorMessage =
      'Erro ao carregar mapa. Por favor, tente novamente mais tarde.';
  } else if (vaccineDataError) {
    errorMessage =
      'Erro ao carregar dados dos postos de vacinação. Por favor, tente novamente mais tarde.';
  }

  return (
    <div className={styles.mapContainer}>
      <GMap
        apiKey={process.env.REACT_APP_GMAPS_KEY ?? ''}
        initialPosition={{
          lat: -23.533773,
          lng: -46.62529,
        }}
        markersData={markersData}
        infoWindowsData={infoWindow ? [infoWindow] : undefined}
        onReady={onReady}
        onError={onError}
      />
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
