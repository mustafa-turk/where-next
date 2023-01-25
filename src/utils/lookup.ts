import { shuffle } from "lodash";
import countries from "@/utils/flags.json";

const { lookup: find } = require("country-data-list");

export function lookup(list: String[]) {
  return list.map((name) => {
    const result = find.countries({ name });

    if (!result) {
      return null;
    }

    const [details] = result;
    if (details && details.emoji) {
      const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(
        name.trim()
      )}`;
      return { emoji: details.emoji, name, url };
    }
    return null;
  });
}

export function getCountries() {
  return countries;
}

export function getRandomCountries() {
  return shuffle(countries);
}
