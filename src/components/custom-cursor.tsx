"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smoother spring config for less bounce
  const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed pointer-events-none z-[60]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
          animate={{
            width: isHovering ? 50 : 10,
            height: isHovering ? 50 : 10,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 400,
            mass: 0.8,
          }}
          style={{
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)",
          }}
        />
      </motion.div>

      {/* Cursor Ring */}
      <motion.div
        className="fixed pointer-events-none z-[55]"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.5 : 0 }}
      >
        <motion.div
          className="rounded-full border border-blue-400/40"
          animate={{
            width: isHovering ? 70 : 30,
            height: isHovering ? 70 : 30,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            mass: 0.8,
          }}
        />
      </motion.div>
    </>
  );
}
