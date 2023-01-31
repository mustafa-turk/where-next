import { shuffle } from "lodash";
import countries from "@/json/flags.json";

const { lookup } = require("country-data-list");

export function getCountriesByCode(list: String[]) {
  return list.map((name) => {
    const result = lookup.countries({ name });

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

export function getAllCountries() {
  return countries;
}

export function getRandomCountries() {
  return shuffle(countries);
}
