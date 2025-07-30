'use client';

import { AnimatePresence, motion, Variants, MotionProps } from 'motion/react';

import { cn } from '@/lib/utils';
import { ElementType } from 'react';
import React from 'react';

// Utility to filter out motion-only props
const MOTION_PROPS = [
  'initial',
  'animate',
  'exit',
  'whileInView',
  'whileHover',
  'whileTap',
  'transition',
  'variants',
  'layout',
  'layoutId',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragPropagation',
  'onAnimationStart',
  'onAnimationComplete',
];

function filterMotionProps(props: Record<string, any>) {
  const filtered = { ...props };
  for (const key of MOTION_PROPS) {
    if (key in filtered) delete filtered[key];
  }
  return filtered;
}

interface FlipTextProps extends MotionProps {
  /** The duration of the animation */
  duration?: number;
  /** The delay between each character */
  delayMultiple?: number;
  /** The variants of the animation */
  framerProps?: Variants;
  /** The class name of the component */
  className?: string;
  /** The element type of the component */
  as?: ElementType;
  /** The children of the component */
  children: React.ReactNode;
  /** The variants of the animation */
  variants?: Variants;
}

const defaultVariants: Variants = {
  hidden: { rotateX: -90, opacity: 0 },
  visible: { rotateX: 0, opacity: 1 },
};

export function FlipText({
  children,
  duration = 0.5,
  delayMultiple = 0.08,

  className,
  as: Component = 'span',
  variants,
  ...props
}: FlipTextProps) {
  const words = React.Children.toArray(children).join(' ').split(' ');

  return (
    <div className="flex justify-center space-x-2 flex-wrap">
      {words.map((word, i) => (
        <span key={i} className={cn('origin-center drop-shadow-sm', className)}>
          {word}
        </span>
      ))}
    </div>
  );
}
