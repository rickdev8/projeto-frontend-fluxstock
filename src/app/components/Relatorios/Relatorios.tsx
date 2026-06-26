import styles from './relatorio.module.css'

export type PropsRelatorio = {
  vendas: any[]
  handlePrint: () => void
}

export const Relatorios = ({ vendas, handlePrint }: PropsRelatorio) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Relatório de Vendas e Códigos de Barras</h1>

      <button onClick={handlePrint} className={styles.printBtn}>
        Imprimir Relatório
      </button>

      {vendas.length === 0 && <p className={styles.empty}>Nenhuma venda encontrada.</p>}

      {vendas.map((venda: any) => (
        <div key={venda.id} className={styles.vendaCard}>
          <h2 className={styles.cliente}>{venda.client.nomeCliente}</h2>

          <p>
            <strong>Método:</strong> {venda.paymentMethod} |{' '}
            <strong>Status:</strong> {venda.statusPagamento}
          </p>

          <p>
            <strong>Data:</strong>{' '}
            {new Date(venda.data).toLocaleString('pt-BR')} |{' '}
            <strong>Total:</strong>{' '}
            {(Number(venda.total) / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <div className={styles.produtos}>
            <h3>Produtos</h3>
            <ul>
              {venda.salesProduct.map((sp: any) => (
                <li key={sp.id} className={styles.produtoItem}>
                  <span>
                    {sp.product.nomeProduto} ({sp.quantity}x)
                  </span>
                  <span>
                    {(Number(sp.total) / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
