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

    const prompt = `Jesteś doświadczonym specjalistą od Facebook Ads, który od lat współpracuje z salonami beauty. Rozmawiasz bezpośrednio z właścicielką salonu ${data.clientName} w ${data.city}. 

Przeanalizuj wyniki jej ostatniej kampanii i napisz 4-5 konkretnych, przyjaznych rekomendacji - tak jakbyś rozmawiał z koleżanką, która prowadzi swój biznes. Używaj "ty" i "twój", mów wprost i zrozumiale, bez korporacyjnego języka.

Wyniki kampanii:
- Okres: ${data.period}
- Budżet: ${data.budget} PLN
- Wyświetlenia: ${data.impressions}
- Zasięg: ${data.reach} osób
- Kliknięcia: ${data.clicks}
- CTR: ${data.ctr}%
- Konwersje: ${data.conversions}
- Koszt na konwersję: ${data.costPerConversion} PLN
- Rezerwacje: ${data.bookings} wizyt

Napisz rekomendacje w stylu: "Zwiększ budżet w weekendy o 25% - wtedy masz najlepsze rezultaty i najniższy koszt klienta" zamiast "Zalecamy optymalizację alokacji budżetu w okresach wysokiej konwersji".

Każda rekomendacja to 1-2 zdania, konkretna liczba lub akcja, ludzki ton. Bez numeracji, każda w nowej linii.`;

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
            content: "Jesteś doświadczonym specjalistą od marketingu dla salonów beauty. Piszesz w ludzki, ciepły i bezpośredni sposób - jak przyjaciel udzielający rady, nie jak korporacyjny konsultant. Używasz 'ty' i mówisz konkretnie, z liczbami i faktami."
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
