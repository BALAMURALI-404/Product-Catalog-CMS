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

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json(); 
      set({ products: data.data });
      return { success: true };
    } catch (error) {
      console.error("Error fetching products:", error);
      return { success: false, message: "Failed to fetch products" };
    }
  },

  deleteProduct: async (pid) =>{
    const res = await fetch(`/api/products/${pid}`,{
      method: 'DELETE',
    });
    const data =await res.json();
    if(!data.success) return {success: false, message: data.message}

    set(state => ({products: state.products.filter(product => product._id !== pid)}));
    return {success: true, message: data.message}
  },

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if(!data.success) return { success: false, message: data.message };
    //updates the ui
    set(state => ({products:state.products.map(product => product._id === pid ? {...product, ...updatedProduct} : product)}));
    return {success: true, message: data.message };
  }
}));
