import React from 'react';

function Card({ title, description, imageUrl }) { 
  return (
    <div className="card-container" 
         style={{ 
           border: '2px solid #6e6e6eff',
           backgroundColor: '#f1f1f1', 
           maxWidth: '370px', 
           margin: '10px', 
           display: 'flex',
           flexDirection: 'column',
           overflow: 'hidden', 
           borderRadius: '8px', 
           boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
         }}>

      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={`Viagem para ${title}`}
          style={{
            width: '100%',
            height: '200px', 
            objectFit: 'cover' 
          }} 
        />
      )}

      <div style={{ padding: '15px' }}>
        <h3 className="card-title" style={{ marginTop: '0', marginBottom: '10px' }}>{title}</h3>
        <p className="card-description" style={{ fontSize: '0.9em', color: '#333', marginBottom: '15px', }}>
          {description}
        </p>

        <button className="card-button" style={{ backgroundColor: '#2071b3ff', color: 'white', padding: '10px 25px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Saiba Mais...
        </button>
      </div>
    </div>
  );
}

export default Card;