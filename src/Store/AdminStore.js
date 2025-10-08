import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { api } from '../Utils/axios';

const useAdminStore = create(
    persist(
        (set, get) => ({
            admin: null,
            admins: [],

            signUp: async (admin) => {
                try {
                    const formData = new FormData();
                    formData.append("name", admin.first_name + " " + admin.last_name);
                    formData.append("email", admin.email);
                    formData.append("phone", admin.phone);
                    formData.append("password", admin.password);
                    formData.append("image", admin.image);

                    const resPromise = api.post("admin/register", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    toast.promise(resPromise, {
                        loading: "Signing up...",
                        success: (res) => res.data.message,
                        error: (err) => err.response?.data?.message || "Signup failed",
                    });

                    const res = await resPromise;
                    get().getAllAdmins();
                    return res;
                } catch (error) {
                    console.log(error);
                    toast.error(error.response?.data?.message || "Something went wrong");
                }
            },

            loginWithTokne: async () => {
                try {
                    const res = await api.get("admin/me");
                    set({ admin: res.data.admin });
                    toast.success(res.data.message);
                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            },

            login: async (email, password) => {
                try {

                    const res = await api.post("admin/login", {
                        email,
                        password
                    });
                    console.log(res);

                    toast.promise(
                        Promise.resolve(res),
                        {
                            loading: "Logging in...",
                            success: (res) => res.data.message,
                            error: (err) => err.response?.data?.message || "Login failed"
                        }
                    );
                    set({ admin: res.data.admin });
                    return true;
                } catch (error) {
                    console.log(error);
                    toast.error(error.response?.data?.message || "Something went wrong");
                    return false;
                }
            },

            logout: async () => {
                try {
                    const res = await api.get("admin/logout");
                    set({ admin: null });
                    toast.success(res.data.message)
                } catch (error) {
                    console.log(error);
                    toast.error(error.response?.data?.message || "Something went wrong");
                }
            },

            getAllAdmins: async () => {
                try {
                    const res = await api.get("admin/getAllAdmins");
                    set({ admins: res.data.admins });
                } catch (error) {
                    console.log(error);
                    // toast.error(error.response?.data?.message || "Something went wrong");
                }
            },

            deleteAdmin: async (adminId) => {
                console.log(adminId);
                try {
                    const resPromise = api.delete(`admin/deleteAdmin/${adminId}`);
                    toast.promise(resPromise, {
                        loading: "Deleting admin...",
                        success: (res) => res.data.message,
                    });
                    await resPromise;
                    get().getAllAdmins();
                } catch (error) {
                    toast.error(error.response?.data?.message || "Something went wrong");
                }
            }
        }),
        {
            name: 'admin-storage', // key in localStorage
            getStorage: () => localStorage
        }
    )
);

export default useAdminStore;
