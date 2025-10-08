import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { infoListing } from '../Utils/tableData';
import useInfoStore from '../Store/InfoStore';
import { infoTypes } from '../Utils/userPage';
import { IoPin } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { MdDelete, MdEditDocument } from "react-icons/md";
import Swal from "sweetalert2";


function ListingInfo() {
    const [editMode, setEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const { getAllInfos, infos, deleteInfo, editInfo } = useInfoStore();

    const [search, setSearch] = useState("");
    const filteredInfos = infos?.filter((info) =>
        info.basic_info.name.toLowerCase().includes(search.toLowerCase()) ||
        info.basic_info.number.includes(search) ||
        info.basic_info.address.toLowerCase().includes(search.toLowerCase()) ||
        info.basic_info.pincode.includes(search)
    );

    const handelDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            await deleteInfo(id);
        }
    }

    const handelEdit = (info) => {
        setSelectedItem(info);
        setEditMode(true);
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        await editInfo(selectedItem._id, {
            state: selectedItem.state,
            district: selectedItem.district,
            sub_divition: selectedItem.sub_divition,
            police_station: selectedItem.police_station,
            type: selectedItem.type,
            basic_info: {
                name: selectedItem.basic_info.name,
                number: selectedItem.basic_info.number,
                address: selectedItem.basic_info.address,
                pincode: selectedItem.basic_info.pincode,
            }
        });
        setEditMode(false);
    }
    useEffect(() => {
        getAllInfos("Hospital");
    }, []);
    return (
        <main className='flex flex-row min-h-screen bg-gray-100 font-mulish'>
            <Sidebar />
            <main className="px-6 py-6 w-full">
                <div className='flex flex-row justify-between items-center'>
                    <p className="text-2xl font-semibold text-gray-800 mb-6">
                        Track, manage, and convert your Users with ease
                    </p>
                </div>

                <div className="relative">
                    {/* ✳️ Edit Modal */}
                    {editMode && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl shadow-xl p-6 w-[500px]">
                                <h2 className="text-xl font-semibold mb-4">Edit Info</h2>

                                <div className="space-y-2 text-sm text-gray-700 mb-4">
                                    <p>State: <span className="font-medium">{selectedItem?.state}</span></p>
                                    <p>District: <span className="font-medium">{selectedItem?.district}</span></p>
                                    <p>Sub Division: <span className="font-medium">{selectedItem?.sub_divition}</span></p>
                                    <p>Police Station: <span className="font-medium">{selectedItem?.police_station}</span></p>
                                    <p>Type: <span className="font-medium">{selectedItem?.type}</span></p>
                                </div>

                                <form className="space-y-3" onSubmit={handelSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        defaultValue={selectedItem?.basic_info?.name}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Number"
                                        defaultValue={selectedItem?.basic_info?.number}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Address"
                                        defaultValue={selectedItem?.basic_info?.address}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Pincode"
                                        defaultValue={selectedItem?.basic_info?.pincode}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />

                                    <div className="flex justify-end gap-3 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setEditMode(false)}
                                            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* ✳️ Info Listing Section */}
                    <section className="p-5 bg-white w-full shadow rounded">
                        <p className="text-xl font-semibold">Info Listing with Details</p>
                        <select
                            className="px-5 py-2 bg-black text-white my-3"
                            onChange={(e) => getAllInfos(e.target.value)}
                        >
                            {infoTypes.map((item, index) => (
                                <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex flex-row my-2 items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg outline-none bg-gray-50">
                            <IoPin className="text-gray-400 text-xl" />
                            <input
                                type="text"
                                className="w-full outline-none"
                                placeholder="Search by name, number, address, pincode"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FiSearch />
                        </div>

                        <table className="w-full text-left text-sm mt-5">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
                                <tr>
                                    {infoListing.map((item, index) => (
                                        <th key={index} className="py-3 px-2">
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {filteredInfos?.map((info, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50 cursor-pointer"
                                        onClick={() => {
                                            setSelectedItem(info);
                                            setEditMode(true);
                                        }}
                                    >
                                        <td className="py-3 px-2">{info?.type}</td>
                                        <td className="py-3 px-2">{info?.basic_info?.name}</td>
                                        <td className="py-3 px-2">{info?.basic_info?.number}</td>
                                        <td className="py-3 px-2">{info?.basic_info?.pincode}</td>
                                        <td className="py-3 px-2">{info?.basic_info?.address}</td>
                                        <td className="py-3 px-2">{info?.state}</td>
                                        <td className="py-3 px-2">{info?.district}</td>
                                        <td className="py-3 px-2">{info?.sub_divition}</td>
                                        <td className="py-3 px-2">{info?.police_station}</td>
                                        <td className="py-3 px-2">
                                            {info?.createdAt ? new Date(info.createdAt).toISOString().split("T")[0] : ""}
                                        </td>
                                        <td className="py-3 px-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 🛑 prevent row click
                                                    handelDelete(info._id);
                                                }}
                                                className="text-red-400 mr-5 text-xl"
                                            >
                                                <MdDelete />
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 🛑 prevent row click
                                                    handelEdit(info);
                                                }}
                                                className="text-blue-400 text-xl"
                                            >
                                                <MdEditDocument />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>

            </main>
        </main>
    )
}

export default ListingInfo