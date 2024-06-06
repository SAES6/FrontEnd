import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Popover,
  MenuItem,
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
      backgroundColor={selected ? 'background.main' : 'background.main10'}
      color={selected ? 'primary.main' : 'background.main'}
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
                <DropDownTypography
                  text='Renommer'
                  onClick={() => setIsRenaming(true)}
                />
                <DropDownTypography
                  text='Supprimer'
                  onClick={() => deleteHandler()}
                />
              </Popover>
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack padding={'10px 15px'}>
          <TextField
            value={newName || item.name}
            onChange={(e) => newNameHandle(e.target.value)}
            placeholder={item.name}
            variant='standard'
            sx={{ flexGrow: 1, pr: 1, pl: 3, width: '80%' }}
            size='small'
          />
          <IconButton onClick={() => renameHandler()} sx={{ width: '20%' }}>
            <CheckIcon />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default InteractiveListItem;
