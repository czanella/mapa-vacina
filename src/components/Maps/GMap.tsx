import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader as GMapsLoader } from '@googlemaps/js-api-loader';
import { IMapProps } from './types';

import styles from './GMap.module.scss';

const GMap = ({
  apiKey,
  infoWindowsData,
  initialPosition = { lat: 0, lng: 0 },
  markersData,
  onError,
  onReady,
}: IMapProps) => {
  const [isGmapsLoaded, setIsGmapsLoaded] = useState(false);
  const mapNode = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);

  // Loads the GMaps JS Api
  useEffect(() => {
    const loader = new GMapsLoader({
      apiKey,
      version: 'weekly',
    });

    loader
      .load()
      .then(() => {
        setIsGmapsLoaded(true);
        if (onReady) {
          onReady();
        }
      })
      .catch((e: ErrorEvent) => {
        if (onError) {
          onError(e.error);
        }
      });
  }, [apiKey, onError, onReady]);

  // Builds the map as soon as the API is loaded
  const { lat, lng } = initialPosition;

  useEffect(() => {
    if (isGmapsLoaded) {
      map.current = new google.maps.Map(mapNode.current as HTMLDivElement, {
        center: { lat, lng },
        zoom: 10,
        disableDefaultUI: true,
      });
    }
  }, [isGmapsLoaded, lat, lng]);

  // Builds or updates the markers
  useEffect(() => {
    if (!isGmapsLoaded || !markersData) {
      return;
    }

    const markerListeners: google.maps.MapsEventListener[] = [];
    const markers = markersData.map(({ position, title, icon, onClick }) => {
      const markerOptions: google.maps.MarkerOptions = {
        position,
        title,
        map: map.current,
      };

      if (icon) {
        markerOptions.icon = {
          url: icon.url,
          size: icon.size ? new google.maps.Size(...icon.size) : undefined,
          origin: icon.origin
            ? new google.maps.Point(...icon.origin)
            : undefined,
          anchor: icon.anchor
            ? new google.maps.Point(...icon.anchor)
            : undefined,
          scaledSize: icon.scaledSize
            ? new google.maps.Size(...icon.scaledSize)
            : undefined,
        };
      }

      const marker = new google.maps.Marker(markerOptions);

      if (onClick) {
        markerListeners.push(marker.addListener('click', onClick));
      }

      return marker;
    });

    return () => {
      markerListeners.forEach((ml) => ml.remove());
      markers.forEach((m) => {
        m.setMap(null);
        m.unbindAll();
      });
    };
  }, [isGmapsLoaded, markersData]);

  // Builds or updates the info windows
  useEffect(() => {
    if (!isGmapsLoaded || !infoWindowsData) {
      return;
    }

    const infoWindows = infoWindowsData.map(({ position, content, offset }) => {
      const infoWindowOptions: google.maps.InfoWindowOptions = {
        position: new google.maps.LatLng(position),
        content,
      };

      if (offset) {
        infoWindowOptions.pixelOffset = new google.maps.Size(...offset);
      }

      const infoWindow = new google.maps.InfoWindow(infoWindowOptions);

      infoWindow.open({ map: map.current });

      return infoWindow;
    });

    return () => {
      infoWindows.forEach((infoWindow) => {
        infoWindow.close();
        infoWindow.unbindAll();
      });
    };
  }, [isGmapsLoaded, infoWindowsData]);

  // Gets the user's GPS coordinates
  const onGpsClick = useCallback(() => {
    if (!map.current) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        map.current?.panTo(new google.maps.LatLng({ lat, lng }));
        map.current?.setZoom(14);
      },
      (err) => {
        let errorMessage: string;

        if (err.code === 1) {
          errorMessage =
            'Você proibiu o acesso do Mapa Vacina à sua localização. Por favor, restore esta permissão e tente novamente.';
        } else {
          errorMessage =
            'Não foi possível obter sua localização. Por favor, tente novamente mais tarde.';
        }

        window.alert(errorMessage);
      }
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.gmap} ref={mapNode} />
      {isGmapsLoaded && 'geolocation' in navigator ? (
        <button className={styles.gpsButton} onClick={onGpsClick} />
      ) : null}
    </div>
  );
};

export default GMap;
