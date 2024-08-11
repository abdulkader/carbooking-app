import { Car } from "@/types/car";
import cx from "clsx";
import { FC } from "react";
import dayjs from "dayjs";

interface ListItemProps {
  car: Car;
  onSelect: (car: Car) => void;
  selectedCar?: Car | null;
}

export const ListItem: FC<ListItemProps> = ({ car, onSelect, selectedCar }) => {
  return (
    <tr
      className={cx("border-b cursor-pointer", {
        "bg-slate-400 text-white": selectedCar?.uid === car.uid,
        "bg-white": selectedCar?.uid !== car.uid,
      })}
      key={car.uid}
      onClick={() => onSelect(car)}
    >
      <td className="py-4 px-6">{car.model}</td>
      <td className="py-4 px-6">{car.brand}</td>
      <td className="py-4 px-6">{car.available ? "Yes" : "No"}</td>
      <td className="py-4 px-6">{car.bookingName ? car.bookingName : "-"}</td>
      <td className="py-4 px-6">
        {car.bookingStartDate
          ? dayjs(car.bookingStartDate).format("DD.MM.YYYY hh:mm:ss A")
          : "-"}
      </td>
      <td className="py-4 px-6 whitespace-nowrap">
        {`${car.currentLocation.lat},${car.currentLocation.lng}`}
      </td>
      <td className="py-4 px-6">
        {`${car.baseLocation.lat},${car.baseLocation.lng}`}
      </td>
    </tr>
  );
};
