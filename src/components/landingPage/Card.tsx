interface CardProps {
  title: string;
  description: string;
  imageUrl: any; 
}

const Card = ({ title, description, imageUrl }: CardProps) => {
  return (
    <div className="border-2 border-gray-300 bg-white max-w-sm m-1 
    flex flex-col overflow-hidden rounded-xl shadow-xl transition transform hover:scale-[1.02]">

      {imageUrl && (
        <img className='w-full h-48 object-cover'
          src={imageUrl} 
          alt={`Viagem para ${title}`}
        />
      )}

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          
          <p className="text-sm text-gray-600 mb-4">
            {description}
          </p>
        </div>

        <button className="mt-4 w-full bg-[#2071b3] text-white py-2.5 px-6 
        rounded-lg transition duration-300 hover:bg-blue-800 shadow-md">
          Saiba Mais...
        </button>
      </div>
    </div>
  );
}

export default Card;