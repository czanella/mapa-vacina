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

    const markers = markersData.map((markerData) => {
      const { position, title, icon } = markerData;

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

      return new google.maps.Marker(markerOptions);
    });

    const markerListeners = markersData.map((markerData, i) =>
      markers[i].addListener('click', () => {
        map.current?.panTo(markerData.position);
        if (markerData.onClick) {
          markerData.onClick(markerData);
        }
      })
    );

    return () => {
      markerListeners.forEach((ml) => ml.remove());
      markers.forEach((m) => m.setMap(null));
    };
  }, [isGmapsLoaded, markersData]);

  return <div className={styles.gmap} ref={mapNode} />;
};

export default GMap;
