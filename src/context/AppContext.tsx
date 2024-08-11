import { getCars } from "@/services/api.service";
import { Car } from "@/types/car";

import {
  createContext,
  type ReactNode,
  useContext,
  useReducer,
  useEffect,
  type Dispatch,
} from "react";

export const INITIAL_STATE = {
  carsList: [],
  isLoading: false,
  isGoogleMapLoaded: false,
  selectedCar: null,
};

type AppContextProps = {
  carsList: Car[];
  isLoading: boolean;
  isGoogleMapLoaded: boolean;
  selectedCar: Car | null;
};

type AppStateActionProps = {
  type: string;
  payload: any;
};

type AppContextType = {
  appState: AppContextProps;
  appDispatch: Dispatch<AppStateActionProps>;
};

export const AppContext = createContext<AppContextType>({
  appState: INITIAL_STATE,
  appDispatch: () => null,
});

export const FETCH_CARS_LIST = "FETCH_CARS_LIST";
export const IS_GOOGLE_MAP_LOADED = "IS_GOOGLE_MAP_LOADED";
export const SET_SELECTED_CAR = "SET_SELECTED_CAR";
const appReducer = (state: AppContextProps, action: AppStateActionProps) => {
  switch (action.type) {
    case FETCH_CARS_LIST:
      return {
        ...state,
        isLoading: false,
        carsList: action.payload,
      };
    case IS_GOOGLE_MAP_LOADED:
      return {
        ...state,
        isGoogleMapLoaded: action.payload,
      };
    case SET_SELECTED_CAR:
      return {
        ...state,
        selectedCar: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appState, appDispatch] = useReducer(appReducer, INITIAL_STATE);

  useEffect(() => {
    const cars = getCars();
    appDispatch({ type: FETCH_CARS_LIST, payload: cars });
  }, []);
  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
