export interface IPosition {
  lat: number;
  lng: number;
}

export interface IMarker {
  title: string;
  position: IPosition;
  icon?: string;
  onClick?: (e: MouseEvent) => void;
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
