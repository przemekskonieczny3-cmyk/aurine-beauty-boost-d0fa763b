import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Dziękujemy za wiadomość!",
      description: "Odezwiemy się do Ciebie w ciągu 24 godzin.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-primary font-semibold text-sm">Kontakt</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Rozpocznijmy <span className="text-primary">współpracę</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Umów bezpłatną 30-minutową konsultację. Przeanalizujemy Twoją obecną sytuację 
            i pokażemy, jak możemy zwiększyć Twoje rezerwacje.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 bg-card border-border animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Twoje imię"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Adres e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Numer telefonu"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Opowiedz nam o swoim salonie..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-32 bg-secondary border-border"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(255,51,153,0.4)]"
                size="lg"
              >
                Wyślij wiadomość
              </Button>
            </form>
          </Card>

          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <Mail className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">E-mail</h3>
              <p className="text-muted-foreground">kontakt@aurine.pl</p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <Phone className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">Telefon</h3>
              <p className="text-muted-foreground">+48 123 456 789</p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <MessageCircle className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">Messenger</h3>
              <p className="text-muted-foreground">Napisz do nas na Facebooku</p>
            </Card>

            <div className="pt-6">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Odpowiadamy zazwyczaj w ciągu kilku godzin. Jeśli piszesz do nas po godzinach pracy, 
                odezwiemy się następnego dnia roboczego.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
