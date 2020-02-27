import React from 'react';
import { PeopleAltOutlined, RecentActorsOutlined } from '@material-ui/icons';

import ContactList from './pages/ContactList/index';
import Menu from './pages/Menu/index';

import logo from './assets/logo.png'
import './App.css';
import './global.css'

function App() {
    return (
        <div className="app">

            <div className="app-header">
                <img src={logo} alt=""/>
            </div>

            <div className="app-body">
                <aside>
                    <div className="header">
                        <RecentActorsOutlined />
                        <strong>PhoneBook</strong>
                    </div>
                    <div className="content">
                        <Menu />
                    </div>
                </aside>
                <main>
                    <div className="header">
                        <PeopleAltOutlined />
                        <strong>Contatos</strong>
                    </div>
                    <div className="content">
                        <ContactList />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;