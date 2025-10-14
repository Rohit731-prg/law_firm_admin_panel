import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { LuSearch } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { adminTable } from "../Utils/tableData";
import useAdminStore from "../Store/AdminStore";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

function Admin() {
    const { deleteAdmin, signUp, getAllAdmins, admins } = useAdminStore();

    const [admin, setAdmin] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        image: null,
    });
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (admin.password !== admin.confirmPassword) return toast.error("Passwords do not match");
        await signUp(admin);
        setImage(null);
        setAdmin({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            image: null,
        })
    };

    useEffect(() => {
        getAllAdmins();
    }, [getAllAdmins]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAdmin({ ...admin, image: file });
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const [search, setSearch] = useState("");

    const filteredAdmin = (admins || []).filter((admin) => {
        return admin.name.toLowerCase().includes(search.toLowerCase());
    });

    const handelDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        console.log(result);
        if (result.isConfirmed) {
            await deleteAdmin(id);
        }
    }
    return (
        <main className="flex flex-row min-h-screen bg-gray-100 font-mulish">
            <Sidebar />
            <main className="px-6 py-6 w-full">
                <p className="text-2xl font-semibold text-gray-800 mb-6">
                    Manage your firm’s administrators with ease
                </p>

                <main className="flex flex-col lg:flex-row gap-8">
                    {/* -------- Add New Admin Form -------- */}
                    <section className="lg:w-2/5 bg-white shadow-sm rounded-xl p-6">
                        <p className="text-lg font-semibold text-navy-700 mb-4">
                            Add New Admin
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex flex-col flex-1">
                                    <label className="text-sm text-gray-600">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        value={admin.first_name}
                                        onChange={(e) =>
                                            setAdmin({ ...admin, first_name: e.target.value })
                                        }
                                        className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-500 outline-none"
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="text-sm text-gray-600">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        value={admin.last_name}
                                        onChange={(e) =>
                                            setAdmin({ ...admin, last_name: e.target.value })
                                        }
                                        className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-600">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={admin.email}
                                    onChange={(e) =>
                                        setAdmin({ ...admin, email: e.target.value })
                                    }
                                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-500 outline-none"
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-600">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={admin.phone}
                                    onChange={(e) =>
                                        setAdmin({ ...admin, phone: e.target.value })
                                    }
                                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-500 outline-none"
                                />
                            </div>

                            {/* Passwords */}
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-600">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={admin.password}
                                    onChange={(e) =>
                                        setAdmin({ ...admin, password: e.target.value })
                                    }
                                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-500 outline-none"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-600">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter confirm password"
                                    value={admin.confirmPassword}
                                    onChange={(e) =>
                                        setAdmin({ ...admin, confirmPassword: e.target.value })
                                    }
                                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-500 outline-none"
                                />
                            </div>

                            {/* Image Upload */}
                            {image ? (
                                <div>
                                    <img
                                        src={image}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded-md border"
                                    />
                                </div>
                            ) : (
                                <label
                                    htmlFor="image"
                                    className="flex flex-col items-center gap-2 border-dashed border-2 border-gray-400 p-5 h-40 w-40 justify-center cursor-pointer text-gray-500 rounded-lg"
                                >
                                    <p>Upload Image</p>
                                    <p className="text-sm">JPG, PNG, JPEG</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-black text-white px-6 py-2 rounded-lg"
                            >
                                Add Admin
                            </button>
                        </form>
                    </section>

                    {/* -------- Admins List -------- */}
                    <section className="lg:w-3/5 bg-white shadow-sm rounded-xl p-6">
                        <p className="text-lg font-semibold text-navy-700 mb-4">
                            All Existing Admins
                        </p>

                        {/* Search */}
                        <div className="flex flex-row gap-2 items-center border border-gray-300 px-4 py-2 rounded-lg mb-5 bg-gray-50">
                            <LuSearch className="text-gray-500" />
                            <input
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                className="outline-none w-full text-sm bg-transparent"
                                placeholder="Search admins by name"
                            />
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                    <tr>
                                        {adminTable.map((item, index) => (
                                            <th key={index} className="py-3 px-2 border-b">
                                                {item}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins && admins.length > 0 ? (
                                        filteredAdmin.map((a) => (
                                            <tr
                                                key={a._id}
                                                className="hover:bg-gray-50 transition border-b"
                                            >
                                                <td className="py-3 px-2">
                                                    <img
                                                        src={a.image}
                                                        alt=""
                                                        className="h-12 w-12 rounded-full object-cover border border-gray-200"
                                                    />
                                                </td>
                                                <td className="px-2">{a.name}</td>
                                                <td className="px-2">{a.phone}</td>
                                                <td className="px-2">{a.email}</td>
                                                <td className="px-2">
                                                    <button 
                                                    onClick={() => handelDelete(a._id)}
                                                    className="flex items-center gap-1 text-red-600 hover:text-red-800 transition">
                                                        <MdDelete /> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="text-center py-6 text-gray-500"
                                            >
                                                No Admins Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </main>
            <Toaster />
        </main>
    );
}

export default Admin;
