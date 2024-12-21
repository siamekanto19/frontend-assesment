"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { PRODUCTS_DATA } from "@/data/productsData";
import { usePagination } from "@/hooks/usePagination";
import { Product } from "@/types";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { ProductList } from "@/views/products/productList/productList";
import { ProductModal } from "@/views/products/productModal/productModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";

export const Products: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const selectedProductId = params.get("productId");

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const productFromSearchParams = useMemo(() => {
    const product = paginatedProducts.find((p) => p.id === selectedProductId);
    if (!product) return null;
    return product;
  }, [selectedProductId]);

  const handleOpenModal = useCallback((product: Product) => {
    router.push(path + `?productId=${product.id}`);
  }, []);

  const handleCloseModal = useCallback(() => {
    router.push("/products");
  }, []);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProductId && productFromSearchParams && (
        <ProductModal
          product={productFromSearchParams}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
