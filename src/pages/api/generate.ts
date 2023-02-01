import { isEmpty } from "lodash";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  suggestions: string;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (isEmpty(req.body.selected)) {
    res.status(400).json({ error: "Please select at least one country" });
  }

  const selected = req.body.selected.join(", ");
  const prompt = `Suggest 5 new countries to visit based on ${selected} in javascript array format`;

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

  if (data?.choices) {
    const [suggestions] = data.choices;

    res.status(200).json({
      suggestions: sanitizeString(suggestions.text),
    });
  } else {
    res
      .status(404)
      .json({
        error: "Our AI could not find any suggestions, please try again",
      });
  }
}

function sanitizeString(string: String) {
  return string.replaceAll("\n\n", "").replaceAll("'", '"');
}
