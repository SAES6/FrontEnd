import React, { useEffect, useState } from "react";
import { PieChart, BarChart, Gauge, gaugeClasses } from "@mui/x-charts";
import { Grid, Typography, Box } from "@mui/material";
import { theme } from "../../../theme";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import SyntheseGlobal from "./SyntheseGlobal";
import useGET from "../../../hooks/useGET";
import { useSelector } from "react-redux";
import SyntheseChoicesQuestion from "./SyntheseChoicesQuestion";
import SyntheseHeader from "./SyntheseHeader";
import SyntheseTextQuestion from "./SyntheseTextQuestion";
import SyntheseSlider from "./SyntheseSlider";

const Synthese = ({ questionnaire_id, section_id, section_order }) => {
  const themeSynthese = useTheme(theme);
  const [statsTypeUser, setStatsTypeUser] = useState([]);
  const [statsQuestion, setStatsQuestion] = useState([]);
  const tokenAdmin = useSelector((state) => state.user.token);
  const [userList, setUserList] = useState([]);
  const [response, setResponse] = useGET({
    api: process.env.REACT_APP_API_URL,
  });
  const [responseUser, setResponseUser] = useGET({
    api: process.env.REACT_APP_API_URL,
  });
  const questionnaireId = 1; //questionnaire_id;
  const sectionId = 1; //section_id;
  const sectionOrder = 1; //section_order;
  const [selectedUser, setSelectedUser] = useState(null);

  const [isJournalist, setIsJournalist] = useState(true);
  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    if (response?.status >= 200 && response?.status < 300) {
      setStatsTypeUser(response.data.statsTypeUser);
      setStatsQuestion(response.data.statsQuestions);
    }
  }, [response]);

  useEffect(() => {
    if (responseUser?.status >= 200 && responseUser?.status < 300) {
      setUserList(responseUser.data);
    }
  }, [responseUser]);

  useEffect(() => {
    if (isJournalist && isUser) {
      loadUserList();
    } else if (!isJournalist && !isUser) {
      setUserList([]);
    } else if (isJournalist && !isUser) {
      setUserList(userList.filter((user) => user.role === "journalist"));
    } else if (!isJournalist && isUser) {
      setUserList(userList.filter((user) => user.role === "other"));
    }
  }, [isJournalist, isUser]);

  const loadUserList = () => {
    setResponseUser({
      url: `/stat/users?id=${questionnaireId}&section_id=${sectionId}`,
      api: process.env.REACT_APP_API_URL,
      authorization: {
        headers: {
          Authorization: `Bearer ` + tokenAdmin,
        },
      },
      errorMessage: "Erreur lors du chargement des utilisateurs",
    });
  };

  const loadStatsTypeUser = () => {
    setResponse({
      url: `/stats/loadQuestions?id=${questionnaireId}&section_id=${sectionId}`,
      api: process.env.REACT_APP_API_URL,
      authorization: {
        headers: {
          Authorization: `Bearer ` + tokenAdmin,
        },
      },
      errorMessage: "Erreur lors du chargement des statistiques",
    });
  };

  useEffect(() => {
    loadStatsTypeUser();
  }, []);

  return (
    <Grid
      container
      sx={{
        height: "100%",
        width: "100%",
        alignItems: "start",
        justifyContent: "center",
        alignContent: "start",
      }}
    >
      {sectionOrder === 1 && <SyntheseGlobal statsTypeUser={statsTypeUser} />}
      <SyntheseHeader
        setIsJournalist={setIsJournalist}
        setIsUser={setIsUser}
        isJournalist={isJournalist}
        isUser={isUser}
        userList={userList}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {statsQuestion.map(
        (question, index) =>
          ["single_choice", "multiple_choice"].includes(
            question.question.type
          ) && (
            <SyntheseChoicesQuestion
              question={question}
              theme={themeSynthese}
              isJournalist={isJournalist}
              isUser={isUser}
            />
          )
      )}
      {statsQuestion.map(
        (question, index) =>
          ["slider"].includes(question.question.type) && (
            <SyntheseSlider
              question={question}
              theme={themeSynthese}
              isJournalist={isJournalist}
              isUser={isUser}
            />
          )
      )}
      {statsQuestion.map(
        (question, index) =>
          ["text"].includes(question.question.type) && (
            <SyntheseTextQuestion
              question={question}
              theme={themeSynthese}
              userList={userList}
              headerSelectedUser={selectedUser}
            />
          )
      )}
    </Grid>
  );
};

export default Synthese;
