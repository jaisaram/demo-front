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
    Stack,
    Typography,
    FormControlLabel,
    Checkbox,
    Grid,
} from "@mui/material";
import Box from "@mui/system/Box";
import { connect } from "react-redux";
import { createRoleApi, rolePermissionsApi, updateRoleApi } from "../../../../state/data-layer/roles";
import { addRoleSuccess, fetchRolesSelector, getUser, rolePermissions } from '../../../../state/selectors';
import { recievedSuccess } from '../../../../state/data-slices/roleSlice';
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { errorNotice } from '@/core/state/actions';

interface FormData {
    name: string;
    status: string;
    permissions: []
}

const AddRole: React.FC<RegistrationOptions> = (props: any) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        name: "",
        status: "",
        permissions: []
    });
    const [rolePermissions, setRolePermissions] = React.useState([]);
    const [isEditMode, setIsEditMode] = useState<Boolean>();
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [disableCheck, setDisableCheck] = React.useState(false);


    useEffect(() => {
        if (props.currentUser && props.currentUser.type !== 'admin') {
            props.errorNotice('You do not have permissions to add or update roles. please contact to Admin.')
            navigate('/user/role');
        }
        props.rolePermissionsApi();
        if (props.path && props.roles && props.roles.length) {
            const pathArr = props.path.replace(/^\/|\/$/g, '').split('/').slice();
            if (pathArr.indexOf('role') > -1 && pathArr.indexOf('edit') > -1) {
                setIsEditMode(true);
            }
        }

        if (props.permissions && Object.keys(props.permissions).length) {
            const listOfCheck: any = [];
            Object.keys(props.permissions).forEach((items) => {
                const permItems: [] = props.permissions[items];
                const itemPermission: { name: string, checked: boolean, items: any[] } = { name: items, checked: true, items: [] }
                permItems.forEach(element => {
                    const name: string = element;
                    itemPermission.items.push({ name, checked: true });
                });
                listOfCheck.push(itemPermission);
            });
            if (listOfCheck.length > 0) {
                setRolePermissions(listOfCheck);
            }
        }
    }, []);

    useEffect(() => {
        if (props.addRoleSuccess) {
            setFormData({
                name: "",
                status: "",
                permissions: []
            });
            props.recievedSuccess(false);
            navigate('/user/role');
        }

    });

    useEffect(() => {
        if (isEditMode && props.permissions && Object.keys(props.permissions).length && rolePermissions && rolePermissions.length) {
            const pathArr = props.path.replace(/^\/|\/$/g, '').split('/').slice();
            const role = props.roles.filter((obj: any) => obj.id === Number(pathArr[3]));
            if (role.length) {
                setFormData(role[0]);
                const arrOfKeys = rolePermissions.map(((n: { name: any; }) => n && n.name));
                const arrOfSavedKeys = role[0].permissions.map(((n: { name: any; }) => n && n.name));
                let updateRole: any = [...role[0].permissions];

                if (arrOfKeys.length > arrOfSavedKeys.length) {
                    rolePermissions.forEach((n: any) => {
                        if ( n && n.name && arrOfSavedKeys.indexOf(n.name) === -1 ) {
                            updateRole = [...updateRole, n];
                        }

                    });
                }
                if (arrOfKeys.length < arrOfSavedKeys.length) {
                    const filterArr = updateRole.filter((n: any, i: number) =>n && arrOfKeys.indexOf(n.name) !== -1);
                    setRolePermissions(filterArr);
                }
               
            }
            if (role.length && role[0].name && role[0].name === 'Administrator') {
                setDisableCheck(true);
            }
        }
    }, [isEditMode])

    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate() && (!disableCheck || props.currentUser.type === 'admin')) {
            if (isEditMode) {
                const body = { ...formData, ...{ permissions: rolePermissions } };
                props.updateRoleApi(body);
            } else {
                const body = { ...formData, ...{ permissions: rolePermissions } };
                props.addRoleApi(body);

            }

        }
    };

    const validate = (): boolean => {
        let errors: Partial<FormData> = {};
        if (!formData.name) {
            errors.name = "First Name is required";
        }



        if (!formData.status) {
            errors.status = "Status is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>, parent: string) => {
        const allPermissions = props.permissions;
        if (allPermissions && (allPermissions[event.target.name] || allPermissions[parent]) && !disableCheck) {
            const permissions = [...rolePermissions];
            const listOfCheck: any = [];
            permissions.forEach((items: any, i: any) => {
                if (items.name === event.target.name && !parent) {
                    const objParent: any = { name: items.name, checked: !items.checked, items: [] };
                    items.items.forEach((item: { name: string, checked: boolean; }) => {
                        objParent.items.push({ name: item.name, checked: !items.checked });
                    });
                    listOfCheck.push(objParent);
                } else if (parent && parent === items.name) {
                    const objParent: any = { name: items.name, checked: false, items: [] };
                    items.items.forEach((item: { name: string, checked: boolean; }) => {
                        if (item.name === event.target.name && parent === items.name) {
                            objParent.items.push({ name: item.name, checked: !item.checked })
                        } else {
                            objParent.items.push({ name: item.name, checked: item.checked })
                        }
                    });
                    if (objParent && objParent.items && objParent.items.filter((n: any) => n.checked).length === items.items.length) {
                        objParent.checked = true;
                    }
                    listOfCheck.push(objParent);
                } else {
                    const objParent: any = { name: items.name, checked: items.checked ? true : false, items: [] };
                    items.items.forEach((item: { name: string, checked: boolean; }) => {
                        objParent.items.push({ name: item.name, checked: item.checked });
                    });
                    listOfCheck.push(objParent);
                }

            })
            setRolePermissions(listOfCheck);
        }
    };

    return (
        <Paper  sx={{ width: '100%', minHeight: 'calc(100vh - 64px)', padding: '15px', boxShadow: 0 }}>
            <Box sx={{ width: '50%', padding: '10px', border: '1px solid #bbbbbf', borderRadius: 'inherit' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography sx={{ flex: '1 1 100%' }}
                        variant="h6"
                    >
                        <p style={{ margin: '0', fontWeight: 800 }}>{!isEditMode ? 'Add Role' : 'Edit Role'}</p>
                        <p style={{ margin: '0', fontSize: "14px" }}>{!isEditMode ? 'Add Role data using this form.' : 'Edit Role data using this form.'} </p>
                    </Typography>
                </Stack>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} >
                        <TextField size="small"
                            id="name"
                            name="name"
                            label="Name"
                            InputProps={{
                                readOnly: disableCheck,
                            }}
                            value={formData.name || ''}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}

                        />

                        <Typography variant="subtitle1" gutterBottom>
                            <p style={{ margin: '0', fontWeight: 700 }}>{'Select Permissions'}</p>
                            <p style={{ margin: '0', fontSize: "14px" }}>{'Select Permissions'} </p>

                        </Typography>
                        
                        <Grid container direction="row"
                            justifyContent="inherit"
                            alignItems="inherit" columns={{ xs: 4, sm: 8, md: 12 }} spacing={1} rowSpacing={3}>

                            {rolePermissions && rolePermissions.map((items: any, i: number) => {
                                const permission: [] = items && items.items && items.items.length ? items.items : [];
                                const allCheckedLength = items && items.items && items.items.length ? items.items.filter((n: { checked: any; }) => n.checked).length : 0
                                return (
                                    <Grid key={i} item xs >
                                        <FormControlLabel
                                            label={<Typography sx={{ fontWeight: 800 }}>{items && items.name}</Typography>}
                                            sx={{ fontWeight: 'bold' }}
                                            control={
                                                <Checkbox name={items && items.name}
                                                    readOnly={disableCheck}
                                                    checked={items && items.checked ? items.checked : false}
                                                    indeterminate={allCheckedLength > 0 && allCheckedLength !== items.items.length}
                                                    onChange={(e) => {
                                                        handleChange1(e, '');
                                                    }}
                                                />
                                            }
                                        />
                                        {permission && permission.length && permission.map((item: any, n: number) => {
                                            return (
                                                <Grid item key={i + '_' + n} sx={{ ml: 3 }}>
                                                    <FormControlLabel
                                                        label={item.name}
                                                        control={<Checkbox name={item.name} readOnly={disableCheck} checked={item.checked}
                                                            onChange={(e) => {
                                                                handleChange1(e, items.name);
                                                            }} />}
                                                    />
                                                </Grid>
                                            );
                                        })}

                                    </Grid>

                                )
                            })}
                        </Grid>
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
                                readOnly={disableCheck}
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="disable">Disable</MenuItem>
                            </Select>
                            {errors.status && <FormHelperText error={true}>{errors.status}</FormHelperText>}
                        </FormControl>


                        <Button variant="contained" disabled={disableCheck && props.currentUser.type !== 'admin'} color="primary" type="submit">
                            {!isEditMode ? 'Save' : 'Update'}
                        </Button>

                        <Button variant="outlined" color="primary" type="button" onClick={() => {
                            navigate(`/user/role/list`);
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
    roles: fetchRolesSelector(state),
    permissions: rolePermissions(state),
    addRoleSuccess: addRoleSuccess(state),
    currentUser: getUser(state),
})

const mapDispatchState = (dispatch: any) => {
    return {
        addRoleApi: (payload: any) => dispatch(createRoleApi(payload)),
        updateRoleApi: (payload: any) => dispatch(updateRoleApi(payload)),
        rolePermissionsApi: (payload: any) => dispatch(rolePermissionsApi(payload)),
        recievedSuccess: (payload: any) => dispatch(recievedSuccess(payload)),
        errorNotice: (payload: any) => dispatch(errorNotice(payload)),

    };
};
export default connect(mapStateToProps, mapDispatchState)(AddRole)
