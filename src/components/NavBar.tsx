import { Link } from 'react-router-dom';

export default function Navbar() { 
  return (
    <header className='flex flex-wrap  items-center place-content-between py-[15px] px-[30px] bg-[var(--bg-color-orange)]'>
      
      <Link to="/" className="font-bold text-2xl text-white">
        DESTINO
      </Link>
      
      <nav className='flex flex-wrap gap-4'>
        <Link to="/viagens" className='text-white font-medium hover:underline'>Viagens</Link>
        <Link to="/relatorios" className='text-white font-medium hover:underline'>Relatórios</Link>
        <Link to="/contato" className='text-white font-medium hover:underline'>Contato</Link>
        <Link to="/login" className='text-(--navbar-blue-text) hover:underline'> Username (Logout)</Link>
      </nav>

      <input className='text-lg bg-white text-black text-center 
      placeholder-black
      border-solid rounded-xl outline-2 border-b-neutral-100'
        type="search" 
        placeholder="Buscar no site..." 
      />
    </header>
  );
}