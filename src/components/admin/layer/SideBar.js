import React from "react";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const SideBar = ({quizzesInfos}) => {
    const onClickPageHandler = (id) => {
        console.log(id)
    };

    const onClickQuizHandler = (id) => {
        console.log(id)
    };

    const newPageHandler = () => {

    };

    const newQuizHandler = () => {

    };

    const dropDownOptHandler = () => {

    };

    return (
        <Box sx={{p: 1}}>
            <Typography align='center' variant='h5' sx={{mb: 2}}>Toutes les pages</Typography>
            <Stack alignItems="center" gap={1}>

                {quizzesInfos.map(quiz => (
                    <React.Fragment key={quiz.id}>
                        <Box justifyContent='space-between' alignItems='center'
                             sx={{width: '100%', borderRadius: '12px', bgcolor: 'red', display: 'flex'}}>
                            <Typography
                                align='center'
                                variant='h6'
                                sx={{pl: 2, cursor: 'pointer', 'hover': {}}}
                                onClick={() => onClickPageHandler(quiz.id)}
                            >
                                {quiz.name}
                            </Typography>
                            <IconButton onClick={dropDownOptHandler}>
                                <MoreVertIcon/>
                            </IconButton>
                        </Box>
                        <Stack alignItems='flex-start' gap={1} sx={{width: '100%'}}>
                            {quiz.pages.map(pages => (
                                <Box justifyContent='space-between' alignItems='center' key={pages.id}
                                     sx={{width: '100%', display: 'flex'}}>
                                    <Typography
                                        align='center'
                                        variant='h6'
                                        sx={{pl: 3, cursor: 'pointer', 'hover': {}}}
                                        onClick={() => onClickPageHandler(pages.id)}
                                    >
                                        Section {pages.pos}
                                    </Typography>
                                    <IconButton onClick={dropDownOptHandler}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </Box>
                            ))}
                            <Box justifyContent='space-between' alignItems='center' key={quiz.id + 1}
                                 sx={{border: 'solid', borderRadius: '12px', borderColor: 'red', width: '100%', display: 'flex'}}>
                                <Typography
                                    align='center'
                                    variant='h6'
                                    sx={{pl: 3, cursor: 'pointer', 'hover': {}}}
                                    onClick={() => newPageHandler()}
                                >
                                    Nouvelle section
                                </Typography>
                            </Box>
                        </Stack>
                    </React.Fragment>
                ))}

                <AddCircleOutlineIcon
                    fontSize='large'
                    sx={{p: 1, width: '80%', borderRadius: '12px', cursor: 'pointer'}}
                    onClick={() => newQuizHandler()}/>
            </Stack>
        </Box>
    );
}

export default React.memo(SideBar);
