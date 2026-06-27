
import React from 'react';
import { motion } from 'framer-motion';

const PortfolioCard = ({ image, title, description, techStack, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-card rounded-2xl overflow-hidden premium-shadow hover:premium-shadow-lg transition-all duration-300">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
