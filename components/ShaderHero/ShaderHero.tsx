"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shader";

export default function ShaderHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    const updateRendererSize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 1.5)
      );

      renderer.setSize(width, height, false);

      material.uniforms.u_resolution.value.set(width, height);
    };

    container.appendChild(renderer.domElement);

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(
            container.clientWidth || window.innerWidth,
            container.clientHeight || window.innerHeight
          ),
        },
        u_mouse: {
          value: new THREE.Vector2(
            (container.clientWidth || window.innerWidth) / 2,
            (container.clientHeight || window.innerHeight) / 2
          ),
        },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const startTime = performance.now();

    let animationFrameId: number;
    let isPageVisible = !document.hidden;

    const handleResize = () => {
      updateRendererSize();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      material.uniforms.u_mouse.value.set(
        event.clientX - rect.left,
        rect.height - (event.clientY - rect.top)
      );
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };

    updateRendererSize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    const animate = () => {
      if (!isPageVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (!prefersReducedMotion) {
        material.uniforms.u_time.value =
          (performance.now() - startTime) / 1000;
      }

      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      material.uniforms.u_time.value = 0;
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}