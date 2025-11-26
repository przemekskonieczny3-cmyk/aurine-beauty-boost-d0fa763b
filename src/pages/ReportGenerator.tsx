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
import { ReportPreviewLandscape } from "@/components/report/ReportPreviewLandscape";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { supabase } from "@/integrations/supabase/client";

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
  // Optional - dane do wykresów
  engagementRate: z.string().optional(),
  weeklyReachData: z.string().optional(), // format: "15000,19000,25000,26000"
  weeklyClicksData: z.string().optional(), // format: "650,820,1100,930"
  dailyBookingsData: z.string().optional(), // format: "22,28,32,35,38,42,25"
  recommendations: z.string().optional(), // Rekomendacje marketingowe
});

type ReportFormData = z.infer<typeof reportSchema>;

const ReportGenerator = () => {
  const { toast } = useToast();
  const [reportData, setReportData] = useState<ReportFormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const containerClass = isLandscape ? "mx-auto" : "max-w-7xl mx-auto";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const applyExportStyles = (root: HTMLElement) => {
    const targets = root.querySelectorAll<HTMLElement>("[data-export-solid='true']");
    const originals: Array<{ el: HTMLElement; className: string }> = [];

    targets.forEach((el) => {
      originals.push({ el, className: el.className });
      el.classList.add("report-export-solid");
    });

    return () => {
      originals.forEach(({ el, className }) => {
        el.className = className;
      });
    };
  };

  const onSubmit = async (data: ReportFormData) => {
    // Jeśli nie ma rekomendacji, generuj je przez AI
    if (!data.recommendations || data.recommendations.trim() === "") {
      setIsGenerating(true);
      try {
        const { data: functionData, error } = await supabase.functions.invoke(
          "generate-recommendations",
          { body: { data } }
        );

        if (error) throw error;

        if (functionData?.recommendations) {
          data.recommendations = functionData.recommendations;
        }
      } catch (error) {
        console.error("Error generating recommendations:", error);
        toast({
          title: "Uwaga",
          description: "Nie udało się wygenerować rekomendacji AI, używam domyślnych",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    }

    setReportData(data);
    toast({
      title: "Podgląd gotowy!",
      description: "Sprawdź podgląd raportu poniżej i pobierz PDF",
    });
  };

  const generatePDF = async () => {
    const element = document.getElementById("report-preview");
    if (!element) return;

    const originalWidth = element.style.width;
    const originalAspect = element.style.aspectRatio;
    const originalMaxWidth = element.style.maxWidth;

    setIsGenerating(true);
    const cleanupExportStyles = applyExportStyles(element);

    try {
      // Zapewnij stałą szerokość A4 na potrzeby PDF (pionowo)
      element.style.width = "210mm"; // szerokość A4
      element.style.aspectRatio = "";
      element.style.maxWidth = "none";

      const canvas = await html2canvas(element, {
        scale: 1, // Niższa skala = lżejszy PDF
        backgroundColor: "#050509",
        width: 794, // szerokość A4 w px przy 96 DPI
        windowWidth: 794,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.65);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = pageWidth / imgWidth;
      const pdfHeight = imgHeight * ratio;

      // Obsługa wielu stron, jeśli raport jest długi
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, pageWidth, pdfHeight, undefined, "FAST");
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pageWidth, pdfHeight, undefined, "FAST");
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
      element.style.width = originalWidth;
      element.style.aspectRatio = originalAspect;
      element.style.maxWidth = originalMaxWidth;
      cleanupExportStyles();
      setIsGenerating(false);
    }
  };

  const downloadAsImage = async () => {
    const element = document.getElementById("report-preview-landscape");
    if (!element) return;

    setIsGenerating(true);
    const cleanupExportStyles = applyExportStyles(element);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#000000',
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("report-preview-landscape");
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.animation = 'none';
            const allElements = clonedElement.getElementsByTagName('*');
            for (let el of allElements) {
              (el as HTMLElement).style.animation = 'none';
              (el as HTMLElement).style.transition = 'none';
            }
          }
        }
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `raport-${Date.now()}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
        
        toast({
          title: "Obraz pobrany!",
          description: "Raport został zapisany jako PNG w formacie poziomym 16:9",
        });
      }, 'image/png', 1.0);
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać obrazu",
        variant: "destructive",
      });
    } finally {
      cleanupExportStyles();
      setIsGenerating(false);
    }
  };
  return (
    <div className="min-h-screen bg-[hsl(var(--brand-dark))] p-8">
      <div className={containerClass}>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Generator Raportów Facebook Ads
          </h1>
          <p className="text-slate-400 text-lg">
            Profesjonalne raporty dla salonów beauty - Aurine Agency
          </p>
        </div>

        {isLandscape && reportData ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Podgląd - tryb pełnoekranowy (poziomy)
                </h2>
                <p className="text-slate-400 text-sm">
                  Widok poziomy dopasowany do szerokości ekranu komputera. Kliknij "Powrót do edycji", aby wrócić do formularza.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button
                  onClick={() => setIsLandscape(false)}
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800"
                >
                  Powrót do edycji
                </Button>
                <Button
                  onClick={downloadAsImage}
                  disabled={isGenerating}
                  variant="outline"
                  className="border-pink-600 text-pink-400 hover:bg-pink-950"
                >
                  {isGenerating ? "Pobieranie..." : "Pobierz PNG"}
                </Button>
                <Button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  {isGenerating ? "Generowanie..." : "Pobierz PDF"}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 flex items-center justify-center">
              <div className="w-full max-w-[1920px]">
                <ReportPreviewLandscape data={reportData} />
              </div>
            </div>

            {/* Ukryty pionowy podgląd tylko do generowania PDF */}
            <div className="fixed -left-[3000px] top-0">
              <ReportPreview data={reportData} />
            </div>
          </div>
        ) : (
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

                {/* Opcjonalne dane do wykresów */}
                <div className="pt-4 border-t border-slate-700">
                  <h3 className="text-white font-semibold mb-4 text-sm">
                    Dane opcjonalne (wykresy)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="engagementRate" className="text-slate-300 text-sm">
                        Współczynnik zaangażowania (%)
                      </Label>
                      <Input
                        id="engagementRate"
                        {...register("engagementRate")}
                        placeholder="np. 65"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="weeklyReachData" className="text-slate-300 text-sm">
                        Zasięg tygodniowy (4 wartości, oddziel przecinkami)
                      </Label>
                      <Input
                        id="weeklyReachData"
                        {...register("weeklyReachData")}
                        placeholder="np. 15000,19000,25000,26000"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="weeklyClicksData" className="text-slate-300 text-sm">
                        Kliknięcia tygodniowe (4 wartości, oddziel przecinkami)
                      </Label>
                      <Input
                        id="weeklyClicksData"
                        {...register("weeklyClicksData")}
                        placeholder="np. 650,820,1100,930"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dailyBookingsData" className="text-slate-300 text-sm">
                        Rezerwacje dzienne (7 dni, oddziel przecinkami)
                      </Label>
                      <Input
                        id="dailyBookingsData"
                        {...register("dailyBookingsData")}
                        placeholder="np. 22,28,32,35,38,42,25"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                     <div>
                      <Label htmlFor="recommendations" className="text-slate-300 text-sm">
                        Rekomendacje marketingowe (opcjonalne - zostaną wygenerowane przez AI jeśli puste)
                      </Label>
                      <textarea
                        id="recommendations"
                        {...register("recommendations")}
                        rows={5}
                        placeholder="Zostaw puste, aby AI wygenerowało rekomendacje automatycznie na podstawie danych kampanii"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
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
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <h2 className="text-2xl font-bold text-white">Podgląd</h2>
                  <div className="flex gap-3 items-center flex-wrap">
                    <Button
                      onClick={() => setIsLandscape(true)}
                      variant="outline"
                      className="border-slate-700 text-white hover:bg-slate-800"
                    >
                      Widok na pełnym ekranie
                    </Button>
                    <Button
                      onClick={downloadAsImage}
                      disabled={isGenerating}
                      variant="outline"
                      className="border-pink-600 text-pink-400 hover:bg-pink-950"
                    >
                      {isGenerating ? "Pobieranie..." : "Pobierz PNG"}
                    </Button>
                    <Button
                      onClick={generatePDF}
                      disabled={isGenerating}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      {isGenerating ? "Generowanie..." : "Pobierz PDF"}
                    </Button>
                  </div>
                </div>
                <div className="border-2 border-slate-700 rounded-lg overflow-hidden">
                  <ReportPreview data={reportData} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;
