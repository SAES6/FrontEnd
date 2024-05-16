import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: "ease 0.3s",
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
    },
}));

const Home = () => {
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
            <Grid
                container
                spacing={2}
                sx={{
                    height: "fit-content",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "flex-end",
                }}
            >
                <Grid item xs={6} md={6} sx={{}}>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "64px",
                            fontWeight: "700",
                            lineHeight: "1.2",
                            letterSpacing: "-2px",
                        }}
                    >
                        Projet Informare Valorem
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            fontWeight: "300",
                            letterSpacing: "-1px",
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={6}
                    sx={{
                        height: "350px",
                        backgroundColor: themeLayout.palette.secondary.main,
                        borderRadius: "20px",
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Home;
