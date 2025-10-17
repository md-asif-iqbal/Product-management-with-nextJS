// file: store/services/products.ts
import { api } from "./api";

export type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  sku: string;
  description?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
};

export const productsApi = api.injectEndpoints({
  endpoints: (b) => ({
    login: b.mutation<{ token: string; name: string; email: string }, { email: string; password: string }>({
      query: (body) => ({ url: "/auth", method: "POST", body }),
    }),
    register: b.mutation<{ token: string; name: string; email: string }, { name: string; email: string; password: string }>({
      query: (body) => ({ url: "/auth", method: "POST", body: { ...body, action: "register" } }),
    }),
    listProducts: b.query<{ items: Product[]; total: number; page: number; limit: number }, { q?: string; page: number; limit: number }>({
      query: ({ q, page, limit }) => {
        const p = new URLSearchParams();
        if (q) p.set("q", q);
        p.set("page", String(page));
        p.set("limit", String(limit));
        return { url: `/products?${p.toString()}` };
      },
      providesTags: (res) =>
        res
          ? [
              ...res.items.map(({ _id }) => ({ type: "Product" as const, id: _id })),
              { type: "Products" as const, id: "LIST" },
            ]
          : [{ type: "Products" as const, id: "LIST" }],
    }),
    getProduct: b.query<Product, string>({
      query: (id) => ({ url: `/products/${id}` }),
      providesTags: (_r, _e, id) => [{ type: "Product", id }],
    }),
    createProduct: b.mutation<Product, Omit<Product, "_id" | "createdAt" | "updatedAt">>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: b.mutation<Product, { id: string; patch: Partial<Product> }>({
      query: ({ id, patch }) => ({ url: `/products/${id}`, method: "PUT", body: patch }),
      invalidatesTags: (_r, _e, a) => [{ type: "Product", id: a.id }, { type: "Products", id: "LIST" }],
    }),
    deleteProduct: b.mutation<{ ok: true }, string>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: (_r, _e, id) => [{ type: "Product", id }, { type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
