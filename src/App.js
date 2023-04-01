import "./App.css";
import AppRoutes from "./routes/AppRoutes/AppRoutes";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App({children}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRoutes/>
  </LocalizationProvider>
  );
}
