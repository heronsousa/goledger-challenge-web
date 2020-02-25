import React, { useState } from 'react';
import api from '../../services/api';
import {
    Delete,
    Edit,
    Phone,
    Email,
    Business,
    Today,
    ExpandMore,
    ExpandLess
} from '@material-ui/icons';
import { Modal, Fade, Backdrop, CircularProgress } from '@material-ui/core';
import ContactForm from '../ContactForm/index';
import AlertMessage from '../AlertMessage/index';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';
import user_icon from '../../assets/user-icon.png';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

        height: 120,
        width: 280,
        
        borderRadius: 4,
        border: '2px solid #333',
        backgroundColor: '#fafafa',
        padding: 15,
        fontWeight: 'bold',
        color: '#333',
        fontSize: 17
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    button: {
        alignSelf: 'flex-end',
        border: 0,
        marginLeft: 7,
        backgroundColor: 'rgb(0, 119, 255)',
        borderRadius: 2,
        padding: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        cursor: 'pointer'
    },
    backDrop: {
        background: 'none'
    },
}));


export default function Contact({ contact }) {

    const [visibleInfo, setVisibleInfo] = useState(false);
    const [open, setOpen] = useState(false);
    const [opena, setOpena] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const title = 'Atualizar';
    const classes = useStyles();

    const iconStyles = {
        fontSize: 13,
        marginRight: 3,
        color: '#333'
    }

    async function deleteContact() {
        const data = {
            "@assetType": "contact",
            "name": contact.name
        }
        try {
            await api.delete('/delete', { data })
            setAlertMessage('Contato excluído com sucesso!')
            
        } catch (error) {
            setAlertMessage('Erro ao excluir contato.')
        }
        
        setOpenAlert(true);
        setInterval(handleClose, 5000);
    }

    function handleClose() {
        setOpenAlert(false);
        window.location.reload(false);
    }

    return (
        <>
            <li>
                <div className="contact" onClick={() => { setVisibleInfo(!visibleInfo) }}>
                    <img src={user_icon} alt="UserImage" className={visibleInfo ? "increaseImg" : null} />

                    <div className="contact-info">
                        <strong>{contact.name}</strong>

                        {visibleInfo ?
                            <>
                                <div className="infos">
                                    <Phone style={iconStyles} />
                                    {contact.phone}
                                </div>
                                <div className="infos">
                                    <Email style={iconStyles} />
                                    {contact.email}
                                </div>
                                <div className="infos">
                                    <Business style={iconStyles} />
                                    {contact.company}
                                </div>
                                <div className="infos">
                                    <Today style={iconStyles} />
                                    {contact.age} anos
                                </div>
                            </>
                            : null}

                    </div>
                </div>

                <div className="contact-actions">
                    {visibleInfo ?
                        <>
                            <Edit
                                fontSize={'small'}
                                style={{ color: '#333' }}
                                onClick={() => { setOpen(true) }}
                            />
                            <Delete
                                fontSize={'small'}
                                style={{ color: '#333' }}
                                onClick={() => { setOpena(true) }}
                            />
                            <ExpandLess
                                fontSize={'small'}
                                style={{ color: '#333' }}
                                onClick={() => { setVisibleInfo(!visibleInfo) }}
                            />
                        </>
                        :
                        <ExpandMore
                        fontSize={'small'}
                        style={{ color: '#333' }}
                        onClick={() => { setVisibleInfo(!visibleInfo) }}
                        />
                    }
                </div>
            </li>

            <ContactForm modal={{ open, setOpen, contact, title }} />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={opena}
                onClose={() => { setOpena(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    classes: {
                        root: classes.backDrop
                    }
                }}
            >
                <Fade in={opena}>
                    <div className={classes.dialog}>
                        <strong>Deseja excluir {contact.name}?</strong>
                        <div className={classes.buttons}>
                            <button onClick={deleteContact} className={classes.button}>Confirmar</button>
                            <button onClick={() => { setOpena(false) }} className={classes.button}>Cancelar</button>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <AlertMessage alert={{openAlert, setOpenAlert, alertMessage}} />
        </>
    );
}
