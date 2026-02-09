import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import centerImg from "@/assets/livestock-detection-center.jpg";
import dogImg from "@/assets/dog.jpg";
import catImg from "@/assets/cat.jpg";
import chickenImg from "@/assets/chicken.jpg";
import cowImg from "@/assets/cow.jpg";

type Animal = "Dog" | "Cat" | "Chicken" | "Cow";

const animals: { name: Animal; img: string; startAngle: number }[] = [
  { name: "Dog", img: dogImg, startAngle: -45 },
  { name: "Cat", img: catImg, startAngle: 45 },
  { name: "Chicken", img: chickenImg, startAngle: 135 },
  { name: "Cow", img: cowImg, startAngle: 225 },
];

const Detection = () => {
  const navigate = useNavigate();

  const handleSelect = (animal: Animal) => {
    navigate(`/detection/${animal.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto flex flex-col items-center px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            Disease Detection
          </h1>
          <p className="text-muted-foreground">
            Select an animal to begin diagnosis
          </p>
        </div>

        {/* Circular Selector */}
        <div className="relative mx-auto" style={{ width: 420, height: 420 }}>
          {/* Outer ring - divided into 4 segments */}
          <svg
            viewBox="0 0 420 420"
            className="absolute inset-0 h-full w-full"
            style={{ filter: "drop-shadow(0 4px 20px hsl(var(--primary) / 0.15))" }}
          >
            {animals.map((a, i) => {
              const startRad = ((a.startAngle - 90) * Math.PI) / 180;
              const endRad = ((a.startAngle + 90 - 90) * Math.PI) / 180;
              const outerR = 205;
              const innerR = 100;
              const cx = 210;
              const cy = 210;

              const x1 = cx + outerR * Math.cos(startRad);
              const y1 = cy + outerR * Math.sin(startRad);
              const x2 = cx + outerR * Math.cos(endRad);
              const y2 = cy + outerR * Math.sin(endRad);
              const x3 = cx + innerR * Math.cos(endRad);
              const y3 = cy + innerR * Math.sin(endRad);
              const x4 = cx + innerR * Math.cos(startRad);
              const y4 = cy + innerR * Math.sin(startRad);

              const d = [
                `M ${x1} ${y1}`,
                `A ${outerR} ${outerR} 0 0 1 ${x2} ${y2}`,
                `L ${x3} ${y3}`,
                `A ${innerR} ${innerR} 0 0 0 ${x4} ${y4}`,
                "Z",
              ].join(" ");

              return (
                <path
                  key={a.name}
                  d={d}
                  className="cursor-pointer fill-card stroke-border transition-colors duration-300 hover:fill-primary/10"
                  strokeWidth={2}
                  onClick={() => handleSelect(a.name)}
                />
              );
            })}
          </svg>

          {/* Animal images + labels on the ring */}
          {animals.map((a) => {
            const midAngle = a.startAngle;
            const rad = ((midAngle - 90) * Math.PI) / 180;
            const placementR = 155;
            const x = 210 + placementR * Math.cos(rad);
            const y = 210 + placementR * Math.sin(rad);

            return (
              <button
                key={a.name}
                onClick={() => handleSelect(a.name)}
                className="group absolute flex flex-col items-center gap-1"
                style={{
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={a.img}
                  alt={a.name}
                  className="h-16 w-16 rounded-full border-2 border-primary/30 object-cover shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-primary md:h-20 md:w-20"
                />
                <span className="text-xs font-bold text-foreground md:text-sm">
                  {a.name}
                </span>
              </button>
            );
          })}

          {/* Center circle with livestock detection image */}
          <div
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-4 border-primary shadow-lg"
            style={{ width: 160, height: 160 }}
          >
            <img
              src={centerImg}
              alt="Livestock Detection"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Click on an animal to upload an image and detect diseases
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Detection;
