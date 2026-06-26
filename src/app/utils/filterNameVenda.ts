export const FilterNameVenda = (vendas: any[], value: string) => {
    console.log(value)
    const filter = vendas.filter(venda => venda.nomeCliente.toLowerCase()
    .startsWith(value.toLowerCase()))
    return filter
}