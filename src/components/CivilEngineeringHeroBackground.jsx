import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const PI = Math.PI, PI2 = PI * 2, sin = Math.sin, cos = Math.cos, rand = Math.random

const mkMat = (color, roughness, metalness, emissive, emissiveIntensity = 0) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness, ...(emissive ? { emissive, emissiveIntensity } : {}) })

export default function CivilEngineeringHeroBackground({ className = '', style }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Skip Three.js initialization on mobile for performance
    if (window.innerWidth < 768) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x020810, 70, 260)

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.set(19, 14, 19)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setClearAlpha(0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.physicallyCorrectLights = true
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    mount.appendChild(renderer.domElement)

    // Environment
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTex

    // Lights
    scene.add(new THREE.HemisphereLight(0x93c5fd, 0x0b1220, 0.7))

    const sunLight = new THREE.DirectionalLight(0xfff4e6, 2.1)
    sunLight.position.set(30, 40, 20)
    sunLight.castShadow = true
    Object.assign(sunLight.shadow, { radius: 4, bias: -0.0001 })
    Object.assign(sunLight.shadow.camera, { left: -50, right: 50, top: 50, bottom: -50 })
    sunLight.shadow.mapSize.set(4096, 4096)
    scene.add(sunLight)

    const addDir = (c, i, x, y, z) => { const l = new THREE.DirectionalLight(c, i); l.position.set(x, y, z); scene.add(l) }
    addDir(0x80b3ff, 0.85, -20, 15, -15)
    addDir(0xffb366, 0.6, 0, 20, -30)

    // Ground
    const groundGeo = new THREE.PlaneGeometry(200, 200, 80, 80)
    const ground = new THREE.Mesh(groundGeo, mkMat(0x0b1220, 0.98, 0.02))
    ground.rotation.x = -PI / 2
    ground.receiveShadow = true
    const gp = groundGeo.attributes.position
    for (let i = 0; i < gp.count; i++) gp.setZ(i, sin(gp.getX(i) * 0.05) * cos(gp.getY(i) * 0.05) * 0.22)
    groundGeo.computeVertexNormals()
    scene.add(ground)

    // Grid
    const grid = new THREE.GridHelper(100, 100, 0x1f2a44, 0x131c2f)
    grid.position.y = 0.05
    grid.material.opacity = 0.25
    grid.material.transparent = true
    scene.add(grid)

    // Building
    const bldg = new THREE.Group()
    const conc = mkMat(0x9aa3ad, 0.85, 0.12)

    const addShadowMesh = (geo, mat, pos, parent = bldg) => {
      const m = new THREE.Mesh(geo, mat)
      if (pos) m.position.set(...pos)
      m.castShadow = m.receiveShadow = true
      parent.add(m)
      return m
    }

    addShadowMesh(new THREE.BoxGeometry(10, 0.8, 10), conc, [0, 0.4, 0])

    const colGeo = new THREE.BoxGeometry(0.5, 2.6, 0.5)
    const colPos = [[-4, -4], [4, -4], [-4, 4], [4, 4], [0, -4], [0, 4], [-4, 0], [4, 0]]
    const floors = 6

    for (let i = 0; i < floors; i++) {
      addShadowMesh(new THREE.BoxGeometry(9, 0.4, 9), conc, [0, 0.8 + i * 3, 0])
      colPos.forEach(([x, z]) => addShadowMesh(colGeo, conc, [x, 2 + i * 3, z]))

      if (i > 0) {
        const glassGeo = new THREE.BoxGeometry(8.5, 2.5, 0.15)
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x4a90e2, transparent: true, opacity: 0.22, roughness: 0.02, metalness: 0.2,
          transmission: 0.9, thickness: 0.8, envMapIntensity: 1.6, clearcoat: 1, clearcoatRoughness: 0.06,
        })
        const y = 1.9 + i * 3
          ;[[0, y, 4.5, 0, 0, 0], [0, y, -4.5, 0, 0, 0], [4.5, y, 0, 0, PI / 2, 0], [-4.5, y, 0, 0, PI / 2, 0]].forEach(([px, py, pz, rx, ry, rz]) => {
            const g = new THREE.Mesh(glassGeo, glassMat)
            g.position.set(px, py, pz)
            g.rotation.set(rx, ry, rz)
            bldg.add(g)
          })
      }
    }

    const roof = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.6, 9.5), mkMat(0x607d8b, 0.6, 0.4))
    roof.position.y = 0.8 + floors * 3 + 0.3
    roof.castShadow = true
    bldg.add(roof)

    bldg.position.y = 0.2
    bldg.scale.set(1.08, 0.96, 1.08)
    scene.add(bldg)

    // Floating beams
    const steelMat = mkMat(0xff6b35, 0.3, 0.9, 0xff6b35, 0.08)
    const floats = []

    const pickXZ = () => {
      for (let t = 0; t < 40; t++) {
        const x = 18 + rand() * 14, z = (rand() - 0.5) * 34
        if (x * x + z * z >= 256 && !(Math.abs(x) < 12 && Math.abs(z) < 12)) return { x, z }
      }
      return { x: 20 + rand() * 6, z: (rand() - 0.5) * 30 }
    }

    const mkBeam = (w, h, flangeH, flangeW) => {
      const g = new THREE.Group()
      g.add(new THREE.Mesh(new THREE.BoxGeometry(w, h, h), steelMat))
      const fg = new THREE.BoxGeometry(w, flangeH, flangeW)
      const tf = new THREE.Mesh(fg, steelMat); tf.position.y = h * 0.68; g.add(tf)
      const bf = new THREE.Mesh(fg, steelMat); bf.position.y = -h * 0.68; g.add(bf)
      return g
    }

    for (let i = 0; i < 8; i++) {
      const bg = mkBeam(3.6, 0.28, 0.11, 0.55)
      const { x, z } = pickXZ()
      bg.position.set(x, 8 + rand() * 10, z)
      bg.rotation.set(rand() * PI, rand() * PI, rand() * PI)
      bg.userData = {
        sy: 0.003 + rand() * 0.007, srx: (rand() - 0.5) * 0.015, sry: (rand() - 0.5) * 0.02,
        oy: bg.position.y, amp: 1 + rand() * 2,
      }
      floats.push(bg)
      scene.add(bg)
    }

    // Orbit items
    const oc = new THREE.Vector3(10, 7.5, 0)
    const mats = [
      mkMat(0xf59e0b, 0.35, 0.7, 0xf59e0b, 0.06),
      mkMat(0x60a5fa, 0.35, 0.55, 0x60a5fa, 0.05),
      mkMat(0x22c55e, 0.4, 0.35, 0x22c55e, 0.04),
      mkMat(0xff6b35, 0.28, 0.85, 0xff6b35, 0.06),
    ]
    const orbits = []

    const addOrbit = (obj, r, y, speed, angle, wobble = 0.35, spinY = 0.01, spinX = 0.004) => {
      obj.userData = { r, y, speed, angle, wobble, spinY, spinX }
      orbits.push(obj)
      scene.add(obj)
    }

    // Mini beams
    for (let i = 0; i < 4; i++) {
      const g = mkBeam(2.2, 0.18, 0.07, 0.38)
      g.rotation.set(rand() * PI, rand() * PI, rand() * PI)
      addOrbit(g, 10 + i * 1.6, 6 + i * 0.6, 0.006 + i * 7e-4, i * 1.4, 0.22, 0.012)
    }
    // Spheres
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 20), mats[1])
      s.rotation.set(rand() * PI, rand() * PI, 0)
      addOrbit(s, 8.5 + i * 2.2, 5.8 + i, 0.008 + i * 6e-4, 0.8 + i * 2.1, 0.28, 0.01, 0.006)
    }
    // Cones
    for (let i = 0; i < 3; i++) {
      const t = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.4, 20), mats[2])
      t.rotation.set(rand() * PI, rand() * PI, rand() * PI)
      addOrbit(t, 9 + i * 2.5, 7.2 + i * 0.8, 0.007 + i * 7e-4, 2.2 + i * 1.9, 0.25, 0.012, 0.007)
    }
    // Cubes
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.05, 1.05), mats[0])
      c.rotation.set(rand() * PI, rand() * PI, rand() * PI)
      addOrbit(c, 7.8 + i * 2.8, 8.2 + i * 0.65, 0.0075 + i * 6e-4, 1.6 + i * 2, 0.26, 0.014, 0.006)
    }
    // Hammer
    const hammer = new THREE.Group()
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.2, 14), mats[3])
    handle.rotation.z = PI / 2
    hammer.add(handle)
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.35), mats[3])
    head.position.x = 1.15
    hammer.add(head)
    hammer.rotation.set(0.4, 0.8, -0.3)
    addOrbit(hammer, 12.5, 6.4, 0.0055, 3.1, 0.18, 0.01, 0.004)

    // Particles
    const pCount = 90, pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (rand() - 0.5) * 90; pPos[i + 1] = rand() * 26; pPos[i + 2] = (rand() - 0.5) * 90
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, transparent: true, opacity: 0.35 }))
    scene.add(particles)

    // Mouse
    let mx = 0, my = 0, tx = 0, ty = 0
    const onMouse = e => { mx = (e.clientX / window.innerWidth) * 2 - 1; my = -(e.clientY / window.innerHeight) * 2 + 1 }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Resize
    const resize = () => {
      const w = mount.clientWidth || 1, h = mount.clientHeight || 1
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    // Animation
    const camR = 30, camH = 15
    let raf = 0, t = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.016

      const ca = 0.75 + sin(t * 0.12) * 0.06
      tx += (mx * 5 - tx) * 0.03; ty += (my * 5 - ty) * 0.03

      camera.position.set(cos(ca) * camR + tx, camH + ty + sin(t * 0.5), sin(ca) * camR)
      camera.lookAt(0, 8, 0)

      const b = 1 + sin(t * 0.4) * 0.015
      bldg.scale.set(1.08 * b, 0.96 * (1 + (b - 1) * 0.55), 1.08 * b)
      bldg.rotation.y = sin(t * 0.2) * 0.03

      for (const el of floats) {
        el.position.y = el.userData.oy + sin(t * el.userData.sy) * el.userData.amp
        el.rotation.x += el.userData.srx; el.rotation.y += el.userData.sry
      }

      orbits.forEach((obj, idx) => {
        const d = obj.userData
        d.angle += d.speed
        obj.position.set(oc.x + cos(d.angle) * d.r, d.y + sin(t * 0.8 + idx) * d.wobble, oc.z + sin(d.angle) * d.r)
        obj.rotation.y += d.spinY; obj.rotation.x += d.spinX
      })

      particles.rotation.y = t * 0.02
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      envTex?.dispose?.(); pmrem.dispose()
      scene.traverse(o => {
        o.geometry?.dispose()
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose())
      })
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }} />
}
