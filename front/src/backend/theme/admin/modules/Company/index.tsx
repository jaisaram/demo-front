import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteCompanyMasterApi, fetchCompanyMasterApi } from "../../../../state/data-layer/companyMaster";
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
import { Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
//@ts-ignore
import { Parser } from '@json2csv/plainjs';
import FileSaver from 'file-saver';
import { companyMastersCount, fetchCompanyMasters, fetchUsers } from "../../../../state/selectors";
import moment from 'moment';
interface Data {
    id: number
    name: string;
    directorName: string;
    email: string;
    mobile: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
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
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'directorName',
        numeric: true,
        align: 'left',
        disablePadding: false,
        label: 'Director Name',
    },
    {
        id: 'email',
        numeric: true,
        align: 'left',
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'mobile',
        numeric: true,
        align: 'left',
        disablePadding: false,
        label: 'Mobile',
    },
    {
        id: 'address',
        numeric: true,
        align: 'left',
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'city',
        numeric: true,
        align: 'left',
        disablePadding: false,
        label: 'City',
    },
    {
        id: 'state',
        numeric: true,
        align: 'left',
        disablePadding: false,
        label: 'State',
    },
    {
        id: 'pincode',
        numeric: true,
        align: 'left',
        disablePadding: false,
        label: 'Pincode',
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


const Comapny = (props: any) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [open, setOpen] = React.useState(null);
    const [currentSelected, setCurrentSelected] = React.useState('');
    const [companyMasters, setCompanyMasters] = React.useState<Data[]>([]);
    const [delConfirmDialog, setDelConfirmDialog] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const navigate = useNavigate();
   
    useEffect(() => {
        if (searchQuery) {
            props.fetchCompanyMasterApi({ limit: rowsPerPage ? rowsPerPage : 20, page: page > -1 ? page+1 : 1, search: searchQuery});
            setCompanyMasters(props.companyMasters);
        } else{
            props.fetchCompanyMasterApi({ limit: rowsPerPage ? rowsPerPage : 20, page: page > -1 ? page+1 : 1, search: searchQuery});
            setCompanyMasters(props.companyMasters);
        }
    }, [searchQuery, rowsPerPage, page, selected ] );

    useEffect(() => {
        setCompanyMasters(props.companyMasters);
        
    });

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
            const newSelected = companyMasters.map((n) => n.id);
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

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    return (
        <Paper sx={{ width: '100%', minHeight: 'calc(100vh - 64px)', padding: '15px', boxShadow: 0 }}>

            
            <Box sx={{ width: '100%', padding: '10px', margin: "0px" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">
                        <p style={{ margin: '0', fontWeight: 800 }}>Company Master</p>
                        <p style={{ margin: '0', fontSize: "14px" }}>Company Master data list, add, update and delete actions performs here: </p>
                    </Typography>
                    <Button variant="contained" style={{ textTransform: 'none' }} startIcon={<FileDownloadIcon />}
                    onClick={()=>{
                        if(selected && selected.length > 0 && companyMasters.length > 0) {
                            const data = companyMasters.filter((master)=>selected.indexOf(master.id) > -1);
                            try {
                                const opts = {};
                                const parser = new Parser(opts);
                                const csv = parser.parse(data);
                                const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                                FileSaver.saveAs(csvData, `company-masters[${data.length}].csv`);

                              } catch (err) {
                                console.error(err);
                              }
                        }
                    }}
                    >
                        Export CSV
                    </Button>
                    
                </Stack>
                
                <Paper sx={{ width: '100%', borderTop:'1px solid #dddddd',  borderLeft:'1px solid #dddddd',  borderRight:'1px solid #dddddd',  }}>
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
                                rowCount={companyMasters.length}
                            />
                            <TableBody>
                                {stableSort(companyMasters, getComparator(order, orderBy))
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        const createdBy = props.users.length &&  row.createdBy ? (props.users.filter((user:any)=> user.id === row.createdBy))[0]?.name : 'anonymous'
                                        const dateCreated = moment(row.dateCreated).format("DD-MM-YYYY hh:mm:ss");
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
                                                        onChange={(event) => handleClick(event, row.id)}

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
                                                <TableCell component="th" scope="row">{row.directorName}</TableCell>
                                                <TableCell component="th" scope="row" >{row.email}</TableCell>
                                                <TableCell component="th" scope="row" >{row.mobile}</TableCell>
                                                <TableCell component="th" scope="row" >{row.address}</TableCell>
                                                <TableCell component="th" scope="row" >{row.city}</TableCell>
                                                <TableCell component="th" scope="row">{row.state}</TableCell>
                                                <TableCell component="th" scope="row" >{row.pincode}</TableCell>
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
                                navigate(`/company/edit/${currentSelected}`);

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
                        rowsPerPageOptions={[1, 2, 5, 10, 20, 50, 100]}
                        component="div"
                        count={props.companyMastersCount ? props.companyMastersCount : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />


                </Paper>

                <ConfirmationDialog
                    title={"Are you sure to delete this record?"}
                    message={"If you confirm this data and related all records will deleted automatically. please check and confirm this carefully."}
                    open={delConfirmDialog}
                    onClose={() => {
                        setDelConfirmDialog(false);
                    }}
                    onConfirm={() => {
                        if (currentSelected) {
                            props.deleteCompanyMasterApi({ id: currentSelected });
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
    companyMasters: fetchCompanyMasters(state),
    companyMastersCount: companyMastersCount(state),
})

const mapDispatchState = (dispatch: any) => {
    return {
        fetchCompanyMasterApi: (payload: any) => dispatch(fetchCompanyMasterApi(payload)),
        deleteCompanyMasterApi: (payload: any) => dispatch(deleteCompanyMasterApi(payload)),

    };
};
export default connect(mapStateToProps, mapDispatchState)(Comapny)
