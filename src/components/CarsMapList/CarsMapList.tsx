import { GoogleMap } from "@/components/GoogleMap";
import {
  IS_GOOGLE_MAP_LOADED,
  SET_SELECTED_CAR,
  useAppContext,
} from "@/context/AppContext";
import { useEffect, useMemo, useRef } from "react";

export const CarsMapList = () => {
  const { appState, appDispatch } = useAppContext();
  const gmapRef = useRef<any>();
  const gMapsRef = useRef<any>();
  const gMarkersRef = useRef<any>([]);
  const currentInfoWindow = useRef<any>(null);
  const currentlySelectedCar = useRef<any>(null);
  const availableCars = useMemo(
    () => appState.carsList.filter((car) => car.available),
    [appState.carsList]
  );
  const selectedCarInfo: any = useMemo(() => {
    currentlySelectedCar.current = appState.selectedCar;
    if (appState.selectedCar) {
      return gMarkersRef.current.find(
        (car: any) => car.uid === appState.selectedCar?.uid
      );
    }
    return null;
  }, [appState.selectedCar]);

  const handleMapLoaded = (map: any, maps: any) => {
    gMapsRef.current = maps;
    gmapRef.current = map;
    appDispatch({ type: IS_GOOGLE_MAP_LOADED, payload: true });
    // Add a click event listener on the map
    gMapsRef.current.event.addListener(map, "click", function (event: any) {
      // Get the latitude and longitude of the clicked point
      if (
        !currentlySelectedCar.current ||
        currentlySelectedCar.current.available
      ) {
        return;
      }
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const selectedCarData = currentlySelectedCar.current;
      selectedCarData.returnLocation = {
        lat,
        lng,
      };
      appDispatch({ type: SET_SELECTED_CAR, payload: selectedCarData });
    });
  };

  const closeAllInfoWindows = () => {
    gMarkersRef.current.forEach((car: any) => {
      car.infowindow.close();
    });
  };

  const clearAllMarkers = () => {
    gMarkersRef.current.forEach((car: any) => {
      car.marker.setMap(null);
    });
  };

  useEffect(() => {
    closeAllInfoWindows();
    if (selectedCarInfo) {
      selectedCarInfo?.infowindow.open(
        gmapRef.current,
        selectedCarInfo?.marker
      );
    }
  }, [selectedCarInfo]);

  useEffect(() => {
    if (gmapRef.current && gMapsRef.current) {
      closeAllInfoWindows();
      clearAllMarkers();
      gMarkersRef.current = [];
      availableCars.forEach((car) => {
        const marker = new gMapsRef.current.Marker({
          position: car.currentLocation,
          map: gmapRef.current,
          title: car.name,
          icon: {
            url: car.image,
            scaledSize: new gMapsRef.current.Size(48, 48),
            anchor: new gMapsRef.current.Point(16, 48),
          },
        });
        const infowindow = new gMapsRef.current.InfoWindow({
          content: `<h1 class="text-lg block font-medium">${car.name}</h1><p class="text-sm block">${car.brand} - ${car.model}</p>`,
        });
        gMapsRef.current.event.addListener(marker, "click", function () {
          // Close the other info window if its open
          if (currentInfoWindow.current) {
            currentInfoWindow.current.close();
          }
          currentInfoWindow.current = infowindow;
          infowindow.open(gmapRef.current, marker);
          appDispatch({ type: SET_SELECTED_CAR, payload: car });
        });
        gMarkersRef.current.push({
          uid: car.uid,
          marker,
          infowindow,
        });
        infowindow.addListener("closeclick", () => {
          // Handle the close click event on the info window
          appDispatch({ type: SET_SELECTED_CAR, payload: null });
        });
      });
    }
  }, [availableCars, appState.isGoogleMapLoaded, appDispatch]);
  return <GoogleMap className="w-full h-full" onMapLoaded={handleMapLoaded} />;
};
