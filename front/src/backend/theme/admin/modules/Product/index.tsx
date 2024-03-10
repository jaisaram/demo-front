import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { deleteProductMasterApi, fetchProductMasterApi, uploadProductCsvApi } from "../../../../state/data-layer/productMaster";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Chip from '@mui/material/Chip';
import ConfirmationDialog from '../../../../../core/_component/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ButtonGroup, ClickAwayListener, Grid, Grow, Link, MenuList, Popper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
//@ts-ignore
import { Parser } from '@json2csv/plainjs';
import FileSaver from 'file-saver';
import { productMastersCount, fetchProductMasters, fetchUsers } from "../../../../state/selectors";
import { FileUpload } from "@mui/icons-material";
import Model from "../../../../../core/_component/Model";
import Dropzone from 'react-dropzone'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { errorNotice } from "../../../../../core/state/actions";
import moment from "moment";


interface Data {
    id: number
    name: string;
    parent: number | null;
    dateCreated: string;
    createdBy: string;
    status: string;
    actions: string
}

const rows: any[] = [];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.length ? array.map((el, index) => [el, index] as [T, number]) : [];
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    align: any;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Id',
        align: 'left'
    },
    {
        id: 'name',
        numeric: true,
        align: 'left',
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'parent',
        numeric: true,
        align: 'left',
        disablePadding: false,
        label: 'Parent Product',
    },
    {
        id: 'createdBy',
        numeric: true,
        disablePadding: false,
        label: 'Created By',
        align: 'left'
    },
    {
        id: 'dateCreated',
        numeric: true,
        disablePadding: false,
        label: 'Date Created',
        align: 'left',
    },

    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
        align: 'left'
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
        align: 'center'
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow
                sx={{ backgroundColor: "#e8ecef" }}

            >
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell?.align ? headCell?.align : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            fontWeight: "800"
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const options = [
    { name: 'Delete Selected', icon: <DeleteIcon fontSize="small" /> },
    { name: 'Export Selected', icon: <FileDownloadIcon fontSize="small" /> },
    { name: 'Export All', icon: <FileDownloadIcon fontSize="small" /> }
];

const Product = (props: any) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [open, setOpen] = React.useState(null);
    const [currentSelected, setCurrentSelected] = React.useState('');
    const [delConfirmDialog, setDelConfirmDialog] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [isOpenImport, setIsOpenImport] = React.useState(false);
    const [dragFileError, setDragFileError] = React.useState(false);
    const [dragfile, setDragfile] = React.useState(null);
    const [csvArray, setCsvArray] = useState([]);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [openBulkMenu, setOpenBulkMenu] = React.useState(false);
    const navigate = useNavigate();
    const productMasters = useSelector(fetchProductMasters);

    useEffect(() => {
        if (searchQuery) {
            props.fetchProductMasterApi({ limit: rowsPerPage ? rowsPerPage : 20, page: page > -1 ? page + 1 : 1, search: searchQuery });
        } else {
            props.fetchProductMasterApi({ limit: rowsPerPage ? rowsPerPage : 20, page: page > -1 ? page + 1 : 1, search: searchQuery });
        }
    }, [searchQuery, rowsPerPage, page, selected]);

    useEffect(() => {
        if (csvArray && csvArray.length > 0) {
           props.uploadProductCsvApi({ products: csvArray });
            setDragfile(null);
            setDragFileError(false);
            setIsOpenImport(false);
        }

    }, [csvArray]);

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = productMasters.map((n: any) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleOpenMenu = (event: any, id: any) => {
        setOpen(event.currentTarget);
        setCurrentSelected(id);

    };

    const handleClick = (event: any, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: any[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleSearchQuery = (e: any) => {
        setSearchQuery(e.target.value);
    }

    const processCSV = (str: any, delim = ',') => {
        const headers = str.slice(0, str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');

        const newArray = rows.map((row: any) => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj: any, header: any, i: number) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })

        setCsvArray(newArray)
    }

    const isSelected = (id: number | string) => selected.indexOf(Number(id)) !== -1;

    const handleToggle = () => {
        setOpenBulkMenu((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpenBulkMenu(false);
    };

    //   const handleClick = () => {
    //     console.info(`You clicked ${options[selectedIndex]}`);
    //   };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        if (index === 0) {
            if (selected && selected.length > 0) {
                setDelConfirmDialog(true);
            } else {
                props.errorNotice('Please Select at list one item and try to delete.')
            }

        }

        if (index === 1) {
            if (selected && selected.length > 0 && productMasters.length > 0) {
                const data = productMasters.filter((master:any) => selected.indexOf(master.id) > -1);
                try {
                    const opts = {};
                    const parser = new Parser(opts);
                    const csv = parser.parse(data);
                    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                    FileSaver.saveAs(csvData, `product-masters[${data.length}].csv`);

                } catch (err) {
                    console.error(err);
                }
            } else {
                props.errorNotice('Please Select at list one item and try to export.') 
            }
        }
    };


    return (
        <Paper sx={{ width: '100%', minHeight: 'calc(100vh - 64px)', padding: '15px', boxShadow: 0 }}>


            <Box sx={{ width: '100%', padding: '10px', margin: "0px" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <p style={{ margin: '0', fontWeight: 800 }}>Product Master</p>
                        <p style={{ margin: '0', fontSize: "14px" }}>Product Master data list, add, update and delete actions performs here: </p>
                    </Typography>

                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <Button size="small" style={{ textTransform: 'none' }} startIcon={<FileUpload />}
                            onClick={() => {
                                setIsOpenImport(true);
                            }}
                        >
                            Import CSV
                        </Button>
                        <Button variant="contained"
                            size="small"
                            aria-controls={openBulkMenu ? 'split-button-menu' : undefined}
                            aria-expanded={openBulkMenu ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={openBulkMenu}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem sx={{ fontSize: '15px' }}
                                                    key={option.name}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option.icon} {" " + option.name}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>

                    <Model isOpen={isOpenImport}
                        onClose={() => {
                            setDragfile(null);
                            setDragFileError(false);
                            setIsOpenImport(false);
                        }}
                        title={"Import CSV"} description={"Import products details using csv file with Name, Status fields."}
                        primaryButtonLabel={"Upload"}
                        onPrimaryButtonClick={() => {
                            const file = dragfile;
                            const reader = new FileReader();
                            if (file) {
                                reader.onload = function (e) {
                                    if (e && e.target && e.target.result) {
                                        const text = e.target.result;
                                        console.log(text);
                                        processCSV(text) // plugged in here
                                    }
                                }
                                reader.readAsText(file);
                            }

                        }}
                        secondaryButtonLabel={"Cancel"}
                        onSecondaryButtonClick={() => {
                            setDragfile(null);
                            setDragFileError(false);
                            setIsOpenImport(false);
                        }}
                    >
                        <Dropzone onDrop={(acceptedFiles: any) => {
                            if (acceptedFiles && acceptedFiles.length && acceptedFiles[0].type === 'text/csv') {
                                setDragFileError(false);
                                if (acceptedFiles && acceptedFiles.length) setDragfile(acceptedFiles[0]);
                            } else {
                                setDragFileError(true);

                            }
                        }}>
                            {({ getRootProps, getInputProps }) => (
                                <Box {...getRootProps()} sx={{ p: 1, border: '1px', borderColor: dragFileError ? 'red' : 'gray', borderStyle: 'dashed', cursor: 'pointer', color: dragFileError ? 'red' : 'gray', textAlign: 'center' }}>
                                    <div>
                                        <input {...getInputProps()} />
                                        {!dragfile && <p>Drag 'n' drop some files here, or click to select files</p>}
                                        {dragfile && <p style={{color: 'green'}}>File selected. Click on upload button to import data.</p>}
                                        {dragFileError && <p color="red">Please Select CSV file and try to upload</p>}
                                    </div>
                                </Box>
                            )}
                           
                        </Dropzone>
                        <br></br>
                        <Link download={"product-masters-template.csv"} href="/assets/images/product-masters-template.csv">Download Temaplate CSV</Link>
                    </Model>




                </Stack>

                <Paper sx={{ width: '100%', borderTop: '1px solid #dddddd', borderLeft: '1px solid #dddddd', borderRight: '1px solid #dddddd', }}>
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <SearchIcon color="inherit" sx={{ display: 'block' }} />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    value={searchQuery}
                                    placeholder="Search by name..."
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: { fontSize: 'default' },
                                    }}
                                    variant="standard"
                                    onChange={handleSearchQuery}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>

                    <TableContainer sx={{ width: ' 100%', margin: 0, padding: 0, borderRadius: "5px" }}>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={productMasters.length}
                            />
                            <TableBody>
                                {stableSort(productMasters, getComparator(order, orderBy))
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        const createdBy = props.users.length &&  row.createdBy ? (props.users.filter((user:any)=> user.id === row.createdBy))[0]?.name : 'anonymous'
                                        const dateCreated = moment(row.dateCreated).format("DD-MM-YYYY hh:mm:ss");
                                        const parentProduct = productMasters.length > 0 && row.parent ? (productMasters.filter((pro:any)=> pro.id === row.parent))[0]?.name: '';
                                        return (
                                            <TableRow
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                        onChange={(event) => handleClick(event, Number(row.id))}

                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell
                                                    style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left"> {parentProduct && parentProduct}</TableCell>
                                                <TableCell align="left">{createdBy && createdBy}</TableCell>
                                                <TableCell align="left">{dateCreated}</TableCell>
                                                <TableCell align="left">
                                                    {row.status === 'active' ? <Chip label="Active" color="success" size='small' /> :
                                                        <Chip label="Disable" color="error" size='small' />
                                                    }




                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="small" color="inherit" onClick={(e) => {
                                                        handleOpenMenu(e, row.id)
                                                    }}>
                                                        <MoreHorizIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                            </TableBody>
                        </Table>
                        <Popover
                            open={Boolean(open)}
                            anchorEl={open}
                            onClose={handleCloseMenu}
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                                sx: {
                                    p: 1,
                                    width: 140,
                                    '& .MuiMenuItem-root': {
                                        px: 1,
                                        typography: 'body2',
                                        borderRadius: 0.75,
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={(e) => {
                                navigate(`/product/edit/${currentSelected}`);

                            }}>
                                Edit
                            </MenuItem>

                            <MenuItem sx={{ color: 'error.main' }} onClick={(e) => {
                                e.preventDefault();
                                setDelConfirmDialog(true);
                                setOpen(null)
                            }}>
                                Delete
                            </MenuItem>
                        </Popover>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[1, 2, 5, 10, 20, 50, 100, 1000]}
                        component="div"
                        count={props.productMastersCount ? props.productMastersCount : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />


                </Paper>

                <ConfirmationDialog
                    title={`Are you sure to delete records?`}
                    message={"If you confirm this data and related all records will deleted automatically. please check and confirm this carefully."}
                    open={delConfirmDialog}
                    onClose={() => {
                        setDelConfirmDialog(false);
                    }}
                    onConfirm={() => {
                        if (currentSelected) {
                           props.deleteProductMasterApi({ ids: [currentSelected] });
                        } else if (selected && selected.length > 0) {
                           props.deleteProductMasterApi({ ids: selected });
                        }
                        setDelConfirmDialog(false);
                    }}
                ></ConfirmationDialog>
            </Box>
        </Paper>
    );
}

const mapStateToProps = (state: any) => ({
    users: fetchUsers(state),
    productMasters: fetchProductMasters(state),
    productMastersCount: productMastersCount(state),
})

const mapDispatchState = (dispatch: any) => {
    return {
        fetchProductMasterApi: (payload: any) => dispatch(fetchProductMasterApi(payload)),
        deleteProductMasterApi: (payload: any) => dispatch(deleteProductMasterApi(payload)),
        uploadProductCsvApi: (payload: any) => dispatch(uploadProductCsvApi(payload)),
        errorNotice: (payload: any) => dispatch(errorNotice(payload)),

    };
};
export default connect(mapStateToProps, mapDispatchState)(Product)
