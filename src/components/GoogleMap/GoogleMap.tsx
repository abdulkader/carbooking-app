import GoogleMapReact from "google-map-react";
import { FC, useRef } from "react";
import cx from "clsx";
import mapStyles from "./mapStyles.json";

interface GoogleMapProps {
  className?: string;
  onMapLoaded?: (map: any, maps: any) => void;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

export const GoogleMap: FC<GoogleMapProps> = ({
  className = "",
  onMapLoaded,
}) => {
  const mapRef = useRef<any>();
  const defaultProps = {
    center: {
      lat: 24.899377,
      lng: 54.890162,
    },
    zoom: 10,
  };

  const handleApiLoaded = (map: any, maps: any) => {
    onMapLoaded?.(map, maps);
  };
  return (
    <div className={cx("w-full h-full block relative", className)}>
      <GoogleMapReact
        ref={mapRef}
        bootstrapURLKeys={{
          key: GOOGLE_MAPS_API_KEY,
          libraries: ["places"],
        }}
        center={defaultProps.center}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={(maps) => ({
          styles: mapStyles,
          streetViewControl: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
          },
        })}
      ></GoogleMapReact>
    </div>
  );
};
