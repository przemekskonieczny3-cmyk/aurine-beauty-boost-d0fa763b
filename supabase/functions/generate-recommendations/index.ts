import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const prompt = `Jesteś ekspertem od marketingu Facebook Ads dla branży beauty. Przeanalizuj wyniki kampanii salonu ${data.clientName} z ${data.city} i napisz 4-5 profesjonalnych rekomendacji strategicznych.

Dane kampanii do analizy:
- Okres: ${data.period}
- Budżet: ${data.budget} PLN
- Wyświetlenia: ${data.impressions}
- Zasięg: ${data.reach} osób
- Kliknięcia: ${data.clicks}
- CTR: ${data.ctr}%
- Konwersje: ${data.conversions}
- Koszt na konwersję: ${data.costPerConversion} PLN
- Rezerwacje: ${data.bookings} wizyt

WAŻNE WYMAGANIA FORMATOWANIA:
- Każda rekomendacja zaczyna się od czasownika w bezokoliczniku: "Zwiększyć", "Poprawić", "Testować", "Zoptymalizować", "Rozszerzyć"
- BEZ gwiazdek, myślników, numeracji czy jakichkolwiek znaków na początku
- Każda rekomendacja w osobnej linii
- Maksymalnie 165 znaków na rekomendację
- Ton: profesjonalny, konkretny, merytoryczny

Każda rekomendacja powinna:
- Rozpoczynać się od bezokolicznika akcji (np. "Zwiększyć budżet o 20%...")
- Odnosić się do faktycznych wyników z danych kampanii
- Zawierać konkretne liczby lub procenty
- Być zrozumiała dla właściciela salonu beauty

Przykład dobrego formatu:
Zwiększyć budżet o 15% aby osiągnąć więcej rezerwacji przy obecnym CTR
Testować nowe kreacje z ofertami limitowanymi czasowo dla poprawy konwersji`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "Jesteś ekspertem od Facebook Ads dla salonów beauty. Tworzysz profesjonalne, merytoryczne rekomendacje oparte na faktycznych danych kampanii. NIGDY nie używaj gwiazdek, myślników ani numeracji. Każda rekomendacja zaczyna się od czasownika w bezokoliczniku (Zwiększyć, Poprawić, Testować, Zoptymalizować). Maksymalnie 165 znaków na rekomendację."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const recommendations = aiData.choices[0].message.content;

    return new Response(
      JSON.stringify({ recommendations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
