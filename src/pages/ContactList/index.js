import React, { useEffect, useState } from 'react';
import Contact from '../../components/Contact/index';

import api from '../../services/api';

import './styles.css';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function getContacts() {
            const selector = { "@assetType": "contact" };
            const response = await api.post('/search', { selector });
            
            setContacts(response.data.result);
        }
        
        getContacts();
    }, []);

    return (
        <ul className="contact-container">
            {contacts.map(contact => (
                <Contact key={contact['@key']} contact={contact} />
            ))}
        </ul>
    );
}
