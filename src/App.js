import React from 'react';
import ContactList from './pages/ContactList/index';
import Menu from './pages/Menu/index';

import './App.css';
import './global.css'

function App() {
    return (
        <div className="app">
            <aside>
                <Menu />
            </aside>
            <main>
                <ContactList />
            </main>
        </div>
    );
}

export default App;