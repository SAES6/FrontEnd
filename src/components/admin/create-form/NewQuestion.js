import {Card, FormControl, Grid, IconButton, MenuItem, Select, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from '@mui/icons-material/Image';
import HideImageIcon from '@mui/icons-material/HideImage';
import Choices from "./Choices";
import Cursor from "./Cursor";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";

const Pending = () => (<></>);

const COMPONENT_MAP = {
    'Choix simple': Choices,
    'Choix multiple': Choices,
    'Libre': Pending,
    'Curseur': Cursor,
};

const QType = ['Choix simple', 'Choix multiple', 'Libre', 'Curseur'];
// todo bug when switch from simple to double
const NewQuestion = forwardRef(({index, sectionInfos, handleClose}, ref) => {
    const [questionData, setQuestionData] = useState({
        qNumber: index,
        type: sectionInfos.type || '',
        enonce: sectionInfos.description || '',
        image: {},
        choices: sectionInfos.choices || []
    });
    const fileInputRef = useRef(null);

    const Component = COMPONENT_MAP[questionData.type] || Pending;

    useImperativeHandle(ref, () => ({
        getData: () => {
            return {...questionData};
        }
    }));

    const selectChangeHandler = (value) => {
        const choicesConfig = {
            'Choix simple': [{ type: 'Choix simple', label: '', id: 0 }, { type: 'Choix simple', label: '', id: 1 }],
            'Choix multiple': [{ type: 'Choix multiple', label: '', id: 0 }, { type: 'Choix multiple', label: '', id: 1 }],
            'Libre': [],
            'Curseur': { min: 0, max: 5, step: 0.5 }
        };

        setQuestionData(prevState => ({
            ...prevState,
            type: value,
            choices: choicesConfig[value] || []
        }));
    };

    const imageChangeHandler = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
            const fileUrl = URL.createObjectURL(file);

            const fileInfo = {
                file,
                fileName: file.name,
                fileType: file.type,
                fileUrl
            };

            setQuestionData(prevState => ({...prevState, image: fileInfo}));
        } else {
            alert('Seulement les images sont autorisées.');
        }
    };

    const buttonClickHandler = () => {
        fileInputRef.current.click();
    };

    const deleteHandler = () => {
        setQuestionData(prevState => ({...prevState, image: {}}));
    };

    const updateChoices = (newChoices) => {
        setQuestionData(prevState => ({
            ...prevState,
            choices: newChoices
        }));
    };

    return (
        <Card sx={{padding: 2, margin: 2, borderRadius: '15px',}}>
            <Grid container alignItems="center" justifyContent='space-between'>
                <Grid item container xs={12}>
                    <Grid item xs={7} sx={{
                        border: 'solid',
                        borderColor: 'blue',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h5" sx={{fontWeight: 'bold', pl: 2}}>
                            Question {questionData.qNumber + 1}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{display: 'flex', justifyContent: 'flex-end', pl: 3, pr: 3}}>
                        <FormControl fullWidth>
                            <Select
                                value={questionData.type || ''}
                                size='small'
                                onChange={(e) => selectChangeHandler(e.target.value)}
                                displayEmpty
                                inputProps={{'aria-label': 'Without label'}}
                                sx={{border: 'solid', borderColor: 'blue', borderRadius: '15px', '& > fieldset': {border: 'none'}}}
                            >
                                {QType.map((type, index) => (
                                    <MenuItem value={type} key={index}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Card sx={{border: 'solid', borderColor: 'blue', borderRadius: '15px', height: 'fit-content'}}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item container xs={12} sx={{mt: 1}}>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>Enoncé</Typography>
                    </Grid>
                    <Grid item xs={11} sx={{pr: 3}}>
                        <TextField
                            focused={false}
                            sx={{border: 'solid', borderColor: 'blue', borderRadius: '15px'}}
                            size='small'
                            fullWidth
                            multiline
                            variant="outlined"
                            value={questionData.enonce ? questionData.enonce : ''}
                            onChange={(e) => setQuestionData(prevState => ({
                                ...prevState,
                                enonce: e.target.value,
                            }))}
                        />
                    </Grid>
                    <Grid item xs={1} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Card sx={{border: 'solid', borderColor: 'blue', borderRadius: '15px', height: 'fit-content'}}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={imageChangeHandler}
                                style={{display: 'none'}}
                            />
                            {Object.keys(questionData.image).length === 0 ?
                                <IconButton onClick={buttonClickHandler}>
                                    <ImageIcon/>
                                </IconButton>
                                :
                                <IconButton onClick={deleteHandler}>
                                    <HideImageIcon/>
                                </IconButton>
                            }

                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Component choices={questionData.choices} setChoices={updateChoices} />
                </Grid>
            </Grid>
        </Card>
    );
});

export default NewQuestion;
