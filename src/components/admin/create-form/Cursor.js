import React, {useState} from 'react';
import {TextField, Slider, Box, Grid} from '@mui/material';

const Cursor = ({choices, updateChoices}) => {
    const cursorValue = choices[0];

    // For counter the error on the uncontrolled slider
    const [sliderValue, setSliderValue] = useState(((cursorValue.slider_min + cursorValue.slider_max) / 2) || 5);

    const handleMinChange = (event) => {
        const newMin = Number(event.target.value);
        updateChoices([{...cursorValue, slider_min: newMin}]);
        if (sliderValue < newMin) setSliderValue(newMin);
    };

    const handleMaxChange = (event) => {
        const newMax = Number(event.target.value);
        updateChoices([{...cursorValue, slider_max: newMax}]);
        if (sliderValue > newMax) setSliderValue(newMax);
    };

    const handleStepChange = (event) => {
        updateChoices([{...cursorValue, slider_gap: parseFloat(event.target.value)}]);
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
                        value={cursorValue.slider_min || 0}
                        onChange={handleMinChange}
                        size="small"
                        fullWidth
                        InputProps={{inputProps: {min: 0}}}
                    />
                </Grid>
                <Grid item xs={8} sx={{textAlign: 'center'}}>
                    <Slider
                        valueLabelDisplay="auto"
                        min={cursorValue.slider_min || 0}
                        max={cursorValue.slider_max || 10}
                        step={cursorValue.slider_gap || 1}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        sx={{margin: '0 auto', width: '80%'}}
                    />
                </Grid>
                <Grid item xs={2} sx={{textAlign: 'right'}}>
                    <TextField
                        label="Maximum Value"
                        type="number"
                        value={cursorValue.slider_max || 10}
                        onChange={handleMaxChange}
                        fullWidth
                        size="small"
                        InputProps={{inputProps: {slider_min: 0, slider_max: 100}}}
                    />
                </Grid>
                <Grid item container xs={12} sx={{textAlign: 'center'}}>
                    <Grid item xs={5}/>
                    <Grid item xs={2}>
                        <TextField
                            label="Step Value"
                            type="number"
                            inputProps={{slider_gap: 0.1, slider_min: 0.1, slider_max: 5.0}}
                            value={cursorValue.slider_gap || 1}
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
