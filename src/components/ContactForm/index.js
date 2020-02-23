import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Backdrop } from '@material-ui/core';
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
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        borderRadius: 4
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    }
}));

export default function ContactForm({ modal }) {

    const { open, setOpen, contact, title } = modal;

    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);
    const [phone, setPhone] = useState(contact.phone);
    const [company, setCompany] = useState(contact.company);
    const [age, setAge] = useState(contact.age);

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

        await api.put('/update', data);
        window.location.reload(false);
    }

    async function createContact(e) {
        e.preventDefault();

        await api.post('/create', data);
        window.location.reload(false);
    }

    return (

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
                
                    <form className={classes.form} onSubmit={ title=='Adicionar' ? createContact : updateContact}>

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

                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
}