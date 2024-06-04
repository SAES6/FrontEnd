import {Button, Grid, IconButton} from "@mui/material";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImageIcon from '@mui/icons-material/Image';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ChoicesText from "./ChoicesText";
import ChoicesImage from "./ChoicesImage";

const Choices = ({choices, updateChoices}) => {
    const [choicesMode, setChoicesMode] = useState(true);

    const addChoice = () => {
        const updateChoicesNicely = () => {
            const updatedChoices =[
                ...choices,
                {type: choices[0].type, text: '', image_src: {}, id: choices.length + 1}
            ]
            const reIndexedChoices = updatedChoices.map((choice, index) => ({...choice, id: index}));
            updateChoices(reIndexedChoices);
        }

        if (choicesMode && choices.length <= 7) updateChoicesNicely();
        else if (!choicesMode && choices.length <= 3) updateChoicesNicely();
    };

    const updateOption = (newText, index) => {
        const updatedChoices = choices.map(choice =>
            choice.id === index ? {...choice, text: newText} : choice
        );
        updateChoices(updatedChoices);
    };

    const updateChoiceImage = (id, imgData) => {
        const updatedChoices = choices.map(choice =>
            choice.id === id ? {...choice, image_src: imgData} : choice
        );
        updateChoices(updatedChoices);
    };

    const deleteHandler = (choiceId) => {
        if((choices.length - 1) > 1) {
            const reducedChoices = choices.filter(choice => choice.id !== choiceId);
            const reIndexedChoices = reducedChoices.map((choice, index) => ({...choice, id: index}));
            updateChoices(reIndexedChoices);
        }
    };

    const selectTextHandler = () => setChoicesMode(true);
    const selectImageHandler = () => setChoicesMode(false);

    return (
        <Grid container spacing={1} sx={{mt: 1, width: '100%'}}>
            <Grid item container spacing={2} xs={12} sm={4} sx={{m: '0 0 1rem 0'}}>
                <Grid item xs={6} sx={{pr: 2}}>
                    <Button variant="contained" startIcon={<SortByAlphaIcon/>} onClick={selectTextHandler} fullWidth>
                        Text
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" startIcon={<ImageIcon/>} onClick={selectImageHandler} fullWidth>
                        Image
                    </Button>
                </Grid>
            </Grid>
            {choicesMode ?
                <>
                    {choices.map(choice => (
                        <Grid item container key={choice.id} xs={12} sx={{width: '100%', mt: 1}}>
                            <Grid item xs={11} sx={{pl: 3}}>
                                <ChoicesText label={choice.text} updateOption={updateOption} index={choice.id}/>
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
                                image_url={choice.image_src?.fileUrl}
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
