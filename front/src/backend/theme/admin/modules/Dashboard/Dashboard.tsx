import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../state/selectors';
import Welcome from './welcome';

export default function Dashboard(props: any) {
    return (<>
        <Paper sx={{ width: '100%', minHeight: 'calc(100vh - 64px)', padding: '15px', boxShadow: 0 }}>
            <Box sx={{ width: '50%', padding: '10px', margin: 'auto' }}>
            <Welcome />
            </Box>
        </Paper>
        
    </>);
}