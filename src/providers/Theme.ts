export interface Theme{
  mainColor: string,
  secondaryColor: string,
  mainTextColor: string,
  mainBgColor: string,
}

export const darkTheme: Theme = {
  mainColor: "bg-slate-900",
  secondaryColor: "bg-slate-600",
  mainTextColor: "text-white",
  mainBgColor: "bg-gray-950"
}

export const lightTheme: Theme = {
  mainColor: "bg-gray-100",
  secondaryColor: "bg-gray-300",
  mainTextColor: "text-zinc-950",
  mainBgColor: "bg-zinc-100"
}