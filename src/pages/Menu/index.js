import React from 'react';
import { PersonAdd, Group } from '@material-ui/icons';

import './styles.css';

export default function Menu() {
  return (
    <>
      <div className="menu-item" onClick={() => { window.location.reload(false) }}>
        <Group />
        <strong>Todos os contatos</strong>
      </div>
      
      <div className="menu-item">
        <PersonAdd />
        <strong>Adicionar contato</strong>
      </div>
    </>
  );
}
