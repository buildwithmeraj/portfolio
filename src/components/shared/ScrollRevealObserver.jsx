"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollRevealObserver = () => {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js-ready");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealNodes = () =>
      Array.from(document.querySelectorAll(".reveal"));

    if (prefersReducedMotion) {
      revealNodes().forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observed = new Set();
    let seq = 0;

    const isInViewport = (node) => {
      const rect = node.getBoundingClientRect();
      return rect.top <= window.innerHeight - 24 && rect.bottom >= 24;
    };

    const markIfInViewport = (node) => {
      if (isInViewport(node)) {
        node.classList.add("is-visible");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    const registerNode = (node) => {
      if (observed.has(node)) {
        return;
      }

      if (node.classList.contains("is-visible")) {
        observed.add(node);
        return;
      }

      node.style.transitionDelay = `${(seq % 8) * 60}ms`;
      seq += 1;

      markIfInViewport(node);
      observer.observe(node);
      observed.add(node);
    };

    const scanAndRegister = () => {
      revealNodes().forEach(registerNode);
    };

    scanAndRegister();
    const rafId = window.requestAnimationFrame(scanAndRegister);
    const timeoutA = window.setTimeout(scanAndRegister, 120);
    const timeoutB = window.setTimeout(scanAndRegister, 360);

    const mutationObserver = new MutationObserver(() => {
      scanAndRegister();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const failsafe = window.setTimeout(() => {
      revealNodes()
        .filter((node) => !node.classList.contains("is-visible"))
        .forEach((node) => node.classList.add("is-visible"));
    }, 800);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutA);
      window.clearTimeout(timeoutB);
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
};

export default ScrollRevealObserver;
