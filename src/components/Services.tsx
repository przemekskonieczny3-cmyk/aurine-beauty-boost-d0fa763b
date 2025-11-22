import { Card } from "@/components/ui/card";
import socialAdsIcon from "@/assets/social-ads-icon.png";
import targetingIcon from "@/assets/targeting-icon.png";
import reportingIcon from "@/assets/reporting-icon.png";

const services = [
  {
    icon: socialAdsIcon,
    title: "Facebook & Instagram Ads",
    description: "Kompleksowa obsługa kampanii reklamowych w Meta Ads. Tworzymy profesjonalne kreacje, optymalizujemy budżet i skalujemy najlepiej działające reklamy.",
  },
  {
    icon: targetingIcon,
    title: "Precyzyjne targetowanie",
    description: "Docieramy do kobiet w Twoim regionie, które aktywnie poszukują usług beauty. Wykorzystujemy zaawansowane narzędzia segmentacji odbiorców Meta.",
  },
  {
    icon: reportingIcon,
    title: "Transparentna analityka",
    description: "Comiesięczne raporty z pełną przejrzystością wydatków i efektów. Mierzysz realny ROI - ile wydałaś i ile nowych rezerwacji otrzymałaś.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-32 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-primary font-semibold text-sm">Co oferujemy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Kompleksowa obsługa <span className="text-primary">Meta Ads</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Od strategii przez kreacje, aż po szczegółową optymalizację. Wszystko, czego potrzebujesz, 
            aby skutecznie promować swój salon w internecie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg animate-fade-in group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-background border border-border rounded-2xl flex items-center justify-center p-3">
                    <img src={service.icon} alt={service.title} className="w-full h-full object-contain" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-br from-secondary/50 to-secondary/20 border border-border rounded-3xl p-12 md:p-16 text-center animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Dlaczego branża <span className="text-primary">beauty</span>?
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Specjalizujemy się wyłącznie w salonach beauty, co pozwala nam doskonale rozumieć specyfikę tego rynku. 
              Znamy trendy, wiemy jak komunikować wartość usług i jak skutecznie konkurować lokalnie. 
              Każda kampania jest dostosowana do Twojego miasta i profilu klientek.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
