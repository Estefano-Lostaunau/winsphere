// Import all message files
import navigationEn from "./messages/en/navigation.json";
import heroEn from "./messages/en/hero.json";
import statisticsEn from "./messages/en/statistics.json";
import showcaseEn from "./messages/en/showcase.json";
import reviewsEn from "./messages/en/reviews.json";
import rouletteEn from "./messages/en/roulette.json";
import loginEn from "./messages/en/login.json";
import registerEn from "./messages/en/register.json";
import footerEn from "./messages/en/footer.json";

import navigationEs from "./messages/es/navigation.json";
import heroEs from "./messages/es/hero.json";
import statisticsEs from "./messages/es/statistics.json";
import showcaseEs from "./messages/es/showcase.json";
import reviewsEs from "./messages/es/reviews.json";
import rouletteEs from "./messages/es/roulette.json";
import loginEs from "./messages/es/login.json";
import registerEs from "./messages/es/register.json";
import footerEs from "./messages/es/footer.json";

// Combine all message sections
const messages = {
  en: {
    ...navigationEn,
    ...heroEn,
    ...statisticsEn,
    ...showcaseEn,
    ...reviewsEn,
    ...rouletteEn,
    ...loginEn,
    ...registerEn,
    ...footerEn,
  },
  es: {
    ...navigationEs,
    ...heroEs,
    ...statisticsEs,
    ...showcaseEs,
    ...reviewsEs,
    ...rouletteEs,
    ...loginEs,
    ...registerEs,
    ...footerEs,
  },
};

// Utility functions for message management
export const getMessages = (language = "en") => {
  return messages[language] || messages.en;
};

export const getMessage = (key, language = "en") => {
  const msgs = getMessages(language);
  return msgs[key] || key;
};

export const getSectionMessages = async (section, language = "en") => {
  try {
    const module = await import(`./messages/${language}/${section}.json`);
    return module.default;
  } catch (error) {
    console.warn(`Could not load ${section} messages for ${language}:`, error);
    return {};
  }
};

export default messages;
