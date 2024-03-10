import * as React from 'react';

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const theme = createTheme();
export default function ({ children }: { children: React.ReactNode }) {
    return (<>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>{children}</Box>
        </ThemeProvider></>
    )
}