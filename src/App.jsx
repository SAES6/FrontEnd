import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./security/Router";
import './App.css';

const App = () => {
  const routing = useRoutes(ThemeRoutes);

  return (
    <>
      <div>
        {routing}
      </div>
    </>
  );
};

export default App;