"use client";

import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ZondaScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
    onLoaded?: () => void;
}

export default function ZondaScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
    onLoaded,
}: ZondaScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        const loadImages = () => {
            for (let i = 0; i < totalFrames; i++) {
                const img = new Image();
                const frameIndex = (i + 1).toString().padStart(3, "0");
                img.src = `${imageFolderPath}/ezgif-frame-${frameIndex}.jpg`;
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalFrames) setIsLoaded(true);
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${img.src}`);
                    loadedCount++; // Ensure we still mark readiness eventually? Or handle error.
                    if (loadedCount === totalFrames) setIsLoaded(true);
                };
                loadedImages[i] = img;
            }
            setImages(loadedImages);
        };

        loadImages();
    }, [totalFrames, imageFolderPath]);

    // Canvas setup and resize handler
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                // Set display size (css pixels)
                canvas.style.width = "100%";
                canvas.style.height = "100%";

                // precise dimensions
                const rect = parent.getBoundingClientRect();

                // Set actual size in memory (scaled to account for extra pixel density)
                const scale = window.devicePixelRatio || 1;
                canvas.width = rect.width * scale;
                canvas.height = rect.height * scale;

                // Normalize coordinate system to use css pixels
                ctx.scale(scale, scale);

                // Redraw current frame
                if (images[currentFrame]) {
                    renderFrame(currentFrame);
                }
            }
        };

        // Initial sizing
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images, currentFrame, isLoaded]);

    // Render function
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !images[index]) return;

        const img = images[index];

        // Canvas dimensions (divided by scale because we scaled context)
        const scale = window.devicePixelRatio || 1;
        const canvasWidth = canvas.width / scale;
        const canvasHeight = canvas.height / scale;

        // Calculate aspect ratio
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        // Object-fit: contain
        if (imgRatio > canvasRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Optional: Draw noise or background if necessary
        // ctx.fillStyle = '#1a1a1a';
        // ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Scroll listener
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );

        if (frameIndex !== currentFrame) {
            setCurrentFrame(frameIndex);
            requestAnimationFrame(() => renderFrame(frameIndex));
        }
    });

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
            onLoaded?.();
        }
    }, [isLoaded, onLoaded]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
    );
}
