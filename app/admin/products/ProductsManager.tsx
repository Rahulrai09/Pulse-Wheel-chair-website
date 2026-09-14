"use client";

import { useState, useMemo, useRef } from "react";
import {
  Plus,
  Search,
  Download,
  ArrowUpDown,
  MoreVertical,
  X,
  Star,
  Trash2,
  Loader2,
  Package,
} from "lucide-react";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteProductImage,
  setPrimaryImage,
} from "./actions";

type Product = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  short_description: string | null;
  description: string | null;
  price: number | null;
  compare_at_price: number | null;
  status: "active" | "draft" | "archived";
  featured_image: string | null;
  specifications: { tags?: string[]; features?: string[] } | null;
};

type Category = { id: string; name: string };

type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
};

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  archived: "bg-gray-100 text-gray-600 border-gray-200",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductsManager({
  initialProducts,
  categories,
  images,
}: {
  initialProducts: Product[];
  categories: Category[];
  images: ProductImage[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [productImages, setProductImages] = useState<ProductImage[]>(images);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    list = [...list].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    return list;
  }, [products, search, sortAsc]);

  function handleExportCsv() {
    const header = ["Name", "Slug", "Category", "Price", "Status"];
    const rows = filtered.map((p) => [
      p.name,
      p.slug,
      categoryMap[p.category_id ?? ""] ?? "",
      p.price?.toString() ?? "",
      p.status,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function openAddModal() {
    setEditingProduct(null);
    setModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setModalOpen(true);
    setOpenMenuId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This can't be undone.")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setOpenMenuId(null);
    const res = await deleteProduct(id);
    if (res?.error) alert(res.error);
  }

  function handleSaved(product: Product) {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists
        ? prev.map((p) => (p.id === product.id ? product : p))
        : [product, ...prev];
    });
    setModalOpen(false);
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-semibold text-[#1B355E] mb-1"
            style={{ fontFamily: "var(--font-fraunces, serif)" }}
          >
            Products
          </h1>
          <p className="text-sm text-[#667085]">
            Manage your wheelchair catalog, pricing, and images.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#1B355E] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#152a4d] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E4E7EC] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortAsc((s) => !s)}
            className="flex items-center gap-1.5 text-sm text-[#344054] border border-[#E4E7EC] px-3 py-2 rounded-lg hover:bg-[#F7F8FA]"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort
          </button>
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 text-sm text-[#344054] border border-[#E4E7EC] px-3 py-2 rounded-lg hover:bg-[#F7F8FA]"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E4E7EC] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E4E7EC] text-left text-[#667085]">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-[#98A2B3]">
                  No products found.
                </td>
              </tr>
            )}
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#E4E7EC] last:border-0 hover:bg-[#F7F8FA]"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {product.featured_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.featured_image}
                        alt={product.name}
                        className="w-9 h-9 rounded-lg object-cover border border-[#E4E7EC]"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-[#F1F2F4] flex items-center justify-center text-[#98A2B3] font-medium border border-[#E4E7EC]">
                        <Package className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-[#1B355E]">{product.name}</p>
                      <p className="text-xs text-[#98A2B3]">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-[#344054]">
                  {categoryMap[product.category_id ?? ""] ?? "—"}
                </td>
                <td className="px-5 py-3 text-[#344054]">
                  {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "—"}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-block text-xs font-medium px-2 py-1 rounded-full border capitalize ${
                      STATUS_STYLES[product.status]
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-5 py-3 relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === product.id ? null : product.id)
                    }
                    className="text-[#667085] hover:text-[#1B355E] p-1"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {openMenuId === product.id && (
                    <div className="absolute right-5 top-10 z-20 bg-white border border-[#E4E7EC] rounded-lg shadow-lg py-1 w-32">
                      <button
                        onClick={() => openEditModal(product)}
                        className="w-full text-left px-3 py-2 text-sm text-[#344054] hover:bg-[#F7F8FA]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          images={productImages.filter(
            (img) => img.product_id === editingProduct?.id
          )}
          onImagesChange={setProductImages}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}

function ProductModal({
  product,
  categories,
  images,
  onImagesChange,
  onClose,
  onSaved,
}: {
  product: Product | null;
  categories: Category[];
  images: ProductImage[];
  onImagesChange: React.Dispatch<React.SetStateAction<ProductImage[]>>;
  onClose: () => void;
  onSaved: (p: Product) => void;
}) {
  const isEditing = !!product;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "");
  const [shortDescription, setShortDescription] = useState(
    product?.short_description ?? ""
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [compareAtPrice, setCompareAtPrice] = useState(
    product?.compare_at_price?.toString() ?? ""
  );
  const [status, setStatus] = useState<Product["status"]>(
    product?.status ?? "draft"
  );
  const [tags, setTags] = useState(
    (product?.specifications?.tags ?? []).join(", ")
  );
  const [features, setFeatures] = useState(
    (product?.specifications?.features ?? []).join("\n")
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const input = {
      name,
      slug,
      category_id: categoryId || null,
      short_description: shortDescription,
      description,
      price: price ? parseFloat(price) : null,
      compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : null,
      status,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      features: features.split("\n").map((f) => f.trim()).filter(Boolean),
    };

    const res = isEditing
      ? await updateProduct(product!.id, input)
      : await createProduct(input);

    setSaving(false);

    if (res?.error) {
      setError(res.error);
      return;
    }

    const savedProduct: Product = isEditing
      ? { ...product!, ...input, specifications: { tags: input.tags, features: input.features } }
      : { ...(res as any).data };

    onSaved(savedProduct);
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !product) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadProductImage(product.id, formData);
    setUploading(false);

    if (res?.error) {
      alert(res.error);
      return;
    }

    if (res?.url) {
      onImagesChange((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          product_id: product.id,
          image_url: res.url!,
          is_primary: images.length === 0,
          display_order: images.length,
        },
      ]);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleRemoveImage(imageId: string) {
    onImagesChange((prev) => prev.filter((img) => img.id !== imageId));
    await deleteProductImage(imageId);
  }

  async function handleSetPrimary(imageId: string, url: string) {
    if (!product) return;
    onImagesChange((prev) =>
      prev.map((img) => ({ ...img, is_primary: img.id === imageId }))
    );
    await setPrimaryImage(product.id, imageId, url);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E7EC] sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-[#1B355E]">
            {isEditing ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} className="text-[#667085] hover:text-[#1B355E]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1B355E] mb-1">
                Name
              </label>
              <input
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B355E] mb-1">
                Slug
              </label>
              <input
                required
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1B355E] mb-1">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
              >
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B355E] mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B355E] mb-1">
                Compare-at (₹)
              </label>
              <input
                type="number"
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B355E] mb-1">
              Short description
            </label>
            <input
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B355E] mb-1">
              Full description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1B355E] mb-1">
                Highlight tags (comma-separated)
              </label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Foldable, Lightweight, 150kg capacity"
                className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B355E] mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Product["status"])}
                className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B355E] mb-1">
              Feature list (one per line)
            </label>
            <textarea
              rows={3}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder={"Electric reclining up to 160°\nUp to 20 km drive range"}
              className="w-full rounded-lg border border-[#E4E7EC] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B355E]/10"
            />
          </div>

          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-[#1B355E] mb-2">
                Images
              </label>
              <div className="flex flex-wrap gap-3 mb-3">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image_url}
                      alt=""
                      className={`w-20 h-20 object-cover rounded-lg border-2 ${
                        img.is_primary ? "border-[#EE8B1B]" : "border-[#E4E7EC]"
                      }`}
                    />
                    {img.is_primary && (
                      <span className="absolute -top-2 -left-2 bg-[#EE8B1B] text-white rounded-full p-1">
                        <Star className="w-3 h-3" fill="white" />
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                      {!img.is_primary && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(img.id, img.image_url)}
                          title="Make main image"
                          className="bg-white rounded-full p-1.5"
                        >
                          <Star className="w-3 h-3 text-[#1B355E]" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        title="Remove"
                        className="bg-white rounded-full p-1.5"
                      >
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-20 h-20 rounded-lg border-2 border-dashed border-[#E4E7EC] flex items-center justify-center text-[#98A2B3] hover:border-[#1B355E] hover:text-[#1B355E] transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-[#98A2B3]">
                The starred image is the main product photo shown on the store.
              </p>
            </div>
          )}

          {!isEditing && (
            <p className="text-xs text-[#98A2B3] bg-[#F7F8FA] rounded-lg px-3 py-2">
              Save the product first, then reopen it to add images.
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#344054] border border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-[#1B355E] rounded-lg hover:bg-[#152a4d] disabled:opacity-60 flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
