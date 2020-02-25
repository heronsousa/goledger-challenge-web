import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop} from '@material-ui/core';

import './styles.css';

const useStyles = makeStyles(theme => ({
    dialogModal: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        margin: 20
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',

        border: '1px solid black',
        backgroundColor: 'rgb(0, 119, 255)',
        padding: 15,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18
    },
    button: {
        alignSelf: 'flex-end',
        width: 50,
        border: 0,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(0, 119, 255)',
    },
    backDrop: {
        background: 'none'
    },
}));

export default function AlertMessage({ alert }) {

    const { openAlert, setOpenAlert, alertMessage } = alert;

    const classes = useStyles();

    function handleClose() {
        setOpenAlert(false);
        window.location.reload(false);
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.dialogModal}
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
            <>
                <div className={classes.dialog}>
                    <strong>{alertMessage}</strong>
                    <button onClick={handleClose} className={classes.button}>OK</button>
                </div>
            </>
        </Modal>
    );
}