import { useFrame } from "@react-three/fiber"
import { easing } from "maath"
import { ReactNode, useRef } from "react"
import { useSnapshot } from "valtio"
import state from "../store"

const CameraRig = ({ children }: { children: ReactNode }) => {

    const snap = useSnapshot(state);
    const group: any = useRef();


    useFrame((state, delta) => {
        //  smooth model rotation
        easing.dampE(
            group.current.rotation, 
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.1,
            delta
        );

        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        //  model position
        let targetPosition: any = [-0.4, 0, 2];
        if (snap.intro) {
            if (isBreakpoint) targetPosition = [0, 0, 2];
            else if (isMobile) targetPosition = [0, 0.2, 2.5]
        } else {
            if (isMobile) targetPosition = [0, 0, 2.5]
            else targetPosition = [0, 0, 2]
        }
        
        // camera position
        easing.damp3(
            state.camera.position,
            targetPosition,
            0.25,
            delta
        )
    })

    //  Set the model rotation

  return (
    <group ref={group}>{children}</group>
  )
}

export default CameraRig