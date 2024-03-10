import React from 'react';

import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const LoaderWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999999999,
    width: '100%',
}));


const Loader = () => (
    <LoaderWrapper>
        <LinearProgress color="primary" />
    </LoaderWrapper>
);

export default Loader;