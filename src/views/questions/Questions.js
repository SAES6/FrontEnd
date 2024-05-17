import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import QuestionOpen from "../../components/QuestionOpen";
import QuestionSimple from "../../components/QuestionSimple";
import QuestionEchelle from "../../components/QuestionEchelle";

const Questions = () => {
    const themeLayout = useTheme(theme);
    const screenSize = useMediaQuery('(min-width:1600px)');

    return (
        <Grid
            container
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: "40px 0",
                overflow: "auto"
            }}
        >
            <QuestionEchelle questionNumber={"1"}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                atque corrupti quos dolores et quas molestias excepturi sint
            </QuestionEchelle>
            <QuestionSimple questionNumber={"2"} questionType={"Multiple"}>
                Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur
                aut perferendis doloribus asperiores repellat.
            </QuestionSimple>
            <QuestionOpen questionNumber={"3"}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga
            </QuestionOpen>

        </Grid>
    );
};

export default Questions;
