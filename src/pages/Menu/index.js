import React, { useState } from 'react';
import { PersonAddOutlined, PeopleAltOutlined } from '@material-ui/icons';

import ContactForm from '../../components/ContactForm/index';

import './styles.css';

export default function Menu() {

    const [open, setOpen] = useState(false);

    const contact = {
        "name": '',
        "email": '',
        "age": 0,
        "company": '',
        "phone": ''
    };
    const title = 'Adicionar';

    return (

        <div className="menu">

            <div className="menu-item" onClick={() => { window.location.reload(false) }}>
                <PeopleAltOutlined />
                <strong>Todos os contatos</strong>
            </div>

            <div className="menu-item" onClick={() => { setOpen(true) }}>
                <PersonAddOutlined />
                <strong>Adicionar contato</strong>
            </div>

            <ContactForm modal={{ open, setOpen, contact, title }} />

        </div>
    );
}
