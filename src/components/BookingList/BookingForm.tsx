import { Car } from "@/types/car";
import { type FormEvent, forwardRef } from "react";

interface BookingFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  selectedCar?: Car | null;
  onReturn: () => void;
}

export const BookingForm = forwardRef<HTMLFormElement, BookingFormProps>(
  ({ onSubmit, selectedCar, onReturn }, ref) => {
    return (
      <form
        className="w-full flex justify-between items-center py-3 px-4"
        onSubmit={onSubmit}
        ref={ref}
        id="booking-form"
        data-testid="booking-form"
      >
        <div className="flex items-center justify-start w-fit">
          <label htmlFor="name" className="text-sm px-3 whitespace-nowrap">
            Booking Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 px-3"
            data-testid="booking-name"
          />
        </div>
        <div className="flex items-center justify-start w-fit gap-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:bg-slate-400 disabled:text-slate-300"
            disabled={!selectedCar || !selectedCar.available}
          >
            Rent
          </button>
          <button
            type="button"
            className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:bg-slate-400 disabled:text-slate-300"
            disabled={!selectedCar || selectedCar.available}
            onClick={onReturn}
          >
            Return
          </button>
        </div>
      </form>
    );
  }
);
