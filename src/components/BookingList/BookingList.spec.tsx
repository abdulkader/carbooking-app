import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BookingList } from "./BookingList";
import {
  AppProvider,
  AppContext,
  // SET_SELECTED_CAR,
} from "@/context/AppContext";
import { Car } from "@/types/car";
// import { act } from "react-dom/test-utils";
// import { bookCar, returnCar } from "@/services/api.service";
import { toast } from "react-hot-toast";
import { CARS } from "@/lib/constants";

// Mock services
vi.mock("@/services/api.service");

// const mockedBookCar = vi.fn().mockImplementation(bookCar);
// const mockedReturnCar = vi.fn().mockImplementation(returnCar);

// Mock toast
vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const carsList: Car[] = CARS.map((car, idx) => {
  if (idx === 1 || idx === 2) {
    return {
      ...car,
      available: false,
      bookingName: "John",
      bookedDate: new Date("2022-01-01 11:52:00"),
      returnLocation: null,
    };
  }
  return car;
});

const mockContextValue = {
  appState: {
    carsList,
    selectedCar: null,
    isGoogleMapLoaded: true,
    isLoading: false,
  },
  appDispatch: vi.fn(),
};

const renderWithContext = (component: React.ReactNode) =>
  render(
    <AppProvider>
      <AppContext.Provider value={mockContextValue}>
        {component}
      </AppContext.Provider>
    </AppProvider>
  );

describe("BookingList", () => {
  it("renders list of cars", () => {
    renderWithContext(<BookingList />);

    expect(screen.getByText(carsList[0].model)).toBeInTheDocument();
    expect(screen.getByText(carsList[1].model)).toBeInTheDocument();
  });

  it("displays error when submitting booking without selecting a car", () => {
    renderWithContext(<BookingList />);

    fireEvent.submit(screen.getByTestId("booking-form"));

    expect(toast.error).toHaveBeenCalledWith("Please select a car");
  });

  // it("calls bookCar function with correct data", () => {
  //   renderWithContext(<BookingList />);

  //   act(() => {
  //     mockContextValue.appDispatch({
  //       type: SET_SELECTED_CAR,
  //       payload: carsList[0],
  //     });
  //   });

  //   fireEvent.change(screen.getByTestId("booking-name"), {
  //     target: { value: "John" },
  //   });

  //   fireEvent.submit(screen.getByTestId("booking-form"));

  //   mockedBookCar.mockImplementation((uid, name, callback) => {
  //     callback(carsList);
  //   });

  //   const callback = vi.fn();

  //   expect(mockedBookCar).toHaveBeenCalledWith(
  //     carsList[0].uid,
  //     expect.any(String),
  //     callback
  //   );
  // });

  // it("calls returnCar function with correct data", () => {
  //   const updatedCar = {
  //     ...carsList[1],
  //     returnLocation: { lat: 12.34, lng: 56.78 },
  //   };

  //   act(() => {
  //     mockContextValue.appDispatch({
  //       type: SET_SELECTED_CAR,
  //       payload: updatedCar,
  //     });
  //   });

  //   renderWithContext(<BookingList />);

  //   fireEvent.click(screen.getByText("Return"));

  //   mockedReturnCar.mockImplementation((uid, location, callback) => {
  //     callback(carsList);
  //   });

  //   expect(mockedReturnCar).toHaveBeenCalledWith(
  //     carsList[1].uid,
  //     updatedCar.returnLocation,
  //     expect.any(Function)
  //   );
  // });
});
