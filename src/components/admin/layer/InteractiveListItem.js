import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Popover,
  MenuItem,
  MenuList,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import { quizActions } from '../../../_store/_slices/quiz-slice';
import { useDispatch } from 'react-redux';

const DropDownTypography = ({ text, onClick }) => (
  <Typography
    sx={{
      cursor: 'pointer',
      pl: 2,
      transition: 'background-color 0.3s',
      borderRadius: '15px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'black',
      },
    }}
    onClick={onClick}
  >
    {text}
  </Typography>
);

const InteractiveListItem = ({
  item,
  id,
  onClickHandler,
  deleteHandler,
  isQuiz,
  selected,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const newNameHandle = (name) => {
    setNewName(name);
  };

  const renameHandler = () => {
    dispatch(
      quizActions.rename({
        isQuiz: isQuiz,
        name: newName,
      })
    );
    setNewName('');
    setIsRenaming(false);
  };

  return (
    <Stack
      direction={'row'}
      backgroundColor={
        selected
          ? isRenaming
            ? 'primary.main'
            : 'background.main'
          : 'background.main10'
      }
      color={selected && !isRenaming ? 'primary.main' : 'background.main'}
      sx={{
        width: '100%',
        borderRadius: '15px',
      }}
      onClick={onClickHandler}
    >
      {!isRenaming ? (
        <Stack
          width={'100%'}
          height={'45px'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          pl={'15px'}
        >
          <Typography fontSize={'16px'} fontWeight={'600'}>
            {item.name}
          </Typography>
          {selected && (
            <Stack direction={'row'}>
              <IconButton
                aria-describedby={id}
                color='primary'
                onClick={(event) => handleClick(event)}
              >
                <FontAwesomeIcon
                  fixedWidth
                  icon='fa-solid fa-ellipsis-vertical'
                  fontSize={16}
                />
              </IconButton>

              <Popover
                id={id}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => handleClose()}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuList>
                  <MenuItem onClick={() => setIsRenaming(true)}>
                    <FontAwesomeIcon
                      icon={'fa-solid fa-pen'}
                      fixedWidth
                      color='text.secondary'
                      opacity={0.6}
                    />
                    Renommer
                  </MenuItem>
                  <MenuItem onClick={() => deleteHandler()}>
                    <FontAwesomeIcon
                      icon={'fa-solid fa-trash'}
                      fixedWidth
                      color='text.secondary'
                      opacity={0.6}
                    />
                    Supprimer
                  </MenuItem>
                </MenuList>
              </Popover>
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack
          direction={'row'}
          width={'100%'}
          height={'45px'}
          justifyContent={'space-between'}
        >
          <TextField
            value={newName || item.name}
            onChange={(e) => newNameHandle(e.target.value)}
            placeholder={item.name}
            sx={{ input: { color: 'background.main' } }}
          />
          <IconButton onClick={() => renameHandler()} color='background'>
            <CheckIcon />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default InteractiveListItem;
