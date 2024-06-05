import QuizAdministration from "../../components/admin/create-form/QuizAdministration";
import SideBar from "../../components/admin/layer/SideBar.js";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminGestion from "../admin-gestion/AdminGestion.js";
import Synthese from "../../components/admin/stats/Synthese.jsx";

const AdminConsole = () => {
  const [view, setView] = useState({ quiz: true, stats: false, admin: false });
  const screenSize = useMediaQuery("(min-width:1600px)");

  const handleViewChange = useCallback((newView) => {
    setView(newView);
  }, []);

  console.log("adminconsole");
  return (
    <Grid
      container
      sx={{
        maxWidth: screenSize ? "1500px" : "1300px",
        height: "100%",
        width: "100%",
        alignItems: "start",
        justifyContent: "center",
        alignContent: "start",
        mt: "30px",
      }}
    >
      <Grid item xs={12} gap={1} sx={{ pt: 2, pb: 2, display: "flex" }}>
        <Button
          onClick={() =>
            handleViewChange({ quiz: true, stats: false, admin: false })
          }
          variant="contained"
          color="secondary"
          startIcon={<FontAwesomeIcon icon="fa-fw fa-solid fa-list" />}
          sx={{ opacity: view.quiz ? "100%" : "75%" }}
        >
          Gestion des questionnaires
        </Button>
        <Button
          onClick={() =>
            handleViewChange({ quiz: false, stats: true, admin: false })
          }
          variant="contained"
          color="secondary"
          startIcon={<FontAwesomeIcon icon="fa-fw fa-solid fa-chart-pie" />}
          sx={{ opacity: view.stats ? "100%" : "75%" }}
        >
          Statistiques
        </Button>
        <Button
          onClick={() =>
            handleViewChange({ quiz: false, stats: false, admin: true })
          }
          variant="contained"
          color="secondary"
          startIcon={<FontAwesomeIcon icon="fa-fw fa-solid fa-user-tie" />}
          sx={{
            opacity: view.admin ? "100%" : "75%",
          }}
        >
          Gestion admin
        </Button>
      </Grid>

      <Grid
        item
        container
        spacing={0}
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        {!view.admin && (
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            sx={{ bgcolor: "purple", pt: 1, borderRadius: "15px" }}
          >
            <SideBar />
          </Grid>
        )}

        <Grid
          item
          xs={view.admin ? 12 : 9}
          sm={view.admin ? 12 : 9}
          md={view.admin ? 12 : 9}
          sx={{ pl: view.admin ? 0 : "3rem" }}
        >
          {view.quiz && <QuizAdministration />}
          {view.stats && <Synthese />}
          {view.admin && <AdminGestion />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminConsole;
