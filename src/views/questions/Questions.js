import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import QuestionOpen from "../../components/QuestionOpen";

const Questions = () => {
    const themeLayout = useTheme(theme);
    const screenSize = useMediaQuery('(min-width:1600px)');

    return (
        <Grid
            container
            sx={{
                maxWidth: screenSize ? "1500px" : "1300px",
                height: "100%",
                width: "auto",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Grid>
                <Grid>
                    <QuestionOpen>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                        sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga
                    </QuestionOpen>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Questions;
