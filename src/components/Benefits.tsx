import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "Wiedza o branży beauty",
    description: "Pracujemy wyłącznie z salonami beauty - znamy Twoje wyzwania i wiemy, jak je rozwiązać.",
  },
  {
    title: "Przejrzyste rozliczenia",
    description: "Bez ukrytych kosztów. Płacisz tylko za to, co dostarcza realne rezultaty.",
  },
  {
    title: "Elastyczność",
    description: "Dostosowujemy kampanie do sezonu, Twoich promocji i aktualnych potrzeb salonu.",
  },
  {
    title: "Szybki kontakt",
    description: "Jesteśmy dostępni, gdy nas potrzebujesz. Bez czekania tygodniami na odpowiedź.",
  },
  {
    title: "Regularne raporty",
    description: "Wiesz dokładnie, na co idą Twoje pieniądze i jakie przynoszą efekty.",
  },
  {
    title: "Bezpłatna konsultacja",
    description: "Przeanalizujemy Twój salon i pokażemy, jak możemy Ci pomóc - całkowicie za darmo.",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-32 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-primary font-semibold text-sm">Dlaczego my</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Partnerstwo oparte na <span className="text-primary">zaufaniu</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nie jesteśmy kolejną agencją marketingową. Jesteśmy specjalistami, 
            którzy rozumieją wyzwania właścicieli salonów beauty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-6 p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in group hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
