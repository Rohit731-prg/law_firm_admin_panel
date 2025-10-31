import React, { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import useUserStore from "../Store/UserStore";
import { Toaster } from "react-hot-toast";

function EditProfile({ id, setEdit, edit }) {
  const updateDetails = useUserStore((state) => state.updateUserDocs);

  const update = async (data, id) => {
    await updateDetails(data, id);
    setTimeout(() => {
      setEdit(!edit);
    }, 2000);
  }

  const [data, setData] = useState({
    name: "",
    data: "",
    file: null,
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal container */}
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button
            onClick={() => setEdit(!edit)}
            className="text-gray-600 hover:text-red-500 transition"
          >
            <TiDeleteOutline size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 space-y-4">
          {/* Select field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document Type
            </label>
            <select
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Please Select a docs type</option>
              {[
                { name: "Driving License", value: "driving_licence" },
                { name: "Tax", value: "tax" },
                { name: "Insurance", value: "insurance" },
                { name: "Pollution", value: "pollution" },
              ].map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              value={data.data}
              onChange={(e) => setData({ ...data, data: e.target.value })}
              type="date"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* File upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Document
            </label>
            <div className="w-full">
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition"
              >
                {data.file ? data.file.name : "Choose PDF"}
              </label>

              <input
                id="file-upload"
                type="file"
                onChange={(e) =>
                  setData({ ...data, file: e.target.files[0] })
                }
                accept="application/pdf"
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setEdit(!edit)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => update(data, id)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default EditProfile;
