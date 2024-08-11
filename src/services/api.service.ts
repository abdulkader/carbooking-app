import { CARS, CARS_BOOKING_KEY } from "@/lib/constants";
import { localStore } from "@/lib/localStore";
import { Car, LocationLatLng } from "@/types/car";

export const getCars = () => {
  // mocking API to get cars with updated data
  // will be replaced with real API once it's ready
  const carsList = localStore.getItem(CARS_BOOKING_KEY);
  if (carsList) {
    return carsList;
  }
  localStore.setItem(CARS_BOOKING_KEY, CARS);
  // by default return mock initial data
  return CARS;
};

export const bookCar = (
  carUId: string,
  bookingName: string,
  callback: (data: any) => void
) => {
  // mocking API to book car with updated data
  // will be replaced with real API once it's ready
  const carsList = localStore.getItem(CARS_BOOKING_KEY) || CARS;
  if (carsList) {
    const updatedCarsList = carsList.map((car: Car) => {
      if (car.uid === carUId) {
        return {
          ...car,
          bookingName,
          available: false,
          bookingStartDate: new Date(),
        };
      }
      return car;
    });
    localStore.setItem(CARS_BOOKING_KEY, updatedCarsList);
    callback(updatedCarsList);
  }
};

export const returnCar = (
  carUId: string,
  newCarLocation: LocationLatLng,
  callback: (data: any) => void
) => {
  // mocking API to book car with updated data
  // will be replaced with real API once it's ready
  const carsList = localStore.getItem(CARS_BOOKING_KEY) || CARS;
  if (carsList) {
    const updatedCarsList = carsList.map((car: Car) => {
      if (car.uid === carUId) {
        return {
          ...car,
          bookingName: null,
          available: true,
          bookingStartDate: null,
          bookingEndDate: new Date(),
          currentLocation: newCarLocation,
        };
      }
      return car;
    });
    localStore.setItem(CARS_BOOKING_KEY, updatedCarsList);
    callback(updatedCarsList);
  }
};
