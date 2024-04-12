import './App.css'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import Scene from './components/Scene'

const matrix = new THREE.Matrix4()

function App() {

  return (
    <div className="container">
      <Canvas shadows className='canvas'>
        <View.Port />
      </Canvas>
      <View>
        <PerspectiveCamera makeDefault position={[0,4,0]} fov={85} />
        {/* <OrbitControls /> */}
        <Scene matrix={matrix} background='#113311' />
      </View>
      <View>
        <PerspectiveCamera makeDefault position={[0,1,4]} fov={75} />
        <OrbitControls />
        <Scene matrix={matrix} background='black' />
      </View>
    </div>
  )
}

export default App
