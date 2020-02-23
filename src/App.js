import React from 'react';
import { Group, RecentActors } from '@material-ui/icons';

import ContactList from './pages/ContactList/index';
import Menu from './pages/Menu/index';

import './App.css';
import './global.css'

function App() {
    return (
        <div className="app">
            <aside>
                <div className="header">
                    <RecentActors />
                    <strong>PhoneBook</strong>
                </div>
                <div className="content">
                    <Menu />
                </div>
            </aside>
            <main>
                <div className="header">
                    <Group />
                    <strong>Contatos</strong>
                </div>
                <div className="content">
                    <ContactList />
                </div>
            </main>
        </div>
    );
}

export default App;