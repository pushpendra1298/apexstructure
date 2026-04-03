import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
} from 'framer-motion'
import {
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Send,
  Star,
  Twitter,
  Users,
  ArrowRight,
  Shield,
  Zap,
  Award,
} from 'lucide-react'
import * as THREE from 'three'

/* ─────────────────────────────────────────
   DARK 3D HERO — new premium version
───────────────────────────────────────── */
const CivilEngineeringHero = () => {
  const mountRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050c1a)
    scene.fog = new THREE.FogExp2(0x050c1a, 0.012)

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(25, 18, 25)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    const rect = mountRef.current.getBoundingClientRect()
    renderer.setSize(rect.width, rect.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    mountRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x112244, 1.2)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xfff0d0, 2.0)
    sunLight.position.set(30, 40, 20)
    sunLight.castShadow = true
    sunLight.shadow.camera.left = -50
    sunLight.shadow.camera.right = 50
    sunLight.shadow.camera.top = 50
    sunLight.shadow.camera.bottom = -50
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.bias = -0.0001
    scene.add(sunLight)

    const blueLight = new THREE.PointLight(0x2255ff, 3, 40)
    blueLight.position.set(-10, 12, 8)
    scene.add(blueLight)

    const orangeLight = new THREE.PointLight(0xff6622, 2, 30)
    orangeLight.position.set(12, 8, -10)
    scene.add(orangeLight)

    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.6)
    fillLight.position.set(-20, 15, -15)
    scene.add(fillLight)

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(200, 200, 80, 80)
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x0a1628, roughness: 0.95, metalness: 0.1 })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    const gPos = groundGeometry.attributes.position
    for (let i = 0; i < gPos.count; i++) {
      gPos.setZ(i, Math.sin(gPos.getX(i) * 0.05) * Math.cos(gPos.getY(i) * 0.05) * 0.3)
    }
    groundGeometry.computeVertexNormals()
    scene.add(ground)

    const gridHelper = new THREE.GridHelper(100, 80, 0x1a3060, 0x0f1e3a)
    gridHelper.position.y = 0.05
    gridHelper.material.opacity = 0.6
    gridHelper.material.transparent = true
    scene.add(gridHelper)

    // Building — dark premium look
    const buildingGroup = new THREE.Group()
    const concreteMat = new THREE.MeshStandardMaterial({
  color: 0x99ddff, // light white gray
  roughness: 0.35,
  metalness: 0.6
})

const accentMat = new THREE.MeshStandardMaterial({
  color: 0xf8fafc, // premium white
  roughness: 0.25,
  metalness: 0.7
})

    const foundation = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 10), accentMat)
    foundation.position.y = 0.4
    foundation.castShadow = true
    foundation.receiveShadow = true
    buildingGroup.add(foundation)

    const floors = 7
    for (let i = 0; i < floors; i++) {
      const floor = new THREE.Mesh(new THREE.BoxGeometry(9, 0.4, 9), accentMat)
      floor.position.y = 0.8 + i * 3
      floor.castShadow = true
      floor.receiveShadow = true
      buildingGroup.add(floor)

      const columnPositions = [[-4,-4],[4,-4],[-4,4],[4,4],[0,-4],[0,4],[-4,0],[4,0]]
      columnPositions.forEach(([x, z]) => {
        const column = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.6, 0.5), concreteMat)
        column.position.set(x, 2 + i * 3, z)
        column.castShadow = true
        buildingGroup.add(column)
      })

      // Premium glass — glowing blue
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x1155cc,
        transparent: true,
        opacity: 0.35,
        roughness: 0.02,
        metalness: 0.98,
        transmission: 0.5,
        thickness: 0.5,
        envMapIntensity: 2,
        emissive: 0x0033aa,
        emissiveIntensity: i % 2 === 0 ? 0.4 : 0.15,
      })
      const sides = [
        { pos: [0, 1.9 + i * 3, 4.5], rot: [0, 0, 0] },
        { pos: [0, 1.9 + i * 3, -4.5], rot: [0, 0, 0] },
        { pos: [4.5, 1.9 + i * 3, 0], rot: [0, Math.PI / 2, 0] },
        { pos: [-4.5, 1.9 + i * 3, 0], rot: [0, Math.PI / 2, 0] },
      ]
      sides.forEach(({ pos, rot }) => {
        const glass = new THREE.Mesh(new THREE.BoxGeometry(8.5, 2.5, 0.12), glassMat.clone())
        glass.position.set(...pos)
        glass.rotation.set(...rot)
        buildingGroup.add(glass)
      })
    }

    // Rooftop with antenna
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x1a2840, roughness: 0.4, metalness: 0.7, emissive: 0x0a1428, emissiveIntensity: 0.3 })
    const roof = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.7, 9.5), roofMat)
    roof.position.y = 0.8 + floors * 3 + 0.35
    roof.castShadow = true
    buildingGroup.add(roof)

    // Antenna
    const antennaMat = new THREE.MeshStandardMaterial({ color: 0xaabbcc, metalness: 0.9, roughness: 0.1 })
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 4, 8), antennaMat)
    antenna.position.y = 0.8 + floors * 3 + 2.7
    buildingGroup.add(antenna)
    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshStandardMaterial({ color: 0xff3300, emissive: 0xff2200, emissiveIntensity: 1, metalness: 0.5 }))
    antennaTip.position.y = 0.8 + floors * 3 + 4.8
    buildingGroup.add(antennaTip)

    scene.add(buildingGroup)

    // Floating I-beams
    const floatingElements = []
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xff6622, roughness: 0.2, metalness: 0.95, emissive: 0xcc4400, emissiveIntensity: 0.25 })
    for (let i = 0; i < 10; i++) {
      const beamGroup = new THREE.Group()
      beamGroup.add(new THREE.Mesh(new THREE.BoxGeometry(5, 0.4, 0.4), steelMat))
      const tf = new THREE.Mesh(new THREE.BoxGeometry(5, 0.15, 0.85), steelMat)
      tf.position.y = 0.275; beamGroup.add(tf)
      const bf = new THREE.Mesh(new THREE.BoxGeometry(5, 0.15, 0.85), steelMat)
      bf.position.y = -0.275; beamGroup.add(bf)
      beamGroup.position.set((Math.random() - 0.5) * 32, 7 + Math.random() * 12, (Math.random() - 0.5) * 32)
      beamGroup.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      beamGroup.userData = {
        speedRotX: (Math.random() - 0.5) * 0.012,
        speedRotY: (Math.random() - 0.5) * 0.018,
        originalY: beamGroup.position.y,
        floatAmplitude: 0.8 + Math.random() * 1.8,
        floatFreq: 0.3 + Math.random() * 0.5,
      }
      floatingElements.push(beamGroup)
      scene.add(beamGroup)
    }

    // Orbiting shapes
    const shapes = []
    const shapesGroup = new THREE.Group()
    ;[
      { type: 'cylinder', color: 0x2266ff, emissive: 0x1144cc, count: 4 },
      { type: 'box', color: 0xff8800, emissive: 0xcc5500, count: 5 },
      { type: 'cone', color: 0x8833ff, emissive: 0x5522cc, count: 3 },
    ].forEach(({ type, color, emissive, count }) => {
      for (let i = 0; i < count; i++) {
        const geo = type === 'cylinder' ? new THREE.CylinderGeometry(0.5, 0.5, 3.5, 32)
          : type === 'box' ? new THREE.BoxGeometry(1.8, 1.8, 1.8)
          : new THREE.ConeGeometry(0.8, 2.5, 32)
        const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.7, emissive, emissiveIntensity: 0.3 })
        const mesh = new THREE.Mesh(geo, mat)
        const angle = (i / count) * Math.PI * 2
        const radius = 18 + Math.random() * 8
        mesh.position.set(Math.cos(angle) * radius, 4 + Math.random() * 5, Math.sin(angle) * radius)
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
        mesh.castShadow = true
        mesh.userData = {
          rotSpeedX: 0.008 + Math.random() * 0.012,
          rotSpeedY: 0.01 + Math.random() * 0.015,
          floatSpeed: 0.3 + Math.random() * 0.7,
          floatOffset: Math.random() * Math.PI * 2,
          orbitSpeed: 0.0005 + Math.random() * 0.001,
          orbitRadius: radius,
          orbitAngle: angle,
        }
        shapes.push(mesh)
        shapesGroup.add(mesh)
      }
    })
    scene.add(shapesGroup)

    // Crane — golden
    const craneGroup = new THREE.Group()
    const craneMat = new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.4, metalness: 0.7, emissive: 0xaa8800, emissiveIntensity: 0.2 })
    for (let i = 0; i < 5; i++) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.5, 0.6), craneMat)
      tower.position.y = 1.25 + i * 2.5
      tower.castShadow = true
      craneGroup.add(tower)
    }
    const arm = new THREE.Mesh(new THREE.BoxGeometry(15, 0.5, 0.5), craneMat)
    arm.position.set(4, 13, 0)
    craneGroup.add(arm)
    const counter = new THREE.Mesh(new THREE.BoxGeometry(2, 1.5, 1.5), craneMat)
    counter.position.set(-4, 13, 0)
    craneGroup.add(counter)
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 8, 8), new THREE.MeshStandardMaterial({ color: 0x445566 }))
    cable.position.set(9, 9, 0)
    craneGroup.add(cable)
    const hook = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xcc1100, emissiveIntensity: 0.8, metalness: 0.8, roughness: 0.2 }))
    hook.position.set(9, 5, 0)
    hook.castShadow = true
    craneGroup.add(hook)
    craneGroup.position.set(-15, 0, 12)
    scene.add(craneGroup)

    // Particles — blue tinted
    const particleCount = 150
    const particlesGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 100
      pPos[i + 1] = Math.random() * 35
      pPos[i + 2] = (Math.random() - 0.5) * 100
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const particles = new THREE.Points(particlesGeo, new THREE.PointsMaterial({ color: 0x4488ff, size: 0.22, transparent: true, opacity: 0.8 }))
    scene.add(particles)

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0
    const onMouseMove = (e) => {
      const r = mountRef.current?.getBoundingClientRect()
      if (!r) return
      mouseX = ((e.clientX - r.left) / r.width) * 2 - 1
      mouseY = -((e.clientY - r.top) / r.height) * 2 + 1
    }
    mountRef.current.addEventListener('mousemove', onMouseMove)

    let cameraAngle = 0
    const cameraRadius = 35, cameraHeight = 18
    let time = 0, frameId

    const animateScene = () => {
      frameId = requestAnimationFrame(animateScene)
      time += 0.016
      cameraAngle += 0.0012
      targetX += (mouseX * 4 - targetX) * 0.03
      targetY += (mouseY * 4 - targetY) * 0.03
      camera.position.x = Math.cos(cameraAngle) * cameraRadius + targetX
      camera.position.z = Math.sin(cameraAngle) * cameraRadius
      camera.position.y = cameraHeight + targetY + Math.sin(time * 0.5) * 1
      camera.lookAt(0, 8, 0)

      // Pulse building glow
      buildingGroup.children.forEach((child) => {
        if (child.material?.emissiveIntensity !== undefined && child.material.color?.b > 0.5) {
          child.material.emissiveIntensity = 0.15 + Math.sin(time * 1.5) * 0.1
        }
      })
      antennaTip.material.emissiveIntensity = 0.6 + Math.sin(time * 3) * 0.4

      const breathe = 1 + Math.sin(time * 0.4) * 0.012
      buildingGroup.scale.set(breathe, breathe, breathe)
      buildingGroup.rotation.y = Math.sin(time * 0.15) * 0.025

      floatingElements.forEach((el) => {
        el.position.y = el.userData.originalY + Math.sin(time * el.userData.floatFreq) * el.userData.floatAmplitude
        el.rotation.x += el.userData.speedRotX
        el.rotation.y += el.userData.speedRotY
      })

      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotSpeedX
        shape.rotation.y += shape.userData.rotSpeedY
        shape.position.y += Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.007
        shape.userData.orbitAngle += shape.userData.orbitSpeed
        shape.position.x = Math.cos(shape.userData.orbitAngle) * shape.userData.orbitRadius
        shape.position.z = Math.sin(shape.userData.orbitAngle) * shape.userData.orbitRadius
      })

      shapesGroup.position.y = Math.sin(time * 0.25) * 0.6
      shapesGroup.rotation.y = time * 0.04
      arm.rotation.z = Math.sin(time * 0.5) * 0.18
      hook.position.y = 5 + Math.sin(time * 1.1) * 2
      craneGroup.rotation.y = Math.sin(time * 0.35) * 0.12
      blueLight.position.x = Math.sin(time * 0.4) * 15
      blueLight.position.z = Math.cos(time * 0.4) * 15
      particles.rotation.y = time * 0.015

      renderer.render(scene, camera)
    }
    animateScene()
    setTimeout(() => setLoaded(true), 600)

    const handleResize = () => {
      if (!mountRef.current) return
      const r = mountRef.current.getBoundingClientRect()
      camera.aspect = r.width / r.height
      camera.updateProjectionMatrix()
      renderer.setSize(r.width, r.height)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameId)
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', onMouseMove)
        if (mountRef.current.contains(renderer.domElement)) mountRef.current.removeChild(renderer.domElement)
      }
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: '#050c1a' }}>
      <div ref={mountRef} className="absolute inset-0" />
      <AnimatePresence>
        {!loaded && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center rounded-2xl"
            style={{ background: '#050c1a' }}>
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ boxShadow: '0 0 20px rgba(255,100,30,0.5)' }} />
              <p className="text-slate-400 text-xs tracking-widest uppercase">Initializing 3D</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

const serviceCards = [
  { name: 'Structural Design & Analysis', icon: Building2 },
  { name: 'Residential Development', icon: Building2 },
  { name: 'Commercial & Industrial Projects', icon: Award },
  { name: 'Road & Infrastructure Engineering', icon: Zap },
  { name: 'Site Supervision & Quality Control', icon: Shield },
  { name: 'BOQ, Estimation & Cost Optimization', icon: ClipboardList },
  { name: 'Turnkey Delivery', icon: CheckCircle2 },
  { name: 'Renovation & Asset Modernization', icon: Star },
  { name: 'IRTT Compliance & Risk Tracking', icon: Shield },
]

const featuredProjects = [
  { name: 'Urban Heights Tower', location: 'New York, USA', budget: '$22M', timeline: '18 months', image: 'https://images.unsplash.com/photo-1495435229349-e86db7bfa013?auto=format&fit=crop&w=1600&q=80' },
  { name: 'Seaside Residences', location: 'Miami, USA', budget: '$10M', timeline: '14 months', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80' },
  { name: 'Metro Interchange', location: 'Berlin, Germany', budget: '$36M', timeline: '24 months', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1600&q=80' },
  { name: 'Skyline Mall', location: 'Dubai, UAE', budget: '$28M', timeline: '20 months', image: 'https://images.unsplash.com/photo-1521724095073-1a4b94fd0e78?auto=format&fit=crop&w=1600&q=80' },
]

const timelinePoints = [
  { year: '2010', label: 'Started as a boutique team' },
  { year: '2014', label: 'First 50 projects complete' },
  { year: '2018', label: 'Expanded with international clients' },
  { year: '2023', label: 'Awarded Best Engineering Firm' },
]

const testimonials = [
  { client: 'Morgan Associates', role: 'CEO', feedback: 'Their structural insights saved time and budget on every milestone.' },
  { client: 'Luna Realty', role: 'Director', feedback: 'Professional, timely, and uncompromising on quality. A truly premium partner.' },
  { client: 'ArcRise Builders', role: 'Founder', feedback: 'Transparent process and on-site supervision brought excellent results.' },
]

const irttSlides = [
  { tag: 'Assessment', title: 'Risk Profiling & Capacity Evaluation', description: 'Immediate visibility into permit, design, and cost risks for zone-wide portfolios.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Planning', title: 'Schedule Integration with IRTT', description: 'Auto-trigger policy updates and cross-team status from multi-vendor handoffs.', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Execution', title: 'Live HSE & QC Status', description: '7-layer safety, quality, and compliance flags with proactive mitigation prompts.', image: 'https://images.unsplash.com/photo-1504436467286-2d2e2f0a7f1d?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Finance', title: 'Cost Forecasting Accuracy', description: 'Dynamic BOQ reconciliation with on-chain risk buffers for contingency control.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Stakeholder', title: 'Executive Reporting Suite', description: 'Daily IRTT heatmaps for board-ready decision support across country programs.', image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Delivery', title: 'Turnover & Warranties Automated', description: 'Complete handover checklist with service-level targets and warranty risk score.', image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Improvement', title: 'Performance Lifecycle Reviews', description: 'Post-project IRTT analytics for continuous improvement and client retention.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80' },
]

const slideVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.06 },
}

/* ─────────────────────────────────────────
   HOOKS & COMPONENTS
───────────────────────────────────────── */
function useCountUp(end, duration = 1.8, inView = true) {
  const [value, setValue] = useState(0)
  const motionValue = useMotionValue(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, end, {
      duration,
      ease: 'easeOut',
      onUpdate(latest) { setValue(Math.round(latest)) },
    })
    return () => controls.stop()
  }, [end, duration, inView, motionValue])
  return value
}

function CounterCard({ icon: Icon, label, value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, 2.2, isInView)
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      }} className="rounded-2xl p-6 md:p-7 h-full min-h-[150px] w-full">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-3" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 12px rgba(249,115,22,0.4)' }}>
          <Icon size={18} className="text-white" />
        </div>
        <p className="text-3xl font-black" style={{ background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{count}+</p>
        <p className="text-xs text-slate-400 mt-1 leading-tight">{label}</p>
      </div>
    </motion.div>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-14 space-y-3">
      <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#fb923c' }}>{subtitle}</p>
      <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{title}</h2>
      <div className="mx-auto h-px w-20 mt-4" style={{ background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Load premium fonts
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800;900&display=swap'
    document.head.appendChild(link)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % irttSlides.length), 5000)
    return () => clearInterval(interval)
  }, [])

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveNav(id)
    setMenuOpen(false)
  }

  const processStages = useMemo(() => [
    { step: 'Planning', desc: 'Project strategy & feasibility study with detailed risk profiling.' },
    { step: 'Design', desc: 'Architectural + structural engineering packages with BIM coordination.' },
    { step: 'Execution', desc: 'Site management, quality control, and safety compliance.' },
    { step: 'Delivery', desc: 'Final handover with IRTT certification and ongoing support.' },
  ], [])

  const baseStyle = {
    fontFamily: "'Outfit', sans-serif",
    background: '#030812',
  }

  return (
    <div style={baseStyle} className="min-h-screen text-white">
      {/* Global CSS */}
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030812; }
        ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 2px; }
        .bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .glass-card-light {
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .orange-glow { box-shadow: 0 0 30px rgba(249,115,22,0.3), 0 4px 16px rgba(249,115,22,0.2); }
        .text-gradient-orange {
          background: linear-gradient(90deg, #fb923c, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .noise-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        @keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .shimmer { animation: shimmer 2s ease-in-out infinite; }
      `}</style>

      {/* Loading */}
      <AnimatePresence>
        {isLoading && (
          <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ background: '#030812' }}
            initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6 } }}>
            <div className="relative">
              <div className="w-16 h-16 rounded-full border border-orange-500/20 animate-ping absolute inset-0" />
              <div className="w-16 h-16 rounded-full border-2 border-t-orange-500 border-orange-500/10 animate-spin" style={{ boxShadow: '0 0 20px rgba(249,115,22,0.4)' }} />
            </div>
            <p className="mt-6 text-xs tracking-[0.3em] uppercase text-slate-500">Apex Structure</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(3,8,18,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 2px 10px rgba(249,115,22,0.5)' }}>
              <Building2 size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm text-white tracking-wide">Apex<span style={{ color: '#fb923c' }}>.</span></span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((item) => (
              <button key={item.id} onClick={() => handleScroll(item.id)}
                className="relative px-3 py-2 text-xs font-medium tracking-wide rounded-lg transition-all duration-200"
                style={{ color: activeNav === item.id ? '#fb923c' : 'rgba(255,255,255,0.6)', background: activeNav === item.id ? 'rgba(249,115,22,0.1)' : 'transparent' }}>
                {item.label}
                {activeNav === item.id && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px rounded-full" style={{ background: '#f97316' }} />}
              </button>
            ))}
          </nav>

          <button onClick={() => handleScroll('contact')} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 2px 12px rgba(249,115,22,0.4)' }}>
            Get Quote <ArrowRight size={12} />
          </button>

          <button className="md:hidden text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <div className="w-5 h-0.5 bg-current transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden" style={{ background: 'rgba(3,8,18,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="px-6 py-4 flex flex-col gap-1">
                {sections.map((item) => (
                  <button key={item.id} onClick={() => handleScroll(item.id)}
                    className="text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{ color: activeNav === item.id ? '#fb923c' : 'rgba(255,255,255,0.7)', background: activeNav === item.id ? 'rgba(249,115,22,0.08)' : 'transparent' }}>
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ── */}
        <section id="home" className="relative min-h-screen pt-16 overflow-hidden noise-overlay">
          {/* Deep space background */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,60,120,0.3) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 50%, rgba(249,115,22,0.08) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #050c1a 50%, #030812 100%)' }} />

          <div className="max-w-7xl mx-auto px-6 relative z-10 py-12 grid lg:grid-cols-2 gap-10 items-start min-h-[calc(100vh-4rem)]">
            {/* Left */}
            <div className="flex flex-col gap-8">
              {/* Badge */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', color: '#fb923c' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shimmer" />
                Elite Infrastructure &amp; IRTT Governance
              </motion.div>

              {/* Headline */}
              <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.8 }}>
                <h1 className="bebas text-6xl md:text-8xl leading-none text-white" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}>
                  Precision<br />
                  <span style={{ background: 'linear-gradient(90deg, #fb923c 0%, #fbbf24 50%, #fb923c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200%', animation: 'shimmer 3s ease infinite' }}>
                    Engineering.
                  </span>
                  <br />
                  Predictable<br />Delivery.
                </h1>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.8 }}
                className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md" style={{ fontWeight: 300 }}>
                Trusted by global developers for risk-managed infrastructure delivery. Continuous intelligence with IRTT, stage-gate assurance, and compliance-grade execution.
              </motion.p>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.8 }}
                className="flex flex-wrap gap-3">
                <button onClick={() => handleScroll('contact')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 hover:brightness-110 orange-glow"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                  Get Quote <ArrowRight size={14} />
                </button>
                <button onClick={() => handleScroll('projects')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  Our Projects
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 w-full max-w-4xl">
                <CounterCard icon={Building2} label="Completed Projects" value={195} />
                <CounterCard icon={Calendar} label="Years Experience" value={14} />
                <CounterCard icon={Users} label="Happy Clients" value={115} />
                <CounterCard icon={CheckCircle2} label="IRTT Compliance %" value={99} />
              </motion.div>

              {/* Trusted by */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}
                className="glass-card rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: '#fb923c' }}>Trusted by</p>
                <div className="flex flex-wrap gap-2">
                  {['Esco', 'Luna Corp', 'NorthFlow', 'ArcRise', 'MetroBuild'].map((logo) => (
                    <div key={logo} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 tracking-wide"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{logo}</div>
                  ))}
                </div>
              </motion.div>
              {/* IRTT Slider */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
                className="glass-card rounded-3xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-white tracking-wide">IRTT Operational Highlights</h3>
                  <div className="flex gap-1.5">
                    {irttSlides.map((_, i) => (
                      <button key={i} onClick={() => setCurrentSlide(i)}
                        className="rounded-full transition-all duration-300"
                        style={{ width: currentSlide === i ? 20 : 6, height: 6, background: currentSlide === i ? '#f97316' : 'rgba(255,255,255,0.2)' }} />
                    ))}
                  </div>
                </div>
                <div className="relative h-52 overflow-hidden rounded-xl">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentSlide} variants={slideVariants} initial="initial" animate="animate" exit="exit"
                      transition={{ duration: 0.50, ease: 'easeInOut' }} className="absolute inset-0">
                      <img src={irttSlides[currentSlide].image} alt={irttSlides[currentSlide].title} className="h-full w-full object-cover" style={{ filter: 'brightness(0.6)' }} />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,18,0.9) 0%, transparent 60%)' }} />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#fb923c' }}>{irttSlides[currentSlide].tag}</span>
                        <h4 className="text-base font-bold text-white mt-0.5 leading-tight">{irttSlides[currentSlide].title}</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{irttSlides[currentSlide].description}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Right — 3D + IRTT slider */}
            <div className="flex flex-col gap-5">
              {/* 3D Hero */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.9 }}
                className="h-[530px] lg:h-[630px] rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 60px rgba(30,60,120,0.4), 0 20px 60px rgba(0,0,0,0.6)' }}>
                <CivilEngineeringHero />
              </motion.div>

              
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(249,115,22,0.05) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #06101f 50%, #030812 100%)' }} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionTitle title="About Our Agency" subtitle="Who We Are" />
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="glass-card rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Global civil design with<br /><span className="text-gradient-orange">local responsibility</span></h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Our multidisciplinary team delivers sustainable, resilient and code-compliant engineering services across residential, commercial, infrastructure and industrial sectors.</p>
                <ul className="space-y-3">
                  {['Industry-leading structural evaluation methods with third-party verification', 'ISO 9001 / ISO 45001 quality and safety-first implementation', 'IRTT-enabled risk and turnaround tracking for every milestone', 'Digital BIM coordination with executive dashboards'].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                        <CheckCircle2 size={12} style={{ color: '#fb923c' }} />
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="glass-card rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Timeline <span className="text-gradient-orange">Achievements</span></h3>
                <div className="relative space-y-5 pl-8">
                  <div className="absolute left-3 top-2 bottom-2 w-px" style={{ background: 'linear-gradient(180deg, #f97316, rgba(249,115,22,0.1))' }} />
                  {timelinePoints.map((item, i) => (
                    <motion.div key={item.year} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="relative">
                      <div className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full" style={{ background: '#f97316', boxShadow: '0 0 8px rgba(249,115,22,0.6)' }} />
                      <p className="font-black text-sm" style={{ color: '#fb923c' }}>{item.year}</p>
                      <p className="text-slate-400 text-sm mt-0.5">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030812 0%, #04101e 50%, #030812 100%)' }} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionTitle title="Our Services" subtitle="Comprehensive Solutions" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map(({ name, icon: Icon }, i) => (
                <motion.div key={name} whileHover={{ y: -6, scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-6 cursor-pointer group transition-all duration-300"
                  style={{ ':hover': { borderColor: 'rgba(249,115,22,0.3)' } }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                    style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}>
                    <Icon size={16} style={{ color: '#fb923c' }} />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2 leading-tight">{name}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Tailored project design, risk assessment and execution oversight.</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 70% 50%, rgba(30,60,120,0.1) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #06101f 50%, #030812 100%)' }} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionTitle title="Featured Projects" subtitle="Iconic Landmarks" />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {featuredProjects.map((project, idx) => (
                <motion.article key={project.name} whileHover={{ y: -10 }}
                  initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="glass-card rounded-3xl overflow-hidden cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.image} alt={project.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ filter: 'brightness(0.75)' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,18,0.9) 0%, transparent 50%)' }} />
                    <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full"
                      style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', color: '#fb923c' }}>
                      IRTT verified
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-base leading-tight">{project.name}</h3>
                    <p className="text-slate-500 text-xs mt-1 flex items-center gap-1"><MapPin size={10} />{project.location}</p>
                    <div className="mt-3 pt-3 flex justify-between text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-slate-400">Budget: <span className="text-white font-semibold">{project.budget}</span></span>
                      <span className="text-slate-400">{project.timeline}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section id="process" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030812 0%, #050e1c 50%, #030812 100%)' }} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionTitle title="Our Process" subtitle="From Planning to Delivery" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 relative">
              {/* Connector line */}
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), rgba(249,115,22,0.4), transparent)' }} />
              {processStages.map(({ step, desc }, idx) => (
                <motion.div key={step} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card rounded-3xl p-6 relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5 font-black text-sm relative z-10"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 16px rgba(249,115,22,0.4)' }}>
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">{step}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #06101f 50%, #030812 100%)' }} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionTitle title="Client Stories" subtitle="Testimonials" />
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((item, i) => (
                <motion.div key={item.client} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ y: -8 }} className="glass-card rounded-3xl p-7">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#f97316" style={{ color: '#f97316' }} />)}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{item.feedback}"</p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(234,88,12,0.2))', border: '1px solid rgba(249,115,22,0.3)' }}>
                      {item.client[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{item.client}</p>
                      <p className="text-slate-500 text-xs">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030812 0%, #05101e 50%, #030812 100%)' }} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionTitle title="Get In Touch" subtitle="Start Your Project" />
            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Let's build something <span className="text-gradient-orange">extraordinary</span></h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">Connect with our engineering team for a custom scope and precision cost estimate — backed by IRTT-grade risk intelligence.</p>
                  <div className="space-y-4">
                    {[
                      { icon: Phone, text: '+1 (555) 123-9876' },
                      { icon: MapPin, text: '355 Skyline Ave, Chicago, IL' },
                      { icon: ClipboardList, text: 'Available 24/7 consultation' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 glass-card rounded-xl px-4 py-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,115,22,0.15)' }}>
                          <Icon size={14} style={{ color: '#fb923c' }} />
                        </div>
                        <span className="text-slate-300 text-sm">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="glass-card rounded-3xl p-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Full Name', 'Phone Number', 'Project Type', 'Budget Range', 'Location'].map((placeholder) => (
                    <input key={placeholder} type="text" placeholder={placeholder}
                      className="rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder-slate-500 col-span-1"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', '::placeholder': { color: '#64748b' } }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  ))}
                </div>
                <textarea rows={4} placeholder="Your message..."
                  className="mt-3 w-full resize-none rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder-slate-500"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 orange-glow"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                    <Send size={14} /> Send Inquiry
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
                    <Phone size={14} /> WhatsApp
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative py-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0" style={{ background: '#030812' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                <Building2 size={14} className="text-white" />
              </div>
              <span className="font-bold text-white">Apex<span style={{ color: '#fb923c' }}>.</span></span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">Enterprise-grade engineering delivery, IRTT risk orchestration, and turn-key infrastructure programs for public/private partnerships.</p>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-4">Quick Links</p>
            <ul className="space-y-2">
              {sections.slice(1).map((item) => (
                <li key={item.id}>
                  <button className="text-slate-500 hover:text-orange-400 transition-colors text-xs" onClick={() => handleScroll(item.id)}>{item.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-4">Connect</p>
            <div className="flex gap-3 mb-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Icon size={14} className="text-slate-400 hover:text-orange-400" />
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-xs">© {new Date().getFullYear()} ApexStructure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}