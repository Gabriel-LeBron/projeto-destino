import React from 'react';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface CampoInputProps {
  label: string;
  type: 'email' | 'password' | 'text';
  value: string;
  onChange: (e: InputChangeEvent) => void;
  required?: boolean;
}

export default function CampoInput({ label, type, value, onChange, required = false }: CampoInputProps) {
  return (
    <div className="mb-5 text-left"> 
      
      <label className="block mb-2 font-bold text-[#555]">
        {label}
      </label>
      
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        required={required} 
        className="
          w-full px-4 py-3 
          border border-gray-300 rounded-lg text-base 
          transition duration-300 
          focus:border-[#007bff] focus:outline-none focus:shadow-[0_0_5px_rgba(0,123,255,0.3)]
        "
      />
    </div>
  );
};