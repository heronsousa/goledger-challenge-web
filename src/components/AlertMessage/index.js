import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop} from '@material-ui/core';
import { CheckBox, Cancel } from '@material-ui/icons';

import './styles.css';

const useStyles = makeStyles(theme => ({
    backDrop: {
        background: 'none'
    }
}));

export default function AlertMessage({ alert }) {

    const { openAlert, setOpenAlert, alertMessage, success } = alert;

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="dialogModal"
            open={openAlert}
            onClose={() => {setOpenAlert(false)}}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                classes: {
                    root: classes.backDrop
                }
            }}
        >
            <div className={ success ? "success" : "error" }>
                { success ? <CheckBox/> : <Cancel />}
                <strong>{alertMessage}</strong>
            </div>
        </Modal>
    );
}