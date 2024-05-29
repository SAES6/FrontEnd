import React, {useState} from 'react';
import {Box, Typography, IconButton, TextField} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import {quizActions} from "../../../_store/_slices/quiz-slice";
import {useDispatch} from "react-redux";

const DropDownTypography = ({text, onClick}) => (
    <Typography
        sx={{
            cursor: 'pointer',
            pl: 2,
            transition: 'background-color 0.3s',
            borderRadius: '15px',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                color: 'black'
            }
        }}
        onClick={onClick}
    >
        {text}
    </Typography>
);

const InteractiveListItem = ({item, onClickHandler, deleteHandler, moreSx}) => {
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(item.name);

    const dispatch = useDispatch();

    const newNameHandle = (name) => {
        setNewName(name);
    };

    const renameHandler = () => {
        dispatch(quizActions.rename(newName || 'Nouvelle section'));
        setNewName('');
        setIsRenaming(false);
    };

    return (
        <Box sx={{width: '100%'}} key={item.id}>
            <Box justifyContent="space-between" alignItems="center"
                 sx={{
                     ...moreSx.box,
                     width: '100%', borderRadius: '15px', display: 'flex',
                     transition: 'background-color 0.3s',
                     '&:hover': {
                         backgroundColor: 'rgba(0, 0, 0, 0.2)',
                         color: 'black'
                     }
                 }}
                 onClick={onClickHandler}>
                {!isRenaming ?
                    <>
                        <Typography
                            align="left"
                            variant="h6"
                            sx={{...moreSx.typo, cursor: 'pointer', width: '80%'}}>
                            {item.name}
                        </Typography>
                        <IconButton>
                            <MoreHorizIcon/>
                        </IconButton>
                    </>
                    :
                    <>
                        <TextField
                            value={newName || item.name}
                            onChange={(e) => newNameHandle(e.target.value)}
                            placeholder={item.name}
                            variant="standard"
                            sx={{flexGrow: 1, pr: 1, pl: 3, width: '80%'}}
                            size="small"
                        />
                        <IconButton onClick={() => renameHandler()} sx={{width: '20%'}}>
                            <CheckIcon/>
                        </IconButton>
                    </>
                }
            </Box>
            {item.dropdownOpen && (
                <Box sx={{width: '100%'}}>
                    <DropDownTypography text="Renommer" onClick={() => setIsRenaming(true)}/>
                    <DropDownTypography text="Supprimer" onClick={() => deleteHandler()}/>
                </Box>
            )}
        </Box>
    )
};

export default InteractiveListItem;
