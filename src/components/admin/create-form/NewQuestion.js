import {
  Card,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import HideImageIcon from '@mui/icons-material/HideImage';
import Choices from './Choices';
import Cursor from './Cursor';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const Pending = () => <></>;

const COMPONENT_MAP = {
  'Choix unique': Choices,
  'Choix multiple': Choices,
  Libre: Pending,
  Curseur: Cursor,
};

const QType = ['Choix unique', 'Choix multiple', 'Libre', 'Curseur'];

const NewQuestion = forwardRef(({ index, sectionInfos, handleClose }, ref) => {
  const [questionData, setQuestionData] = useState({
    type: '',
    enonce: '',
    image: {},
    choices: [],
  });
  const fileInputRef = useRef(null);

  const Component = COMPONENT_MAP[questionData.type] || Pending;

  useEffect(() => {
    setQuestionData({
      ...sectionInfos,
      type: sectionInfos.type || 'Choix unique',
      enonce: sectionInfos.description || '',
      image: sectionInfos.image || {},
      choices:
        sectionInfos.choices?.length > 0
          ? [
              ...sectionInfos.choices?.map((choice) => ({
                ...choice,
                type: sectionInfos.type,
              })),
              ...getDefaultChoices(sectionInfos.type),
            ]
          : getDefaultChoices(),
    });
  }, [index, sectionInfos]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      return {
        ...questionData,
        choices: questionData.choices.filter(
          (choice) => choice.type === questionData.type
        ),
      };
    },
  }));

  const getDefaultChoices = (type = null) => {
    const defaults = {
      'Choix unique': [
        { type: 'Choix unique', text: '', image_src: {}, id: 1 },
        { type: 'Choix unique', text: '', image_src: {}, id: 2 },
      ],
      'Choix multiple': [
        { type: 'Choix multiple', text: '', image_src: {}, id: 1 },
        { type: 'Choix multiple', text: '', image_src: {}, id: 2 },
      ],
      Curseur: [{ type: 'Curseur', min: 0, max: 5, step: 0.5 }],
    };

    if (type)
      return Object.entries(defaults).reduce((acc, [key, value]) => {
        if (key !== type) {
          acc = acc.concat(value);
        }
        return acc;
      }, []);
    else
      return Object.entries(defaults).reduce((acc, [_, value]) => {
        return acc.concat(value);
      }, []);
  };

  const selectChangeHandler = (value) => {
    setQuestionData((prevState) => ({
      ...prevState,
      type: value,
    }));
  };

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif')
    ) {
      const fileUrl = URL.createObjectURL(file);

      const fileInfo = {
        file,
        fileName: file.name,
        fileType: file.type,
        fileUrl,
      };

      setQuestionData((prevState) => ({ ...prevState, image: fileInfo }));
    } else {
      alert('Seulement les images sont autorisées.');
    }
  };

  const buttonClickHandler = () => {
    fileInputRef.current.click();
  };

  const deleteHandler = () => {
    setQuestionData((prevState) => ({ ...prevState, image: {} }));
  };

  const updateChoices = (newChoices) => {
    setQuestionData((prevState) => {
      if (newChoices.length > 0 && newChoices[0].type) {
        const filteredChoices = prevState.choices.filter(
          (choice) => choice.type !== newChoices[0].type
        );
        return {
          ...prevState,
          choices: [...filteredChoices, ...newChoices],
        };
      }
      return prevState;
    });
  };

  return (
    <Card sx={{ padding: 2, margin: 2, borderRadius: '15px' }}>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item container xs={12}>
          <Grid
            item
            xs={7}
            sx={{
              border: 'solid',
              borderColor: 'blue',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant='h5' sx={{ fontWeight: 'bold', pl: 2 }}>
              Question {questionData.order}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-end', pl: 3, pr: 3 }}
          >
            <FormControl fullWidth>
              <Select
                value={questionData.type || ''}
                size='small'
                onChange={(e) => selectChangeHandler(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{
                  border: 'solid',
                  borderColor: 'blue',
                  borderRadius: '15px',
                  '& > fieldset': { border: 'none' },
                }}
              >
                {QType.map((type, index) => (
                  <MenuItem value={type} key={index}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Card
              sx={{
                border: 'solid',
                borderColor: 'blue',
                borderRadius: '15px',
                height: 'fit-content',
              }}
            >
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Card>
          </Grid>
        </Grid>
        <Grid item container xs={12} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Enoncé
            </Typography>
          </Grid>
          <Grid item xs={11} sx={{ pr: 3 }}>
            <TextField
              focused={false}
              sx={{
                border: 'solid',
                borderColor: 'blue',
                borderRadius: '15px',
              }}
              size='small'
              fullWidth
              multiline
              variant='outlined'
              value={questionData.enonce ? questionData.enonce : ''}
              onChange={(e) =>
                setQuestionData((prevState) => ({
                  ...prevState,
                  enonce: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Card
              sx={{
                border: 'solid',
                borderColor: 'blue',
                borderRadius: '15px',
                height: 'fit-content',
              }}
            >
              <input
                type='file'
                ref={fileInputRef}
                onChange={imageChangeHandler}
                style={{ display: 'none' }}
              />
              {Object.keys(questionData.image).length === 0 ? (
                <IconButton onClick={buttonClickHandler}>
                  <ImageIcon />
                </IconButton>
              ) : (
                <IconButton onClick={deleteHandler}>
                  <HideImageIcon />
                </IconButton>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Component
            choices={questionData.choices.filter(
              (choice) => choice.type === questionData.type
            )}
            updateChoices={updateChoices}
          />
        </Grid>
      </Grid>
    </Card>
  );
});

export default NewQuestion;
