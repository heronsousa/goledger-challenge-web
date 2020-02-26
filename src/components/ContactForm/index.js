import React, { useState } from 'react';
import { Modal, Fade, Backdrop, CircularProgress } from '@material-ui/core';

import AlertMessage from '../AlertMessage/index';
import api from '../../services/api';

import './styles.css';

export default function ContactForm({ modal }) {

    const { open, setOpen, contact, title } = modal;

    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);
    const [phone, setPhone] = useState(contact.phone);
    const [company, setCompany] = useState(contact.company);
    const [age, setAge] = useState(contact.age);
    const [query, setQuery] = useState('idle');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [success, setSuccess] = useState(false);

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
            
            setAlertMessage('Contato atualizado!');
            setSuccess(true);
            setOpenAlert(true);
            setInterval(handleClose, 3000);
            
        } catch (err) {
            console.log(err);
            if (err.response.status === 404) {
                setAlertMessage('Contato não existe.');
            } else {
                setAlertMessage('Erro ao editar contato.');
            }
            setOpenAlert(true);
            setQuery('idle');
            setInterval(() => {setOpenAlert(false)}, 3000);
        }
    }

    async function createContact(e) {
        e.preventDefault();

        setQuery('progress');

        try {
            await api.post('/create', data);

            setAlertMessage('Contato adicionado!');
            setSuccess(true);
            setOpenAlert(true);
            setInterval(handleClose, 3000);

        } catch (err) {
            if (err.response.status === 409) {
                setAlertMessage('Contato já existe.');
            } else {
                setAlertMessage('Erro ao criar contato.');
            }
            setOpenAlert(true);
            setQuery('idle');
            setInterval(() => {setOpenAlert(false)}, 3000);
        }
    }
    
    function handleClose() {
        setOpenAlert(false);
        window.location.reload(false);
    }


    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={open}
                onClose={() => { setOpen(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="paper">
                        <strong className="form-title">{title} contato</strong>

                        <form className={"form"} onSubmit={title === 'Adicionar' ? createContact : updateContact}>

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
                                {query === 'progress' ?
                                    <CircularProgress size={20} color='inherit' /> :
                                    'Salvar'
                                }
                            </button>
                        </form>
                    </div>
                </Fade>
            </Modal>

            <AlertMessage alert={{openAlert, setOpenAlert, alertMessage, success}} />
        </>
    );
}