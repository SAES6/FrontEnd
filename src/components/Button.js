import { Box, Typography } from "@mui/material";

const Button = ({ color, icon, label }) => {
    return (
        <Box sx={{
            backgroundColor: color,
            padding: "10px 15px"
        }}>
            <i class={icon} />
            <Typography>
                {label}
            </Typography>
        </Box>
    );
}

export default Button;