import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Upload,
  X,
  Loader2,
  AlertCircle,
  Pill,
  Apple,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import dogImg from "@/assets/dog.jpg";
import catImg from "@/assets/cat.jpg";
import chickenImg from "@/assets/chicken.jpg";
import cowImg from "@/assets/cow.jpg";

type Animal = "dog" | "cat" | "chicken" | "cow";

interface DetectionResult {
  diseaseName: string;
  causes: string[];
  precautions: string[];
  foodItems: string[];
  medications: string[];
}

const animalImages: Record<Animal, string> = {
  dog: dogImg,
  cat: catImg,
  chicken: chickenImg,
  cow: cowImg,
};

const mockResults: Record<Animal, DetectionResult> = {
  dog: {
    diseaseName: "Canine Dermatitis",
    causes: ["Allergic reactions", "Bacterial infection", "Parasites (fleas/mites)"],
    precautions: ["Keep the dog clean and dry", "Avoid known allergens", "Regular flea treatment"],
    foodItems: ["Omega-3 rich food", "Hypoallergenic diet", "Fresh vegetables"],
    medications: ["Antihistamines", "Topical antibiotics", "Medicated shampoo"],
  },
  cat: {
    diseaseName: "Feline Upper Respiratory Infection",
    causes: ["Feline herpesvirus", "Calicivirus", "Bacterial secondary infection"],
    precautions: ["Isolate from other cats", "Keep warm and hydrated", "Clean eyes and nose regularly"],
    foodItems: ["Warm wet food", "Chicken broth", "High-protein diet"],
    medications: ["Lysine supplements", "Eye drops", "Antibiotics if bacterial"],
  },
  chicken: {
    diseaseName: "Newcastle Disease",
    causes: ["Paramyxovirus", "Contact with infected birds", "Contaminated equipment"],
    precautions: ["Quarantine new birds", "Disinfect poultry houses", "Vaccination program"],
    foodItems: ["Electrolyte water", "High-energy feed", "Vitamin supplements"],
    medications: ["No specific treatment", "Antibiotics for secondary infections", "Supportive care"],
  },
  cow: {
    diseaseName: "Bovine Mastitis",
    causes: ["Bacterial infection (Staph, Strep)", "Poor milking hygiene", "Teat injuries"],
    precautions: ["Proper milking technique", "Clean udders before milking", "Dry cow therapy"],
    foodItems: ["High-quality hay", "Mineral supplements", "Clean fresh water"],
    medications: ["Intramammary antibiotics", "Anti-inflammatory drugs", "Teat sealants"],
  },
};

const DetectionUpload = () => {
  const { animal } = useParams<{ animal: string }>();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const animalKey = animal?.toLowerCase() as Animal;
  const isValid = animalKey && animalKey in mockResults;

  if (!isValid) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto flex flex-col items-center px-4 py-20">
          <h2 className="text-xl font-bold text-foreground">Invalid animal</h2>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/detection")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Detection
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const displayName = animalKey.charAt(0).toUpperCase() + animalKey.slice(1);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDetect = () => {
    if (!uploadedImage) return;
    setLoading(true);
    setTimeout(() => {
      setResult(mockResults[animalKey]);
      setLoading(false);
      toast({ title: "Detection Complete", description: `Disease detected for ${displayName}` });
    }, 2500);
  };

  const reset = () => {
    setUploadedImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/detection")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <img
              src={animalImages[animalKey]}
              alt={displayName}
              className="h-12 w-12 rounded-full border-2 border-primary object-cover"
            />
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                {displayName} Disease Detection
              </h1>
              <p className="text-sm text-muted-foreground">Upload an image to diagnose</p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        {!result && (
          <div className="mx-auto max-w-md animate-fade-in">
            <div className="rounded-2xl border bg-card p-8 card-shadow">
              <h3 className="mb-4 text-center font-display text-lg font-semibold text-foreground">
                Upload {displayName} Image
              </h3>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

              {!uploadedImage ? (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed border-primary/30 bg-secondary/50 p-10 transition-colors hover:border-primary/60"
                >
                  <Upload className="h-10 w-10 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Click to upload image</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src={uploadedImage} alt="Uploaded" className="w-full rounded-xl" />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="absolute right-2 top-2 rounded-full bg-card/80 p-1 backdrop-blur-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Button onClick={handleDetect} disabled={loading} className="w-full" size="lg">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                      </>
                    ) : (
                      "Detect Disease"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mx-auto max-w-2xl animate-fade-in space-y-6">
            <div className="rounded-2xl border bg-card p-8 card-shadow">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full hero-gradient text-primary-foreground">
                  <AlertCircle className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Detected Disease</p>
                  <h2 className="font-display text-2xl font-bold text-foreground">{result.diseaseName}</h2>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ResultCard icon={AlertCircle} title="Causes" items={result.causes} />
                <ResultCard icon={ShieldAlert} title="Precautions" items={result.precautions} />
                <ResultCard icon={Apple} title="Recommended Food" items={result.foodItems} />
                <ResultCard icon={Pill} title="Medications" items={result.medications} />
              </div>
            </div>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={reset} size="lg">
                Upload Another Image
              </Button>
              <Button variant="outline" onClick={() => navigate("/detection")} size="lg">
                Change Animal
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

const ResultCard = ({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) => (
  <div className="rounded-xl border bg-background p-5">
    <div className="mb-3 flex items-center gap-2 text-primary">
      <Icon className="h-5 w-5" />
      <h4 className="font-display font-semibold">{title}</h4>
    </div>
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default DetectionUpload;
