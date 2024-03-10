import React, { useEffect } from 'react';
import PropTypes from "prop-types";
//@ts-ignore
import {getNoticeState} from "@/core/state/selectors";
//@ts-ignore
import { removeNotice } from "@/core/state/actions";
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux";

const ToastAlert = ({ noticeId, message, bg, delay, items, removeNotice }: { noticeId: number, showDismiss: boolean, message: string, bg: AlertColor | undefined, delay: number, items: any, removeNotice: any }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            let data = Object.assign({}, items);
            delete data[noticeId];
            removeNotice(data);
        }, delay ? delay : 3000);
        return () => clearTimeout(timer);
    }, [])
    const alertTitle = Object.assign({}, { success: 'Success', error: "Error", warning: "Warning", info: "Info" });
    return (
        <>
            <Alert
                style={{position: 'relative'}}
                variant="filled" severity={bg} 
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            let data = Object.assign({}, items);
                            delete data[noticeId];
                            removeNotice(data);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2,
                    fontSize: 'inherit',
    
                     zIndex: 'tooltip', position: 'absolute', top: 40, right: 40, maxWidth: '100%' }}
            >
                {bg && <strong>{ alertTitle[bg] }</strong>} {message}
            </Alert>

        </>
    )
}
const bg = ["success", "error", "warning", "info"];
ToastAlert.propTypes = {
    message: PropTypes.string.isRequired,
    bg: PropTypes.oneOf(bg),
    delay: PropTypes.number,
    noticeId: PropTypes.string,
}

const mapGetState = (state: any) => {
    return {
        items: getNoticeState(state)
    };
};

const mapDispatchState = (dispatch: any) => {
    return {
        removeNotice: (payload: any) => dispatch(removeNotice(payload)),
    };
};

export default connect(mapGetState, mapDispatchState)(ToastAlert);