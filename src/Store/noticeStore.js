import toast from 'react-hot-toast';
import { create } from 'zustand'
import { api } from '../Utils/axios';

const useNoticeStore = create((set, get) => ({
    sendNotice: async (number, sms) => {
        try {
            // create the API call promise
            const apiCall = api.post("notice/sendSingleNotice", {
                phone: number,
                message: sms,
            });

            // show toast while waiting for API response
            const res = await toast.promise(apiCall, {
                loading: "Sending notice...",
                success: (res) => res.data.message,
                // error: (err) => err.response?.data?.message || "Something went wrong",
            });

            // log actual API response
            console.log(res.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    sendBulkSms: async (name) => {
        console.log(name);
        try {
            const apiCall = api.post("notice/sendBulkNotice", {
                name: name
            });

            // show toast while waiting for API response
            const res = await toast.promise(apiCall, {
                loading: "Sending notice...",
                success: (res) => res.data.message,
                // error: (err) => err.response?.data?.message || "Something went wrong",
            });

            // log actual API response
            console.log(res.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

}));

export default useNoticeStore;