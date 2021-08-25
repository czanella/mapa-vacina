export interface IPosition {
  lat: number;
  lng: number;
}

export interface IMapIcon {
  url: string;
  size?: [number, number];
  origin?: [number, number];
  anchor?: [number, number];
  scaledSize?: [number, number];
}

export interface IMarker {
  title: string;
  position: IPosition;
  icon?: IMapIcon;
  onClick?: () => void;
}

export interface IInfoWindow {
  content: string;
  position: IPosition;
  onClose?: (e: MouseEvent) => void;
}

export interface IMapProps {
  apiKey: string;
  initialPosition?: IPosition;
  infoWindowsData?: IInfoWindow[];
  markersData?: IMarker[];
  onError?: (e: Error) => void;
  onReady?: () => void;
}
