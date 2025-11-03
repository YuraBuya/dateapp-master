declare module 'react-simple-maps' {
  import { ComponentType, ReactNode } from 'react';

  export interface ComposableMapProps {
    projectionConfig?: any;
    children?: ReactNode;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    translateExtent?: [[number, number], [number, number]];
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string;
    children: (props: { geographies: any[] }) => ReactNode;
  }

  export interface GeographyProps {
    geography: any;
    style?: any;
    [key: string]: any;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    [key: string]: any;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
}
