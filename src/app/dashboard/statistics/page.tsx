"use client";

import { ObterDadosCard } from "@/app/services/DadosCard";
import styles from "./StatisticsPage.module.css";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export default function StatisticsPage() {
  const [total, setTotal] = useState<number>(0);
  const [lucro, setLucro] = useState<number>(0);
  const [NomeProduto, setNomeProduto] = useState<string>("");
  const [quantidadeVendido, setQuantidadeVendido] = useState<number>(0);
  const [CategoriaArr, setCategoriaArr] = useState<any[]>([]);
  const [dadosLineData, setDadosLineData] = useState<any[]>([]);
  const [dadosLineTotal, setDadosLineDataTotal] = useState<any[]>([]);
  const [maisVendidosNomes, setMaisVendidosNomes] = useState<any[]>([]);
  const [maisVendidosQuantidade, setMaisVendidosQuantidade] = useState<any[]>(
    []
  );
  const [baixoEstoque, setBaixoEstoque] = useState<any[]>([]);
  const [mediaDiaria, setMediaDiaria] = useState(0);
  const [dadosLineChartDespesaReceita, setDadosLineChartDespesaReceita] =
    useState<any[]>([]);
  const [totalVendas, setTotalVendas] = useState(0);
  const [inputDate1, setInputdate1] = useState("");
  const [inputDate2, setInputdate2] = useState("");
  const [isClear, setIsClear] = useState(false);

  const barOptions = {
    title: { text: "Total Vendas e Custos Totais", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { data: ["Venda", "Custo"], top: 30 },
    xAxis: {
      type: "category",
      data: dadosLineChartDespesaReceita[0],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Venda",
        type: "bar",
        data: dadosLineChartDespesaReceita[1],
        itemStyle: { color: "#7c3aed" },
      },
      {
        name: "Custo",
        type: "bar",
        data: dadosLineChartDespesaReceita[2],
        itemStyle: { color: "#FFBB28" },
      },
    ],
  };

  const verticalBarOptions = {
    title: { text: "Top Produtos Vendidos", left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: maisVendidosNomes,
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Vendas",
        type: "bar",
        data: maisVendidosQuantidade,
        itemStyle: { color: "#7c3aed" },
      },
    ],
  };

  const lineOptions = {
    title: { text: "Receita Diária", left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: dadosLineData },
    yAxis: { type: "value" },
    series: [
      {
        data: dadosLineTotal,
        type: "line",
        smooth: true,
        areaStyle: { color: "#6C47FF33" },
        lineStyle: { color: "#7c3aed" },
      },
    ],
  };

  const pieOptions = {
    title: { text: "Categorias de produtos mais vendidos", left: "center" },
    tooltip: { trigger: "item" },
    legend: {
      bottom: 20,
    },
    series: [
      {
        name: "Categorias",
        type: "pie",
        radius: "50%",
        center: ["50%", "45%"],
        data: CategoriaArr,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.2)",
          },
        },
        itemStyle: {
          color: (params: any) => {
            const colors = [
              "#d7263d",
              "#1b998b",
              "#ff6f59",
              "#3a86ff",
              "#8338ec",
              "#fb5607",
              "#06d6a0",
              "#ef476f",
              "#ffbe0b",
            ];
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  };

  const HandleDateInput = async () => {
    const response: any = await ObterDadosCard(inputDate1, inputDate2);
    const DadosLineData = (response?.dadosLine || []).map((item: any) =>
      dayjs(item.data).format("DD MMM")
    );
    const DadosLineValor = (response?.dadosLine || []).map((item: any) =>
      Number((item.total || 0) / 100)
    );
    setDadosLineData(DadosLineData);
    setDadosLineDataTotal(DadosLineValor);
  };

  const ObterDadosC = async () => {
    const response: any = await ObterDadosCard(inputDate1, inputDate2);
    const dados = response?.dados || {};
    console.log(response);

    setTotal((dados.totalProdutos || 0) / 100);
    setLucro((dados.lucro?.[0]?.sum || 0) / 100);
    setNomeProduto(dados.maisVendido || "N/A");
    setQuantidadeVendido(dados.quantidadeMaisVendido || 0);
    setTotalVendas(dados.totalVendas || 0);

    const Dados = (dados.ArrCategoria || []).map((item: any) => ({
      value: (item.total || 0) / 100,
      name: item.categoria || "Sem categoria",
    }));
    setCategoriaArr(Dados);

    const DadosLineData = (response?.dadosLine || []).map((item: any) =>
      dayjs(item.data).format("DD MMM")
    );
    const DadosLineValor = (response?.dadosLine || []).map((item: any) =>
      Number((item.total || 0) / 100)
    );
    setDadosLineData(DadosLineData);
    setDadosLineDataTotal(DadosLineValor);

    const NomesMaisVendidos = (dados.produtosMaisVendidos || []).map(
      (p: any) => p.nomeProduto
    );
    const QuantidadeMaisVendidos = (dados.produtosMaisVendidos || []).map(
      (p: any) => p.qtd
    );
    setMaisVendidosNomes(NomesMaisVendidos);
    setMaisVendidosQuantidade(QuantidadeMaisVendidos);

    setBaixoEstoque(dados.baixoEstoque || []);

    setMediaDiaria((response?.dados?.mediaDiaria || 0) / 100);

    const DataValorDia = (dados.graficoDias || []).map((item: any) =>
      dayjs(item.dia).add(1, "day").format("DD MMM")
    );

    const ReceitValorDia = (dados.graficoDias || []).map(
      (item: any) => (item.receita_do_dia || 0) / 100
    );
    const DespesaValorDia = (dados.graficoDias || []).map(
      (item: any) => (item.despesas_do_dia || 0) / 100
    );
    setDadosLineChartDespesaReceita([
      DataValorDia,
      ReceitValorDia,
      DespesaValorDia,
    ]);
  };

  const HandleClearDate = async () => {
    setInputdate1("");
    setInputdate2("");
    setIsClear(true);
  };

  useEffect(() => {
    if (inputDate1 && inputDate2) {
      HandleDateInput();
    }
    if (isClear) {
      ObterDadosC();
    }
  }, [inputDate1, inputDate2, isClear]);

  useEffect(() => {
    ObterDadosC();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard - Estatísticas</h1>

      <div className={styles.filterBar}></div>

      <div className={styles.cards}>
        <div className={styles.card2}>
          <h2>Total de vendas</h2>
          <h2>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total)}
          </h2>
          <p>Total de vendas realizadas até hoje: {totalVendas}</p>
        </div>
        <div className={styles.card}>
          <h2>Média de venda diária.</h2>
          <h2>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(mediaDiaria))}
          </h2>
          <p>Média diária das vendas.</p>
        </div>
        <div className={styles.card}>
          <h2>Lucro total</h2>
          <h2>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(lucro)}
          </h2>
          <p>Lucro total até agora.</p>
        </div>
        <div className={styles.card}>
          <h2>Produto mais vendido.</h2>
          <h2>{NomeProduto}</h2>
          <span>Quantidade: {quantidadeVendido}</span>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chartContainer}>
          <ReactECharts option={barOptions} style={{ height: "300px" }} />
        </div>
        <div className={styles.chartContainer}>
          <ReactECharts
            option={verticalBarOptions}
            style={{ height: "300px" }}
          />
        </div>
        <div className={styles.chartContainer}>
          <ReactECharts option={pieOptions} style={{ height: "300px" }} />
        </div>
      </div>

      <div className={styles.chartsEstoq}>
        <div className={styles.chartContainerEstoq}>
          <div className={styles.reposicao}>
            <h2 className={styles.reposicaoTitle}>
              📦 Produtos com Baixo Estoque
            </h2>
            {baixoEstoque.filter((item: any) => item.quantidade < 10).length >
            0 ? (
              <ul className={styles.reposicaoList}>
                {baixoEstoque
                  .filter((item: any) => item.quantidade < 10)
                  .map((item: any, index: number) => (
                    <li key={index} className={styles.reposicaoItem}>
                      <span className={styles.nomeProduto}>
                        {item.nomeProduto}
                      </span>
                      <span className={styles.quantidade}>
                        {item.quantidade} unid.
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className={styles.semReposicao}>
                ✅ Nenhum produto em baixo estoque
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.sla}>
        <div className={styles.clear}>
          <button onClick={() => HandleClearDate()} className={styles.button}>
            Limpar
          </button>
        </div>
        <div className={styles.dates}>
          <label>De</label>
          <input
            onChange={(e) => setInputdate1(e.target.value)}
            type="date"
            className={styles.inputdDate}
          />
          <label>Ate</label>
          <input
            onChange={(e) => setInputdate2(e.target.value)}
            type="date"
            className={styles.inputdDate}
          />
        </div>
      </div>
      <div className={styles.chartsEstoq}>
        <div className={styles.chartContainerLine}>
          <ReactECharts option={lineOptions} style={{ height: "330px" }} />
        </div>
      </div>
    </div>
  );
}
