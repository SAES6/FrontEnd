import { Grid } from "@mui/material";
import React, { useEffect, useState, forwardRef } from "react";
import QuestionOpen from "../../question/QuestionOpen";
import QuestionSimple from "../../question/QuestionSimple";
import QuestionEchelle from "../../question/QuestionEchelle";
const PreviewQuestion = ({ sectionInfos }) => {
  const [question, setQuestion] = useState({});

  useEffect(() => {
    let type = null;
    if (sectionInfos.type == "Libre") {
      type = "text";
    } else if (sectionInfos.type == "Choix unique") {
      type = "single_choice";
    } else if (sectionInfos.type == "Choix multiple") {
      type = "multiple_choice";
    } else if (sectionInfos.type == "Curseur") {
      type = "slider";
    }
    let title = sectionInfos.title;
    let img_src = sectionInfos.img_src;
    let slider_gap = sectionInfos.slider_gap;
    let slider_min = sectionInfos.slider_min;
    let slider_max = sectionInfos.slider_max;
    let description = sectionInfos.description;
    let id = sectionInfos.id;
    let choices = sectionInfos.choices;
    setQuestion({
      id: id,
      type: type,
      title: title,
      img_src: img_src ? img_src : null,
      choices: choices,
      slider_gap: slider_gap,

      slider_min: slider_min,
      slider_max: slider_max,
      description: description,
    });
  }, [sectionInfos]);

  useEffect(() => {
    console.log("question", question);
  }, [question]);

  return (
    <React.Fragment key={question.id}>
      {question.type === "text" && (
        <QuestionOpen
          question={question}
          onResponseChange={(value) => null}
          mode={"question"}
          preview={true}
        />
      )}
      {(question.type === "single_choice" ||
        question.type === "multiple_choice") && (
        <QuestionSimple
          question={question}
          onResponseChange={(value) => null}
          mode={"question"}
          preview={true}
        />
      )}
      {question.type === "slider" && (
        <QuestionEchelle
          question={question}
          onResponseChange={(value) => null}
          mode={"question"}
          preview={true}
        />
      )}
    </React.Fragment>
  );
};
export default PreviewQuestion;
