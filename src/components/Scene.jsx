/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { Box, Environment } from "@react-three/drei"

const Scene = ({ matrix, background = "black" }) => {
  
  return (
    <>
      <color attach="background" args={[background]} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.8} position={[10, 10, -15]} castShadow shadow-mapSize={1024} />
      <Environment preset="city" />

      <group 
        //matrixAutoUpdate={false}
        //onUpdate={(self) => (self.matrix = matrix)}
      >
        <Box />
      </group>
    
    </>
  )
}

export default Scene