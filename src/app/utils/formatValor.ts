export function Mask(value: string | number): string {
  let raw = String(value).replace(/\D/g, "");
  if (raw === "") raw = "0";

  const numberValue = parseInt(raw, 10) / 100;

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
