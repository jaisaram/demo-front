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
    TextareaAutosize,
    Autocomplete,
    Chip,
    CircularProgress,
} from "@mui/material";
import Box from "@mui/system/Box";
import { useDispatch, useSelector } from "react-redux";
import { createCompanyMasterApi, updateCompanyMasterApi } from "../../../../state/data-layer/companyMaster";
import {fetchBankMasterApi} from "../../../../state/data-layer/bankMaster";
import { fetchCompanyMasters, addUpdateCompanySuccessSelector, fetchBankMasters } from '../../../../state/selectors';
import { useNavigate } from "react-router-dom";
import { addUpdateCompanySuccess } from "../../../../state/data-slices/companyMasterSlice"

interface FormData {
    name: string;
    directorName: string;
    email: string;
    mobile: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    status: string;
    banks: [];
}
interface Banks {
    id: number;
    name: string;
  }
const AddCompanyMaster: React.FC<RegistrationOptions> = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const companyMasters = useSelector(fetchCompanyMasters);
    const addUpdateCompanyCheck = useSelector(addUpdateCompanySuccessSelector);
    const bankMasters = useSelector(fetchBankMasters);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        directorName: "",
        email: "",
        mobile: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        status: "",
        banks: [],
    });
    const [isEditMode, setIsEditMode] = useState<Boolean>();
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState([]);
    const [options, setOptions] =  React.useState<readonly Banks[]>([...value]);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const handleAddmode = () =>{
        setFormData({
            name: "",
            directorName: "",
            email: "",
            mobile: "",
            address: "",
            pincode: "",
            city: "",
            state: "",
            status: "",
            banks: []
        });
        setValue([]);
    }
    useEffect(() => {
        const pathArr = props.path.replace(/^\/|\/$/g, '').split('/').slice();
        if (props.path && companyMasters && companyMasters.length) {
            if (pathArr.indexOf('company') > -1 && pathArr.indexOf('edit') > -1) {
                setIsEditMode(true);
                const companyMaster = companyMasters.filter((obj: any) => obj.id === Number(pathArr[2]));
                if (companyMaster.length) setFormData(companyMaster[0]);
                const banks = companyMaster[0].companyBanks.map((bank:any)=>bank.bank);
                setValue(banks);
            }
        }
        if (pathArr.indexOf('company') > -1 && pathArr.indexOf('add') > -1) {
            setIsEditMode(false);
            handleAddmode();
        }
    }, [props.path])
    useEffect(() => {
        if (addUpdateCompanyCheck) {
            handleAddmode();
            dispatch(addUpdateCompanySuccess(false));
            navigate('/company/list');
        }

    });

    React.useEffect(() => {
        (async () => {
          dispatch(fetchBankMasterApi({ limit: 20, page: 1, search: inputValue ? inputValue: '' }));
        })();

        if(open && inputValue) {
            const newOptions = [...bankMasters];
            setOptions(newOptions);
        }

      }, [inputValue]);
    
    

    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            const ids = value && value.length>0 ? value.map((bank:any)=> bank.id): [];
            if (isEditMode) {
                dispatch(updateCompanyMasterApi({...formData, ['banks']: ids}));
            } else {
                dispatch(createCompanyMasterApi({...formData, ['banks']: ids}));
            }

        }
    };

    const validate = (): boolean => {
        let errors: Partial<FormData> = {};
        if (!formData.name) {
            errors.name = "Name is required";
        }
        if (!formData.directorName) {
            errors.directorName = "Director Name is required";
        }

        if (!formData.email) {
            errors.email = "Email is required";
        }

        if (!formData.status) {
            errors.status = "Status is required";
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
                        <p style={{ margin: '0', fontWeight: 800 }}>{!isEditMode ? 'Add Company Master' : 'Edit Company Master'}</p>
                        <p style={{ margin: '0', fontSize: "14px" }}>{!isEditMode ? 'Add Company Master data using this form.' : 'Edit Company Master data using this form.'} </p>
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
                            id="directorName"
                            name="directorName"
                            label="Director Name"
                            value={formData.directorName || ''}
                            onChange={handleChange}
                            error={!!errors.directorName}
                            helperText={errors.directorName}

                        />

                        <TextField size="small"
                            id="email"
                            name="email"
                            label="Email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}

                        />

                        <TextField size="small"
                            id="mobile"
                            name="mobile"
                            label="Mobile"
                            value={formData.mobile || ''}
                            onChange={handleChange}
                            error={!!errors.mobile}
                            helperText={errors.mobile}

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
                            id="pincode"
                            name="pincode"
                            label="Pincode"
                            value={formData.pincode || ''}
                            onChange={handleChange}
                            error={!!errors.pincode}
                            helperText={errors.pincode}

                        />

                        <TextField size="small"
                            id="city"
                            name="city"
                            label="City"
                            value={formData.city || ''}
                            onChange={handleChange}
                            error={!!errors.city}
                            helperText={errors.city}

                        />

                        <TextField size="small"
                            id="state"
                            name="state"
                            label="State"
                            value={formData.state || ''}
                            onChange={handleChange}
                            error={!!errors.state}
                            helperText={errors.state}

                        />

                        <Autocomplete
                            multiple
                            id="bank-masters"
                            size="small"
                            sx={{ width: '100%' }}
                            open={open}
                            value={value}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                                setInputValue(''); 
                            }}
                            isOptionEqualToValue={(option: any, value) => {
                                return option.name === value.name;
                            }}
                            getOptionLabel={(option) => option.name}
                            options={options}
                            onChange={(event: any, newValue: any) => {
                                if (newValue && newValue.length ) {
                                    setValue(newValue);
                                } else {
                                    setValue([]);
                                }
                            }}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Banks"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.status || ''}
                                label="Status"
                                name="status"
                                error={!!errors.status}
                                onChange={(e) => handleChange(e)}
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="disable">Disable</MenuItem>
                            </Select>
                            {errors.status && <FormHelperText error>{errors.status}</FormHelperText>}
                        </FormControl>


                        <Button variant="contained" color="primary" type="submit">
                            {!isEditMode ? 'Save' : 'Update'}
                        </Button>

                        <Button variant="outlined" color="primary" type="button" onClick={() => {
                            navigate(`/company/list`);
                        }}>
                            {'Cancel'}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Paper>
    )
}

export default AddCompanyMaster;
