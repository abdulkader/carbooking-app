import { AppProvider } from "./context/AppContext";
import { DashboardPage } from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <div className="w-full h-auto min-h-screen flex flex-1 overflow-x-hidden">
      <AppProvider>
        <DashboardPage />
      </AppProvider>
      <Toaster position="bottom-right" /> 
    </div>
  );
};
