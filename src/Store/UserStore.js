import { create } from 'zustand'
import toast from 'react-hot-toast';
import { api } from '../Utils/axios';

const useUserStore = create((set, get) => ({
    users: null,
    user: null,
    id: "",

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
            set({ user: null })
        }
    },

    registerVehicle: async (vehicle) => {
        try {
            const newForm = new FormData();
            newForm.append("number", vehicle.number);
            newForm.append("engine_number", vehicle.engine_number);
            newForm.append("chasis_number", vehicle.chasis_number);
            newForm.append("brand", vehicle.brand);
            newForm.append("mode", vehicle.mode);
            newForm.append("tax_expair_date", vehicle.tax_expair_date);
            newForm.append("insurence_expair_date", vehicle.insurence_expair_date);
            newForm.append("pollution_expair_date", vehicle.pollution_expair_date);

            if (vehicle.tax) newForm.append("tax", vehicle.tax);
            if (vehicle.insurance) newForm.append("insurance", vehicle.insurance);
            if (vehicle.pollution) newForm.append("pollution", vehicle.pollution);

            // Await directly for clarity
            const res = await toast.promise(
                api.post("vehicle/registerVehicle", newForm, {
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                {
                    loading: "Setting vehicle...",
                    success: (res) => res.data.message || "Vehicle set",
                    error: (err) => err.response?.data?.message || "Something went wrong",
                }
            );

            console.log(res);
            set({ id: res.data.id });
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    registerUser: async (user) => {
    try {
        const newForm = new FormData();
        newForm.append("name", user.name);
        newForm.append("email", user.email);
        newForm.append("phone", user.phone);
        newForm.append("blood_group", user.blood_group);
        newForm.append("pan_number", user.pan_number);
        newForm.append("aadhar_number", user.aadhar_number);
        newForm.append("driving_licence_number", user.driving_licence_number);
        newForm.append("driving_licence_expair_date", user.driving_licence_expair_date);
        newForm.append("referal_number", user.referal_number);
        newForm.append("relation", user.relation);
        newForm.append("vehicle", get().id);
        newForm.append("password", user.password);
        
        // 💡 FIX: Manually stringify the address object
        const addressJsonString = JSON.stringify(user.address);
        newForm.append("address", addressJsonString); 
        
        newForm.append("image", user.image);

        const res = await toast.promise(
            api.post(`user/registerUser`, newForm, {
                headers: { "Content-Type": "multipart/form-data" },
            }),
            {
                loading: "Registering user...",
                success: (res) => res.data.message || "User registered",
                // error: (err) => err.response?.data?.message || "Something went wrong",
            }
        );
        console.log(res);
        set({ id: res.data.id });
        return true;
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
        return false; // Return false on error for better flow control
    }
},

    uploadDocs: async (data) => {
        try {
            console.log(data.pan);
            const newForm = new FormData();
            newForm.append("pan", data.pan);
            newForm.append("aadhar", data.aadhar);
            newForm.append("licence", data.driving_licence);
            console.log(newForm[0]);
            const res = await toast.promise(
                api.put(`user/verifyDocs/${get().id}`, newForm, {
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                {
                    loading: "Uploading docs...",
                    success: (res) => res.data.message || "Docs uploaded",
                    // error: (err) => err.response?.data?.message || "Something went wrong",
                }
            )
            return true
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

}));

export default useUserStore;