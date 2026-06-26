"use client";

import { IoMdClose } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import styles from "./ComponenteProduct.module.css";
import { GetAllProducts } from "@/app/services/GetAllProducts";
import { Product } from "../../Context/ProdutoContext";
import { FiSearch } from "react-icons/fi";

export interface PropsProductCarrinho {
  product: Product;
  quantidadeP: number;
}

interface ComponenteProductProps {
  open: boolean;
  close: (v: boolean) => void;
  HandleProduct: (products: PropsProductCarrinho[]) => void;
  produtosCarrinho: PropsProductCarrinho[];
}

export default function ComponenteProduct({
  open,
  HandleProduct,
  produtosCarrinho,
}: ComponenteProductProps) {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [busca, setBusca] = useState("");
  const [carrinhoProdutos, setCarrinhoProdutos] = useState<PropsProductCarrinho[]>(produtosCarrinho);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCarrinhoProdutos(produtosCarrinho);
  }, [produtosCarrinho]);

  useEffect(() => {
    HandleProduct(carrinhoProdutos);
  }, [carrinhoProdutos, HandleProduct]);

  useEffect(() => {
    if (!open) return;

    if (dialogRef.current && typeof dialogRef.current.showModal === "function") {
      try {
        dialogRef.current.showModal();
      } catch {}
    }

    iniciarLeitor();

    let raf = 0;
    let timeoutId = 0;
    raf = requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => {
        inputRef.current?.focus();
        try {
          inputRef.current?.select();
        } catch {}
      }, 60);
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeoutId);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (busca !== "") return;

    const id = window.setTimeout(() => {
      inputRef.current?.focus();
      try {
        inputRef.current?.select();
      } catch {}
    }, 60);

    return () => clearTimeout(id);
  }, [busca, open]);

  useEffect(() => {
    if (busca !== "") {
      const timeout = setTimeout(async () => {
        const response = await GetAllProducts<any>(1, 30, "", busca);
        setProdutos(response.data.data);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setProdutos([]);
    }
  }, [busca]);

  const iniciarLeitor = async () => {
    if (!("BarcodeDetector" in window)) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: ["code_128", "ean_13", "ean_8", "upc_a"],
      });

      const detect = async () => {
        if (!videoRef.current) return;

        try {
          const barcodes = await barcodeDetector.detect(videoRef.current);
          if (barcodes.length > 0) {
            setBusca(barcodes[0].rawValue);
          }
        } catch {}

        requestAnimationFrame(detect);
      };

      detect();
    } catch {}
  };

  const SelecionarProduto = (produto: Product) => {
    if (produto.quantidade <= 0) return;

    setCarrinhoProdutos((prev) => {
      const existe = prev.find((p) => p.product.barCode === produto.barCode);
      if (existe) {
        return prev.map((p) =>
          p.product.barCode === produto.barCode
            ? { ...p, quantidadeP: Math.min(p.quantidadeP + 1, produto.quantidade) }
            : p
        );
      } else {
        return [...prev, { product: produto, quantidadeP: 1 }];
      }
    });

    setBusca("");
  };

  const removerProduto = (barCode: string) => {
    setCarrinhoProdutos((prev) => prev.filter((p) => p.product.barCode !== barCode));
  };

  const atualizarQuantidade = (barCode: string, novaQtd: number) => {
    setCarrinhoProdutos((prev) =>
      prev.map((item) => (item.product.barCode === barCode ? { ...item, quantidadeP: novaQtd } : item))
    );
  };

  const produtosFiltrados = produtos
    .filter(
      (p) =>
        p.nomeProduto.toLowerCase().includes(busca.toLowerCase()) ||
        p.barCode?.includes(busca)
    )
    .sort((a, b) => a.nomeProduto.localeCompare(b.nomeProduto));

  useEffect(() => {
    if (busca && produtosFiltrados.length === 1) {
      const produto = produtosFiltrados[0];
      if (produto.quantidade > 0) {
        setTimeout(() => SelecionarProduto(produto), 0);
      }
    }
  }, [produtosFiltrados, busca]);

  const total = carrinhoProdutos.reduce(
    (acc, item) => acc + item.product.precoVenda * item.quantidadeP,
    0
  );

  return (
    <div className={styles.containerGeral}>
      <div className={styles.containerLista}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            autoFocus
            ref={inputRef}
            maxLength={100}
            type="text"
            placeholder="Buscar produto ou escanear código..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <video ref={videoRef} style={{ width: "1px", height: "1px", opacity: 0 }} />

        {produtosFiltrados.length === 0 ? (
          <p className={styles.naoEncontrado}>Nenhum produto encontrado.</p>
        ) : (
          <div className={styles.list}>
            {produtosFiltrados.map((produto) => {
              const semEstoque = produto.quantidade <= 0;
              return (
                <div
                  key={produto.barCode}
                  onClick={() => !semEstoque && SelecionarProduto(produto)}
                  className={`${styles.item} ${semEstoque ? styles.itemDesabilitado : ""}`}
                >
                  <div className={styles.info}>
                    <img
                      src={produto.imgUrl || "/default-user.png"}
                      alt={produto.nomeProduto}
                      className={styles.foto}
                    />
                    <div className={styles.details}>
                      <strong>{produto.nomeProduto}</strong>
                      <div className={styles["detail-line"]}>
                        <span><b>Marca:</b> {produto.marca}</span>
                        <span><b>Cor:</b> {produto.cor}</span>
                        <span><b>Tamanho:</b> {produto.tamanho}</span>
                        <span>
                          <b>Qtd Estoque:</b>{" "}
                          {semEstoque ? <span className={styles.semEstoque}>Sem estoque</span> : produto.quantidade}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {carrinhoProdutos.length > 0 && (
        <div className={styles.princi}>
          <div className={styles.title2}>
            <h3>Produto selecionado</h3>
            <h2 className={styles.total}>
              Total:{" "}
              {Number(total / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) ?? 0}
            </h2>
          </div>

          <div className={styles.containerSelecionado}>
            {carrinhoProdutos.map((item) => {
              const estoqueDisponivel = item.product.quantidade - item.quantidadeP;
              return (
                <div key={item.product.barCode} className={styles.detalhes}>
                  <div className={styles.img}>
                    <img
                      src={item.product.imgUrl || "/default-user.png"}
                      alt={item.product.nomeProduto}
                      className={styles.fotoSelecionado}
                    />
                  </div>
                  <div className={styles.detalhesUm}>
                    <div className={styles.title2}>
                      <strong className={styles.name}>{item.product.nomeProduto}</strong>
                      <button onClick={() => removerProduto(item.product.barCode)}>
                        <IoMdClose size={20} />
                      </button>
                    </div>
                    <div className={styles.detalhesDois}>
                      <div className={styles.detalhesSubDois}>
                        <span><b>Disponível:</b> {estoqueDisponivel}</span>
                        <span>
                          <b>Quantidade:</b>
                          <input
                            type="number"
                            min={1}
                            max={item.product.quantidade}
                            value={item.quantidadeP}
                            onChange={(e) => {
                              const novaQtd = Number(e.target.value);
                              if (novaQtd >= 1 && novaQtd <= item.product.quantidade) {
                                atualizarQuantidade(item.product.barCode, novaQtd);
                              }
                            }}
                            className={styles.inputQuantidade}
                          />
                        </span>
                        <span>
                          <b>P Venda:</b>{" "}
                          {Number(item.product.precoVenda / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) ?? 0}
                        </span>
                         <span>
                          <b>P Custo:</b>{" "}
                          {Number(item.product.preco / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
