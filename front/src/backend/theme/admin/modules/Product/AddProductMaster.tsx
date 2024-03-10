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
    Autocomplete,
    CircularProgress,
} from "@mui/material";
import Box from "@mui/system/Box";
import { useDispatch, useSelector } from "react-redux";
import { createProductMasterApi, fetchProductMasterApi, updateProductMasterApi } from "../../../../state/data-layer/productMaster";
import { fetchProductMasters, addUpdateProductSuccessSelector } from '../../../../state/selectors';
import { useNavigate } from "react-router-dom";
import { addUpdateProductSuccess } from "../../../../state/data-slices/productMasterSlice"

interface FormData {
    name: string;
    parent: number | null,
    status: string;
}

const AddProductMaster: React.FC<RegistrationOptions> = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addUpdateProductCheck = useSelector(addUpdateProductSuccessSelector)
    const productMasters = useSelector(fetchProductMasters);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        parent: null,
        status: "",
    });
    const [isEditMode, setIsEditMode] = useState<Boolean>();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [isProductListApiCalled, setIsProductListApiCalled] = useState(false);
    const [productList, setProductList] = useState([]);
    const [currentProduct, setCurrentProduct] = useState();

    const loading = open && productMasters.length === 0;



    const handleAddmode = () => {
        setFormData({
            name: "",
            parent: null,
            status: ""
        });
    }
    useEffect(() => {
        const pathArr = props.path.replace(/^\/|\/$/g, '').split('/').slice();
        if (props.path && productMasters && productMasters.length) {
            if (pathArr.indexOf('product') > -1 && pathArr.indexOf('edit') > -1) {
                setIsEditMode(true);
                const productMaster = productMasters.filter((obj: any) => obj.id === Number(pathArr[2]));
                if (productMaster.length) {
                    setFormData(productMaster[0]);
                    setCurrentProduct(productMaster[0]);
                }
            }

        }
        if (pathArr.indexOf('product') > -1 && pathArr.indexOf('add') > -1) {
            setIsEditMode(false);
            handleAddmode();
        }
    }, [])
    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (addUpdateProductCheck) {
            handleAddmode();
            dispatch(addUpdateProductSuccess(false));
            navigate('/product/list');
        }

        if (!isProductListApiCalled) {
            dispatch(fetchProductMasterApi({ page: 0, limit: 0, search: '' }));
            setIsProductListApiCalled(true);
        }
    });

    useEffect(() => {
        if (productMasters && productMasters.length > 0) {
            let dataOf = [];
            if(isEditMode && currentProduct && currentProduct['id']) {
                dataOf = productMasters.filter((item: any) => !item.parent &&  item.id !== currentProduct['id'] );
            } else {
                dataOf = productMasters.filter((item: any) => !item.parent);
            }
            setProductList(dataOf);
        }
        const itemsCurrent = productMasters.filter((item: any) => item.id === formData.parent);
        if (itemsCurrent && itemsCurrent.length) {
                setValue(itemsCurrent[0]['name']);
            
        }
    }, [productMasters]);

    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            if (isEditMode) {
                dispatch(updateProductMasterApi(formData));
            } else {
                dispatch(createProductMasterApi(formData));
            }

        }
    };

    const validate = (): boolean => {
        let errors: Partial<FormData> = {};
        if (!formData.name) {
            errors.name = "First Name is required";
        }

        if (formData.parent && !value) {
            setFormData({...formData, parent: null});
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
                        <p style={{ margin: '0', fontWeight: 800 }}>{!isEditMode ? 'Add Product Master' : 'Edit Product Master'}</p>
                        <p style={{ margin: '0', fontSize: "14px" }}>{!isEditMode ? 'Add Product Master data using this form.' : 'Edit Product Master data using this form.'} </p>
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

                        <Autocomplete size="small" fullWidth
                            id="product-demo"
                            open={open}
                            value={value || null}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            onChange={(_, newValue: any) => {
                                setValue(newValue);
                                const itemsCurrent = productList.filter((item: any) => item.name === newValue);
                                if (itemsCurrent.length > 0 && itemsCurrent[0] && itemsCurrent[0]['id']) {
                                    setFormData({ ...formData, parent: itemsCurrent[0]['id'] });
                                } else {
                                    setFormData({ ...formData, parent: null });
                                }
                            }}

                            options={productList.length ? productList.map((item: any) => item.name) : []}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Parent Product"
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
                            navigate(`/product/list`);
                        }}>
                            {'Cancel'}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Paper>
    )
}
export default AddProductMaster;
