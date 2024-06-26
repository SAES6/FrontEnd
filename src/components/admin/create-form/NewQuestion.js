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
import { theme } from '../../../theme';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Choices from './Choices';
import Cursor from './Cursor';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

const Pending = () => <></>;

const COMPONENT_MAP = {
  'Choix unique': Choices,
  'Choix multiple': Choices,
  Libre: Pending,
  Curseur: Cursor,
};

const QType = [
  { label: 'Choix unique', icon: 'fa-solid fa-bullseye' },
  { label: 'Choix multiple', icon: 'fa-solid fa-list-check' },
  { label: 'Libre', icon: 'fa-solid fa-feather' },
  { label: 'Curseur', icon: 'fa-solid fa-sliders' },
];

const NewQuestion = forwardRef(({ index, sectionInfos, handleClose }, ref) => {
  const muiTheme = useTheme(theme);

  const [questionData, setQuestionData] = useState({
    title: `Question ${index + 1}`,
    type: '',
    description: '',
    image: {},
    choices: [],
  });
  const fileInputRef = useRef(null);

  const Component = COMPONENT_MAP[questionData.type] || Pending;

  useEffect(() => {
    setQuestionData({
      ...sectionInfos,
      type: sectionInfos.type || 'Choix unique',
      description: sectionInfos.description || '',
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
      Curseur: [{ type: 'Curseur', slider_min: 0, slider_max: 5, slider_gap: 0.5 }],
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

  const handleChangeTitle = (value) => {
    setQuestionData((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  const imageChangeHandler = (event) => {
    const fileTotal = event.target.files[0];
    console.log('file', fileTotal);

    if (
      fileTotal &&
      (fileTotal.type === 'image/jpeg' ||
        fileTotal.type === 'image/jpg' ||
        fileTotal.type === 'image/png' ||
        fileTotal.type === 'image/gif')
    ) {
      const fileUrl = URL.createObjectURL(fileTotal);

      const fileInfo = {
        file: fileTotal,
        fileName: fileTotal.name,
        fileType: fileTotal.type,
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
        if (newChoices[0].type === 'Curseur')
          return {
            ...prevState,
            slider_min: newChoices[0].slider_min,
            slider_max: newChoices[0].slider_max,
            slider_gap: newChoices[0].slider_gap
          };

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
    <Grid container>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item container xs={12}>
          <Grid
            item
            xs={7}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              sx={{
                input: {
                  fontWeight: '600 !important',
                  fontSize: '24px !important',
                },
              }}
              fullWidth
              value={questionData.title}
              onChange={(e) => handleChangeTitle(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-end', pl: 3, pr: 3 }}
          >
            <FormControl fullWidth>
              <Select
                value={QType.find((q) => q.label === questionData.type) || ''}
                onChange={(e) => {
                  selectChangeHandler(e.target.value.label);
                }}
                displayEmpty
                renderValue={(value) =>
                  value === '' ? (
                    <Typography
                      sx={{ color: 'text.secondary', fontSize: '16px' }}
                    >
                      Type de question
                    </Typography>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={`fa-fw ${value?.icon}`}
                        fixedWidth
                        color={muiTheme.palette.text.secondary}
                      />
                      {value?.label}
                    </>
                  )
                }
                sx={{ height: '100%' }}
              >
                {QType.map((type, index) => (
                  <MenuItem value={type} key={index}>
                    <FontAwesomeIcon
                      icon={`fa-fw ${type?.icon}`}
                      fixedWidth
                      color={muiTheme.palette.text.secondary}
                    />
                    {type?.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                border: '1px solid',
                borderColor: muiTheme.palette.secondary.main,
                borderRadius: '15px',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
                aspectRatio: '1/1',
              }}
            >
              <IconButton onClick={handleClose}>
                <FontAwesomeIcon
                  fixedWidth
                  icon={'fa-solid fa-xmark'}
                  fontSize={20}
                />
              </IconButton>
            </Card>
          </Grid>
        </Grid>
        <Grid item container xs={12} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
              Enoncé
            </Typography>
          </Grid>
          <Grid item xs={11} sx={{ pr: 3 }}>
            <TextField
              focused={false}
              fullWidth
              multiline
              placeholder='Rédigez votre question'
              value={questionData.description ? questionData.description : ''}
              onChange={(e) =>
                setQuestionData((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                border: '1px solid',
                borderColor: muiTheme.palette.secondary.main,
                borderRadius: '15px',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
                aspectRatio: '1/1',
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
                  <FontAwesomeIcon
                    fixedWidth
                    icon={'fa-solid fa-image'}
                    fontSize={20}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={deleteHandler}>
                  <FontAwesomeIcon
                    fixedWidth
                    icon={'fa-solid fa-images'}
                    fontSize={20}
                  />
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
                  choice => choice.type === questionData.type
              )}
              updateChoices={updateChoices}
              {...(questionData.type === 'Curseur' ? {
                  sliderData: {
                    type:questionData.type,
                      slider_min: questionData.slider_min,
                      slider_max: questionData.slider_max,
                      slider_gap: questionData.slider_gap
                  }
              } : {})}
          />
        </Grid>
      </Grid>
    </Grid>
  );
});

export default NewQuestion;
