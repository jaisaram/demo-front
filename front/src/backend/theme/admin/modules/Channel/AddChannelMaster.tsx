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
    ButtonGroup,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Autocomplete,
    CircularProgress,
} from "@mui/material";
import Box from "@mui/system/Box";
import { useDispatch, useSelector } from "react-redux";
import { createChannelMasterApi, updateChannelMasterApi, verifyChannelDataApi } from "../../../../state/data-layer/channelMaster";
import { fetchCompanyMasterApi } from "../../../../state/data-layer/companyMaster";
import {
    fetchChannelMasters, addUpdateChannelSuccessSelector,
    verifyGstDataSelector, verifyPanDataSelector,
    verifyCINDataSelector, verifyBankDataSelector,
    fetchCompanyMasters
} from '../../../../state/selectors';
import {
    addUpdateChannelSuccess, verifyGstStatus, verifyPanStatus, verifyBankStatus, verifyCINStatus
} from "../../../../state/data-slices/channelMasterSlice"
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./style.scss";
import LoadingButton from '@mui/lab/LoadingButton';
import dayjs from "dayjs";

interface FormData {
    name: string;
    company: number | null;
    channelType: string;
    email: string;
    mobile: string;
    gst: string;
    pan: string;
    cin: string;
    bankAccount: string;
    ifsc: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    category: string;
    dateJoining: string,
    telemarketer: string;
    status: string;
}

interface VerifyObj {
    gst: any;
    bankAccount: any;
    pan: any;
    cin: any;
}

const channelTypes = ["Sole Proprietor", "Private Limited Company", "Limited Company", "Partnership Firm", "Others"];

const AddChannelMaster: React.FC<RegistrationOptions> = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const channelMasters = useSelector(fetchChannelMasters);
    const addUpdateChannelCheck = useSelector(addUpdateChannelSuccessSelector);
    const verifyGstDataResponse = useSelector(verifyGstDataSelector);
    const verifyPanDataResponse = useSelector(verifyPanDataSelector);
    const verifyBankDataResponse = useSelector(verifyBankDataSelector);
    const verifyCINDataResponse = useSelector(verifyCINDataSelector);
    const companyList = useSelector(fetchCompanyMasters);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        company: null,
        channelType: "",
        email: "",
        mobile: "",
        gst: "",
        pan: "",
        cin: "",
        bankAccount: "",
        ifsc: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        category: "",
        dateJoining: "",
        telemarketer: "",
        status: "",
    });
    const [isEditMode, setIsEditMode] = useState<Boolean>();
    const [verifyFormData, setVerifyFormData] = useState<VerifyObj>({
        bankAccount: false,
        pan: false,
        gst: false,
        cin: false,
    });
    const [teleMarksCheck, setTeleMarksCheck] = React.useState(false);
    const [gstIsLoading, setGstIsLoading] = useState(false);
    const [panIsLoading, setPanIsLoading] = useState(false);
    const [bankIsLoading, setBankIsLoading] = useState(false);
    const [cinIsLoading, setCinIsLoading] = useState(false);
    const [isGstApiCalled, setIsGstApiCalled] = useState(false);
    const [isPanApiCalled, setIsPanApiCalled] = useState(false);
    const [isBankApiCalled, setIsBankApiCalled] = useState(false);
    const [isCINApiCalled, setIsCINApiCalled] = useState(false);
    const [isCompanyListApiCalled, setIsCompanyListApiCalled] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);


    const loading = open && companyList.length === 0;
    const [errors, setErrors] = useState<Partial<FormData>>({});
  
    useEffect(() => {
        const pathArr = props.path.replace(/^\/|\/$/g, '').split('/').slice();
        if (props.path && channelMasters && channelMasters.length) {
            if (pathArr.indexOf('channel') > -1 && pathArr.indexOf('edit') > -1) {
                setIsEditMode(true);
                const channelMaster = channelMasters.filter((obj: any) => obj.id === Number(pathArr[2]));
                if (channelMaster.length) setFormData(channelMaster[0]);
                let checkVerifyData: VerifyObj = {
                    gst: false,
                    bankAccount: false,
                    pan: false,
                    cin: false
                }
                if(channelMaster[0].gst) checkVerifyData = {...checkVerifyData, gst: true};
                if(channelMaster[0].pan) checkVerifyData = {...checkVerifyData, pan: true};
                if(channelMaster[0].bankAccount) checkVerifyData ={...checkVerifyData, bankAccount: true};
                if(channelMaster[0].cin) checkVerifyData = {...checkVerifyData, cin: true};
                setVerifyFormData({...verifyFormData, ...checkVerifyData});
            }
            
        }
        if (pathArr.indexOf('channel') > -1 && pathArr.indexOf('add') > -1) {
            setIsEditMode(false);
            handleAddmode();

        }
    }, [props.path]);

    useEffect(() => {
        if(companyList && companyList.length > 0 && formData.company) {
            const items = companyList.filter((item: any)=> item.id === formData.company);
            if(items && items.length >0) {
                setValue(items[0].name);
            }
            
        }
        if (gstIsLoading && formData.gst && !isGstApiCalled) {
            dispatch(verifyChannelDataApi({ type: 'gst', gst: formData.gst }));
            setIsGstApiCalled(true);
        }

        if (verifyGstDataResponse && verifyGstDataResponse.success) {
            setGstIsLoading(false);
            setVerifyFormData({ ...verifyFormData, gst: verifyGstDataResponse.data });
            dispatch(verifyGstStatus(false));
            setIsGstApiCalled(false);

        }
        if (verifyGstDataResponse && verifyGstDataResponse.success === false) {
            setGstIsLoading(false);
            setVerifyFormData({ ...verifyFormData, gst: false });
            dispatch(verifyGstStatus(false));
            setIsGstApiCalled(false);



        }
    });


    useEffect(() => {
        if (panIsLoading && formData.pan && !isPanApiCalled) {
            dispatch(verifyChannelDataApi({ type: 'pan', pan: formData.pan }));
            setIsPanApiCalled(true);
        }

        if (verifyPanDataResponse && verifyPanDataResponse.success) {
            setPanIsLoading(false);
            setVerifyFormData({ ...verifyFormData, pan: verifyPanDataResponse.data });
            dispatch(verifyPanStatus(false));
            setIsPanApiCalled(false);
        }
        if (verifyPanDataResponse && verifyPanDataResponse.success === false) {
            setPanIsLoading(false);
            setVerifyFormData({ ...verifyFormData, pan: false });
            dispatch(verifyPanStatus(false));
            setIsPanApiCalled(false);
        }
    });

    useEffect(() => {
        if (bankIsLoading && formData.bankAccount && formData.ifsc && !isBankApiCalled) {
            dispatch(verifyChannelDataApi({ type: 'bank', bank: formData.bankAccount, ifsc: formData.ifsc }));
            setIsBankApiCalled(true);
        }

        if (verifyBankDataResponse && verifyBankDataResponse.success) {
            setBankIsLoading(false);
            setVerifyFormData({ ...verifyFormData, bankAccount: verifyBankDataResponse.data });
            dispatch(verifyBankStatus(false));
            setIsBankApiCalled(false);
        }

        if (verifyBankDataResponse && verifyBankDataResponse.success === false) {
            setBankIsLoading(false);
            setVerifyFormData({ ...verifyFormData, bankAccount: false });
            dispatch(verifyBankStatus(false));
            setIsBankApiCalled(false);
        }
    });

    useEffect(() => {
        if (cinIsLoading && formData.cin && !isCINApiCalled) {
            dispatch(verifyChannelDataApi({ type: 'cin', cin: formData.cin }));
            setIsCINApiCalled(true);
        }

        if (verifyCINDataResponse && verifyCINDataResponse.success) {
            setCinIsLoading(false);
            setVerifyFormData({ ...verifyFormData, cin: verifyCINDataResponse.data });
            dispatch(verifyCINStatus(false));
            setIsCINApiCalled(false);
        }

        if (verifyCINDataResponse && verifyCINDataResponse.success === false) {
            setCinIsLoading(false);
            setVerifyFormData({ ...verifyFormData, cin: false });
            dispatch(verifyCINStatus(false));
            setIsCINApiCalled(false);
        }
    });

    useEffect(() => {
        if (!isCompanyListApiCalled) {
            dispatch(fetchCompanyMasterApi({
                limit: 0, page: 0,
                search: ""
            }));
            setIsCompanyListApiCalled(true);
        }
    })

    useEffect(() => {
        if (verifyFormData && verifyFormData.gst) {
            const { result } = verifyFormData.gst;
            let dataFromGst = {};
            if (result) {
                const { business_constitution,
                    business_nature,
                    legal_name,
                    primary_business_address,
                    register_cancellation_date,
                    register_date, trade_name } = result;

                if (primary_business_address) {
                    const { district, location, business_nature, pincode, state_code, full_address } = primary_business_address;
                    if (district) {
                        dataFromGst = { ...dataFromGst, city: district};
                    }
                    if (pincode) {
                        dataFromGst = { ...dataFromGst, pincode};
                    }
                    if (state_code) {
                        dataFromGst = { ...dataFromGst, state: state_code};
                    }
                    if (full_address) {
                        dataFromGst = { ...dataFromGst, address: full_address};
                    }

                    setFormData({...formData, ...dataFromGst});

                }
            }

        }
    }, [verifyFormData.gst, isEditMode]);


    const handleAddmode = () => {
        setVerifyFormData({
            gst: false, pan: false, bankAccount: false, cin: false
        });

        setValue(null);
        setFormData({
            name: "",
            company: null,
            channelType: "",
            email: "",
            mobile: "",
            gst: "",
            pan: "",
            cin: "",
            bankAccount: "",
            ifsc: "",
            address: "",
            pincode: "",
            city: "",
            state: "",
            category: "",
            dateJoining: "",
            telemarketer: "",
            status: "",
        });
        
        

    }



    useEffect(() => {
        if (addUpdateChannelCheck) {
            handleAddmode();
            dispatch(addUpdateChannelSuccess(false));
            navigate('/channel/list');
        }

    });


    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            if (isEditMode) {
                dispatch(updateChannelMasterApi(formData));
            } else {
                dispatch(createChannelMasterApi(formData));
            }

        }
    };

    const validate = (): boolean => {
        let errors: Partial<FormData> = {};
        if (!formData.name) {
            errors.name = "First Name is required";
        }

        if (!formData.channelType) {
            errors.channelType = "Partner Name is required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email address";
        }

        if (formData.bankAccount && !formData.ifsc ) {
            errors.ifsc = "IFSC is required";
        } else if (!formData.bankAccount && formData.ifsc) {
            errors.bankAccount = "Account number is required";
        } else if (formData.bankAccount && formData.ifsc && !verifyFormData.bankAccount) {
            errors.bankAccount = "Please click on verify buttton and verify your details.";
        }

        if (formData.pan && !verifyFormData.pan) {
            errors.pan = "Please click on verify buttton and verify your details.";
        }

        if (formData.gst && !verifyFormData.gst) {
            errors.gst = "Please click on verify buttton and verify your details.";
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
                        <p style={{ margin: '0', fontWeight: 800 }}>{!isEditMode ? 'Add Channel Master' : 'Edit Channel Master'}</p>
                        <p style={{ margin: '0', fontSize: "14px" }}>{!isEditMode ? 'Add Channel Master data using this form.' : 'Edit Channel Master data using this form.'} </p>
                    </Typography>
                </Stack>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} >
                        <Autocomplete size="small" fullWidth
                            id="company-demo"
                            open={open}
                            value={value || null}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            onChange={(_, newValue : any) => {
                                setValue(newValue);
                                const itemsCurrent = companyList.filter((item:any) => item.name === newValue);
                                if(itemsCurrent.length > 0) {
                                   setFormData({...formData, company: itemsCurrent[0].id});
                                }
                            }}
                            
                            options={companyList.length ? companyList.map((item:any)=> item.name): []}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Company"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />


                        <ButtonGroup size="small" aria-label="button group">
                            <TextField sx={{ width: '88%', marginRight: '10px' }} size="small"
                                id="gst"
                                name="gst"
                                label="GSTIN"
                                value={formData.gst || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                    errors.gst = '';
                                    errors.ifsc = '';
                                    if (verifyFormData.gst) {
                                        setVerifyFormData({ ...verifyFormData, gst: false });
                                    }

                                }}
                                error={!!errors.gst}
                                helperText={errors.gst}

                            />
                            <LoadingButton
                                sx={{ width: '12%', maxHeight: "40px", textTransform: 'none' }}
                                size="small"
                                onClick={(e) => {
                                    if (formData.gst) setGstIsLoading(true);

                                }}
                                loading={gstIsLoading}
                                variant="outlined"
                                color="success"
                            >
                                {(verifyFormData.gst || (formData.gst && isEditMode)) && <CheckCircleOutlineIcon color="success" fontSize="small" />}
                                {(verifyFormData.gst || (formData.gst && isEditMode)) ? 'Vrified' : 'Verify'}

                            </LoadingButton>

                        </ButtonGroup>
                        <ButtonGroup size="small" aria-label="button group">
                            <TextField sx={{ width: '88%', marginRight: '10px' }} size="small"
                                id="pan"
                                name="pan"
                                label="PAN"
                                value={formData.pan || ''}
                                onChange={(e) => {
                                    handleChange(e);
                                    errors.pan = '';
                                    if (verifyFormData.pan) {
                                        setVerifyFormData({ ...verifyFormData, pan: false });
                                    }

                                }}
                                error={!!errors.pan}
                                helperText={errors.pan}

                            />
                            <LoadingButton
                                sx={{ width: '12%', maxHeight: "40px", textTransform: 'none' }}
                                size="small"
                                onClick={(e) => {
                                    if (formData.pan) setPanIsLoading(true);
                                }}
                                loading={panIsLoading}
                                variant="outlined"
                                color="success"
                            >
                                {(verifyFormData.pan || (formData.pan && isEditMode)) && <CheckCircleOutlineIcon color="success" fontSize="small" />}
                                {(verifyFormData.pan || (formData.pan && isEditMode) ) ? 'Vrified' : 'Verify'}

                            </LoadingButton>
                        </ButtonGroup>
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
                            <InputLabel id="type-select-label">Type Of Channel</InputLabel>
                            <Select
                                labelId="type-select-label"
                                id="type-simple-select"
                                value={formData.channelType || ''}
                                label="Type Of Channel"
                                name="channelType"
                                error={!!errors.channelType}
                                onChange={(e) => handleChange(e)}
                            >
                                {channelTypes && channelTypes.map((item, i) => {
                                    return (<MenuItem key={i} value={item}>{item}</MenuItem>);
                                })}
                            </Select>
                            {errors.channelType && <FormHelperText error>{errors.channelType}</FormHelperText>}
                        </FormControl>

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
                        <ButtonGroup size="small" aria-label="button group">
                            <TextField sx={{ width: '50%', marginRight: '10px' }} size="small"
                                id="bankAccount"
                                name="bankAccount"
                                label="Account Number"
                                value={formData.bankAccount || ''}
                                onChange={(e) => {
                                    errors.bankAccount = '';
                                    handleChange(e);
                                    if (verifyFormData.bankAccount) {
                                        setVerifyFormData({ ...verifyFormData, bankAccount: false });
                                    }

                                }}
                                error={!!errors.bankAccount}
                                helperText={errors.bankAccount}
                            />

                            <TextField sx={{ width: '38%', marginRight: '10px' }} size="small"
                                id="ifsc"
                                name="ifsc"
                                label="IFSC"
                                value={formData.ifsc || ''}
                                onChange={(e) => {
                                    errors.ifsc = '';
                                    handleChange(e);
                                    if (verifyFormData.bankAccount) {
                                        setVerifyFormData({ ...verifyFormData, bankAccount: false });
                                        errors.bankAccount = "";
                                    }

                                }}
                                error={!!errors.ifsc}
                                helperText={errors.ifsc}
                            />
                            <LoadingButton
                                sx={{ width: '12%', maxHeight: "40px", textTransform: 'none' }}
                                size="small"
                                onClick={(e) => {
                                    if (formData.bankAccount && formData.ifsc) {
                                        setBankIsLoading(true);
                                        errors.bankAccount = '';
                                        errors.ifsc = '';
                                    }
                                }}
                                loading={bankIsLoading}
                                variant="outlined"
                                color="success"
                            >
                                {(verifyFormData.bankAccount || (formData.bankAccount && formData.ifsc  && isEditMode) ) && <CheckCircleOutlineIcon color="success" fontSize="small" />}
                                {(verifyFormData.bankAccount || (formData.bankAccount && formData.ifsc && isEditMode)) ? 'Vrified' : 'Verify'}

                            </LoadingButton>
                        </ButtonGroup>
                        <ButtonGroup size="small" aria-label="button group">
                            <TextField sx={{ width: '88%', marginRight: '10px' }} size="small"
                                id="cin"
                                name="cin"
                                label="CIN"
                                value={formData.cin || ''}
                                onChange={(e) => {
                                    errors.cin = '';
                                    handleChange(e);
                                    if (verifyFormData.cin) {
                                        setVerifyFormData({ ...verifyFormData, cin: false });
                                    }

                                }}
                                error={!!errors.cin}
                                helperText={errors.cin}
                            />

                            <LoadingButton
                                sx={{ width: '12%', maxHeight: "40px", textTransform: 'none' }}
                                size="small"
                                onClick={(e) => {
                                    if (formData.cin) setCinIsLoading(true);
                                }}
                                loading={cinIsLoading}
                                variant="outlined"
                                color="success"
                            >
                                {(verifyFormData.cin || (formData.cin && isEditMode)) && <CheckCircleOutlineIcon color="success" fontSize="small" />}
                                {(verifyFormData.cin || (formData.cin && isEditMode))  ? 'Vrified' : 'Verify'}

                            </LoadingButton>
                        </ButtonGroup>
                        <TextField size="small"
                            id="address"
                            name="address"
                            label="Address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            error={!!errors.address}
                            helperText={errors.address}
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

                        <FormControl size="small" fullWidth>
                            <InputLabel id="category-select-label">Category</InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                value={formData.category || ''}
                                label="Category"
                                name="category"
                                error={!!errors.category}
                                onChange={(e) => handleChange(e)}
                            >
                                <MenuItem value="Serviceable">Serviceable</MenuItem>
                                <MenuItem value="Not Serviceable">Not Serviceable</MenuItem>
                            </Select>
                            {errors.category && <FormHelperText error >{errors.category}</FormHelperText>}
                        </FormControl>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            
                                <DatePicker maxDate={dayjs(Date.now())} value={formData.dateJoining ? dayjs(formData.dateJoining) : null} onChange={(newValue: any)=>{
                                    if (newValue) setFormData({...formData, dateJoining: newValue});

                                }} className="date-picker" sx={{ width: '100%' }} label="Date of Joining" format="DD/MM/YYYY" />
                        </LocalizationProvider>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={teleMarksCheck} onChange={() => {
                                        setTeleMarksCheck(!teleMarksCheck);
                                        if (teleMarksCheck) setFormData({ ...formData, telemarketer: '' });
                                    }} name="teleMarksCheck" />
                                }
                                label="*Are You Have Telemarketer Registration Number?"
                            />

                            {teleMarksCheck && <TextField size="small"
                                id="telemarketer"
                                name="telemarketer"
                                label="Registration Number"
                                value={(formData.telemarketer && teleMarksCheck) ? formData.telemarketer : ''}
                                onChange={handleChange}
                                error={!!errors.telemarketer}
                                helperText={errors.telemarketer}
                            />}

                        </FormGroup>

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
                            navigate(`/channel/list`);
                        }}>
                            {'Cancel'}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Paper>
    )
}

export default AddChannelMaster;
