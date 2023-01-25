import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  suggestions: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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

  res.status(404);
}
