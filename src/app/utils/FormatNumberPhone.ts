export function formatarTelefone(numero: string) {
  numero = numero.replace(/\D/g, "");

  if (numero.startsWith("55")) {
    numero = numero.slice(2);
  }

  if (numero.length > 11) {
    numero = numero.slice(0, 11);
  }

  if (numero.length < 3) {
    return numero.replace(/^(\d{0,2})/, "$1");
  }

  if (numero.length < 7) {
    return numero.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
  }

  if (numero.length <= 11) {
    return numero.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

  return numero;
}
