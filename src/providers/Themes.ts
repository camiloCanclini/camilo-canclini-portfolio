export interface Theme{
  mainColor: string,
  secondaryColor: string,
  mainTextColor: string,
  mainBgColor: string,
  titlesSectionSize: string,
  projectsCardBgColor: string,
  projectsCardWidth: string,
  projectsCardFontColor: string
}

export const darkTheme: Theme = {
  mainColor: "bg-slate-900",
  secondaryColor: "bg-slate-600",
  mainTextColor: "text-white",
  mainBgColor: "bg-gray-950",
  titlesSectionSize: "text-8xl",
  projectsCardBgColor: "bg-neutral-950",
  projectsCardWidth: "max-w-96",
  projectsCardFontColor: "text-slate-50"
}

export const lightTheme: Theme = {
  mainColor: "bg-gray-100",
  secondaryColor: "bg-gray-300",
  mainTextColor: "text-zinc-950",
  mainBgColor: "bg-zinc-100",
  titlesSectionSize: "text-5xl",
  projectsCardBgColor: "bg-neutral-950",
  projectsCardWidth: "max-w-96",
  projectsCardFontColor: "text-zinc-950"
}