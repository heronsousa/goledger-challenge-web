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
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Backdrop } from '@material-ui/core';

import './styles.css';
import user_icon from '../../assets/user-icon.svg';
import { flexbox } from '@material-ui/system';

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

export default function Contact({ contact }) {

    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);
    const [phone, setPhone] = useState(contact.phone);
    const [company, setCompany] = useState(contact.company);
    const [age, setAge] = useState(contact.age);
    const [visibleInfo, setVisibleInfo] = useState(false);
    const [open, setOpen] = React.useState(false);

    const iconStyles = {
        fontSize: 13,
        marginRight: 3,
        color: '#333'
    }

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function deleteContact(name) {
        const data = {
            "@assetType": "contact",
            "name": name
        }

        await api.delete('/delete', { data });
        window.location.reload(false);
    }

    async function updateContact(e) {
        e.preventDefault();

        const data = {
            "@assetType": "contact",
            "name": name,
            "email": email,
            "age": Number(age),
            "company": company,
            "phone": phone
        }

        await api.put('/update', data);
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
                                    {contact.age}
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
                                onClick={handleOpen}
                            />
                            <Delete
                                fontSize={'small'}
                                style={{ color: '#333' }}
                                onClick={() => { deleteContact(contact.name) }}
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

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <strong className="form-title">Atualizar contato</strong>
                    
                        <form className={classes.form} onSubmit={updateContact}>

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
        </>
    );
}
