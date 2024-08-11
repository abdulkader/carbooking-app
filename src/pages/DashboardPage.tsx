import { BookingList } from "@/components/BookingList";
import { CarsMapList } from "@/components/CarsMapList";

export const DashboardPage = () => {
  return (
    <div className="md:flex w-full min-h-screen h-auto md:justify-between block">
      <div className="w-full md:w-2/5 h-full flex bg-slate-500">
        <CarsMapList />
      </div>
      <div className="w-full md:w-3/5 h-full flex bg-slate-100">
        <BookingList />
      </div>
    </div>
  );
};
