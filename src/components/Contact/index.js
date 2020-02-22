import React, {useState} from 'react';
import  api from '../../services/api';
import { Delete, Edit, Phone, Email, Business,Today } from '@material-ui/icons';

import './styles.css';
import user_icon from '../../assets/user-icon.svg';

export default function Contact({ contact }) {

    const [email, setEmail] = useState('');
    const [visibleInfo, setVisibleInfo] = useState(false);

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

    function handleVisibleInfo() {
        setVisibleInfo(!visibleInfo);
    }

    return (
        <>
            <li>
                <div className="contact" onClick={handleVisibleInfo}>
                    <img src={user_icon} alt="UserImage" className={visibleInfo ? "increaseImg": null} />

                    <div className="contact-info">
                        <strong>{contact.name}</strong>
                        
                        { visibleInfo ? 
                            <>
                                <div className="phone">
                                    <Phone style={{fontSize: 12, marginRight: 3, color: '#333'}} />
                                    {contact.phone}
                                </div>
                                <div className="email">
                                    <Email style={{fontSize: 12, marginRight: 3, color: '#333'}} />
                                    {contact.email}
                                </div>
                                <div className="company">
                                    <Business style={{fontSize: 12, marginRight: 3, color: '#333'}} />
                                    {contact.company}
                                </div>
                                <div className="age">
                                    <Today style={{fontSize: 12, marginRight: 3, color: '#333'}} />
                                    {contact.age}
                                </div>
                            </>
                        : null}

                    </div>
                </div>
                
                <div className="contact-actions">
                    <Edit 
                        fontSize={'small'} 
                        style={{color: '#333'}}
                        onClick={() => {updateContact(contact.name)}}
                    />
                    <Delete 
                        fontSize={'small'} 
                        style={{color: '#333'}}
                        onClick={() => {deleteContact(contact.name)}}
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
