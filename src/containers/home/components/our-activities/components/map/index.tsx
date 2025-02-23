"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import map from "@app/assets/map.png";
import FishingPin from "@app/assets/map-pin-1.png";
import HikingPin from "@app/assets/map-pin-2.png";
import CompassPin from "@app/assets/map-pin-3.png";

import { useMediaQuery } from "react-responsive";
import { useTranslations, useLocale } from "next-intl";

type Location = { id: number; name: string; activities: string; x: number; y: number };

const PIN_SIZE = 60;

export default function CanvasMap() {
  const t = useTranslations();
  const locale = useLocale();
  const cases = t.raw("bloc_2.cases") as string[];
  const locations = [
    { id: 1, name: cases[0], activities: cases[0], x: 600, y: 150, image: HikingPin },
    { id: 2, name: cases[1], activities: cases[1], x: 500, y: 300, image: CompassPin },
    { id: 3, name: cases[2], activities: cases[2], x: 620, y: 400, image: FishingPin },
  ];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const imageCache = useRef<Record<string, HTMLImageElement>>({});
  const idSelected = useRef(0);
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTabletVertical = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isTabletHorizontal = useMediaQuery({ minWidth: 1024, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const infoDrawImageMap = useRef({
    dx: 0,
    dy: 0,
  });

  useEffect(() => {
    const mapImage = new Image();
    mapImage.src = map.src;
    mapImage.onload = () => {
      imageCache.current["map"] = mapImage;
      resizeCanvas();
    };
    locations.forEach((location, index) => {
      const pinImage = new Image();
      pinImage.src = location.image.src;
      imageCache.current[`pin-${index}`] = pinImage;
    });

    const observer = new ResizeObserver(resizeCanvas);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile, isTabletVertical, isDesktop, isTabletHorizontal]);

  useEffect(() => {
    resizeCanvas();
  }, [locale]);

  const resizeCanvas = () => {
    console.log("run");
    const canvas = canvasRef.current;
    const parent = containerRef.current;
    if (canvas && parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      if (isMobile) {
        infoDrawImageMap.current.dx = -320;
        infoDrawImageMap.current.dy = -30;
      } else if (isTabletVertical) {
        infoDrawImageMap.current.dx = 0;
        infoDrawImageMap.current.dy = 0;
      } else if (isTabletHorizontal) {
        infoDrawImageMap.current.dx = 0;
        infoDrawImageMap.current.dy = 0;
      } else if (isDesktop) {
        infoDrawImageMap.current.dx = 0;
        infoDrawImageMap.current.dy = 0;
      }
      updateCanvas();
    }
  };

  const drawMap = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(offsetRef.current.x, offsetRef.current.y);
    ctx.scale(scaleRef.current, scaleRef.current);

    const mapImage = imageCache.current["map"];
    if (mapImage) {
      ctx.drawImage(mapImage, infoDrawImageMap.current.dx, infoDrawImageMap.current.dy);
      const scaleX = ctx.canvas.width / map.width;
      const scaleY = ctx.canvas.height / map.height;

      locations.forEach(({ x, y, id }, index) => {
        const pinImage = imageCache.current[`pin-${index}`];
        const isSelected = idSelected.current === id;
        let pinSize = isSelected ? PIN_SIZE * 1.2 : PIN_SIZE;
        pinSize = pinSize / scaleRef.current;
        const pinX = x * scaleX;
        const pinY = y * scaleY;

        // Add shadow effect
        if (isSelected) {
          ctx.save();
          // Draw a subtle highlight circle
          ctx.beginPath();
          ctx.arc(pinX, pinY - pinSize / 2, pinSize * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.30)";
          ctx.fill();
        }

        // Draw the pin
        ctx.drawImage(pinImage, pinX - pinSize / 2, pinY - pinSize, pinSize, pinSize);

        if (isSelected) {
          ctx.restore();
        }
      });
    }

    ctx.restore();
  };
  interface Offset {
    x: number;
    y: number;
  }

  const animateZoom = (newScale: number, newOffset: Offset): void => {
    gsap.to(scaleRef, {
      current: newScale,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: updateCanvas,
    });

    gsap.to(offsetRef.current, {
      x: newOffset.x,
      y: newOffset.y,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: updateCanvas,
    });
  };

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawMap(ctx);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / 1240;
    const scaleY = canvas.height / 698;

    const mouseX = (event.clientX - rect.left - offsetRef.current.x) / scaleRef.current;
    const mouseY = (event.clientY - rect.top - offsetRef.current.y) / scaleRef.current;

    const isOnPin = locations.some(({ x, y }) => {
      const pinSize = PIN_SIZE / scaleRef.current;
      const pinX = x * scaleX;
      const pinY = y * scaleY;
      return Math.hypot(pinX - mouseX, pinY - (mouseY + pinSize / 2)) < pinSize / 2;
    });

    setIsHovering(isOnPin);
  };

  const handleClick = (event: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / 1240;
    const scaleY = canvas.height / 698;

    const clickX = (event.clientX - rect.left - offsetRef.current.x) / scaleRef.current;
    const clickY = (event.clientY - rect.top - offsetRef.current.y) / scaleRef.current;

    const clickedLocation = locations.find(({ x, y }) => {
      const pinSize = PIN_SIZE / scaleRef.current;
      const pinX = x * scaleX;
      const pinY = y * scaleY;
      return Math.hypot(pinX - clickX, pinY - (clickY + pinSize / 2)) < pinSize / 2;
    });

    if (clickedLocation) {
      setSelectedLocation(clickedLocation as Location);
      const newScale = 2;
      const newOffset = {
        x: -clickedLocation.x * scaleX * newScale + canvas.width / 2.5,
        y: -clickedLocation.y * scaleY * newScale + canvas.height / 2.5,
      };
      idSelected.current = clickedLocation.id;
      animateZoom(newScale, newOffset);
      updateCanvas();
    } else {
      idSelected.current = 0;
      resetMap();
    }
  };

  const resetMap = () => {
    setSelectedLocation(null);
    animateZoom(1, { x: 0, y: 0 });
  };

  return (
    <div ref={containerRef} className="map relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        style={{ cursor: isHovering ? "pointer" : "default" }}
      />

      {selectedLocation && (
        <div
          className="absolute bg-white shadow-md p-2 rounded"
          style={{
            top: 10,
            left: 10,
          }}
        >
          <h3 className="font-bold">{selectedLocation.name}</h3>
          <p>{selectedLocation.activities}</p>
        </div>
      )}
    </div>
  );
}
