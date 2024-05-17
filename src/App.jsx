import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./security/Router";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './App.css';

library.add(fas)

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