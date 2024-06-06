import React, { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { theme } from "../../../theme";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import SyntheseGlobal from "./SyntheseGlobal";
import useGET from "../../../hooks/useGET";
import SyntheseChoicesQuestion from "./SyntheseChoicesQuestion";
import SyntheseHeader from "./SyntheseHeader";
import SyntheseTextQuestion from "./SyntheseTextQuestion";
import SyntheseSlider from "./SyntheseSlider";
import SyntheseChoicesQuestionImage from "./SyntheseChoicesQuestionImage";
import SyntheseChoicesQuestionUser from "./SyntheseChoicesQuestionUser"; // Assurez-vous d'importer vos composants User
import SyntheseChoicesQuestionImageUser from "./SyntheseChoicesQuestionImageUser";
import SyntheseSliderUser from "./SyntheseSliderUser";

const Synthese = ({ questionnaire_id, section_id, section_order }) => {
  const themeSynthese = useTheme(theme);
  const [statsTypeUser, setStatsTypeUser] = useState([]);
  const [statsQuestion, setStatsQuestion] = useState([]);
  const tokenAdmin = useSelector((state) => state.user.token);
  const [userList, setUserList] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [response, setResponse] = useGET({
    api: process.env.REACT_APP_API_URL,
  });
  const [responseByOneUser, setResponseByOneUser] = useGET({
    api: process.env.REACT_APP_API_URL,
  });
  const [responseUser, setResponseUser] = useGET({
    api: process.env.REACT_APP_API_URL,
  });

  const questionnaireId = useSelector((state) => state.quiz.currentQuizId);
  const sectionId = useSelector((state) => state.quiz.currentSectionId);
  const sectionOrder = useSelector((state) => state.quiz.currentSectionOrder);
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
      setSelectedUser(null);
    } else if (isJournalist && !isUser) {
      setUserList(userList.filter((user) => user.role === "journalist"));
      if (selectedUser && selectedUser.role === "other") {
        setSelectedUser(null);
      }
    } else if (!isJournalist && isUser) {
      setUserList(userList.filter((user) => user.role === "other"));
      if (selectedUser && selectedUser.role === "journalist") {
        setSelectedUser(null);
      }
    }
  }, [isJournalist, isUser]);

  useEffect(() => {
    if (selectedUser) {
      loadAnswerByOneUser(selectedUser);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (responseByOneUser?.status >= 200 && responseByOneUser?.status < 300) {
      setUserAnswers(responseByOneUser.data);
    }
  }, [responseByOneUser]);

  const loadAnswerByOneUser = (user) => {
    setResponseByOneUser({
      url: `/stat/byUser?id=${questionnaireId}&section_id=${sectionId}&user_token=${user.user_token}`,
      api: process.env.REACT_APP_API_URL,
      authorization: {
        headers: {
          Authorization: `Bearer ` + tokenAdmin,
        },
      },
      errorMessage: "Erreur lors du chargement des réponses",
    });
  };

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

  const findCorrectAnswer = (question) => {
    if (userAnswers.length > 0) {
      const answer = userAnswers.find(
        (answer) => answer.question_id === question.question.id
      );
      return answer ? answer.answer : null;
    }
    return null;
  };

  useEffect(() => {
    loadStatsTypeUser();
  }, [sectionId, questionnaireId]);

  const renderComponent = (question, index) => {
    const isSelecteduser =
      selectedUser != null && userAnswers.length > 0 ? true : false;

    if (["single_choice", "multiple_choice"].includes(question.question.type)) {
      if (question.question?.choices[0]?.image_src == null) {
        return isSelecteduser ? (
          <SyntheseChoicesQuestionUser
            key={index}
            question={question}
            statTypeUser={statsTypeUser}
            theme={themeSynthese}
            isJournalist={isJournalist}
            isUser={isUser}
            userAnswer={findCorrectAnswer(question)}
          />
        ) : (
          <SyntheseChoicesQuestion
            key={index}
            question={question}
            statTypeUser={statsTypeUser}
            theme={themeSynthese}
            isJournalist={isJournalist}
            isUser={isUser}
          />
        );
      } else {
        return isSelecteduser ? (
          <SyntheseChoicesQuestionImageUser
            key={index}
            statTypeUser={statsTypeUser}
            question={question}
            theme={themeSynthese}
            isJournalist={isJournalist}
            isUser={isUser}
            userAnswer={findCorrectAnswer(question)}
          />
        ) : (
          <SyntheseChoicesQuestionImage
            key={index}
            statTypeUser={statsTypeUser}
            question={question}
            theme={themeSynthese}
            isJournalist={isJournalist}
            isUser={isUser}
          />
        );
      }
    } else if (["slider"].includes(question.question.type)) {
      return isSelecteduser ? (
        <SyntheseSliderUser
          key={index}
          question={question}
          theme={themeSynthese}
          isJournalist={isJournalist}
          isUser={isUser}
          userAnswer={findCorrectAnswer(question)}
        />
      ) : (
        <SyntheseSlider
          key={index}
          question={question}
          theme={themeSynthese}
          isJournalist={isJournalist}
          isUser={isUser}
        />
      );
    } else if (["text"].includes(question.question.type)) {
      return (
        <SyntheseTextQuestion
          key={index}
          question={question}
          theme={themeSynthese}
          userList={userList}
          headerSelectedUser={selectedUser}
          isUser={isUser}
        />
      );
    }

    return null;
  };

  return (
    <Stack
      className={"sneakyScroll"}
      sx={{ width: "100%", height: "100%", overflow: "auto" }}
      spacing={5}
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
        questionnaireId={questionnaireId}
      />
      {statsQuestion &&
        statsQuestion.length > 0 &&
        statsQuestion.map((question, index) =>
          renderComponent(question, index)
        )}
    </Stack>
  );
};

export default Synthese;
