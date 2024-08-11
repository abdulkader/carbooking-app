import {
  FETCH_CARS_LIST,
  SET_SELECTED_CAR,
  useAppContext,
} from "@/context/AppContext";
import { bookCar, returnCar } from "@/services/api.service";
import { Car } from "@/types/car";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { ListItem } from "./ListItem";
import { BookingForm } from "./BookingForm";

export const BookingList = () => {
  const { appState, appDispatch } = useAppContext();
  const { carsList, selectedCar } = appState;
  const formRef = useRef<HTMLFormElement>(null);

  const handleRowSelect = (car: Car) => {
    // Set the return location to null initially
    appDispatch({
      type: SET_SELECTED_CAR,
      payload: { ...car, returnLocation: null },
    });
  };

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookingName = formData.get("name") as string;
    if (!selectedCar) {
      toast.error("Please select a car");
      return;
    }
    if (!selectedCar.available) {
      toast.error("Car is not available");
      return;
    }
    if (!bookingName.trim()) {
      toast.error("Please enter a name for the booking");
      return;
    }
    bookCar(selectedCar.uid, bookingName, (updatedData) => {
      appDispatch({ type: SET_SELECTED_CAR, payload: null });
      toast.success("Booking successful");
      appDispatch({ type: FETCH_CARS_LIST, payload: updatedData });
      formRef.current?.reset();
    });
  };

  const handleReturnClick = () => {
    const car = appState.selectedCar;
    if (!car) {
      toast.error("Please select a car");
      return;
    }
    if (
      !car.returnLocation ||
      !car.returnLocation?.lat ||
      !car.returnLocation?.lng
    ) {
      toast.error(
        "Please select a return location by selecting a point on the map"
      );
      return;
    }
    returnCar(car.uid, car.returnLocation, (updatedData) => {
      appDispatch({ type: SET_SELECTED_CAR, payload: null });
      toast.success(
        `Car returned successfully. Thank you for your booking ${car.bookingName}`
      );
      appDispatch({ type: FETCH_CARS_LIST, payload: updatedData });
      formRef.current?.reset();
    });
  };
  return (
    <div className="block w-full max-w-full overflow-auto">
      <div className="overflow-auto relative shadow-md sm:rounded-lg block w-full">
        <div className="overflow-auto relative shadow-md sm:rounded-lg block w-full">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 whitespace-nowrap">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Car Model
                </th>
                <th scope="col" className="py-3 px-6">
                  Car Vendor
                </th>
                <th scope="col" className="py-3 px-6">
                  Available
                </th>
                <th scope="col" className="py-3 px-6">
                  Booked By
                </th>
                <th scope="col" className="py-3 px-6">
                  Booked Date
                </th>
                <th scope="col" className="py-3 px-6">
                  Location
                </th>
                <th scope="col" className="py-3 px-6">
                  Base Location
                </th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {carsList.map((car) => {
                return (
                  <ListItem
                    key={car.uid}
                    car={car}
                    onSelect={handleRowSelect}
                    selectedCar={selectedCar}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <BookingForm
        onSubmit={handleBookingSubmit}
        selectedCar={selectedCar}
        onReturn={handleReturnClick}
        ref={formRef}
      />
    </div>
  );
};
