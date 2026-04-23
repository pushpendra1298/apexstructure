import { useSiteData } from "../hooks/useSiteData";

const defaultServiceCards = [
  {
    name: "Architecture Planning",
    description: "Vastu-compliant designs including floor plans, machine layouts, sections, elevations, 3D elevations, and authority submissions.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Structural Engineering Design",
    description: "Design solutions for residential, commercial, institutional, and multistory buildings.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Industrial Building Design",
    description: "Warehouses, RMG units, factories, boiler buildings, and pipe rack structures.",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Interior Design",
    description: "Functional and Vastu-compliant interior design solutions for modern spaces.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "MEP Engineering Design",
    description: "Comprehensive mechanical, electrical, and plumbing design services.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Steel Fabrication Drawing",
    description: "Detailed fabrication drawings for steel structures and components.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pre-Engineered Building Design",
    description: "Estimation, design, and drawing services for PEB building systems.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Conventional Steel Building Design",
    description: "Designs for trusses, portal frames, and tubular steel structures.",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ServicePage() {
  const { services } = useSiteData();
  const displayServices = services.length > 0 ? services.map(s => ({
    name: s.name,
    description: s.description,
    image: s.image_url || "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80"
  })) : defaultServiceCards;

  return (
    <div
      className="min-h-screen text-white"
      style={{ fontFamily: "'Outfit', sans-serif", background: "#030812" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030812; }
        ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 2px; }
      `}</style>

      {/* ── HERO BANNER ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,60,120,0.25) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #050c1a 60%, #030812 100%)" }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: "#f97316" }} />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: "#3b82f6" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: "#fb923c", background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
          >
            What We Offer
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-5"
          >
            Our{" "}
            <span style={{ background: "linear-gradient(90deg, #fb923c, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Apex Structure delivers integrated design, planning, detailing, and technical consultancy
            services for residential, commercial, industrial, and infrastructure projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex flex-wrap justify-center gap-6 px-8 py-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[["14+", "Service Offerings"], ["598+", "Projects Delivered"], ["10+", "Years Experience"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-xl font-black" style={{ color: "#fb923c" }}>{val}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(circle at top left, rgba(249,115,22,0.12), transparent 30%), radial-gradient(circle at bottom right, rgba(249,115,22,0.08), transparent 28%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayServices.map(({ name, description, image }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl overflow-hidden cursor-pointer flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  backdropFilter: "blur(16px)",
                  transition: "all 0.35s ease",
                }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: "brightness(0.7)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(3,8,18,0.95) 0%, rgba(3,8,18,0.2) 60%, transparent 100%)" }}
                  />
                  <div
                    className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", color: "#fff" }}
                  >
                    {i + 1}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-bold text-white text-sm mb-2 leading-snug group-hover:text-orange-200 transition-colors duration-300">
                    {name}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed flex-1">
                    {description}
                  </p>
                  <div
                    className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: "linear-gradient(90deg, #f97316, #fbbf24)" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}