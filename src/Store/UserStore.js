import { create } from 'zustand'
import toast from 'react-hot-toast';
import { api } from '../Utils/axios';

const useUserStore = create((set, get) => ({
    users: null,
    user: null,

    getAllUsers: async () => {
        try {
            const res = await api.get("user/getAllUsers");
            set({ users: res.data.users });
            console.log(res.data);
        } catch (error) {
            console.log(error);
            // toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    getUserDetailsByID: async (id) => {
        try {
            const resPromise = api.get(`user/getUserDetailsByID/${id}`);

            // attach toast to the promise
            toast.promise(resPromise, {
                loading: "Fetching details...",
                success: (res) => res.data.message || "Details fetched",
                error: (err) => err.response?.data?.message || "Something went wrong",
            });

            // wait for the promise
            const res = await resPromise;

            console.log(res.data);
            set({ user: res.data.response });
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    updateUserDocs: async (data, id) => {
        console.log(data);
        const formData = new FormData;
        formData.append("name", data.name);
        formData.append("data", data.data);
        formData.append("file", data.file);
        try {
            console.log(formData);
            const res = api.put(`user/updateDocs/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.promise(res, {
                loading: "Updating details...",
                success: (res) => res.data.message || "Details updated",
                error: (err) => err.response?.data?.message || "Something went wrong",
            });
            await res;
            get().getUserDetailsByID(id);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    filterUser: async (name) => {
        console.log(name);
        try {
            if (name === "all") {
                console.log("all");
                get().getAllUsers();
                return;
            }
            const res = await api.get(`user/getUserByExpairDate/${name}`);
            console.log(res.data.data);
            set({ users: res.data.data });
        } catch (error) {
            console.log(error);
        }
    },

    deleteUser: async (id) => {
        try {
            const resPromise = api.delete(`user/deleteUser/${id}`);
            toast.promise(resPromise, {
                loading: "Deleting user...",
                success: (res) => res.data.message || "User deleted",
                // error: (err) => err.response?.data?.message || "Something went wrong",
            });
            await resPromise;
            get().getAllUsers();
            set({ user: null });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
}));

export default useUserStore;