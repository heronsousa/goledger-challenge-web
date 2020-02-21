import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Contact from '../../components/Contact/index';

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
        <div className="contact-container">
            {contacts.map(contact => (
                <Contact contact={contact} key={contact['@key']} />
            ))}
        </div>
    );
}
