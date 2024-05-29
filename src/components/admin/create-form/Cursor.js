import React, {useState} from 'react';
import {TextField, Slider, Box, Grid} from '@mui/material';

const Cursor = ({choices, setChoices}) => {
    // For counter the error on the uncontrolled slider
    const [sliderValue, setSliderValue] = useState((choices.min + choices.max) / 2);

    const handleMinChange = (event) => {
        const newMin = Number(event.target.value);
        setChoices(prevState => ({...prevState, min: newMin}));
        if (sliderValue < newMin) setSliderValue(newMin);
    };

    const handleMaxChange = (event) => {
        const newMax = Number(event.target.value);
        setChoices(prevState => ({...prevState, max: newMax}));
        if (sliderValue > newMax) setSliderValue(newMax);
    };

    const handleStepChange = (event) => {
        setChoices(prevState => ({...prevState, step: parseFloat(event.target.value)}));
    };

    const handleSliderChange = (_, newValue) => {
        setSliderValue(newValue);
    };

    return (
        <Box sx={{padding: 2}}>
            <Grid container spacing={2} alignItems="center" sx={{width: '100%'}}>
                <Grid item xs={2}>
                    <TextField
                        label="Minimum Value"
                        type="number"
                        value={choices.min}
                        onChange={handleMinChange}
                        size="small"
                        fullWidth
                        InputProps={{inputProps: {min: 0}}}
                    />
                </Grid>
                <Grid item xs={8} sx={{textAlign: 'center'}}>
                    <Slider
                        valueLabelDisplay="auto"
                        min={choices.min}
                        max={choices.max}
                        step={choices.step}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        sx={{margin: '0 auto', width: '80%'}}
                    />
                </Grid>
                <Grid item xs={2} sx={{textAlign: 'right'}}>
                    <TextField
                        label="Maximum Value"
                        type="number"
                        value={choices.max}
                        onChange={handleMaxChange}
                        fullWidth
                        size="small"
                        InputProps={{inputProps: {min: 0, max: 100}}}
                    />
                </Grid>
                <Grid item container xs={12} sx={{textAlign: 'center'}}>
                    <Grid item xs={5}/>
                    <Grid item xs={2}>
                        <TextField
                            label="Step Value"
                            type="number"
                            inputProps={{step: 0.1, min: 0.1, max: 5.0}}
                            value={choices.step}
                            onChange={handleStepChange}
                            sx={{width: '50%'}}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={5}/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Cursor;
