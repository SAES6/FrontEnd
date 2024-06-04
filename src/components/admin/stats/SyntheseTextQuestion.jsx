import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useCallback } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
const SyntheseTextQuestion = ({
  question,
  theme,
  userList,
  headerSelectedUser,
}) => {
  const themeSynthese = theme;
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(0);

  const [finalUserList, setFinalUserList] = useState([]);

  const [globalAnswer, setGlobalAnswer] = useState([]);

  const [answerToShow, setAnswerToShow] = useState(null);

  useEffect(() => {
    if (question.stats) {
      let finalAnswer = [];
      if (question.stats.journalists) {
        finalAnswer = [...finalAnswer, ...question.stats.journalists.responses];
      }
      if (question.stats.others) {
        finalAnswer = [...finalAnswer, ...question.stats.others.responses];
      }
      setGlobalAnswer(finalAnswer);
    }
  }, [question]);

  useEffect(() => {
    // change la liste final et ne garde que l'utilisateur headerSelectedUser
    if (userList.length > 0 && headerSelectedUser) {
      let finalUserList = [];
      for (let i = 0; i < userList.length; i++) {
        if (headerSelectedUser.user_token === userList[i].user_token) {
          finalUserList.push(userList[i]);
        }
      }
      setFinalUserList(finalUserList);
    }
  }, [userList, headerSelectedUser]);

  useEffect(() => {
    if (globalAnswer.length > 0) {
      let finalUserList = [];
      // filter the userLists to only have the users that have answered the question
      globalAnswer.forEach((answer) => {
        for (let i = 0; i < userList.length; i++) {
          console.log("answer", answer);
          console.log("userList[i]", userList[i]);
          if (answer.user_token === userList[i].user_token) {
            finalUserList.push(userList[i]);
          }
        }
        console.log("finalUserList", finalUserList);
      });
      setFinalUserList(finalUserList);
    }
  }, [userList, globalAnswer]);

  useEffect(() => {
    console.log("finalUserList", finalUserList);
    setSelectedUser(finalUserList[0]);
  }, [finalUserList]);

  useEffect(() => {
    if (globalAnswer.length > 0 && selectedUser) {
      // find the answer where user_token is the same as selectedUser
      console.log("selectedUser", selectedUser);
      console.log("globalAnswer", globalAnswer);
      let answer = globalAnswer.find(
        (answer) => answer.user_token === selectedUser.user_token
      );
      if (answer) {
        setAnswerToShow(answer);
      } else {
        setAnswerToShow(null);
      }
    }
  }, [globalAnswer, selectedUser]);

  const goNext = () => {
    if (selectedUser === userList[userList.length - 1]) {
      setSelectedUser(userList[0]);
    } else {
      setSelectedUser(userList[userList.indexOf(selectedUser) + 1]);
    }
  };

  const goPrevious = () => {
    if (selectedUser === userList[0]) {
      setSelectedUser(userList[0]);
    } else {
      setSelectedUser(userList[userList.indexOf(selectedUser) - 1]);
    }
  };

  const setSelectedUserHeader = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        border: "solid 1px",
        borderColor: themeSynthese.palette.secondary.main,
        width: "100%",
        height: "fit-content",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "24px",
          fontWeight: "600",
          lineHeight: "36px",
          marginBottom: "10px",
          color: themeSynthese.palette.text.primary,
        }}
      >
        {question.question.title}
      </Typography>

      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          borderTop: "solid 1px",
          paddingTop: "20px",
          borderColor: themeSynthese.palette.secondary.main,
          height: "fit-content",
        }}
      >
        <Typography
          sx={{
            textAlign: "left",

            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "36px",
            color: themeSynthese.palette.text.primary,
          }}
        >
          Énoncé
        </Typography>
        <Typography
          sx={{
            textAlign: "left",
            mt: "10px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
            color: themeSynthese.palette.text.primary,
          }}
        >
          {question.question.description}
        </Typography>
      </Grid>
      <Grid
        sx={{
          mt: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
          backgroundColor: "white",
          height: "fit-content",
        }}
      >
        <IconButton
          sx={{ padding: 0 }}
          onClick={goPrevious}
          disabled={headerSelectedUser != null ? true : false}
        >
          <FontAwesomeIcon
            fontSize={24}
            color={themeSynthese.palette.secondary.main}
            fixedWidth
            icon="fa-solid fa-angle-left"
          />
        </IconButton>
        <Select
          value={selectedUser}
          onChange={setSelectedUserHeader}
          sx={{ width: "30%" }}
        >
          {finalUserList.map((user) => (
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
        <IconButton
          sx={{ padding: 0 }}
          onClick={goNext}
          disabled={headerSelectedUser != null ? true : false}
        >
          <FontAwesomeIcon
            fontSize={24}
            color={themeSynthese.palette.secondary.main}
            fixedWidth
            icon="fa-solid fa-angle-right"
          />
        </IconButton>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "1%",
            borderRadius: "15px",
            backgroundColor: themeSynthese.palette.secondary.main,
            alignSelf: "stretch",
          }}
        />
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "98%",
            ml: "1%",

            height: "100%",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "36px",
              color: themeSynthese.palette.text.primary,
              textOverflow: "ellipsis",
              width: "100%",
              overflowWrap: "break-word",
            }}
          >
            "{answerToShow?.response_text}"
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SyntheseTextQuestion;
