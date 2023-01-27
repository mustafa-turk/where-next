import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import rateLimiter from "@/utils/rate-limiter";

type Data = {
  suggestions: string;
};

type Error = {
  error: string;
};

const limiter = rateLimiter({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
    await limiter.check(res, 10, "CACHE_TOKEN");
    const selected = req.body.selected.join(", ");
    const prompt = `Suggest 5 new countries to visit based on ${selected} in array format`;

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 30,
        temperature: 0.9,
      }),
    });
    const data = await response.json();

    if (data.choices) {
      const [suggestions] = data.choices;

      const sanitized = suggestions.text
        .replaceAll("\n\n", "")
        .replaceAll("'", '"');

      res.status(200).json({
        suggestions: sanitized,
      });
    }
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }

  res.status(404);
}
