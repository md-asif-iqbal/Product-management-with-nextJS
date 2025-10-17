// file: components/ProductForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, useCreateProductMutation, useGetProductQuery, useUpdateProductMutation } from "@/store/services/products";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be > 0"),
  category: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export default function ProductForm({ id }: { id?: string }) {
  const isEdit = Boolean(id);
  const { data, isFetching } = useGetProductQuery(id!, { skip: !isEdit });
  const [createProduct, { isLoading: creating, error: createErr }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating, error: updateErr }] = useUpdateProductMutation();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const router = useRouter();

  useEffect(() => {
    if (data && isEdit) {
      setValue("name", data.name);
      setValue("price", data.price);
      setValue("category", data.category);
      setValue("sku", data.sku);
      setValue("description", data.description || "");
    }
  }, [data, isEdit, setValue]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEdit && id) {
        await updateProduct({ id, patch: values }).unwrap();
        toast.success("Product updated successfully");
        router.push(`/products/${id}`);
      } else {
        const created = await createProduct(values as unknown as Product).unwrap();
        toast.success("Product created successfully");
        router.push(`/products/${(created as any)._id}`);
      }
    } catch (error) {
      toast.error(isEdit ? "Failed to update product" : "Failed to create product");
    }
  };

  if (isFetching) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-[color:var(--surface2)] rounded w-16 mb-2"></div>
          <div className="h-12 bg-[color:var(--surface2)] rounded"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-[color:var(--surface2)] rounded w-20 mb-2"></div>
              <div className="h-12 bg-[color:var(--surface2)] rounded"></div>
            </div>
          ))}
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-[color:var(--surface2)] rounded w-24 mb-2"></div>
          <div className="h-32 bg-[color:var(--surface2)] rounded"></div>
        </div>
        <div className="flex gap-3 pt-4">
          <div className="h-12 bg-[color:var(--surface2)] rounded flex-1"></div>
          <div className="h-12 bg-[color:var(--surface2)] rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="label">Name</label>
        <input className="input" {...register("name")} placeholder="Product name" />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="label">Price</label>
          <input className="input" type="number" step="0.01" {...register("price")} placeholder="0.00" />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>
        <div>
          <label className="label">Category</label>
          <select className="input" {...register("category")}>
            {["Electronics","Home","Fashion","Books","Sports","Toys","Grocery"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="error">{errors.category.message}</p>}
        </div>
        <div>
          <label className="label">SKU</label>
          <input className="input" {...register("sku")} placeholder="SKU-XXXX" />
          {errors.sku && <p className="error">{errors.sku.message}</p>}
        </div>
      </div>
      <div>
        <label className="label">Description</label>
        <textarea className="input min-h-[120px]" {...register("description")} placeholder="Describe the product" />
      </div>

      {(createErr || updateErr) && (
        <div className="p-3 rounded-xl bg-[color:var(--danger)]/15 border border-[color:var(--danger)]/40">
          {(createErr as any)?.data?.message || (updateErr as any)?.data?.message || "Something went wrong"}
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button 
          disabled={creating || updating || isSubmitting || isFetching} 
          className="button button-primary button-lg flex-1"
        >
          {isEdit ? (updating ? "Saving..." : "Save Changes") : (creating ? "Creating..." : "Create Product")}
        </button>
        <button 
          type="button" 
          className="button button-secondary button-lg" 
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
