"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

type ContainerTag = "div" | "ul" | "ol" | "section" | "article";
type ItemTag = "div" | "li" | "article";

type StaggerProps<T extends ContainerTag = "div"> = Omit<HTMLMotionProps<T>, "ref"> & {
  as?: T;
};

export function Stagger<T extends ContainerTag = "div">({
  as,
  children,
  ...rest
}: StaggerProps<T>) {
  const tag = (as ?? "div") as ContainerTag;
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
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={container}
      {...(rest as HTMLMotionProps<"div">)}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps<T extends ItemTag = "div"> = Omit<HTMLMotionProps<T>, "ref"> & {
  as?: T;
};

export function StaggerItem<T extends ItemTag = "div">({
  as,
  children,
  ...rest
}: StaggerItemProps<T>) {
  const tag = (as ?? "div") as ItemTag;
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = tag as React.ElementType;
    return <Tag {...(rest as React.HTMLAttributes<HTMLElement>)}>{children}</Tag>;
  }

  const Component = motion[tag] as typeof motion.div;
  return (
    <Component variants={item} {...(rest as HTMLMotionProps<"div">)}>
      {children}
    </Component>
  );
}
