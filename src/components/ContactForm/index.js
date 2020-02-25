import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Backdrop, CircularProgress, Dialog, DialogTitle } from '@material-ui/core';
import api from '../../services/api';

import './styles.css';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: 20,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid rgb(0, 119, 255)',
        borderRadius: 4
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    placeholder: {
        height: 40,
    },
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
    }
}));

export default function ContactForm({ modal }) {

    const { open, setOpen, contact, title } = modal;

    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);
    const [phone, setPhone] = useState(contact.phone);
    const [company, setCompany] = useState(contact.company);
    const [age, setAge] = useState(contact.age);
    const [query, setQuery] = useState('idle');
    const [alertRes, setAlertRes] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const classes = useStyles();

    const data = {
        "@assetType": "contact",
        "name": name,
        "email": email,
        "age": Number(age),
        "company": company,
        "phone": phone
    }

    async function updateContact(e) {
        e.preventDefault();

        setQuery('progress');
        
        try {
            await api.put('/update', data);

            setAlertMessage('Contato atualizado com sucesso!');

        } catch(err) {
            if(err.response.status === 404){                    
                setAlertMessage('Contato não existe.');
                setQuery('idle');
            }
        }

        setAlertRes(true);
        setInterval(handleClose, 10000);
    }

    async function createContact(e) {
        e.preventDefault();

        await api.post('/create', data);
    }
    
    function handleClose() {
        setAlertRes(false);
        window.location.reload(false);
    }


    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => { setOpen(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <strong className="form-title">{title} contato</strong>

                        <form className={classes.form} onSubmit={title === 'Adicionar' ? createContact : updateContact}>

                            <div className="input-block">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    defaultValue={contact.name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className="input-block">
                                <label htmlFor="phone">Telefone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    required
                                    defaultValue={contact.phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="input-block">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    defaultValue={contact.email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="input-block">
                                <label htmlFor="company">Companhia</label>
                                <input
                                    type="text"
                                    id="company"
                                    defaultValue={contact.company}
                                    onChange={e => setCompany(e.target.value)}
                                />
                            </div>

                            <div className="input-block">
                                <label htmlFor="age">Idade</label>
                                <input
                                    type="number"
                                    id="age"
                                    defaultValue={contact.age}
                                    onChange={e => setAge(e.target.value)}
                                />
                            </div>

                            <button type="submit">
                                {query==='progress' ? 
                                    <CircularProgress size={20} color='inherit' /> :
                                    'Salvar'
                                }
                            </button>
                        </form>
                    </div>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.dialogModal}
                open={alertRes}
                onClose={handleClose}
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

        </>
    );
}