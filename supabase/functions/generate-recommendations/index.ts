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

    const prompt = `Na podstawie poniższych danych kampanii Facebook Ads dla salonu beauty, wygeneruj 4-5 konkretnych, praktycznych rekomendacji marketingowych. Każda rekomendacja powinna być krótka (max 2 zdania), konkretna i wykonalna.

Dane kampanii:
- Nazwa salonu: ${data.clientName}
- Miasto: ${data.city}
- Okres: ${data.period}
- Budżet: ${data.budget} PLN
- Wyświetlenia: ${data.impressions}
- Zasięg: ${data.reach}
- Kliknięcia: ${data.clicks}
- CTR: ${data.ctr}%
- Konwersje: ${data.conversions}
- Koszt/konwersja: ${data.costPerConversion} PLN
- Rezerwacje: ${data.bookings}

Zwróć TYLKO listę rekomendacji, każda w nowej linii, bez numeracji, bez dodatkowego tekstu.`;

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
            content: "Jesteś ekspertem od Facebook Ads dla salonów beauty. Tworzysz konkretne, praktyczne rekomendacje marketingowe."
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
