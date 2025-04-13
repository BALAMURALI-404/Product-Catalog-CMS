import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all fields" };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (data.success && data.data) {
        // Optionally update the store’s products
        const updatedProducts = [...get().products, data.data];
        set({ products: updatedProducts });

        return {
          success: true,
          message: "Product created successfully",
          product: data.data, // Return the actual created product
        };
      } else {
        return {
          success: false,
          message: "Product creation failed",
        };
      }
    } catch (error) {
      console.error("Error creating product:", error);
      return {
        success: false,
        message: "Something went wrong. Try again.",
      };
    }
  },
}));
