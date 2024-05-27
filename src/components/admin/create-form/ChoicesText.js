import {Card, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useCallback} from "react";

const ChoicesText = ({label, updateOption, index}) => {
    const handleLabelChange = useCallback((e) => {
        updateOption(e.target.value, index);
    }, [updateOption, index]);


    return (
        <FormControlLabel
            control={<Checkbox disabled/>}
            label={<Card sx={{
                border: 'solid',
                borderColor: 'blue',
                borderRadius: '15px',
                p: 1,
                width: '100%',
            }}>
                <TextField
                    value={label}
                    onChange={handleLabelChange}
                    variant="standard"
                    placeholder='Entrez un nouveau choix'
                    size="small"
                    multiline
                    sx={{width: '30rem'}} // si valeur en % ou fullWidth il est trop petit
                />
            </Card>}
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
            }}
        />
    );
}

export default ChoicesText;
