import dogImg from "@/assets/dog.jpg";
import catImg from "@/assets/cat.jpg";
import chickenImg from "@/assets/chicken.jpg";
import cowImg from "@/assets/cow.jpg";

const animals = [
  { name: "Dog", img: dogImg },
  { name: "Cat", img: catImg },
  { name: "Chicken", img: chickenImg },
  { name: "Cow", img: cowImg },
];

const SupportedAnimals = () => (
  <section className="bg-card py-20">
    <div className="container mx-auto px-4">
      <div className="mb-14 text-center">
        <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">Supported Animals</h2>
        <p className="text-muted-foreground">Currently supporting 4 animal categories</p>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {animals.map((a) => (
          <div key={a.name} className="group overflow-hidden rounded-2xl border bg-background transition-all hover:card-shadow-hover card-shadow">
            <div className="aspect-square overflow-hidden">
              <img
                src={a.img}
                alt={a.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-display text-lg font-semibold text-foreground">{a.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SupportedAnimals;
