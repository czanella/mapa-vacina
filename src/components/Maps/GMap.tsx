import { useEffect, useRef, useState } from 'react';
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
    setIsGmapsLoaded(true);
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
      const marker = new google.maps.Marker({
        position,
        title,
        map: map.current,
        icon,
      });

      if (onClick) {
        markerListeners.push(marker.addListener('click', onClick));
      }

      return marker;
    });

    return () => {
      markerListeners.forEach((ml) => ml.remove());
      markers.forEach((m) => m.setMap(null));
    };
  }, [isGmapsLoaded, markersData]);

  return <div className={styles.gmap} ref={mapNode} />;
};

export default GMap;
