import React, { useEffect, useState } from "react";
import {
    Button,
    TextField,
    Paper,
    Stack,
    Typography,
    TextareaAutosize,
} from "@mui/material";
import Box from "@mui/system/Box";
import { connect, useDispatch, useSelector } from "react-redux";
import { currentUsersApi, updateProfileApi } from "../../../../state/data-layer/users";
import { getUser } from '../../../../state/selectors';
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../../../../core/_component/image/ImageUpload";


interface FormData {
    name: string;
    password: string;
    phone: string,
    designations: string,
    address: string,
    image: string,
}

const AddUser: React.FC<RegistrationOptions> = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        password: "",
        phone: "",
        designations: "",
        address: "",
        image: ""
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (currentUser) {
            const {name, phone, designations, address, image} = currentUser;
            const fromDataUpdate = {
                name,
                password: "",
                phone,
                designations,
                address,
                image
            }
            setFormData(fromDataUpdate);
        }
        dispatch(currentUsersApi());
    }, [])

    const handleChange = (event: any) => {
        validate();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            dispatch(updateProfileApi(formData));

        }
    };

    const validate = (): boolean => {
        let errors: Partial<FormData> = {};
        if (!formData.name) {
            errors.name = "First Name is required";
        }
        if (formData.password && formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    return (
        <Paper sx={{ width: '100%', minHeight: 'calc(100vh - 64px)', padding: '15px', boxShadow: 0 }}>
            <Box sx={{ width: '50%', padding: '10px', border: '1px solid #bbbbbf', borderRadius: 'inherit' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography sx={{ flex: '1 1 100%' }}
                        variant="h6"
                    >
                        <p style={{ margin: '0', fontWeight: 800 }}>{'Edit Profile'}</p>
                        <p style={{ margin: '0', fontSize: "14px" }}>{'Edit Profile data using this form.'} </p>
                    </Typography>
                </Stack>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} >
                        <TextField size="small"
                            id="name"
                            name="name"
                            label="Name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}

                        />

                        <TextField size="small"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password || ''}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />

                        <TextareaAutosize
                            style={{
                                'font': 'inherit',
                                'letterSpacing': 'inherit',
                                'color': 'inherit',
                                'border': 0,
                                'background': 'none',
                                'height': 'auto',
                                'margin': 0,
                                'minWidth': '100%',
                                'maxWidth': '100%',
                                'paddingTop': '1px',
                                'padding': '8.5px 14px',
                                'marginTop': '10px',
                                'borderLeft': '1px', 'borderRight': '1px', 'borderBottom': '1px', 'borderTop': '1px',
                                'borderStyle': 'solid',
                                'borderRadius': '4px',
                                'borderColor': '#bdbaba'

                            }}
                            id="address"
                            name="address"
                            aria-label="Address"
                            placeholder="Address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            onError={(e) => {
                                handleChange
                            }}
                        />

                        <TextField size="small"
                            id="phone"
                            name="phone"
                            label="Phone"
                            type="text"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />

                        <TextField size="small"
                            id="designations"
                            name="designations"
                            label="Designations"
                            type="text"
                            value={formData.designations || ''}
                            onChange={handleChange}
                            error={!!errors.designations}
                            helperText={errors.designations}
                        />

                        <ImageUpload label="Upload" name={"image"} handleUpload={(e: any) => {

                        }} />

                        <Button variant="contained" color="primary" type="submit">
                            {'Update'}
                        </Button>

                        <Button variant="outlined" color="primary" type="button" onClick={() => {
                            navigate(`/`);
                        }}>
                            {'Cancel'}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Paper>
    )
}

export default AddUser;


