declare module 'framer-motion' {
  import * as React from 'react';

  export interface MotionProps {
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    exit?: Record<string, unknown>;
    whileHover?: Record<string, unknown>;
    whileTap?: Record<string, unknown>;
    whileDrag?: Record<string, unknown>;
    whileInView?: Record<string, unknown>;
    viewport?: {
      once?: boolean;
      amount?: number;
      margin?: string;
    };
    transition?: {
      duration?: number;
      ease?: string | number[];
      delay?: number;
      type?: string;
      [key: string]: unknown;
    };
    variants?: Record<string, Record<string, unknown>>;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
  }

  type MotionComponent<T> = React.ForwardRefExoticComponent<MotionProps & T>;

  export const motion: {
    div: MotionComponent<React.HTMLAttributes<HTMLDivElement>>;
    h1: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
    h2: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
    h3: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
    h4: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
    h5: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
    h6: MotionComponent<React.HTMLAttributes<HTMLHeadingElement>>;
    p: MotionComponent<React.HTMLAttributes<HTMLParagraphElement>>;
    span: MotionComponent<React.HTMLAttributes<HTMLSpanElement>>;
    a: MotionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    button: MotionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>>;
    img: MotionComponent<React.ImgHTMLAttributes<HTMLImageElement>>;
    ul: MotionComponent<React.HTMLAttributes<HTMLUListElement>>;
    li: MotionComponent<React.LiHTMLAttributes<HTMLLIElement>>;
  } & {
    <T extends React.ComponentType<React.ComponentProps<T>>>(component: T): MotionComponent<React.ComponentProps<T>>;
  };

  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    mode?: 'sync' | 'wait' | 'popLayout';
  }>;
} 