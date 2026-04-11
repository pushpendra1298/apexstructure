import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export default function CivilEngineeringHeroBackground({ className = '', style }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup (transparent so your CSS gradient still shows)
    const scene = new THREE.Scene()
    // Softer fog so the building doesn't look faded
    scene.fog = new THREE.Fog(0x020810, 70, 260)

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    // Slightly closer camera for sharper, more "hero" framing
    camera.position.set(19, 14, 19)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearAlpha(0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.physicallyCorrectLights = true
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    mount.appendChild(renderer.domElement)

    // Environment lighting (adds realism/reflections)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTex

    // Lighting
    scene.add(new THREE.HemisphereLight(0x93c5fd, 0x0b1220, 0.7))

    const sunLight = new THREE.DirectionalLight(0xfff4e6, 2.1)
    sunLight.position.set(30, 40, 20)
    sunLight.castShadow = true
    sunLight.shadow.radius = 4
    sunLight.shadow.camera.left = -50
    sunLight.shadow.camera.right = 50
    sunLight.shadow.camera.top = 50
    sunLight.shadow.camera.bottom = -50
    sunLight.shadow.mapSize.width = 4096
    sunLight.shadow.mapSize.height = 4096
    sunLight.shadow.bias = -0.0001
    scene.add(sunLight)

    const fillLight = new THREE.DirectionalLight(0x80b3ff, 0.85)
    fillLight.position.set(-20, 15, -15)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xffb366, 0.6)
    rimLight.position.set(0, 20, -30)
    scene.add(rimLight)

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(200, 200, 80, 80)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b1220,
      roughness: 0.98,
      metalness: 0.02,
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true

    const groundPositions = groundGeometry.attributes.position
    for (let i = 0; i < groundPositions.count; i++) {
      const x = groundPositions.getX(i)
      const y = groundPositions.getY(i)
      const wave = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 0.22
      groundPositions.setZ(i, wave)
    }
    groundGeometry.computeVertexNormals()
    scene.add(ground)

    // Grid
    const gridHelper = new THREE.GridHelper(100, 100, 0x1f2a44, 0x131c2f)
    gridHelper.position.y = 0.05
    gridHelper.material.opacity = 0.25
    gridHelper.material.transparent = true
    scene.add(gridHelper)

    // Building group
    const buildingGroup = new THREE.Group()

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x9aa3ad,
      roughness: 0.85,
      metalness: 0.12,
    })

    const foundation = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 10), concreteMat)
    foundation.position.y = 0.4
    foundation.castShadow = true
    foundation.receiveShadow = true
    buildingGroup.add(foundation)

    const floors = 6
    for (let i = 0; i < floors; i++) {
      const floor = new THREE.Mesh(new THREE.BoxGeometry(9, 0.4, 9), concreteMat)
      floor.position.y = 0.8 + i * 3
      floor.castShadow = true
      floor.receiveShadow = true
      buildingGroup.add(floor)

      const columnGeo = new THREE.BoxGeometry(0.5, 2.6, 0.5)
      const positions = [
        [-4, -4], [4, -4], [-4, 4], [4, 4],
        [0, -4], [0, 4], [-4, 0], [4, 0],
      ]
      positions.forEach(([x, z]) => {
        const column = new THREE.Mesh(columnGeo, concreteMat)
        column.position.set(x, 2 + i * 3, z)
        column.castShadow = true
        column.receiveShadow = true
        buildingGroup.add(column)
      })

      if (i > 0) {
        const glassGeo = new THREE.BoxGeometry(8.5, 2.5, 0.15)
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x4a90e2,
          transparent: true,
          opacity: 0.22,
          roughness: 0.02,
          metalness: 0.2,
          transmission: 0.9,
          thickness: 0.8,
          envMapIntensity: 1.6,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
        })
        const sides = [
          { pos: [0, 1.9 + i * 3, 4.5], rot: [0, 0, 0] },
          { pos: [0, 1.9 + i * 3, -4.5], rot: [0, 0, 0] },
          { pos: [4.5, 1.9 + i * 3, 0], rot: [0, Math.PI / 2, 0] },
          { pos: [-4.5, 1.9 + i * 3, 0], rot: [0, Math.PI / 2, 0] },
        ]
        sides.forEach(({ pos, rot }) => {
          const glass = new THREE.Mesh(glassGeo, glassMat)
          glass.position.set(...pos)
          glass.rotation.set(...rot)
          buildingGroup.add(glass)
        })
      }
    }

    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(9.5, 0.6, 9.5),
      new THREE.MeshStandardMaterial({ color: 0x607d8b, roughness: 0.6, metalness: 0.4 }),
    )
    roof.position.y = 0.8 + floors * 3 + 0.3
    roof.castShadow = true
    buildingGroup.add(roof)

    scene.add(buildingGroup)
    buildingGroup.position.y = 0.2
    // Slightly shorter building height (Y) for better proportions
    buildingGroup.scale.set(1.08, 0.96, 1.08)

    // Floating beams
    const floatingElements = []
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      roughness: 0.3,
      metalness: 0.9,
      emissive: 0xff6b35,
      emissiveIntensity: 0.08,
    })

    // Keep floating beams outside the building footprint (avoid intersection)
    const pickBeamXZ = () => {
      // Building is centered near origin; keep a safety radius around it.
      // Beam length + rotation can still intersect, so use a larger no-fly zone.
      const safeR = 16
      const safeBox = 12 // axis-aligned half-extent around building
      for (let tries = 0; tries < 40; tries++) {
        // Keep beams on the "right side" so hero text area stays clean.
        const x = 18 + Math.random() * 14
        const z = (Math.random() - 0.5) * 34
        const outsideRadius = (x * x + z * z) >= safeR * safeR
        const outsideBox = !(Math.abs(x) < safeBox && Math.abs(z) < safeBox)
        if (outsideRadius && outsideBox) return { x, z }
      }
      // Fallback: push outward on X if random keeps failing
      return { x: 20 + Math.random() * 6, z: (Math.random() - 0.5) * 30 }
    }

    for (let i = 0; i < 8; i++) {
      const beamGroup = new THREE.Group()
      const beam = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.28, 0.28), steelMat)
      beamGroup.add(beam)

      const flangeGeo = new THREE.BoxGeometry(3.6, 0.11, 0.55)
      const topFlange = new THREE.Mesh(flangeGeo, steelMat)
      topFlange.position.y = 0.19
      beamGroup.add(topFlange)
      const bottomFlange = new THREE.Mesh(flangeGeo, steelMat)
      bottomFlange.position.y = -0.19
      beamGroup.add(bottomFlange)

      const { x, z } = pickBeamXZ()
      beamGroup.position.set(
        x,
        8 + Math.random() * 10,
        z,
      )
      beamGroup.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)

      beamGroup.userData = {
        speedY: 0.003 + Math.random() * 0.007,
        speedRotX: (Math.random() - 0.5) * 0.015,
        speedRotY: (Math.random() - 0.5) * 0.02,
        originalY: beamGroup.position.y,
        floatAmplitude: 1 + Math.random() * 2,
      }

      floatingElements.push(beamGroup)
      scene.add(beamGroup)
    }

    // ── Right-side moving civil/geometric items (kept away from left text) ──
    // Orbit center shifted to the right, so items never pass behind the left-side hero text.
    const orbitCenter = new THREE.Vector3(10, 7.5, 0)

    const itemMat1 = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, roughness: 0.35, metalness: 0.7,
      emissive: 0xf59e0b, emissiveIntensity: 0.06,
    })
    const itemMat2 = new THREE.MeshStandardMaterial({
      color: 0x60a5fa, roughness: 0.35, metalness: 0.55,
      emissive: 0x60a5fa, emissiveIntensity: 0.05,
    })
    const itemMat3 = new THREE.MeshStandardMaterial({
      color: 0x22c55e, roughness: 0.4, metalness: 0.35,
      emissive: 0x22c55e, emissiveIntensity: 0.04,
    })
    const itemMat4 = new THREE.MeshStandardMaterial({
      color: 0xff6b35, roughness: 0.28, metalness: 0.85,
      emissive: 0xff6b35, emissiveIntensity: 0.06,
    })

    const orbitItems = []
    const addOrbitItem = (obj, { r, y, speed, angle, wobble = 0.35, spinY = 0.01, spinX = 0.004 }) => {
      obj.userData = { r, y, speed, angle, wobble, spinY, spinX }
      orbitItems.push(obj)
      scene.add(obj)
    }

    // Small beams (mini I-beams)
    for (let i = 0; i < 4; i++) {
      const g = new THREE.Group()
      const miniBeam = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.18, 0.18), steelMat)
      g.add(miniBeam)
      const miniFlangeGeo = new THREE.BoxGeometry(2.2, 0.07, 0.38)
      const tF = new THREE.Mesh(miniFlangeGeo, steelMat)
      tF.position.y = 0.12
      g.add(tF)
      const bF = new THREE.Mesh(miniFlangeGeo, steelMat)
      bF.position.y = -0.12
      g.add(bF)
      g.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      addOrbitItem(g, { r: 10 + i * 1.6, y: 6 + i * 0.6, speed: 0.006 + i * 0.0007, angle: i * 1.4, wobble: 0.22, spinY: 0.012 })
    }

    // Spheres
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 20), itemMat2)
      s.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      addOrbitItem(s, { r: 8.5 + i * 2.2, y: 5.8 + i * 1.0, speed: 0.008 + i * 0.0006, angle: 0.8 + i * 2.1, wobble: 0.28, spinY: 0.01, spinX: 0.006 })
    }

    // Triangles (cones)
    for (let i = 0; i < 3; i++) {
      const t = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.4, 20), itemMat3)
      t.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      addOrbitItem(t, { r: 9 + i * 2.5, y: 7.2 + i * 0.8, speed: 0.007 + i * 0.0007, angle: 2.2 + i * 1.9, wobble: 0.25, spinY: 0.012, spinX: 0.007 })
    }

    // Squares (cubes)
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.05, 1.05), itemMat1)
      c.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      addOrbitItem(c, { r: 7.8 + i * 2.8, y: 8.2 + i * 0.65, speed: 0.0075 + i * 0.0006, angle: 1.6 + i * 2.0, wobble: 0.26, spinY: 0.014, spinX: 0.006 })
    }

    // Hammer (simple head + handle)
    const hammer = new THREE.Group()
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.2, 14), itemMat4)
    handle.rotation.z = Math.PI / 2
    hammer.add(handle)
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.35), itemMat4)
    head.position.x = 1.15
    hammer.add(head)
    hammer.rotation.set(0.4, 0.8, -0.3)
    addOrbitItem(hammer, { r: 12.5, y: 6.4, speed: 0.0055, angle: 3.1, wobble: 0.18, spinY: 0.01, spinX: 0.004 })

    // Simple particles
    const particleCount = 90
    const particlesGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 90
      particlePositions[i + 1] = Math.random() * 26
      particlePositions[i + 2] = (Math.random() - 0.5) * 90
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particles = new THREE.Points(
      particlesGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, transparent: true, opacity: 0.35 }),
    )
    scene.add(particles)

    // Mouse interaction (subtle)
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Resize to container (not full screen)
    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }

    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(mount)

    // Camera animation
    // Keep camera mostly fixed so beams don't drift behind the hero text
    let cameraAngle = 0.75
    const cameraRadius = 30
    const cameraHeight = 15

    let raf = 0
    let time = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      time += 0.016

      cameraAngle = 0.75 + Math.sin(time * 0.12) * 0.06
      targetX += (mouseX * 5 - targetX) * 0.03
      targetY += (mouseY * 5 - targetY) * 0.03

      camera.position.x = Math.cos(cameraAngle) * cameraRadius + targetX
      camera.position.z = Math.sin(cameraAngle) * cameraRadius
      camera.position.y = cameraHeight + targetY + Math.sin(time * 0.5) * 1
      camera.lookAt(0, 8, 0)

      const breathe = 1 + Math.sin(time * 0.4) * 0.015
      // Keep Y a bit tighter so the building doesn't "stretch" vertically
      buildingGroup.scale.set(1.08 * breathe, 0.96 * (1 + (breathe - 1) * 0.55), 1.08 * breathe)
      buildingGroup.rotation.y = Math.sin(time * 0.2) * 0.03

      floatingElements.forEach((element) => {
        element.position.y = element.userData.originalY
          + Math.sin(time * element.userData.speedY) * element.userData.floatAmplitude
        element.rotation.x += element.userData.speedRotX
        element.rotation.y += element.userData.speedRotY
      })

      // Orbit items stay to the right side, around the building (never behind left text)
      orbitItems.forEach((obj, idx) => {
        const d = obj.userData
        d.angle += d.speed
        const x = orbitCenter.x + Math.cos(d.angle) * d.r
        const z = orbitCenter.z + Math.sin(d.angle) * d.r
        obj.position.set(x, d.y + Math.sin(time * 0.8 + idx) * d.wobble, z)
        obj.rotation.y += d.spinY
        obj.rotation.x += d.spinX
      })

      particles.rotation.y = time * 0.02

      renderer.render(scene, camera)
    }

    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)

      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)

      envTex?.dispose?.()
      pmrem.dispose()

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose())
          else object.material.dispose()
        }
      })

      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}

