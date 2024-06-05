import { Card, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useCallback } from 'react';

const ChoicesText = ({ label, updateOption, index }) => {
  const handleLabelChange = useCallback(
    (e) => {
      updateOption(e.target.value, index);
    },
    [updateOption, index]
  );

  return (
    <FormControlLabel
      control={<Checkbox disabled />}
      label={
        <TextField
          value={label}
          onChange={handleLabelChange}
          placeholder='Entrez un nouveau choix'
          multiline
          sx={{ width: '400px' }}
        />
      }
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    />
  );
};

export default ChoicesText;
