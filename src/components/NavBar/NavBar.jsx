import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() { 
  return (
    <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 30px', 
        backgroundColor: '#fa7f46ff', 
        
        position: 'fixed', 
        top: 0,           
        left: 0,          
        width: '100%',    
        zIndex: 100       
    }}>
      
      <Link to="/" className="logo" style={{ fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'none', color: '#2071b3ff' }}>
        DESTINO
      </Link>
      
      <nav style={{ display: 'flex', gap: '25px' }}>
        <Link to="/viagens" style={{ textDecoration: 'none', color: '#ffffffff', fontWeight: '500' }}>Viagens</Link>
        <Link to="/relatorios" style={{ textDecoration: 'none', color: '#ffffffff', fontWeight: '500' }}>Relatórios</Link>
        <Link to="/contato" style={{ textDecoration: 'none', color: '#ffffffff', fontWeight: '500' }}>Contato</Link>
        <Link to="/login" style={{ textDecoration: 'none', color: '#2071b3ff', fontWeight: 'bold' }}>Sair (Admin)</Link>
      </nav>

      <div className="search-box">
        <input 
          type="search" 
          placeholder="Buscar no site..." 
          style={{ padding: '8px 10px', border: '1px solid #ccc', borderRadius: '15px', width: '200px', marginRight: '60px' }} 
        />
      </div>
    </header>
  );
}

export default Navbar;