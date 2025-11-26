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

Stwórz rekomendacje odnoszące się bezpośrednio do tych danych z konkretnymi sugestiami na następne miesiące. 
Każda rekomendacja powinna:
- Rozpoczynać się od konkretnej akcji
- Odnosić się do faktycznych wyników (CTR, koszt konwersji, liczba rezerwacji)
- Zawierać konkretne liczby lub procenty
- Być profesjonalna ale zrozumiała dla właściciela salonu

Format: każda rekomendacja w osobnej linii, bez numeracji. Ton: merytoryczny, oparty na danych, profesjonalny.`;

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
            content: "Jesteś ekspertem od Facebook Ads dla salonów beauty. Tworzysz profesjonalne, merytoryczne rekomendacje oparte na faktycznych danych kampanii. Twoim celem jest dostarczenie konkretnych, działających strategii na kolejne miesiące. Używaj precyzyjnych danych i liczb z analizy."
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
