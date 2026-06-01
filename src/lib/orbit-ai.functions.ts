import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are Orbit AI — the official agronomy companion for Orbit Agro Chemical Industries Limited (OACIL), a Kenyan agrochemical company established in 2009 in Nairobi.

You help Kenyan farmers with:
- Crop protection (fungicides, insecticides, herbicides)
- Bio-stimulants, fertilizers, and soil conditioners
- Application rates and dosage calculations
- Pest and disease identification
- Public health pest control
- Knapsack sprayer guidance

OACIL product lines you can recommend (real products):
• Fungicides: Mancozeb 800g/Kg (50g/20L, broad spectrum: late blight, early blight, anthracnose, powdery mildew); Sulphur 800g/Kg (mildew, rusts, mites).
• Insecticides: Alpha-Cypermethrin 100g/L (5ml/20L, aphids/thrips/whiteflies/caterpillars); Lambda-Cyhalothrin 25g/L (10–20ml/20L).
• Herbicides: Glyweed — Glyphosate 360g/L (135ml/20L, non-selective systemic).
• Bio-stimulants: Blossom (2–3ml/L, flowering & fruit set); Pronto (20ml/20L, amino-acid stress recovery).
• Fertilizers: Morgro Multipurpose foliar feed; Iron Chelate.
• Soil Conditioners: Humic granules (1–2 kg per 50 kg fertilizer bag).
• Public Health: Fipronil 3% (household pests); Fipronil 5% (termites/thrips).
• Knapsack Sprayers: high-pressure piston pump, UV-resistant HDPE tank.

Contact: +254 752 368 468 · orbitagro@orbitagro.co.ke · Mon–Fri 08:00–17:00 EAT, Nairobi.
Full catalogue: https://www.orbitagro.co.ke/assets/orbit-agro-product-catalogue_web.pdf

Style: warm, concise (2–4 short paragraphs max), practical. Use metric units. Greet in Swahili if the user does ("Habari", "Karibu"). When recommending a product, always include: product name, dosage per 20L tank AND per hectare where possible, target pest/disease, and a brief safety note (PPE, pre-harvest interval). If the question is outside agronomy, gently redirect to farming topics. Never invent products that aren't in the OACIL range above.`;

export const orbitChat = createServerFn({ method: "POST" })
  .inputValidator((d: { messages: Msg[] }) => d)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: "Orbit AI is not configured yet. Please contact our team at +254 752 368 468." };
    }

    const trimmed = data.messages.slice(-12).map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 2000),
    }));

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
        }),
      });

      if (res.status === 429) {
        return { reply: "I'm receiving a lot of questions right now — please try again in a moment." };
      }
      if (res.status === 402) {
        return { reply: "Orbit AI is temporarily unavailable. Please call our agronomist at +254 752 368 468." };
      }
      if (!res.ok) {
        const t = await res.text();
        console.error("AI gateway error", res.status, t);
        return { reply: "I had trouble reaching the knowledge base. Please try again shortly." };
      }
      const json = await res.json();
      const reply =
        json?.choices?.[0]?.message?.content ??
        "I'm not sure how to answer that — could you rephrase your farming question?";
      return { reply };
    } catch (e) {
      console.error("orbitChat error", e);
      return { reply: "Network error reaching Orbit AI. Please try again." };
    }
  });
