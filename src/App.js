import React from 'react';
import { Group } from '@material-ui/icons';

import ContactList from './pages/ContactList/index';
import Menu from './pages/Menu/index';

import './App.css';
import './global.css'

function App() {
    return (
        <div className="app">
            {/* <aside>
                <Menu />
            </aside> */}
            <div className="header">
                <Group />
                <strong>Contatos</strong>
            </div>
            <main>
                <ContactList />
            </main>
        </div>
    );
}

export default App;