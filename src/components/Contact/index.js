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
import ContactForm from '../ContactForm/index';

import './styles.css';

import user_icon from '../../assets/user-icon.svg';

export default function Contact({ contact }) {

    const [visibleInfo, setVisibleInfo] = useState(false);
    const [open, setOpen] = React.useState(false);
    const title = 'Atualizar contato';

    const iconStyles = {
        fontSize: 13,
        marginRight: 3,
        color: '#333'
    }

    async function deleteContact(name) {
        const data = {
            "@assetType": "contact",
            "name": name
        }

        await api.delete('/delete', { data });
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
                                onClick={() => { setOpen(true) }}
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

            <ContactForm modal={{ open, setOpen, contact, title }} />
        </>
    );
}
