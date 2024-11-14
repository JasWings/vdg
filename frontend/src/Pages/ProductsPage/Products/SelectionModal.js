import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  IconButton,
} from '@mui/material';
import { Male, Female, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const iconStyle = {
  fontSize: 50,
};

const SelectionModal = ({ open, handleClose, onSelect }) => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'gender') {
      setGender(value);
    } else if (name === 'age') {
      setAge(value);
    }
  };

  const handleSubmit = () => {
    if (!gender || !age) {
      setError('Please fill in all fields.');
      return;
    }
    onSelect({ gender, age });
    handleClose();
  };

  const handleModalClose = () => {
    handleClose();
    setError(''); 
    navigate('/'); 
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableEscapeKeyDown
      BackdropProps={{ onClick: (e) => e.stopPropagation() }} 
    >
      <Box sx={modalStyle}>
        <IconButton
          onClick={handleModalClose}
          sx={{ position: 'absolute', top: 10, right: 10 }}
          aria-label="close"
        >
          <Close />
        </IconButton>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Choose Your Options
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={handleChange}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  value="boy"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <Male sx={iconStyle} />
                      <Typography sx={{ ml: 1 }}>Male</Typography>
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="girl"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <Female sx={iconStyle} />
                      <Typography sx={{ ml: 1 }}>Female</Typography>
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
        <TextField
          label="Age"
          type="number"
          fullWidth
          variant="outlined"
          name="age"
          value={age}
          onChange={handleChange}
          sx={{ mb: 2 }}
          inputProps={{ min: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ width: '100%' }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default SelectionModal;
