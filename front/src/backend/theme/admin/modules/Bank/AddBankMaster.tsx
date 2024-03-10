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
} from "@mui/material";
import Box from "@mui/system/Box";
import { useDispatch, useSelector } from "react-redux";
import { createBankMasterApi, updateBankMasterApi } from "../../../../state/data-layer/bankMaster";
import { fetchBankMasters, addUpdateBankSuccessSelector } from '../../../../state/selectors';
import { useNavigate } from "react-router-dom";
import { addUpdateBankSuccess } from "../../../../state/data-slices/bankMasterSlice"

interface FormData {
    name: string;
    category: string;
    status: string;
}
const categorise = ['Public', 'Private', 'Small Finance', 'Regional Rural', 'NBFC']
const AddBankMaster: React.FC<RegistrationOptions> = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addUpdateBankCheck = useSelector(addUpdateBankSuccessSelector)
    const bankMasters = useSelector(fetchBankMasters);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        category: "",
        status: "",
    });
    const [isEditMode, setIsEditMode] = useState<Boolean>();
    useEffect(() => {
        const pathArr = props.path.replace(/^\/|\/$/g, '').split('/').slice();
        if (props.path && bankMasters && bankMasters.length) {
            if (pathArr.indexOf('bank') > -1 && pathArr.indexOf('edit') > -1) {
                setIsEditMode(true);

                const bankMaster = bankMasters.filter((obj: any) => obj.id === Number(pathArr[2]));
                if (bankMaster.length) setFormData(bankMaster[0]);
            }

        }

        if (pathArr.indexOf('bank') > -1 && pathArr.indexOf('add') > -1) {
            setIsEditMode(false);
            handleAddmode();
        }
    }, [props.path])
    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (addUpdateBankCheck) {
            handleAddmode();
            dispatch(addUpdateBankSuccess(false));
            navigate('/bank/list');
        }

    });

    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            if (isEditMode) {
                dispatch(updateBankMasterApi(formData));
            } else {
                dispatch(createBankMasterApi(formData));
            }

        }
    };

    const handleAddmode = () =>{
        setFormData({
            name: "",
            category: "",
            status: ""
        });
    }

    const validate = (): boolean => {
        let errors: Partial<FormData> = {};
        if (!formData.name) {
            errors.name = "First Name is required";
        }
        if (!formData.category) {
            errors.category = "Category is required";
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
                        <p style={{ margin: '0', fontWeight: 800 }}>{!isEditMode ? 'Add Bank Master' : 'Edit Bank Master'}</p>
                        <p style={{ margin: '0', fontSize: "14px" }}>{!isEditMode ? 'Add Bank Master data using this form.' : 'Edit Bank Master data using this form.'} </p>
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

                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.category || ''}
                                label="Category"
                                name="category"
                                onChange={(e) => handleChange(e)}
                            >
                                {categorise.map((items: string)=>{
                                    return (<MenuItem key={items} value={items}>{items}</MenuItem>);
                                })}
                            </Select>
                            {errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
                        </FormControl>

                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.status || ''}
                                label="Status"
                                name="status"
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
                            navigate(`/bank/list`);
                        }}>
                            {'Cancel'}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Paper>
    )
}
export default AddBankMaster;
