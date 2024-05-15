import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./security/Router";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";
import './App.css';

const App = () => {
  const routing = useRoutes(ThemeRoutes);

  return (
    <>

      <ThemeProvider theme={theme}>
        {routing}
      </ThemeProvider>
    </>
  );
};

export default App;