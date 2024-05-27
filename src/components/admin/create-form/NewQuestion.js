import {Card, FormControl, Grid, IconButton, MenuItem, Select, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from '@mui/icons-material/Image';
import HideImageIcon from '@mui/icons-material/HideImage';
import Choices from "./Choices";
import Cursor from "./Cursor";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";

const Pending = () => (<></>);

const COMPONENT_MAP = {
    type1: Choices,
    type2: Choices,
    type3: Pending,
    type4: Cursor,
};

const QType = [
    {type: 'type1', name: 'Choix simple'},
    {type: 'type2', name: 'Choix multiple'},
    {type: 'type3', name: 'Libre'},
    {type: 'type4', name: 'Curseur'},
];

const NewQuestion = forwardRef(({index, pageInfos, handleClose}, ref) => {
    const [choices, setChoices] = useState();
    const [questionData, setQuestionData] = useState({
        qNumber: index,
        type: pageInfos.type || '',
        enonce: pageInfos.enonce || '',
        image: {},
        choices: pageInfos.choices || []
    });
    const fileInputRef = useRef(null);

    const Component = COMPONENT_MAP[questionData.type] || Pending;

    useImperativeHandle(ref, () => ({
        getData: () => {
            return {...questionData, choices: choices};
        }
    }));

    const selectChangeHandler = (value) => {
        const choicesConfig = {
            type1: [{type: 'text', label: '', id: 0},{type: 'text', label: '', id: 1},],
            type2: [{type: 'text', label: '', id: 0},{type: 'text', label: '', id: 1},],
            type3: null,
            type4: {min: 0, max: 5, step: 0.5}
        };

        setQuestionData(prevState => ({
            ...prevState,
            type: value,
            name: QType.find(typeInfo => typeInfo.type === value)?.name,
        }));

        setChoices(choicesConfig[value] || []);
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
                                {QType.map((typeInf, index) => (
                                    <MenuItem value={typeInf.type} key={index}>{typeInf.name}</MenuItem>
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
                    <Component choices={choices} setChoices={setChoices}/>
                </Grid>
            </Grid>
        </Card>
    );
});

export default NewQuestion;
