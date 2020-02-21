import React, {useState} from 'react';
import  api from '../../services/api'

import './index.css'

export default function Contact({ contact }) {

    const [email, setEmail] = useState('');

    async function deleteContact(name) {
        const data = {
            "@assetType": "contact",
            "name": name
        }

        await api.delete('/delete', { data });
        window.location.reload(false);
    }

    async function updateContact(name) {
        const data = {
            "@assetType": "contact",
            "name": name,
            "email": email
        }

        await api.put('/update', data);
        window.location.reload(false);
    }

    return (
        <>
            <li>Nome: {contact.name}</li>
            <li>Telefone: {contact.phone}</li>
            <li>Email: {contact.email}</li>
            <li>Companhia: {contact.company}</li>
            <li>Idade: {contact.age}</li>

            <input 
                value={contact.email}
                onChange={e => setEmail(e.target.value)}
            />

            <button onClick={() => {deleteContact(contact.name)}}>Delete</button>
            <button onClick={() => {updateContact(contact.name)}}>Update</button>
        </>
    );
}
