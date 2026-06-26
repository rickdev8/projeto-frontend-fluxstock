export const FormatarValor = (valor: string): number => {
  const apenasNumeros = valor.replace(/\D/g, "");

  let multiply = Number(apenasNumeros);

  return multiply;
};
