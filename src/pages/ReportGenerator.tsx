import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ReportPreview } from "@/components/report/ReportPreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const reportSchema = z.object({
  clientName: z.string().min(1, "Nazwa klienta wymagana").max(100),
  city: z.string().min(1, "Miasto salonu wymagane").max(100),
  period: z.string().min(1, "Pole wymagane"),
  budget: z.string().min(1, "Pole wymagane"),
  impressions: z.string().min(1, "Pole wymagane"),
  reach: z.string().min(1, "Pole wymagane"),
  clicks: z.string().min(1, "Pole wymagane"),
  ctr: z.string().min(1, "Pole wymagane"),
  conversions: z.string().min(1, "Pole wymagane"),
  costPerConversion: z.string().min(1, "Pole wymagane"),
  bookings: z.string().min(1, "Pole wymagane"),
});

type ReportFormData = z.infer<typeof reportSchema>;

const ReportGenerator = () => {
  const { toast } = useToast();
  const [reportData, setReportData] = useState<ReportFormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = (data: ReportFormData) => {
    setReportData(data);
    toast({
      title: "Podgląd gotowy!",
      description: "Sprawdź podgląd raportu poniżej i pobierz PDF",
    });
  };

  const generatePDF = async () => {
    const element = document.getElementById("report-preview");
    if (!element) return;

    setIsGenerating(true);
    try {
      // Temporarily set fixed width for PDF generation
      const originalWidth = element.style.width;
      element.style.width = "210mm"; // A4 width
      
      const canvas = await html2canvas(element, {
        scale: 3,
        backgroundColor: "#050509",
        width: 794, // A4 width in pixels at 96 DPI
        windowWidth: 794,
      });

      // Restore original width
      element.style.width = originalWidth;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = pageWidth / imgWidth;
      const pdfHeight = imgHeight * ratio;

      // Add multiple pages if content is longer than one page
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pageWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`raport-${Date.now()}.pdf`);

      toast({
        title: "PDF wygenerowany!",
        description: "Raport został pobrany",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się wygenerować PDF",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--brand-dark))] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Generator Raportów Facebook Ads
          </h1>
          <p className="text-slate-400 text-lg">
            Profesjonalne raporty dla salonów beauty - Aurine Agency
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8 bg-slate-900/50 border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-6">
              Dane kampanii Facebook Ads
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="clientName" className="text-white">
                  Nazwa salonu
                </Label>
                <Input
                  id="clientName"
                  {...register("clientName")}
                  placeholder="np. Beauty Studio"
                  className="bg-slate-950 border-slate-700 text-white"
                />
                {errors.clientName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.clientName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="city" className="text-white">
                  Miasto salonu
                </Label>
                <Input
                  id="city"
                  {...register("city")}
                  placeholder="np. Warszawa"
                  className="bg-slate-950 border-slate-700 text-white"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="period" className="text-white">
                    Okres
                  </Label>
                  <Input
                    id="period"
                    {...register("period")}
                    placeholder="Styczeń 2024"
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  {errors.period && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.period.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="budget" className="text-white">
                    Budżet (PLN)
                  </Label>
                  <Input
                    id="budget"
                    {...register("budget")}
                    placeholder="5,000"
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  {errors.budget && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.budget.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="impressions" className="text-white">
                    Wyświetlenia
                  </Label>
                  <Input
                    id="impressions"
                    {...register("impressions")}
                    placeholder="150,000"
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  {errors.impressions && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.impressions.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="reach" className="text-white">
                    Zasięg
                  </Label>
                  <Input
                    id="reach"
                    {...register("reach")}
                    placeholder="85,000"
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  {errors.reach && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.reach.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="clicks" className="text-white">
                    Kliknięcia
                  </Label>
                  <Input
                    id="clicks"
                    {...register("clicks")}
                    placeholder="3,500"
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  {errors.clicks && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.clicks.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="ctr" className="text-white">
                    CTR (%)
                  </Label>
                  <Input
                    id="ctr"
                    {...register("ctr")}
                    placeholder="2.33"
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  {errors.ctr && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.ctr.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="conversions" className="text-white">
                    Konwersje
                  </Label>
                  <Input
                    id="conversions"
                    {...register("conversions")}
                    placeholder="245"
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  {errors.conversions && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.conversions.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="costPerConversion" className="text-white">
                    Koszt / konwersja (PLN)
                  </Label>
                  <Input
                    id="costPerConversion"
                    {...register("costPerConversion")}
                    placeholder="20.41"
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  {errors.costPerConversion && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.costPerConversion.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <Label htmlFor="bookings" className="text-white">
                    Rezerwacje wizyt
                  </Label>
                  <Input
                    id="bookings"
                    {...register("bookings")}
                    placeholder="178"
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  {errors.bookings && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.bookings.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                Generuj podgląd raportu
              </Button>
            </form>
          </Card>

          {reportData && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Podgląd</h2>
                <Button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  {isGenerating ? "Generowanie..." : "Pobierz PDF"}
                </Button>
              </div>
              <div className="border-2 border-slate-700 rounded-lg overflow-hidden">
                <ReportPreview data={reportData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
