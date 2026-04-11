import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3D() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, ref.current.clientWidth / ref.current.clientHeight, 0.1, 1000)
    camera.position.set(8, 6, 10)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(ref.current.clientWidth, ref.current.clientHeight)
    const container = ref.current
    container.appendChild(renderer.domElement)

    const light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(10, 10, 10)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.8))

    const group = new THREE.Group()
    const material = new THREE.MeshStandardMaterial({ color: 0x60a5fa, metalness: 0.6, roughness: 0.3 })

    for (let i = 0; i < 5; i++) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1, 2.5), material)
      box.position.y = i * 1.1
      group.add(box)
    }

    scene.add(group)

    let frame
    const clock = new THREE.Clock()
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // Faster rotation - increased from static 0.01
      group.rotation.y = time * 0.8
      group.rotation.z = Math.sin(time * 0.5) * 0.1 // Subtle tilt for more life

      // Faster Zoom in/out animation
      const zoomFactor = Math.sin(time * 1.5) * 2.5
      camera.position.z = 12 + zoomFactor
      
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])
  return <div ref={ref} className="h-[480px] w-[120%] rounded-[32px]" />
}