import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import aurinelogo from "@/assets/aurine-logo.png";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-glow" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-primary font-semibold text-sm">Specjaliści Facebook & Instagram Ads</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Wypełniamy Twój kalendarz
              <span className="text-primary block mt-2">nowymi klientkami</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Profesjonalne kampanie reklamowe w Meta Ads dedykowane salonom beauty. 
              Gwarantujemy realny wzrost rezerwacji dzięki precyzyjnemu targetowaniu i sprawdzonym strategiom.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 bg-primary hover:bg-primary/90"
                onClick={scrollToContact}
              >
                Umów bezpłatną konsultację
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6 border-border hover:bg-accent"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Zobacz nasze usługi
              </Button>
            </div>
            
            <div className="pt-8 grid grid-cols-3 gap-8 max-w-lg">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">150+</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">Zadowolonych salonów</div>
              </div>
              <div className="text-center border-x border-border/50">
                <div className="text-3xl md:text-4xl font-bold text-primary">3x</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">Średni wzrost rezerwacji</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">Wsparcie</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in lg:block hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl" />
            <img 
              src={aurinelogo} 
              alt="Aurine - Facebook & Instagram Ads" 
              className="relative w-full max-w-md mx-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
