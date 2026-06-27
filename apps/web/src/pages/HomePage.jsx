
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  MessageCircle, 
  Code2, 
  Smartphone, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Wrench, 
  Rocket, 
  Layout, 
  PenTool
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard.jsx';
import TestimonialSection from '@/components/TestimonialSection.jsx';

const fadeUpConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const HomePage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
    }
  };

  const services = [
    {
      id: "website",
      icon: <Globe className="w-6 h-6" />,
      title: "Website",
      description: "Hadirkan bisnis Anda secara online dengan website profesional yang cepat, responsif, dan dirancang untuk mengonversi pengunjung menjadi pelanggan.",
      items: ["Company Profile", "Landing Page", "Custom Website", "Sistem Internal"]
    },
    {
      id: "webapp",
      icon: <Layout className="w-6 h-6" />,
      title: "Web Application",
      description: "Otomatisasi proses bisnis Anda dengan aplikasi berbasis web kustom yang scalable dan aman.",
      items: ["Dashboard Analitik", "Aplikasi SaaS", "Sistem ERP & CRM", "Sistem Manajemen"],
      image: "https://images.unsplash.com/photo-1524221629551-6dd14def5ffd"
    },
    {
      id: "mobile",
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile App",
      description: "Jangkau pelanggan di mana saja dengan aplikasi mobile native atau cross-platform yang user-friendly.",
      items: ["Aplikasi Android & iOS", "Pengembangan dengan Flutter", "Siap Publish ke Play Store", "Siap Publish ke App Store"],
      image: "https://images.unsplash.com/photo-1604478373812-0ef15d185d90"
    }
  ];

  const whyUsPoints = [
    { icon: <Code2 />, title: "Clean Code", desc: "Struktur kode yang rapi dan mudah di-maintain." },
    { icon: <PenTool />, title: "UI Modern", desc: "Desain antarmuka terkini sesuai tren industri." },
    { icon: <Layout />, title: "Responsive", desc: "Tampil sempurna di berbagai ukuran layar." },
    { icon: <Globe />, title: "SEO Friendly", desc: "Struktur HTML semantik untuk pencarian Google." },
    { icon: <Zap />, title: "Fast Performance", desc: "Optimasi kecepatan muat untuk pengalaman terbaik." },
    { icon: <Layers />, title: "Mudah Dikembangkan", desc: "Arsitektur scalable untuk masa depan." },
    { icon: <Rocket />, title: "Siap Play Store", desc: "Standar publikasi Google terpenuhi." },
    { icon: <ShieldCheck />, title: "Siap App Store", desc: "Sesuai regulasi ketat Apple Store." },
    { icon: <Wrench />, title: "Maintenance", desc: "Dukungan berkelanjutan pasca rilis." },
  ];

  const workflowSteps = [
    { num: "01", title: "Diskusi Kebutuhan", desc: "Menganalisa masalah, tujuan, dan ekspektasi bisnis Anda." },
    { num: "02", title: "Perencanaan", desc: "Menentukan arsitektur sistem, teknologi, dan timeline pengerjaan." },
    { num: "03", title: "Desain UI/UX", desc: "Membuat wireframe dan desain antarmuka interaktif." },
    { num: "04", title: "Development", desc: "Menerjemahkan desain ke dalam kode fungsional dan bersih." },
    { num: "05", title: "Testing", desc: "Uji coba fungsionalitas, performa, dan keamanan sistem secara menyeluruh." },
    { num: "06", title: "Launching", desc: "Proses deployment ke server produksi dan rilis aplikasi." }
  ];

  return (
    <>
      <Helmet>
        <title>Wreative - Jasa Pembuatan Website & Aplikasi Berkualitas</title>
        <meta name="description" content="Bangun website dan aplikasi mobile profesional bersama Wreative. Solusi digital untuk kemajuan bisnis Anda dengan UI modern dan clean code." />
      </Helmet>

      <main className="overflow-hidden">
        {/* HERO SECTION */}
        <section id="home" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-background min-h-[90vh] flex items-center overflow-hidden">
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-2xl"
              >
                <motion.div variants={staggerItem} className="inline-block mb-4 px-3 py-1 rounded-full border border-border text-sm font-medium text-muted-foreground bg-secondary/50">
                  Agensi Pengembangan Digital
                </motion.div>
                <motion.h1 variants={staggerItem} className="mb-6">
                  Bangun <span className="text-primary">Website & Aplikasi</span> Berkualitas untuk Bisnis Anda
                </motion.h1>
                <motion.p variants={staggerItem} className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Kami merancang dan mengembangkan solusi digital modern yang responsif, cepat, dan berfokus pada pengalaman pengguna untuk mengakselerasi pertumbuhan bisnis Anda.
                </motion.p>
                <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-12 px-8 btn-micro-anim" asChild>
                    <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
                      Konsultasi Gratis
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 btn-micro-anim" asChild>
                    <a href="#portfolio" onClick={(e) => scrollToSection(e, '#portfolio')}>
                      Lihat Portfolio
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              <div className="relative lg:h-[600px] hidden lg:block">
                <motion.div 
                  style={{ y: y1 }}
                  className="absolute top-0 right-0 w-4/5 h-[80%] rounded-2xl overflow-hidden border border-border premium-shadow"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1678690832311-bb6e361989ca" 
                    alt="Antarmuka web modern dengan statistik" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay"></div>
                </motion.div>
                <motion.div 
                  style={{ y: y2 }}
                  className="absolute bottom-0 left-0 w-3/5 h-[60%] rounded-2xl overflow-hidden border-4 border-background premium-shadow-hover z-10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f" 
                    alt="Pengembangan website dan kolaborasi tim" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="section-padding bg-secondary/50 border-y border-border">
          <div className="container-custom">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-4 relative">
                <motion.div 
                  {...fadeUpConfig}
                  className="sticky top-32"
                >
                  <h2 className="mb-4">Layanan Unggulan Kami</h2>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Solusi end-to-end dari perancangan awal hingga peluncuran sistem yang siap pakai.
                  </p>
                  <div className="hidden lg:flex flex-col gap-4 border-l border-border pl-6">
                    {services.map(s => (
                      <a 
                        key={`link-${s.id}`} 
                        href={`#${s.id}`} 
                        onClick={(e) => scrollToSection(e, `#${s.id}`)}
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        {s.title}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-8 space-y-12">
                {services.map((service, idx) => (
                  <ServiceCard key={service.id} service={service} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="section-padding bg-background">
          <div className="container-custom">
            <motion.div 
              {...fadeUpConfig}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="mb-4">Eksplorasi Hasil Karya Kami</h2>
              <p className="text-muted-foreground text-lg">
                Kumpulan proyek yang telah kami selesaikan, menunjukkan dedikasi kami pada detail, performa, dan antarmuka yang intuitif.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-2 gap-8"
            >
              <motion.div variants={staggerItem} className="group block h-full">
                <div className="rounded-2xl border border-border bg-secondary/30 p-10 h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-secondary/60 hover:border-primary/20 premium-shadow hover:-translate-y-2">
                  <div className="w-20 h-20 rounded-full bg-background border border-border flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-10 h-10" />
                  </div>
                  <h3 className="mb-3">Website Portfolio</h3>
                  <p className="text-muted-foreground mb-8">Lihat berbagai hasil desain dan pengembangan website kami.</p>
                  <Button variant="outline" className="w-full sm:w-auto btn-micro-anim" asChild>
                    <a href="https://link.wreative.com/website-portfolio" target="_blank" rel="noopener noreferrer">
                      Lihat Portfolio Website
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="group block h-full">
                <div className="rounded-2xl border border-border bg-secondary/30 p-10 h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-secondary/60 hover:border-primary/20 premium-shadow hover:-translate-y-2">
                  <div className="w-20 h-20 rounded-full bg-background border border-border flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="w-10 h-10" />
                  </div>
                  <h3 className="mb-3">Mobile Portfolio</h3>
                  <p className="text-muted-foreground mb-8">Eksplorasi aplikasi mobile yang telah dirilis ke public store.</p>
                  <Button variant="outline" className="w-full sm:w-auto btn-micro-anim" asChild>
                    <a href="https://link.wreative.com/mobile-portfolio" target="_blank" rel="noopener noreferrer">
                      Lihat Portfolio Mobile
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section id="why-us" className="section-padding bg-secondary/50 border-y border-border">
          <div className="container-custom">
            <motion.div 
              {...fadeUpConfig}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="mb-4">Mengapa Memilih Wreative?</h2>
              <p className="text-muted-foreground text-lg">
                Kami tidak sekadar membuat aplikasi. Kami merancang solusi teknologi yang kokoh dan berkelanjutan.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {whyUsPoints.map((point, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-background border border-border p-6 rounded-xl premium-shadow transition-all duration-200 hover:border-primary/30"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary mb-5">
                    {React.cloneElement(point.icon, { className: "w-6 h-6" })}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{point.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section id="workflow" className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div 
                {...fadeUpConfig}
                className="sticky top-32"
              >
                <h2 className="mb-4">Metodologi & Alur Kerja Terstruktur</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Kami menggunakan pendekatan agil dan iteratif. Setiap fase dirancang agar transparan dan memberikan dampak optimal.
                </p>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative border-l border-border ml-4 lg:ml-0 pl-8 lg:pl-12 space-y-12"
              >
                {workflowSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="relative group"
                  >
                    <div className="absolute -left-[41px] lg:-left-[57px] top-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center ring-4 ring-background transition-transform duration-300 group-hover:scale-125">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="text-sm font-bold text-primary mb-1 font-mono">{step.num}</div>
                    <h3 className="text-xl mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <TestimonialSection />

        {/* CLOSING CTA SECTION */}
        <section id="contact" className="py-32 bg-primary text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          <div className="container-custom relative z-10">
            <motion.div 
              {...fadeUpConfig}
              className="max-w-3xl mx-auto"
            >
              <h2 className="mb-6 text-primary-foreground">Siap Membangun Website atau Aplikasi untuk Bisnis Anda?</h2>
              <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
                Diskusikan kebutuhan teknis dan visi bisnis Anda. Kami bantu transformasikan ide tersebut menjadi produk nyata yang siap bersaing.
              </p>
              
              <Button 
                size="lg" 
                variant="secondary" 
                className="h-14 px-8 text-base bg-background text-foreground hover:bg-secondary font-semibold group btn-micro-anim" 
                asChild
              >
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 w-5 h-5 group-hover:-rotate-12 transition-transform" />
                  Konsultasi Sekarang
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
};

export default HomePage;
