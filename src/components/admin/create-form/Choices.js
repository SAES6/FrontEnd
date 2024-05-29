import {Button, Grid, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImageIcon from '@mui/icons-material/Image';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ChoicesText from "./ChoicesText";
import ChoicesImage from "./ChoicesImage";

const Choices = ({choices, setChoices}) => {
    const [choicesMode, setChoicesMode] = useState(true);

    useEffect(() => {
        if (!choices.includes(choice => choice.type = 'text')) setChoices([
            {type: 'text', label: '', id: 0},
            {type: 'text', label: '', id: 1},
        ]);

        else if (!choices.includes(choice => choice.type = 'image')) setChoices([
            {type: 'image', img: '', id: 0},
            {type: 'image', img: '', id: 1},
        ]);
    }, [choicesMode]);

    const addChoice = () => {
        if (choicesMode && choices.length <= 7)
            setChoices(prevChoices => [
                ...prevChoices,
                {type: 'text', label: '', id: prevChoices.length},
            ]);
        else if (!choicesMode && choices.length <= 3)
            setChoices(prevChoices => [
                ...prevChoices,
                {type: 'image', img: '', id: prevChoices.length},
            ]);
    };

    const updateOption = (newLabel, index) => {
        setChoices(prevChoices => prevChoices.map((choice, idx) =>
            idx === index ? {...choice, label: newLabel} : choice
        ));
    };


    const updateChoiceImage = (id, imgData) => {
        setChoices(prevChoices =>
            prevChoices.map(choice =>
                choice.id === id ? {...choice, img: imgData} : choice
            )
        );
    };

    const deleteHandler = (value) => {
        if (choices.length > 2)
            setChoices(prevState => prevState.filter(choice => choice.id !== value));
    };

    const selectTextHandler = () => {
        setChoicesMode(true);
    };

    const selectImageHandler = () => {
        setChoicesMode(false);
    };

    return (
        <Grid container spacing={1} sx={{mt: 1, width: '100%'}}>
            <Grid item container spacing={2} xs={12} sm={4} sx={{m: '0 0 1rem 0'}}>
                <Grid item xs={6} sx={{pr: 2}}>
                    <Button variant="contained" startIcon={<SortByAlphaIcon/>}
                            onClick={selectTextHandler} fullWidth>
                        Text
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" startIcon={<ImageIcon/>}
                            onClick={selectImageHandler} fullWidth>
                        Image
                    </Button>
                </Grid>
            </Grid>
            {choicesMode ?
                <>
                    {choices.map(choice => (
                        <Grid item container key={choice.id} xs={12} sx={{width: '100%', mt: 1}}>
                            <Grid item xs={11} sx={{pl: 3}}>
                                <ChoicesText label={choice.label} updateOption={updateOption} index={choice.id}/>
                            </Grid>
                            <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                                <IconButton onClick={() => deleteHandler(choice.id)}>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <AddCircleOutlineIcon fontSize="large" onClick={addChoice}/>
                    </Grid>
                </>
                :
                <>
                    <Grid item xs={12} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        ml: 1,
                        mt: 1,
                        width: '100%',
                    }}>
                        {choices.map(choice => (
                            <ChoicesImage
                                key={choice.id}
                                updateChoiceImage={(imgData) => updateChoiceImage(choice.id, imgData)}
                                deleteHandler={() => deleteHandler(choice.id)}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <AddCircleOutlineIcon fontSize="large" onClick={addChoice}/>
                    </Grid>
                </>
            }
        </Grid>
    );
};

export default Choices;
