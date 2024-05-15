import { Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import Button from '@mui/material/Button';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { theme } from "../theme";
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText,
    transition: "ease 0.3s",
    '&:hover': {
        backgroundColor: theme.palette.primary.contrastText
    },
}));

const FullLayout = () => {
    const themeLayout = useTheme(theme)

    return (
        <Box>
            <Box sx={{
                width: "80vw",
                height: "60px",
                backgroundColor: themeLayout.palette.primary.main,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "10px 10vw"
            }}>
                <Box>
                    <i class="fas-solid fa-chart-pie"></i>
                    <Typography sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "500"
                    }}>
                        Informare Valorem
                    </Typography>
                </Box>
                <ColorButton variant="contained" startIcon={<SupervisorAccountIcon />}>
                    Espace Admin
                </ColorButton>
            </Box>
            <Outlet />
        </Box>
    );
};

export default FullLayout;
