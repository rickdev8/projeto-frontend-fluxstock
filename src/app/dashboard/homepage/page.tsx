"use client";

import { useState, useEffect } from "react";
import ProductTable from "@/app/components/productTable/ProductTable";
import AddProductForm from "@/app/components/addproduct/AddProduct";
import { Product } from "@/app/components/Context/ProdutoContext";
import AddNewVenda from "@/app/components/AddNewVenda/ComponenteProduct";
import { GetAllProducts } from "@/app/services/GetAllProducts";
import { useRouter } from "next/navigation";

export default function ProdutosPage() {
  const [AddProductState, setAddProductState] = useState(false);
  const [AddVendaState, setAddVendaState] = useState(false);
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [pageAtual, setPageAtual] = useState(1);
  const [limit, setLimit] = useState(8);
  const [carregar, setCarregar] = useState(false)
  const [valueFilter, setValueFilter] = useState<string>("")
  const [valueSearch, setValueSearch] = useState("")
  const [totalPages, SetTotalPages] = useState(0)

  const carregarProdutos = async (): Promise<Product[]> => {
    const response = await GetAllProducts<Product[]>(page, limit, valueFilter, valueSearch);
    return response.data;
  };

  const add = async (page: number, limit: number) => {
    GetAllProducts(page, limit, valueFilter, valueSearch);
    setPage(page);
    setLimit(limit);
  };

  const AcarregarProdutos = async () => {
    const ps: any = await carregarProdutos();
    SetTotalPages(ps.totalPages)
    setPageAtual(ps.page)
    setProdutos(ps.data);
    setLoading(false);
    setAddProductState(false);
  };


  useEffect(() => {
    setLoading(true)
    AcarregarProdutos();
  }, [page, carregar, valueFilter, valueSearch]);


  return (
    <div style={{ padding: "2rem" }}>
      {AddProductState && (
        <AddProductForm
          open={AddProductState}
          closeAddProduct={() => setAddProductState(false)}
          onAddProduct={AcarregarProdutos}
        />
      )}

      {AddVendaState && (
        <AddNewVenda IsSaleFinish={() => false} open={true} close={() => setAddVendaState(false)} />
      )}

      <ProductTable
        pageAtual={pageAtual}
        totalPages={totalPages}
        valueOrder={(e) => setValueFilter(e)}
        valueSearch={(e) => setValueSearch(e)}
        carregarProdutos={() => AcarregarProdutos()}
        onAddProduct={() => setAddProductState(true)}
        products={produtos}
        loadingProducts={loading}
        pagination={(page, limit) => add(page, limit)}
      />
    </div>
  );
}
