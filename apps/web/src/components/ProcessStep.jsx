
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProcessStep = ({ number, title, description, isLast, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className="relative"
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="flex-1 pt-2">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-sm font-semibold text-primary uppercase tracking-wider"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              Step {number}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
        {!isLast && (
          <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-12">
            <ArrowRight className="h-6 w-6 text-muted-foreground/40" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProcessStep;
