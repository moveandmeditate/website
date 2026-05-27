"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from "motion/react";

type AsTag = "div" | "section" | "article" | "li" | "header";

type FadeUpProps<T extends AsTag = "div"> = Omit<HTMLMotionProps<T>, "ref"> & {
  as?: T;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
};

const buildVariants = (distance: number, duration: number, delay: number): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

/**
 * Lift + fade reveal on first viewport entry.
 * Respects `prefers-reduced-motion` by skipping animation entirely.
 */
export function FadeUp<T extends AsTag = "div">({
  as,
  delay = 0,
  distance = 16,
  duration = 0.7,
  once = true,
  children,
  ...rest
}: FadeUpProps<T>) {
  const tag = (as ?? "div") as AsTag;
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = tag as React.ElementType;
    return <Tag {...(rest as React.HTMLAttributes<HTMLElement>)}>{children}</Tag>;
  }

  const Component = motion[tag] as typeof motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -80px 0px" }}
      variants={buildVariants(distance, duration, delay)}
      {...(rest as HTMLMotionProps<"div">)}
    >
      {children}
    </Component>
  );
}
