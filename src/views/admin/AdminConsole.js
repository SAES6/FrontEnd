import QuizAdministration from "../../components/admin/create-form/QuizAdministration";
import SideBar from "../../components/admin/layer/SideBar.js";
import { Button, Grid, useMediaQuery, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminGestion from "../admin-gestion/AdminGestion.js";

const ColorButtonPrimary = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transition: "ease 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const AdminConsole = () => {
  const [view, setView] = useState({ quiz: true, stats: false, admin: false });
  const screenSize = useMediaQuery("(min-width:1600px)");
  // todo endpoint to bd
  const loadedPageInfos = [];

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
      <Grid item xs={12} sx={{ pt: 2, pb: 2, display: "flex" }}>
        <ColorButtonPrimary
          onClick={() => setView({ quiz: true, stats: false, admin: false })}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: "10px",
            padding: "10px 15px",
            opacity: view.quiz ? "100%" : "75%",
            mr: "10px",
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-list"
            style={{
              fontSize: "16px",
              marginRight: "10px",
              color: theme.palette.text.primary,
            }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              lineHeight: "24px",
              textAlign: "center",
              textTransform: "none",
              color: theme.palette.text.primary,
            }}
          >
            Gestion des questionnaires
          </Typography>
        </ColorButtonPrimary>
        <ColorButtonPrimary
          onClick={() => setView({ quiz: false, stats: true, admin: false })}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: "10px",
            padding: "10px 15px",
            opacity: view.stats ? "100%" : "75%",
            mr: "10px",
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-chart-pie"
            style={{
              fontSize: "16px",
              marginRight: "10px",
              color: theme.palette.text.primary,
            }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              lineHeight: "24px",
              textAlign: "center",
              textTransform: "none",
              color: theme.palette.text.primary,
            }}
          >
            Statistiques
          </Typography>
        </ColorButtonPrimary>
        <ColorButtonPrimary
          onClick={() => setView({ quiz: false, stats: false, admin: true })}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: "10px",
            padding: "10px 15px",
            opacity: view.admin ? "100%" : "75%",
            mr: "10px",
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-user-tie"
            style={{
              fontSize: "16px",
              marginRight: "10px",
              color: theme.palette.text.primary,
            }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "500",
              lineHeight: "24px",
              textAlign: "center",
              textTransform: "none",
              color: theme.palette.text.primary,
            }}
          >
            Gestion admin
          </Typography>
        </ColorButtonPrimary>
      </Grid>

      <Grid item container spacing={0} sx={{ height: "100vh", width: "100vw" }}>
        {view.admin == false && (
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
          xs={12}
          sm={view.admin ? 12 : 9}
          md={view.admin ? 12 : 9}
          sx={{ p: view.admin ? 0 : "3rem" }}
        >
          {view.quiz && <QuizAdministration />}
          {view.stats}
          {view.admin && <AdminGestion />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminConsole;
