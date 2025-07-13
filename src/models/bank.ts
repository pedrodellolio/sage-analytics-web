export const Bank = {
  Nubank: "Nubank",
} as const;

export type Bank = keyof typeof Bank;
export const bankOptions = Object.values(Bank);
