import React from 'react';
import { Form } from 'react-final-form';
import { reqCreateUser } from 'services/user.service';
import { TextField } from 'mui-rff';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
const Register: React.FC = () => {
  const handleRegister = (
    values: Partial<unknown>,
    form: { reset: (data: Partial<unknown>) => void }
  ) => {
    return reqCreateUser(values).then(() => {
      setTimeout(() => {
        form.reset({});
      }, 100);
    });
  };
  return (
    <Form
      onSubmit={handleRegister}
      render={({ handleSubmit, pristine }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="First Name"
            placeholder="Enter First Name"
          />
          <TextField
            name="lastName"
            label="Last Name"
            placeholder="Enter Last Name"
          />
          <TextField name="age" label="Age" placeholder="Enter Age" />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              disabled={pristine}
              fullWidth
            >
              บันทึกข้อมูล
            </Button>
          </Box>
        </form>
      )}
    />
  );
};

export default Register;
