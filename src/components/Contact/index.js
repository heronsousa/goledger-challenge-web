import React, {useState} from 'react';
import  api from '../../services/api';
import { Delete, Edit } from '@material-ui/icons';

import './styles.css';
import user_icon from '../../assets/user-icon.svg';

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
            <li>
                <div className="contact">
                    <img src={user_icon} alt=""/>

                    <div className="contact-info">
                        <strong>{contact.name}</strong>
                        <div className="phone">{contact.phone}</div>
                        <div className="email">{contact.email}</div>
                    </div>
                </div>
                
                <div className="contact-actions">
                    <Delete 
                        fontSize={'small'} 
                        onClick={() => {deleteContact(contact.name)}}
                    />
                    <Edit 
                        fontSize={'small'} 
                        onClick={() => {updateContact(contact.name)}}
                    />
                </div>
            </li>

            {/* <input 
                value={contact.email}
                onChange={e => setEmail(e.target.value)}
            /> */}

        </>
    );
}
