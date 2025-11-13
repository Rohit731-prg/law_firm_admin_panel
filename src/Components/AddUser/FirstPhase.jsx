import React, { useState } from 'react'
import useUserStore from '../../Store/UserStore';

function FirstPhase({ setSecondPhase, vehicle, setVehicle }) {
    const { registerVehicle } =  useUserStore(); 
    

    const handelVehicle = async (e) => {
        e.preventDefault();
        const result = await registerVehicle(vehicle);
        if (result) setSecondPhase(true);
    };
    return (
        <section className="p-5 bg-white w-1/2 shadow-md rounded-sm">
            <p className="text-lg text-gray-500">
                Add new User, 1st Add Vehicle Details
            </p>

            <form className="space-y-4 mt-5" onSubmit={handelVehicle}>
                {/* Vehicle Mode */}
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600">
                        Select Vehicle Mode
                    </label>
                    <select
                        value={vehicle.mode}
                        onChange={(e) =>
                            setVehicle({ ...vehicle, mode: e.target.value })
                        }
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                    >
                        <option value="">Select a Vehicle Mode</option>
                        {["Two Wheeler", "Three Wheeler", "Four Wheeler"].map(
                            (item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* Vehicle and Engine Number */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        label="Vehicle Number"
                        type="text"
                        placeholder="Enter vehicle number"
                        value={vehicle.number}
                        onChange={(e) =>
                            setVehicle({ ...vehicle, number: e.target.value })
                        }
                    />
                    <Input
                        label="Engine Number"
                        type="text"
                        placeholder="Enter engine number"
                        value={vehicle.engine_number}
                        onChange={(e) =>
                            setVehicle({ ...vehicle, engine_number: e.target.value })
                        }
                    />
                </div>

                {/* Chassis and Brand Name */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        label="Chassis Number"
                        type="text"
                        placeholder="Enter chassis number"
                        value={vehicle.chasis_number}
                        onChange={(e) =>
                            setVehicle({ ...vehicle, chasis_number: e.target.value })
                        }
                    />
                    <Input
                        label="Brand Name"
                        type="text"
                        placeholder="Enter brand name"
                        value={vehicle.brand}
                        onChange={(e) =>
                            setVehicle({ ...vehicle, brand: e.target.value })
                        }
                    />
                </div>

                {/* Document Expiry Dates */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        label="Tax Expiry Date"
                        type="date"
                        value={vehicle.tax_expair_date}
                        onChange={(e) =>
                            setVehicle({ ...vehicle, tax_expair_date: e.target.value })
                        }
                    />
                    <Input
                        label="Insurance Expiry Date"
                        type="date"
                        value={vehicle.insurence_expair_date}
                        onChange={(e) =>
                            setVehicle({
                                ...vehicle,
                                insurence_expair_date: e.target.value,
                            })
                        }
                    />
                </div>

                <Input
                    label="Pollution Expiry Date"
                    type="date"
                    value={vehicle.pollution_expair_date}
                    onChange={(e) =>
                        setVehicle({
                            ...vehicle,
                            pollution_expair_date: e.target.value,
                        })
                    }
                />

                {/* File Uploads */}
                <FileInput
                    label="Tax Document"
                    onChange={(e) =>
                        setVehicle({ ...vehicle, tax: e.target.files[0] })
                    }
                />
                <FileInput
                    label="Insurance Document"
                    onChange={(e) =>
                        setVehicle({ ...vehicle, insurance: e.target.files[0] })
                    }
                />
                <FileInput
                    label="Pollution Document"
                    onChange={(e) =>
                        setVehicle({ ...vehicle, pollution: e.target.files[0] })
                    }
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Add Vehicle
                </button>
            </form>
        </section>
    )
}

const FileInput = ({ label, onChange }) => (
    <div className="flex flex-col flex-1">
        <label className="text-sm text-gray-600">{label}</label>
        <input
            type="file"
            onChange={onChange}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none file:cursor-pointer file:rounded-md file:border-0 file:bg-black file:px-3 file:py-2 file:text-white"
        />
    </div>
);

const Input = ({ label, type, placeholder, value, onChange }) => (
    <div className="flex flex-col flex-1">
        <label className="text-sm text-gray-600">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
        />
    </div>
);

export default FirstPhase