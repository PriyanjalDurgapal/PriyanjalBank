import { useEffect, useState } from "react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

interface SliderProps {
  slides: Slide[];
  interval?: number;
}

export default function Slider({ slides, interval = 4000 }: SliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-8 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {slide.title}
            </h2>
            <p className="text-sm md:text-base opacity-90">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
 