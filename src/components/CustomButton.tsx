import { useSnapshot } from "valtio";
import state from "../store";
import { getContrastingColor } from "../config/helpers";

interface CB {
    type: 'filled' | 'outline',
    title: string;
    handleClick: () => void;
    customStyles: string
}

const CustomButton = ({ customStyles, handleClick, title, type }: CB) => {

    const snap = useSnapshot(state)

    const generateStyle = (type: 'filled' | 'outline') => {
        if (type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if (type === 'outline') {
            return {
                borderWidth: '1px',
                borderColor: snap.color,
                color: snap.color
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