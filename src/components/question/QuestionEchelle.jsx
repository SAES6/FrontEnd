import {Grid, Typography, Slider} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {theme} from '../../theme';
import Enonce from './Enonce';

const QuestionEchelle = ({onResponseChange, question, mode, userResponse = 0}) => {
    const [sliderValue, setSliderValue] = useState(question.slider_min);

    const themeQuestion = useTheme(theme);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        onResponseChange(newValue);
    };

    const generateMarks = (min, max, step) => {
        const marks = [];
        for (let i = min; i <= max; i += step) {
            marks.push({value: i, label: i.toString()});
        }
        return marks;
    };

    const marks = generateMarks(
        question.slider_min,
        question.slider_max,
        question.slider_gap
    );

    return (
        <Grid
            className='question'
            container
            sx={{
                width: '100%',
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                gap: '10px',
                padding: '10px 0',
            }}
        >
            <Grid
                className='first-row'
                sx={{
                    width: '100%',
                    height: '56px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '24px',
                        fontWeight: '600',
                        lineHeight: '36px',
                        color: themeQuestion.palette.text.primary,
                    }}
                >
                    {question.title}
                </Typography>
                <Grid
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <FontAwesomeIcon
                        icon='fa-solid fa-sliders'
                        style={{opacity: '0.5'}}
                    />
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '16px',
                            fontWeight: '600',
                            lineHeight: '24px',
                            marginLeft: '5px',
                            color: themeQuestion.palette.text.primary,
                        }}
                    >
                        Echelle
                    </Typography>
                </Grid>
            </Grid>
            <Enonce children={question.description} imgSrc={question.image_src}/>
            {mode === 'question' ? (
                <Grid
                    className='slider'
                    sx={{
                        width: '100%',
                    }}
                >
                    <Slider
                        aria-label='Temperature'
                        valueLabelDisplay='auto'
                        value={sliderValue}
                        onChange={handleSliderChange}
                        step={question.slider_gap && 0}
                        marks={marks}
                        min={question.slider_min && 0}
                        max={question.slider_max && 0}
                    />
                </Grid>
            ) : (
                <Grid
                    className='slider'
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    <Slider
                        aria-label='Temperature'
                        valueLabelDisplay='auto'
                        value={userResponse}
                        onChange={handleSliderChange}
                        step={question.slider_gap}
                        marks={marks}
                        min={question.slider_mim}
                        max={question.slider_max}
                        sx={{
                            '&.MuiSlider-root': {
                                pointerEvents: 'none !important',
                            },
                            '&.MuiSlider-thumb': {
                                pointerEvents: 'none !important',
                            },
                        }}
                    />
                    <Grid
                        sx={{
                            width: 'fit-content',
                            padding: '10px 15px',
                            border: 'solid 1px',
                            borderColor: themeQuestion.palette.secondary.main,
                            gap: '5px',
                            borderRadius: '15px',
                        }}
                    >
                        <Grid
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <FontAwesomeIcon
                                icon='fa-solid fa-user'
                                style={{
                                    fontSize: '16px',
                                    color: themeQuestion.palette.primary.main,
                                }}
                            />
                            <Typography
                                sx={{
                                    marginLeft: '5px',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    color: themeQuestion.palette.primary.main,
                                }}
                            >
                                6.1 moyenne des utilisateurs
                            </Typography>
                        </Grid>
                        <Grid
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <FontAwesomeIcon
                                icon='fa-solid fa-user-secret'
                                style={{
                                    fontSize: '16px',
                                    color: themeQuestion.palette.secondary.main,
                                }}
                            />
                            <Typography
                                sx={{
                                    marginLeft: '5px',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    color: themeQuestion.palette.secondary.main,
                                }}
                            >
                                5.7 moyenne des journalistes
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default QuestionEchelle;
