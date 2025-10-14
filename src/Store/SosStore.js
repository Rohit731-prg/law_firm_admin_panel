import { create } from "zustand";
import { api } from "../Utils/axios";
import toast from "react-hot-toast";

const useSosStore = create((set, get) => ({
  sos: null,
  selectedSos: null,
  location: null,

  // ✅ Get all SOS records
  getAllSos: async () => {
    try {
      const res = await api.get("sos/getAllSos");
      set({ sos: res.data.soses });
    } catch (error) {
      console.error("Error fetching SOS list:", error);
      set({ sos: null });
    }
  },

  // ✅ Select a specific SOS
  setSelectSos: async (sos) => {
    set({ selectedSos: sos })
  },

  // ✅ Update SOS status
  updateSosStatus: async (id) => {
    try {
      const promise = api.put(`sos/updateSos/${id}`);
      toast.promise(promise, {
        loading: "Updating SOS status...",
        success: (res) => res.data.message,
      });

      const res = await promise;
      set({ selectedSos: res.data.sos });
      await get().getAllSos();
    } catch (error) {
      console.error("Update SOS Error:", error);
    }
  },

  // ✅ Delete SOS
  deleteSos: async (id) => {
    try {
      const promise = api.delete(`sos/deleteSos/${id}`);
      toast.promise(promise, {
        loading: "Deleting SOS...",
        success: (res) => res.data.message,
        error: (err) =>
          err?.response?.data?.message || "Error deleting SOS",
      });

      await promise;
      await get().getAllSos();
      set({ selectedSos: null });
    } catch (error) {
      console.error("Delete SOS Error:", error);
      toast.error(error?.response?.data?.message || "Error deleting SOS");
    }
  },

  // ✅ Reply to SOS
  replySos: async (id, reply) => {
    try {
      const promise = api.put(`sos/replySos/${id}`, { message: reply });
      toast.promise(promise, {
        loading: "Sending reply...",
        success: (res) => res.data.message,
      });

      const res = await promise;
      set({ selectedSos: res.data.sos });
      await get().getAllSos();
    } catch (error) {
      console.error("Reply SOS Error:", error);
      toast.error(error?.response?.data?.message || "Error sending reply");
    }
  },
}));

export default useSosStore;
