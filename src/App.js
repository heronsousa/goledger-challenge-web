import React, {useEffect, useState} from 'react';
import './App.css';
import api from './services/api';

function App() {

  const [contacts, setContacts] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function getContacts() {
      const selector = { "@assetType": "contact" };
      const response = await api.post('/search', { selector });
      
      setContacts(response.data.result);
    }
    
    getContacts();
  }, []);
  
  async function deleteContact(name){
    const data = {
      "@assetType": "contact",
      "name": name
    }

    await api.delete('/delete',{ data });
    window.location.reload(false);
  }

  async function updateContact(name){
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
      <div className="App">
        GoLedger Challenge
      </div>

      {contacts.map( contact => (
        <ul key={contact['@key']}>
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
        </ul>
      ))}
    </>
  );
}

export default App;
