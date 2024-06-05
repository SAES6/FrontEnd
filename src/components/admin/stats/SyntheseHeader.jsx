import React, { useEffect, useState } from "react";
import { PieChart, BarChart, Gauge, gaugeClasses } from "@mui/x-charts";
import {
  Grid,
  Typography,
  Select,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  IconButton,
} from "@mui/material";
import { theme } from "../../../theme";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import SyntheseGlobal from "./SyntheseGlobal";
import useGET from "../../../hooks/useGET";
import { useSelector } from "react-redux";
import SyntheseChoicesQuestion from "./SyntheseChoicesQuestion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SyntheseHeader = ({
  selectedUser,
  userList,
  setIsJournalist,
  setIsUser,
  isUser,
  isJournalist,
  setSelectedUser,
  questionnaireId,
}) => {
  const [responseExport, setResponseExport] = useGET({
    api: process.env.REACT_APP_API_URL,
  });
  const tokenAdmin = useSelector((state) => state.user.token);
  const themeSynthese = useTheme(theme);
  console.log("selectedUser", selectedUser);
  console.log("userList", userList);
  console.log("isUser", isUser);
  console.log("isJournalist", isJournalist);

  const setIsJournalistHeader = (event) => {
    setIsJournalist(event.target.checked);
  };

  const setIsUserHeader = (event) => {
    setIsUser(event.target.checked);
  };

  const setSelectedUserHeader = (event) => {
    setSelectedUser(event.target.value);
  };

  const exportData = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/admin/exportData?questionnaire_id=${questionnaireId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenAdmin}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "responses.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success("Export des données réussi");
      })
      .catch((error) => {
        console.error("Erreur lors de l'export des données", error);
        toast.error("Erreur lors de l'export des données");
      });
  };

  const resetSelectedUser = () => {
    setSelectedUser(null);
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        border: "solid 1px",
        borderColor: themeSynthese.palette.secondary.main,
        width: "100%",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={resetSelectedUser}
          sx={{
            display: selectedUser ? "flex" : "none",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon
            fontSize={16}
            icon="fa-solid fa-rotate-right"
            fixedWidth
            color={themeSynthese.palette.primary.main}
          />
        </IconButton>
        <Select
          value={selectedUser}
          onChange={setSelectedUserHeader}
          sx={{ width: "100%" }}
        >
          {userList.map((user) => (
            <MenuItem key={user.id} value={user}>
              <FontAwesomeIcon
                fontSize={16}
                icon={
                  user.role === "journalist"
                    ? "fa-solid fa-user-secret"
                    : "fa-solid fa-user"
                }
                fixedWidth
                color={themeSynthese.palette.text.primary}
              />

              {user.user_name}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid
        item
        xs={6}
        sx={{
          pl: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <FormControlLabel
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
          }}
          control={
            <Checkbox
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
              }}
              id="user"
              name="user"
              checked={isUser}
              onChange={setIsUserHeader}
            />
          }
          label="Utilisateurs"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="journalist"
              name="journalist"
              checked={isJournalist}
              onChange={setIsJournalistHeader}
            />
          }
          label="Journalistes"
        />
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={exportData}
        >
          <FontAwesomeIcon
            fontSize={16}
            icon="fa-solid fa-file-csv"
            fixedWidth
            color="white"
          />
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "24px",
            }}
          >
            Exporter les données
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
export default SyntheseHeader;
