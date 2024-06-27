import { useSnapshot } from "valtio";
import state from "../store";

interface CB {
    type: 'filled',
    title: string;
    handleClick: () => void;
    customStyles: string
}

const CustomButton = ({ customStyles, handleClick, title, type }: CB) => {

    const snap = useSnapshot(state)

    const generateStyle = (type: 'filled') => {
        if (type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: '#fff'
            }
        }
    }

  return (
    <button 
        className={`px-2 py-1.2 flex-1 rounded-md ${customStyles}`}
        style={generateStyle(type)}
        onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default CustomButton