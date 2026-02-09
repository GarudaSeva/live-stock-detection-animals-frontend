import { useState } from "react";
import { User, Mail, Calendar, ChevronRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dogImg from "@/assets/dog.jpg";
import catImg from "@/assets/cat.jpg";
import chickenImg from "@/assets/chicken.jpg";

interface HistoryItem {
  id: string;
  animal: string;
  disease: string;
  date: string;
  image: string;
  causes: string[];
  precautions: string[];
  food: string[];
  medications: string[];
}

const mockHistory: HistoryItem[] = [
  {
    id: "1", animal: "Dog", disease: "Canine Dermatitis", date: "2026-02-08 14:30",
    image: dogImg,
    causes: ["Allergic reactions", "Bacterial infection"],
    precautions: ["Keep clean", "Avoid allergens"],
    food: ["Omega-3 rich food", "Hypoallergenic diet"],
    medications: ["Antihistamines", "Medicated shampoo"],
  },
  {
    id: "2", animal: "Cat", disease: "Feline URI", date: "2026-02-07 09:15",
    image: catImg,
    causes: ["Feline herpesvirus", "Calicivirus"],
    precautions: ["Isolate from other cats", "Keep warm"],
    food: ["Warm wet food", "Chicken broth"],
    medications: ["Lysine supplements", "Eye drops"],
  },
  {
    id: "3", animal: "Chicken", disease: "Newcastle Disease", date: "2026-02-05 16:45",
    image: chickenImg,
    causes: ["Paramyxovirus", "Contaminated equipment"],
    precautions: ["Quarantine new birds", "Vaccination"],
    food: ["Electrolyte water", "High-energy feed"],
    medications: ["Antibiotics for secondary infections"],
  },
];

const Profile = () => {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Profile Card */}
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 rounded-2xl border bg-card p-8 card-shadow">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full hero-gradient text-primary-foreground">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">John Doe</h1>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" /> john@example.com
                </p>
              </div>
            </div>
          </div>

          {/* Detection History */}
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">Detection History</h2>
          <div className="space-y-3">
            {mockHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="flex w-full items-center gap-4 rounded-xl border bg-card p-4 text-left transition-all hover:card-shadow-hover card-shadow"
              >
                <img src={item.image} alt={item.animal} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-display font-semibold text-foreground">{item.disease}</p>
                  <p className="text-sm text-muted-foreground">{item.animal}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.date}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={() => setSelectedItem(null)}>
            <div className="w-full max-w-lg animate-scale-in rounded-2xl border bg-card p-6 card-shadow" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-foreground">{selectedItem.disease}</h3>
                <button onClick={() => setSelectedItem(null)} className="rounded-lg p-1 hover:bg-muted">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <img src={selectedItem.image} alt={selectedItem.animal} className="mb-4 w-full rounded-xl object-cover" style={{ maxHeight: 200 }} />
              <div className="grid gap-3 text-sm">
                <DetailSection title="Causes" items={selectedItem.causes} />
                <DetailSection title="Precautions" items={selectedItem.precautions} />
                <DetailSection title="Food" items={selectedItem.food} />
                <DetailSection title="Medications" items={selectedItem.medications} />
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

const DetailSection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-lg bg-secondary/50 p-3">
    <h4 className="mb-1 font-semibold text-secondary-foreground">{title}</h4>
    <ul className="space-y-0.5 text-muted-foreground">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Profile;
