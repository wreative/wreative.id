
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div 
      id={service.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="scroll-m-32 bg-background border border-border rounded-2xl p-8 premium-shadow transition-all duration-300 hover:border-primary/30 hover:premium-shadow-hover"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
          {service.icon}
        </div>
        <h3 className="text-2xl m-0">{service.title}</h3>
      </div>
      
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
        {service.description}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {service.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="font-medium text-foreground">{item}</span>
          </div>
        ))}
      </div>

      {service.image && (
        <div className="rounded-xl overflow-hidden border border-border bg-muted aspect-video relative group">
          <img 
            src={service.image} 
            alt={`Ilustrasi ${service.title}`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
    </motion.div>
  );
};

export default ServiceCard;
