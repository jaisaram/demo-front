import React, { useEffect, useState } from "react";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Paper,
    styled,
    Stack,
    Typography,
    TextareaAutosize,
} from "@mui/material";
import Box from "@mui/system/Box";
import { connect } from "react-redux";
import { addUsersApi, updateUsersApi } from "../../../../state/data-layer/users";
import { addUpdateSuccess, fetchRolesSelector, fetchUsers } from '../../../../state/selectors';
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../../../../core/_component/image/ImageUpload";
import { fetchRolesApi } from "../../../../state/data-layer/roles";
import { addUpdateSuccessAction } from "../../../../state/data-slices/userSlice";


interface FormData {
    name: string;
    email: string;
    password: string;
    role: string,
    phone: string,
    designations: string,
    address: string,
    image: string,
    type: string,
    status: string;
}

const AddProfile: React.FC<RegistrationOptions> = (props: any) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        designations: "",
        address: "",
        image: "",
        type: "",
        status: "",
    });
    const [isEditMode, setIsEditMode] = useState<Boolean>();
    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (props.path && props.users && props.users.length) {
            const pathArr = props.path.replace(/^\/|\/$/g, '').split('/').slice();
            if (pathArr.indexOf('user') > -1 && pathArr.indexOf('edit') > -1) {
                setIsEditMode(true);
                const user = props.users.filter((obj: any) => obj.id === Number(pathArr[2]));
                if (user.length) {
                    const cuser = Object.assign({}, user[0]);
                    if (cuser && cuser.role)  cuser.role = cuser.role.id;
                    setFormData(cuser);
                }
            }

        }
        props.fetchRoleApi({ limit: 20, page: 1});
        
    }, [])

    useEffect(()=>{
        if(props.addUpdateSuccess) {
            setFormData({
                   name: "",
                   email: "",
                   password: "",
                   role: "",
                   phone: "",
                   designations: "",
                   address: "",
                   image: "",
                   type: "",
                   status: "",
               });
               props.addUpdateSuccessAction(false)
               navigate('/user/list');
       }
    })

    const handleChange = (event: any) => {
        validate();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            if (isEditMode) {
                props.updateUsersApi(formData);
            } else {
                props.addUsersApi(formData);
            }

        }
    };

    const validate = (): boolean => {
        let errors: Partial<FormData> = {};
        if (!formData.name) {
            errors.name = "First Name is required";
        }

        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email address";
        }
        if (!formData.password && !isEditMode) {
            errors.password = "Password is required";
        } else if (formData.password && formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }
        if (!formData.role) {
            errors.role = "Role is required";
        }
        if (!formData.status) {
            errors.status = "Status is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    return (
        <Paper sx={{ width: '100%', minHeight: 'calc(100vh - 64px)', padding: '15px', boxShadow: 0 }}>
            <Box sx={{ width: '50%', padding: '10px', border: '1px solid #bbbbbf',borderRadius: 'inherit'}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography sx={{ flex: '1 1 100%' }}
                        variant="h6"
                    >
                        <p style={{ margin: '0', fontWeight: 800 }}>{!isEditMode ? 'Add User' : 'Edit User'}</p>
                        <p style={{ margin: '0', fontSize: "14px" }}>{!isEditMode ? 'Add user data using this form.' : 'Edit user data using this form.'} </p>
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
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            
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

                        <FormControl size="small" fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                value={formData.role || ''}
                                label="Role"
                                name="role"
                                error={!!errors.role}
                                onChange={(e) => handleChange(e)}
                            >
                                {props.roles.length && props.roles.map((role:any)=>{
                                    return (
                                        <MenuItem selected={formData.role === role.id} key={role.id} value={role.id}>{role.name}</MenuItem>
                                    )

                                })}
                            </Select>
                            {errors.role && <FormHelperText error={true}>{errors.role}</FormHelperText>}
                        </FormControl>

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

                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.status || ''}
                                label="Status"
                                name="status"
                                onChange={(e) => handleChange(e)}
                                error={!!errors.status}
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="disable">Disable</MenuItem>
                            </Select>
                            {errors.status && <FormHelperText error >{errors.status}</FormHelperText>}
                        </FormControl>


                        <Button variant="contained" color="primary" type="submit">
                            {!isEditMode ? 'Save' : 'Update'}
                        </Button>

                        <Button variant="outlined" color="primary" type="button" onClick={() => {
                            navigate(`/user/list`);
                        }}>
                            {'Cancel'}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Paper>
    )
}
const mapStateToProps = (state: any) => ({
    users: fetchUsers(state),
    roles: fetchRolesSelector(state),
    addUpdateSuccess: addUpdateSuccess(state)
})

const mapDispatchState = (dispatch: any) => {
    return {
        addUsersApi: (payload: any) => dispatch(addUsersApi(payload)),
        updateUsersApi: (payload: any) => dispatch(updateUsersApi(payload)),
        fetchRoleApi: (payload: any) => dispatch(fetchRolesApi(payload)),
        addUpdateSuccessAction: (payload: any) => dispatch(addUpdateSuccessAction(payload)),



    };
};
export default connect(mapStateToProps, mapDispatchState)(AddProfile)

