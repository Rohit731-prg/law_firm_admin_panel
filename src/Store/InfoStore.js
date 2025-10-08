import { create } from 'zustand'
import { api } from '../Utils/axios';
import toast from 'react-hot-toast';

const useInfoStore = create((set, get) => ({
    infos: null,

    createInfo: async (infoDetailsState) => {
        try {
            console.log(infoDetailsState);
            const res = api.post("info/createInfo", infoDetailsState);
            toast.promise(res, {
                loading: "Creating Info...",
                success: (res) => res.data.message,
            });
            await res;
            get().getAllInfos(infoDetailsState.type);
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    },

    getAllInfos: async (type) => {
        try {
            const res = await api.post("info/filterByType", { type });
            set({ infos: res.data?.info });
        } catch (error) {
            console.error("Error fetching info:", error);
        }
    },

    deleteInfo: async (id) => {
        try {
            const res = api.delete(`info/deleteInfo/${id}`);
            toast.promise(res, {
                loading: "Deleting info...",
                success: (r) => r.data.message || "Info deleted successfully"
            });
            await res;
            get().getAllInfos("Hospital");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    editInfo: async (id, updatedInfo) => {
        try {
            const res = api.put(`info/updateInfo/${id}`, updatedInfo);
            toast.promise(res, {
                loading: "Updating info...",
                success: (r) => r.data.message || "Info updated successfully"
            });
            await res;
            get().getAllInfos(updatedInfo.type);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
}));

export default useInfoStore;