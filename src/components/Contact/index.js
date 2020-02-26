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
import { Modal, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ContactForm from '../ContactForm/index';
import AlertMessage from '../AlertMessage/index';

import './styles.css';
import user_icon from '../../assets/user-icon.png';

const useStyles = makeStyles(theme => ({
    backDrop: {
        background: 'none'
    },
}));


export default function Contact({ contact }) {

    const [visibleInfo, setVisibleInfo] = useState(false);
    const [open, setOpen] = useState(false);
    const [opena, setOpena] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [success, setSuccess] = useState(false);
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
            setAlertMessage('Contato excluído!')
            setSuccess(true);
            
        } catch (error) {
            setAlertMessage('Erro ao excluir contato.')
        }
        
        setOpenAlert(true);
        setInterval(handleClose, 3000);
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
                className="modal"
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
                <div className="dialog">
                    <strong>Deseja excluir {contact.name}?</strong>
                    <div className="buttons">
                        <button onClick={deleteContact} className="button">Confirmar</button>
                        <button onClick={() => { setOpena(false) }} className="button">Cancelar</button>
                    </div>
                </div>
            </Modal>

            <AlertMessage alert={{openAlert, setOpenAlert, alertMessage, success}} />
        </>
    );
}
