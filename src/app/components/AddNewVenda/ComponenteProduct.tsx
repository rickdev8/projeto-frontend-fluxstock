"use client";

import { IoMdClose } from "react-icons/io";
import { useRef, useEffect, useState } from "react";
import styles from "./AddNewVenda.module.css";
import { BolinhaProgressao } from "../BolinhaProg/BolinhaProgressao";
import ComponenteCliente, {
  Cliente,
} from "./ComponenteCliente/ComponenteCliente";
import ComponenteProduct, {
  PropsProductCarrinho,
} from "./ComponenteProduct/ComponenteProduct";
import ComponentePagamento, {
  ValuesPagamento,
} from "../componentePagamento/ComponentePagamento";
import RevisaoVendaContent from "../componenteRevisao/ComponenteRevisao";
import { AddVendaService } from "@/app/services/AddNewVenda";
import { useRouter } from "next/navigation";
import { GetAllVendas } from "@/app/services/FindVendas";

interface AddNewVendaProps {
  open: boolean;
  close: () => void;
  IsSaleFinish: () => void;
}

export interface VendaProps {
  products: PropsProductCarrinho[];
  metodoPagamento?: string;
  total: number;
  dataVenda: Date;
  statusPagamento?: string;
}

export default function AddNewVenda({
  open,
  close,
  IsSaleFinish,
}: AddNewVendaProps) {
  const [nomeBotao, setNomeBotao] = useState("Próximo");
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [pagina, setPagina] = useState(1);
  const [botaoDesativado, setBotaoDesativado] = useState(true);
  const [mostrarBotaoProximo, setMostrarBotaoProximo] = useState(false);

  const [clienteSelecionado, setClienteSelecionado] = useState<any>();
  const [produtosSelecionados, setProdutosSelecionados] = useState<
    PropsProductCarrinho[]
  >([]);
  const [dadosPagamento, setDadosPagamento] = useState<ValuesPagamento>();
  const [dadosVendaFinal, setDadosVendaFinal] = useState<VendaProps>();

  const [styleButton, setStyleButton] = useState(styles.proximoInative);

  const [aceito, setAceito] = useState(false);

  useEffect(() => {
  if (!dialogRef.current) return;
  if (open) {
    if (!dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  } else {
    dialogRef.current.close();
  }
}, [open]);

useEffect(() => {
  const dialog = dialogRef.current;
  if (!dialog) return;

  const handleClose = () => {
    close(); 
  };

  dialog.addEventListener("close", handleClose);
  return () => dialog.removeEventListener("close", handleClose);
}, [close]);



  useEffect(() => {
    setNomeBotao(pagina === 4 ? "Finalizar venda" : "Próximo");
  }, [pagina]);

  useEffect(() => {
    if (pagina === 1 && !aceito) {
      setBotaoDesativado(!(clienteSelecionado && mostrarBotaoProximo));
      setStyleButton(styles.proximo);
    } else if (pagina === 2) {
      setBotaoDesativado(produtosSelecionados.length === 0);
    } else if (pagina === 3) {
      setBotaoDesativado(!dadosPagamento);
    } else {
      setBotaoDesativado(false);
    }
  }, [
    pagina,
    clienteSelecionado,
    mostrarBotaoProximo,
    produtosSelecionados,
    dadosPagamento,
    aceito,
  ]);

  const handleAvancar = async () => {
    if (pagina < 3) {
      setPagina((prev) => prev + 1);
    } else if (pagina === 3) {
      gerarVenda();
      setPagina(4);
    } else if (pagina === 4) {
      setBotaoDesativado(true);
      if (clienteSelecionado && produtosSelecionados.length > 0) {
        const produtosInfo = produtosSelecionados.map((p) => ({
          idProduto: p.product.id,
          quantidade: p.quantidadeP,
        }));

        const sale = {
          products: produtosInfo,
          clientId: aceito === true ? "" : clienteSelecionado[0].id,
          paymentMethod: dadosPagamento?.formaPagamento,
          statusPagamento: dadosPagamento?.statusPagamento,
          desconto: dadosPagamento?.desconto
        };

        await AddVendaService(sale);
        await GetAllVendas(1, 6, "");
        setClienteSelecionado("");
        setDadosPagamento({
          formaPagamento: "",
          metodoCartao: "",
          statusPagamento: "",
          desconto: 0
        });
        setDadosVendaFinal({
          dataVenda: new Date(),
          products: [],
          total: 0,
          metodoPagamento: "",
          statusPagamento: "",
        });
        setProdutosSelecionados([]);
        setPagina(1)
        IsSaleFinish();
        dialogRef.current?.close();
        close();
      } else {
        console.log("Cliente ou produtos não selecionados.");
      }
    }
  };

  const router = useRouter();

  const RedirectPageClient = () => {
    router.push("/dashboard/Client");
  };

  const handleVoltar = () => {
    if (pagina > 1) {
      setPagina((prev) => prev - 1);
    }
  };

  const selecionarCliente = (cliente: Cliente) => {
    let select = [cliente];
    setClienteSelecionado(select);
  };

  const receberPagamento = (dados: ValuesPagamento) => {
    setDadosPagamento(dados);
  };

  const gerarVenda = async () => {
    const total = produtosSelecionados.reduce((acc, curr) => {
      const preco = curr.product.precoVenda || 0;
      const quantidade = curr.quantidadeP || 1;
      return acc + preco * quantidade;
    }, 0);

    const novaVenda: VendaProps = {
      products: produtosSelecionados,
      metodoPagamento: dadosPagamento?.formaPagamento || "",
      total,
      dataVenda: new Date(),
      statusPagamento: dadosPagamento?.statusPagamento || "Pendente",
    };
    setDadosVendaFinal(novaVenda);
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.bol}>
            <h1>Nova venda</h1>
            <BolinhaProgressao atual={pagina} />
          </div>
          <button
            onClick={() => {
              dialogRef.current?.close();
              close();
            }}
          >
            <IoMdClose size={28} />
          </button>
        </div>

        <div className={styles.containerv}>
          {pagina === 1 && (
            <ComponenteCliente
              ClienteS={clienteSelecionado}
              ButtonDisabled={(desativado) => setBotaoDesativado(desativado)}
              ButtonProximo={(ativo) => setMostrarBotaoProximo(ativo)}
              ClienteSelecionado={selecionarCliente}
              open={open}
            />
          )}
          {pagina === 2 && (
            <ComponenteProduct
              produtosCarrinho={produtosSelecionados}
              HandleProduct={(novosProdutos) =>
                setProdutosSelecionados(novosProdutos)
              }
              open={open}
              close={close}
            />
          )}
          {pagina === 3 && (
            <ComponentePagamento
              statuspagamento={dadosPagamento?.statusPagamento}
              metodopagamento={dadosPagamento?.formaPagamento}
              HandleValue={receberPagamento}
            />
          )}
          {pagina === 4 && dadosVendaFinal && clienteSelecionado && (
            <RevisaoVendaContent
              HandleVenda={(vendaFinal, cliente) => {
                setDadosVendaFinal(vendaFinal);
              }}
              cliente={clienteSelecionado}
              venda={[dadosVendaFinal]}
            />
          )}

          <div className={styles.footer}>
            {pagina > 1 && pagina < 5 && (
              <button onClick={handleVoltar} className={styles.voltar}>
                Voltar
              </button>
            )}
            {pagina === 1 && (
              <button
                className={styles.proximo2}
                onClick={() => RedirectPageClient()}
              >
                Não tenho cadastro
              </button>
            )}
            <button
              onClick={handleAvancar}
              disabled={botaoDesativado}
              className={`${styles.proximo} ${
                botaoDesativado ? styles.proximoInative : ""
              }`}
            >
              {nomeBotao}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
