import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
} from "@mui/material";

interface DialogButton {
    label: string;
    color?: "inherit" | "primary" | "secondary" | "success" | "warning" | "error" | "info";
    onClick: () => void;
}

interface DynamicDialogProps extends DialogProps {
    title: string;
    message: string;
    open: boolean;
    onClose: () => void;
    buttons: DialogButton[];
}

const DynamicDialog: React.FC<DynamicDialogProps> = ({
    title,
    message,
    buttons,
    open,
    onClose,
    ...props
}) => {

    return (
        <>

            <Dialog open={open} onClose={onClose} {...props}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            onClick={()=>{
                                button.onClick();
                            }}
                            color={button.color || "primary"} >
                            {button.label}
                        </Button>
                    ))}
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DynamicDialog;
