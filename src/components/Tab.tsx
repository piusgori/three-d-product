import { useSnapshot } from "valtio";
import state from "../store";

interface TB {
    tab?: any;
    isFilterTab?: any;
    isActiveTab?: any;
    handleClick: () => void;
}    

const Tab = ({ handleClick, isActiveTab, isFilterTab, tab }: TB) => {

    const snap = useSnapshot(state);

  return (
    <div>Tab</div>
  )
}

export default Tab