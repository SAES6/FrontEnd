import { Box, Button, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { theme } from "../../theme";


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: "ease 0.3s",
    '&:hover': {
        backgroundColor: theme.palette.primary.main
    },
}));

const Home = () => {
    const themeLayout = useTheme(theme)

    return (
        <Box sx={{
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "0 10vw"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end"
            }}>
                <Box sx={{
                    width: "600px"
                }}>
                    <Typography sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "3em",
                        fontWeight: "500",
                        letterSpacing: "-1px"
                    }}>
                        Projet Informare Valorem
                    </Typography>
                    <Typography sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "1em",
                        fontWeight: "400",
                        letterSpacing: "-1px"
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Typography>
                </Box>
                <Box sx={{
                    width: "600px",
                    height: "300px",
                    backgroundColor: themeLayout.palette.secondary.main,
                    borderRadius: "20px"
                }}>

                </Box>
            </Box>
            <ColorButton sx={{ marginTop: "20px" }} variant="contained">
                Commencer
            </ColorButton>
        </Box>
    );
}

export default Home;