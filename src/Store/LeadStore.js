import { create } from 'zustand'
import toast from 'react-hot-toast';
import { api } from '../Utils/axios';

const useLeadsStore = create((set, get) => ({
  leads: [],
  lead: null,
  
  getAllLeads: async () => {
    try {
        const res = await api.get("user/getAllLeads");
        set({ leads: res.data.leads });
    } catch (error) {
        console.log(error);
        // toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  getLeadDetails: async (id) => {
    try {
      const res = await api.get(`user/getUserDetailsByID/${id}`);
      console.log(res.data.response);
      
      set({ lead: res.data.response })
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  },

  acceptLead: async (id) => {
    try {
      const res = api.put(`user/makeUserAuth/${id}`);
      toast.promise(res, {
        loading: "Accepting lead...",
        success: (res) => res.data.message,
        error: (err) => err.response?.data?.message || "Lead not accepted",
      });
      await res;
      get().getAllLeads();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong")
      set({ lead: null })
    }
  },

  rejectLead: async (id, note) => {
    try {
      const res = api.put(`admin/rejectUser/${id}`, {
        note
      });
      toast.promise(res, {
        loading: "Rejecting lead...",
        success: (res) => res.data.message,
        error: (err) => err.response?.data?.message || "Lead not deleted",
      });
      await res;
      set({ lead: null });
      get().getAllLeads();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }
}));

export default useLeadsStore;