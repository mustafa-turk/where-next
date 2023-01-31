import { isEmpty } from "lodash";
import { v4 as generateUUID } from "uuid";
import rateLimiter from "@/utils/rate-limiter";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  suggestions: string;
  id: string;
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
    if (isEmpty(req.body.selected)) {
      res.status(400).json({ error: "Please select at least one country" });
    }

    await limiter.check(res, 20, "CACHE_TOKEN");
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

      res.status(200).json({
        id: generateUUID(),
        suggestions: sanitizeString(suggestions.text),
      });
    }
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }

  res.status(404);
}

function sanitizeString(string: String) {
  return string.replaceAll("\n\n", "").replaceAll("'", '"');
}
