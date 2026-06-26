type Venda = {
  id: string;
  data: string; 
  total: string; 
  paymentMethod: string;
  statusPagamento: string;
  nomeCliente: string;
};

export const FilteredVendas = (value: string, vendas: Venda[]) => {
  let sorteado: Venda[] = [];

  switch (value) {
    case "Mais recentes":
      sorteado = [...vendas].sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
      );
      break;

    case "Mais antigos":
      sorteado = [...vendas].sort(
        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
      );
      break;

    case "Todos":
      sorteado = [...vendas];
      break;

    case "Maior preco":
      sorteado = [...vendas].sort((a, b) => Number(b.total) - Number(a.total));
      break;

    case "Menor preco":
      sorteado = [...vendas].sort((a, b) => Number(a.total) - Number(b.total));
      break;

    case "Ordem Alfabetica":
      sorteado = [...vendas].sort((a, b) =>
        (a.nomeCliente || "").localeCompare(b.nomeCliente || "")
      );
      break;

    case "Pagas":
      sorteado = vendas.filter(
        (v) => (v.statusPagamento || "").trim().toLowerCase() === "pago"
      );
      break;

    case "Pendentes":
      sorteado = vendas.filter(
        (v) => (v.statusPagamento || "").trim().toLowerCase() === "pendente"
      );
      break;

    default:
      sorteado = [...vendas];
      break;
  }

  return sorteado;
};
