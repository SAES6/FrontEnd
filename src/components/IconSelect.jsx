import { Select } from '@mui/material';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconSelect = ({ value, onChange, ...props }) => {
  const selectChangeHandler = (value) => {
    onChange(value);
  };

  return (
    <Select
      value={value || ''}
      size='small'
      onChange={(e) => selectChangeHandler(e.target.value)}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
      IconComponent={() => (
        <FontAwesomeIcon
          icon={faChevronDown}
          fixedWidth
          style={{
            fontSize: '16px',
            pointerEvents: 'none',
          }}
        />
      )}
      {...props}
    />
  );
};

export default IconSelect;
