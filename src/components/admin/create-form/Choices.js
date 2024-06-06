import { Button, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChoicesText from './ChoicesText';
import ChoicesImage from './ChoicesImage';

const Choices = ({ choices, updateChoices }) => {
  const [choicesMode, setChoicesMode] = useState(!choices.some(choice => typeof choice.image_src === 'string'));

  const addChoice = () => {
    const updateChoicesNicely = () => {
      const updatedChoices = [
        ...choices,
        {
          type: choices[0].type,
          text: '',
          image_src: {},
          id: choices.length + 1,
        },
      ];
      const reIndexedChoices = updatedChoices.map((choice, index) => ({
        ...choice,
        id: index,
      }));
      updateChoices(reIndexedChoices);
    };

    if (choicesMode && choices.length <= 7) updateChoicesNicely();
    else if (!choicesMode && choices.length <= 3) updateChoicesNicely();
  };

  const updateOption = (newText, index) => {
    const updatedChoices = choices.map((choice) =>
      choice.id === index ? { ...choice, text: newText } : choice
    );
    updateChoices(updatedChoices);
  };

  const updateChoiceImage = (id, imgData) => {
    const updatedChoices = choices.map((choice) =>
      choice.id === id ? { ...choice, image_src: imgData } : choice
    );
    updateChoices(updatedChoices);
  };

  const deleteHandler = (choiceId) => {
    if (choices.length - 1 > 1) {
      const reducedChoices = choices.filter((choice) => choice.id !== choiceId);
      const reIndexedChoices = reducedChoices.map((choice, index) => ({
        ...choice,
        id: index,
      }));
      updateChoices(reIndexedChoices);
    }
  };

  const selectTextHandler = () => setChoicesMode(true);
  const selectImageHandler = () => setChoicesMode(false);

  return (
    <Grid container sx={{ mt: 2, width: '100%' }}>
      <Grid item xs={12} gap={1} sx={{ display: 'flex' }}>
        <Button
          color='secondary'
          variant='contained'
          startIcon={<FontAwesomeIcon icon={'fa-solid fa-square-check'} />}
          onClick={selectTextHandler}
          sx={{ opacity: choicesMode ? '100%' : '75%' }}
        >
          Text
        </Button>
        <Button
          color='secondary'
          variant='contained'
          startIcon={<FontAwesomeIcon icon={'fa-solid fa-image'} />}
          onClick={selectImageHandler}
          sx={{ opacity: choicesMode ? '75%' : '100%' }}
        >
          Image
        </Button>
      </Grid>
      {choicesMode ? (
        <>
          {choices.map((choice) => (
            <Grid item container key={choice.id} xs={12} sx={{ mt: 1 }}>
              <Grid item>
                <ChoicesText
                  label={choice.text}
                  updateOption={updateOption}
                  index={choice.id}
                />
              </Grid>
              <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => deleteHandler(choice.id)}>
                  <FontAwesomeIcon
                    fixedWidth
                    icon={'fa-solid fa-xmark'}
                    fontSize={20}
                  />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddCircleOutlineIcon fontSize='large' onClick={addChoice} />
          </Grid>
        </>
      ) : (
        <>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              ml: 1,
              mt: 1,
              width: '100%',
            }}
          >
            {choices.map((choice) => (
              <ChoicesImage
                key={choice.id}
                image_url={choice.image_src?.fileUrl || choice.image_src}
                updateChoiceImage={(imgData) =>
                  updateChoiceImage(choice.id, imgData)
                }
                deleteHandler={() => deleteHandler(choice.id)}
              />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddCircleOutlineIcon fontSize='large' onClick={addChoice} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Choices;
