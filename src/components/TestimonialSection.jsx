import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Founder",
    company: "Retail Nusantara",
    industry: "UMKM",
    content:
      "Kami sebelumnya kesulitan mencari jasa pembuatan website yang benar-benar paham kebutuhan bisnis kami. Setelah bekerja sama dengan Wreative, website profesional yang dibuat sangat membantu meningkatkan penjualan online kami secara signifikan.",
    initials: "BS",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "Sarah Wijaya",
    role: "CTO",
    company: "TechLogis",
    industry: "Startup",
    content:
      "Sebagai startup logistik, kami butuh aplikasi custom yang scalable dan handal. Wreative terbukti sebagai developer terpercaya yang mampu menerjemahkan proses bisnis kompleks kami ke dalam sistem yang mudah digunakan.",
    initials: "SW",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 3,
    name: "Andi Pratama",
    role: "Direktur",
    company: "PT Maju Bersama",
    industry: "Perusahaan",
    content:
      "Ekspansi ke ranah mobile sangat krusial bagi perusahaan kami. Layanan jasa pembuatan aplikasi dari Wreative menghasilkan aplikasi mobile android ios yang stabil, cepat, dan disukai oleh ribuan pelanggan kami.",
    initials: "AP",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 4,
    name: "Diana Lestari",
    role: "Konsultan",
    company: "Diana Consults",
    industry: "Consulting",
    content:
      "Tampilan website profesional sangat penting untuk personal branding saya. Tim Wreative tidak hanya mendesain antarmuka yang elegan, tapi juga memastikan performanya optimal di semua perangkat.",
    initials: "DL",
    color: "bg-orange-100 text-orange-700",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const TestimonialSection = () => {
  return (
    <section
      id="testimonials"
      className="section-padding bg-secondary/30 border-y border-border overflow-hidden"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="mb-4">Kisah Sukses Klien Kami</h2>
          <p className="text-muted-foreground text-lg">
            Kepercayaan yang terbayarkan melalui hasil yang nyata, terukur, dan
            berdampak langsung pada pertumbuhan bisnis.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-background border border-border rounded-2xl p-8 premium-shadow transition-all duration-300 hover:border-primary/30 hover:premium-shadow-hover relative"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-muted/50" />

              <p className="text-foreground leading-relaxed mb-8 relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${testimonial.color}`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                    {testimonial.industry}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
