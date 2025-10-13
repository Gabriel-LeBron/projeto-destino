export default function Card({ title, description, imageUrl }) { 
  return (
    <div className="border-2 border-[#6e6e6e] bg-[#f1f1f1] max-w-[400px] m-2 
    flex flex-col overflow-hidden rounded-lg shadow-md">

      {imageUrl && (
        <img className='w-full h-[200px] object-cover'
          src={imageUrl} 
          alt={`Viagem para ${title}`}
        />
      )}

      <div className="p-4 h-[300px] flex flex-col justify-evenly">
        <h3 className="mb-2">{title}</h3>
        
        <p className="text-base mb-4 text-shadow-black">
          {description}
        </p>

        <button className="bg-[#2071b3] text-white py-2.5 px-6 border-none cursor-pointer rounded-sm hover:bg-blue-800">
          Saiba Mais...
        </button>
      </div>
    </div>
  );
}