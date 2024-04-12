import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import Scene from './components/Scene'
import { useEffect, useRef, useState } from 'react'

function App() {
  const audioRef = useRef(null)
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Activate audio and video at certain times
  useEffect(()=>{
    if (audioRef.current) {
      audioRef.current.currentTime = 46
      audioRef.current.play()
    }
    //console.log(audioRef.current)

     // Delay video playback by 2 minutes
     const videoTimein = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
        videoRef.current.style.display = "block"
        console.log(videoRef.current)
      }
    }, 60000);
    const videoTimeout = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
        videoRef.current.style.display = "none"
        console.log(videoRef.current)
      }
    }, 99000);
    const animTimeout = setTimeout(() => {
      window.location.reload()
    }, 123000);

    return () => {
      clearTimeout(videoTimein);
      clearTimeout(videoTimeout);
      clearTimeout(animTimeout)
    }
  }, [audioRef, playing])

  if (!playing) return (
  <button style={{fontSize: "125px", margin: "100px"}} onClick={()=>setPlaying(true)}>Play</button>
)

  return (
    <div className="container">
      <Canvas shadows className='canvas'>
        <View.Port />
      </Canvas>
      <View>
        <PerspectiveCamera makeDefault position={[0,4,0]} fov={25} />
        {/* <OrbitControls /> */}
        <Scene background='#111111' fpsCam />
      </View>
      <View>
        <PerspectiveCamera makeDefault position={[0,4,4]} fov={35} />
        <OrbitControls autoRotate />
        <Scene background='black' />
      </View>
      <audio ref={audioRef} >
        <source src="./audio.m4a" type="audio/mpeg" />
      </audio>
      <video className='vid' ref={videoRef} src='./vid.mp4' muted ></video>
    </div>
  )
}

export default App
