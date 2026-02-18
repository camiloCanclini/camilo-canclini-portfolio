import pageInfoJson from "@data/pageInfo.json"; // ajustá el path si no coincide

export type Locale = "es" | "en";

type Localized<T> = Record<Locale, T>;

export type PageSection = {
  name: string;
  title: Localized<string>;
  subtitle: Localized<string | string[]>;
  content: any; // Puedes ajustar esto según el tipo de contenido que tengas en tu JSON
};

export type PageInfo = {
  sections: PageSection[];
};

// Tipado del JSON
export const pageInfo = pageInfoJson as PageInfo;

export function getSection(sectionName: string) {
  return pageInfo.sections.find((s) => s.name === sectionName);
}

export function getSectionText(sectionName: string, locale: Locale) {
  const s = getSection(sectionName);
  if (!s) return null;

  return {
    title: s.title[locale] ?? s.title.es,
    subtitle: s.subtitle[locale] ?? s.subtitle.es,
    content: s.content?.[locale] ?? s.content?.es,
  };
}
export function getLanguageTexts(data: any, locale: Locale) {
  return data[locale] ?? data.en;
}
