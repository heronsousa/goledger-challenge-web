import React, {useEffect, useState} from 'react';
import './App.css';
import api from './services/api';

function App() {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    try {
      async function getContacts() {
        const response = await api.post('/search', 
          {
            "selector": {
              "@assetType": "contact"
            }
          }
        );

        setContacts(response.data.result);
      }

      getContacts();
    } catch (error) {
      console.log(error);
    }
  });


  return (
    <div className="App">
      GoLedger Challenge
    </div>
  );
}

export default App;
