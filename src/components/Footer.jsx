import React from "react";
import { Linkedin, Instagram, ArrowUpRight, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;

      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              className="inline-block mb-6 transition-opacity hover:opacity-80"
            >
              <img
                src="https://avatars.githubusercontent.com/u/75348178?s=200&v=4"
                alt="Wreative Logo"
                className="h-24 w-auto object-contain"
              />
            </a>
            <p className="text-muted-foreground text-sm max-w-[280px] leading-relaxed">
              Agensi digital spesialis pengembangan website dan aplikasi
              profesional untuk membantu skala bisnis Anda.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, "#home")}
                  className="hover:text-primary transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, "#services")}
                  className="hover:text-primary transition-colors"
                >
                  Layanan
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => scrollToSection(e, "#portfolio")}
                  className="hover:text-primary transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => scrollToSection(e, "#why-us")}
                  className="hover:text-primary transition-colors"
                >
                  Mengapa Kami
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="hover:text-primary transition-colors"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Portfolio</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://link.wreative.com/website-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary transition-colors group"
                >
                  Lihat Portfolio Website
                  <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://link.wreative.com/mobile-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary transition-colors group"
                >
                  Lihat Portfolio Mobile
                  <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://wreative.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary transition-colors group"
                >
                  wreative.com
                  <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Sosial Media</h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/wreative"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:-translate-y-1"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/wreative"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:-translate-y-1"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://youtube.com/@wreative"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:-translate-y-1"
              >
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex items-center justify-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Wreative. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
