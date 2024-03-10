import * as React from 'react';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ImageListItem from "@mui/material/ImageListItem";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import { makeStyles, styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
//@ts-ignore
import Profile from '@/backend/theme/admin/modules/Profile';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        
    }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function SidebarLayOut({ title, logoUrl, children }: { title: any, logoUrl: string, children: React.ReactNode }) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', backgroundColor: '#1976d2', borderLeft: "1px solid #1976d2"
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    <Profile></Profile>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" PaperProps={{
                sx: {
                    //backgroundColor: '#080002',
                    //color: '#f0f1f5',
                    fontWeight: 800,
                   // borderRight: '1px solid #ffffff',
                    
                }
            }} open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: [1],
                        //backgroundColor: '#ffffff'
                    }}
                >
                    <ImageListItem sx={{ width: '50%' }}>
                        <img
                            src={`${logoUrl}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${logoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={"Demo User"}
                            loading="lazy"
                        />
                    </ImageListItem>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav" sx={{padding: 0}}>
                    {children}
                </List>
            </Drawer>
        </>
    )
}