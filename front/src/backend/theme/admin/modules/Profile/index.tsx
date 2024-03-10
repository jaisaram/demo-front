import * as React from 'react';
import Popper from '@mui/material/Popper';
import ButtonBase from '@mui/material/ButtonBase';
import { useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { LogoutOutlined } from '@mui/icons-material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { logoutUser } from "../../../../state/data-layer/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser, isAuthenticated } from '../../../../state/selectors';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Link from '../../../../../core/_component/Link';

const Profile = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const isAuth = useSelector(isAuthenticated);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleLogout = async () => {
        if (isAuth && user) {
            dispatch(logoutUser({ userId: user.id }));

        }
    };

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = (event: { currentTarget: React.SetStateAction<HTMLButtonElement | null>; }) => {
        setOpen((prevOpen) => !prevOpen);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: { target: any; }) => {
        setOpen(false);
    };


    return (
        <div>
            <ButtonBase
                sx={{
                    p: 0.05,
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'secondary.lighter' }
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 0.5 }}>
                    <Avatar alt="profile user" src={"/assets/images/profile-kuladeep.jpg"} sx={{ width: 32, height: 32 }} />
                    <Typography variant="subtitle1">{user && user.name}</Typography>
                </Stack>
            </ButtonBase>
            <Popper open={open} anchorEl={anchorEl} placement={'bottom-end'} transition

            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Fade {...TransitionProps} timeout={350}>

                            <Paper
                                sx={{

                                    minWidth: '100%',
                                    maxWidth: '100%',
                                }}

                            >
                                <CardContent sx={{ px: 2.5, pt: 3 }}>
                                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Stack direction="row" spacing={1.25} alignItems="center">
                                                <Avatar alt="profile user" src={"   /assets/images/profile-kuladeep.jpg"} sx={{ width: 32, height: 32 }} />
                                            </Stack>
                                        </Grid>

                                        <Grid item>
                                            <Stack>
                                                <Typography variant="h6">{user && user.name}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item>
                                            <IconButton size="small" color="primary" title='Log Out' onClick={handleLogout}>
                                                <LogoutOutlined />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="center" textAlign={'center'} alignItems="center">

                                        {user && user.designations && user.email && <Stack width={'100%'} paddingY={'10px'}>
                                            <Typography variant="subtitle2"><Link href={"#"} className={""} style>{user.email}</Link></Typography>
                                            <Typography variant="subtitle2">{`(${user.designations})`}</Typography>
                                        </Stack>}
                                        <Stack>
                                            <Button variant="outlined" size='small' style={{ textTransform: 'none' }} color="primary" type="button" onClick={() => {
                                                navigate('/user/profile');

                                            }}>
                                                {'Edit Profile'}
                                            </Button>
                                        </Stack>

                                    </Grid>
                                </CardContent>
                            </Paper>

                        </Fade>
                    </ClickAwayListener>
                )}
            </Popper>
        </div>
    );
}

export default Profile;