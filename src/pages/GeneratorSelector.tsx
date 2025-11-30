import { useNavigate } from "react-router-dom";
import { FileText, Receipt, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";

const GeneratorSelector = () => {
  const navigate = useNavigate();

  const generators = [
    {
      id: "report",
      title: "Generator Raportów",
      description: "Profesjonalne raporty Facebook Ads dla salonów beauty",
      icon: FileText,
      path: "/report-generator",
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-500",
    },
    {
      id: "invoice",
      title: "Generator Faktur",
      description: "Faktury: zaliczka, końcowa, pełna kwota (zwolnione z VAT)",
      icon: Receipt,
      path: "/invoice-generator",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      id: "contract",
      title: "Generator Umowy",
      description: "Profesjonalne umowy marketingowe dla klientów",
      icon: FileSignature,
      path: "/contract-generator",
      gradient: "from-rose-500/20 to-orange-500/20",
      iconColor: "text-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - responsive */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/aurine-logo.png"
              alt="Aurine"
              className="h-8 md:h-10 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Main Content - responsive */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Title Section - responsive */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent px-4">
              Centrum Generatorów
            </h1>
            <p className="text-zinc-400 text-base md:text-lg px-4">
              Wybierz narzędzie
            </p>
          </div>

          {/* Generator Cards - mobile: single column, desktop: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-2">
            {generators.map((generator, index) => {
              const Icon = generator.icon;
              return (
                <div
                  key={generator.id}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Mobile: horizontal card, Desktop: vertical card */}
                  <div 
                    className={`relative bg-gradient-to-br ${generator.gradient} border border-zinc-800 rounded-2xl p-4 md:p-8 active:scale-98 md:hover:scale-105 cursor-pointer transition-all duration-300 flex md:flex-col gap-4 md:gap-0`}
                    onClick={() => navigate(generator.path)}
                  >
                    {/* Icon */}
                    <div className="shrink-0 md:mb-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-black/50 border border-zinc-800 flex items-center justify-center group-hover:border-pink-500/50 transition-colors">
                        <Icon className={`w-7 h-7 md:w-8 md:h-8 ${generator.iconColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between md:block">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">
                          {generator.title}
                        </h3>
                        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed hidden md:block">
                          {generator.description}
                        </p>
                      </div>

                      {/* Button - mobile: icon only, desktop: full text */}
                      <div className="mt-3 md:mt-6">
                        <Button
                          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 h-10 md:h-10 text-sm md:text-base"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(generator.path);
                          }}
                        >
                          <span className="md:hidden">Otwórz</span>
                          <span className="hidden md:inline">Otwórz Generator</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Section - hidden on mobile */}
          <div className="mt-8 md:mt-16 text-center animate-fade-in hidden md:block" style={{ animationDelay: "300ms" }}>
            <p className="text-zinc-500 text-sm">
              Wszystkie generatory tworzone przez{" "}
              <span className="text-pink-500 font-semibold">Aurine Agency</span>
              <br />
              Profesjonalne narzędzia dla salonów beauty
            </p>
          </div>
        </div>
      </main>

      {/* Footer - hidden on mobile (bottom nav replaces it) */}
      <footer className="border-t border-zinc-800 mt-12 md:mt-20 hidden md:block">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-zinc-500">
            <div className="text-center md:text-left">
              <p>© 2025 Aurine Agency · Kampanie Facebook ads dla salonów beauty</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://aurine.pl" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                aurine.pl
              </a>
              <span>·</span>
              <a href="https://wa.me/48731856524" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                <span>+48 731 856 524</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeneratorSelector;
