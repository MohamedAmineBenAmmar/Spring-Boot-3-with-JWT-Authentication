import React, { useState } from 'react';
import {
    Button, Modal, Fade, TextField, Box, Typography, IconButton,
} from '@mui/material';
import Icon from "@mui/material/Icon";

export default function EditModal(props) {
    const [formState, setFormState] = useState({
        email: '',
        firstname: '',
        lastname: '',
        role: '',
      })

      const handleFormChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setFormState(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const { email, firstname, lastname, role } = formState;
        // TODO make validation of empty fields
        const formData = {
          email,
          firstname, 
          lastname, 
          role
        };
        fetch('http://localhost:8080/api/user/' + props.item.id, {
          method: 'PUT',
          body: formData
        })
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton variant="contained" color="warning" onClick={handleOpen}>
                <Icon fontSize="medium">edit</Icon>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,

                }}
            >
                <Fade in={open}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <Box sx={{ p: 4, backgroundColor: '#f0f0f0'}}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2,
                                }}
                            >
                                <Typography variant="h4">Form Title</Typography>
                                <IconButton onClick={handleClose}>
                                    <Icon fontSize="small">logout</Icon>
                                </IconButton>
                            </Box>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    name='firstname'
                                    label="First name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    placeholder={props.item.firstname}
                                    value={formState.firstname}
        onChange={handleFormChange}
                                    
                                />
                                <TextField
                                name='lastname'
                                    label="Last name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    placeholder={props.item.lastname}
                                    value={formState.lastname}
        onChange={handleFormChange}
                                />
                                <TextField
                                name='email'
                                    label="Email"
                                    variant="outlined"
                                    type='Email'
                                    fullWidth
                                    margin="normal"
                                    placeholder={props.item.email}
                                    value={formState.email}
        onChange={handleFormChange}
                                />
                                <TextField
                                name='role'
                                    label="Role"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    placeholder={props.item.role}
                                    value={formState.role}
        onChange={handleFormChange}
                                />
                                <Button variant="contained" color="primary" type="submit" onClick={handleClose}>
                                    Submit
                                </Button>
                            </form>
                        </Box>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
