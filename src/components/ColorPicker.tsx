import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';

const ColorPicker = () => {

    const snap = useSnapshot(state)
    
  return (
    <div className='absolute left-full ml-3'>
        <SketchPicker
            color={snap.color}
            disableAlpha
            presetColors={[
                '#ccc',
                '#efbd4e',
                "#80c670",
                '#726de8',
                '#353934',
                '#2ccce4',
                
            ]}
            onChange={(color) => { state.color = color.hex }}
        />
    </div>
  )
}

export default ColorPicker