type Produto = {
  id: string;
  nomeProduto: string;
  quantidade: number;
  // outros campos...
};

export const filtrarProdutos = (produtos: Produto[], termo: string): Produto[] => {
  if (!termo.trim()) return produtos; 
  return produtos.filter((p) =>
    p.nomeProduto.toLowerCase().startsWith(termo.toLowerCase())
  );
};