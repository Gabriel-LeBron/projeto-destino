import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalMsg: String;
  url: string;
}

export default function AuthModal({
  setShowModal,
  modalMsg,
  url,
}: AuthModalProps) {
  const navigate = useNavigate();

  const redirecionar = (url: string) => {
    navigate(url);
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full transform transition-all duration-200">
        <h3 className="text-lg font-semibold text-gray-800">{modalMsg}</h3>
        <button
          className="mt-4 px-6 py-2 bg-[#2071b3] hover:bg-[#1a5b8e] text-white rounded-lg font-medium"
          onClick={() => {
            setShowModal(false);
            redirecionar(url);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
