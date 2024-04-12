/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { useAnimations, useGLTF } from "@react-three/drei"
import gltfFile from '../assets/davidVsSmasher.glb?url'
import { useEffect, useState } from "react"
import { useSkinnedMeshClone } from './SkinnedMeshClone'
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'

const Scene = ({ background = "black", fpsCam = false }) => {
  //const { scene, nodes, animations } = useGLTF(gltfFile)
  const { scene, nodes, animations } = useSkinnedMeshClone(gltfFile)
  const { actions } = useAnimations(animations, scene)

  const { camera } = useThree()
  const [headBone, setHeadBone] = useState(null)
  const [adamSmasher, setAdamSmasher] = useState(null)

  // Find Head Bone
  useEffect(() => {
    scene.traverse((object) => {
      if (object.isBone && object.name.toLowerCase() == 'spine_fk003') {
        setHeadBone(object)
        //console.log("Head bone:", object)
      }
      if (object.isBone && object.name.toLowerCase() == 'spine_fk003_1') {
        setAdamSmasher(object)
        //console.log("Smasher bone:", object)
      }
    })
  }, [scene])

  // Move camera
  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    if (fpsCam) {
      if (headBone && adamSmasher) {
        // Update the camera position to follow the head bone
        camera.position.copy(headBone.getWorldPosition(new THREE.Vector3()))
        camera.lookAt(adamSmasher.getWorldPosition(new THREE.Vector3()))
      }
    }
    else {
      if (headBone && adamSmasher) {
        // Update the camera position to follow the head bone
        camera.position.copy(adamSmasher.getWorldPosition(new THREE.Vector3()))
        camera.position.x += 4
        camera.position.y += 2
        camera.position.z += 2
        camera.lookAt(headBone.getWorldPosition(new THREE.Vector3()))
      }
    }
  })

  // Initial setup
  useEffect(()=>{
    //console.log(scene, nodes)
    Object.keys(nodes).forEach(nodeKey => {
      const node = nodes[nodeKey]
      if (node.type == "SkinnedMesh") {
        node.castShadow = true
        node.frustumCulled = false
        //if (!fpsCam) node.frustumCulled = false
        if (fpsCam && nodeKey == "Adam" ) node.frustumCulled = true
        if (fpsCam && nodeKey == "Mech" ) node.frustumCulled = true
        if (fpsCam && nodeKey == "Mowhawk" ) node.frustumCulled = true
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes])

  // Update Animation
  useEffect(()=>{
    //console.log(actions)
    actions.Animation.play()
  }, [actions])
  
  return (
    <>
      <color attach="background" args={[background]} />
      <ambientLight intensity={0.9} />
      <directionalLight color="#5555CC" intensity={9} position={[10, 10, -15]} castShadow shadow-mapSize={1024} />
      <directionalLight color="#BB0000" intensity={5.8} position={[-10, 10, +15]} castShadow shadow-mapSize={1024} />

      <group>
        <primitive object={scene} dispose={null} />
      </group>
    
    </>
  )
}

export default Scene

useGLTF.preload(gltfFile)