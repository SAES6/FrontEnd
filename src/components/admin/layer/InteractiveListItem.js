import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  TextField,
  MenuList,
  Popover,
  Stack,
  MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { renameQuizOrSection } from '../../../_store/_actions/quiz-actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    dispatch(renameQuizOrSection(isQuiz, item.id, newName));
    setNewName('');
    setIsRenaming(false);
  };

  return (
    <Stack
      direction={'row'}
      backgroundColor={
        isRenaming
          ? 'none'
          : !selected && isQuiz
          ? 'background.main10'
          : selected && isQuiz
          ? 'background.main'
          : 'none'
      }
      color={
        isRenaming || !isQuiz
          ? 'background.main'
          : isQuiz && !selected
          ? 'background.main'
          : 'primary.main'
      }
      sx={{
        width: '100%',
        borderRadius: '15px',
        opacity: !isQuiz && !selected ? 0.75 : 1,
        cursor: 'pointer',
      }}
      onClick={onClickHandler}
    >
      {!isRenaming ? (
        <Stack
          width={'100%'}
          height={isQuiz ? '45px' : '35px'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          pl={isQuiz ? '15px' : '25px'}
        >
          <Typography fontSize={'16px'} fontWeight={'600'}>
            {item.name}
          </Typography>
          {selected && (
            <Stack direction={'row'}>
              <IconButton
                aria-describedby={id}
                color={isQuiz ? 'primary' : 'background'}
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
          spacing={1}
          width={'100%'}
          height={isQuiz ? '45px' : '35px'}
          justifyContent={'space-between'}
          alignItems={'center'}
          pl={!isQuiz ? '10px' : 'inherit'}
        >
          <TextField
            value={newName || item.name}
            onChange={(e) => newNameHandle(e.target.value)}
            placeholder={item.name}
            sx={{
              input: { color: 'background.main' },
            }}
          />
          <IconButton onClick={() => renameHandler()} color='background'>
            <FontAwesomeIcon
              icon={'fa-solid fa-check'}
              fixedWidth
              fontSize={20}
            />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default InteractiveListItem;
