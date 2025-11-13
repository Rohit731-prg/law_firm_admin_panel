import React, { useState } from 'react'
import useUserStore from '../../Store/UserStore';

function ThirdPhase({ setSecondPhase, setThredPhase }) {
    const [docs, setDocs] = useState({
        pan: null,
        aadhar: null,
        driving_licence: null,
    });
    const { uploadDocs } = useUserStore();
    const handleDocChange = (name) => (e) => {
        setDocs((prevDocs) => ({
            ...prevDocs,
            [name]: e.target.files[0],
        }));
    };

    const handleDocSubmit = async (e) => {
        e.preventDefault();
        const result = await uploadDocs(docs);

        if (result) {
            toast.success("Documents uploaded successfully!");
            setThredPhase(false);
            setSecondPhase(false);

            // Reset all states
            setVehicle({
                number: "",
                engine_number: "",
                chasis_number: "",
                brand: "",
                mode: "",
                tax_expair_date: "",
                insurence_expair_date: "",
                pollution_expair_date: "",
                tax: null,
                insurance: null,
                pollution: null,
            });

            setUser({
                name: "",
                email: "",
                phone: "",
                password: "",
                conPassword: "",
                address: {
                    districe: "",
                    street: "",
                    sub_divition: "",
                    city: "",
                    state: "",
                    pincode: "",
                    policeStation: "",
                },
                blood_group: "",
                pan_number: "",
                aadhar_number: "",
                driving_licence_number: "",
                driving_licence_expair_date: "",
                referal_number: "",
                relation: "",
                vehicle: "",
                image: null,
            });

            setDocs({
                pan: null,
                aadhar: null,
                driving_licence: null,
            });
        }
    };
    return (
        <div>
            <form className="flex flex-col gap-3" onSubmit={handleDocSubmit}>
                {[
                    { label: "Driving License Document", name: "driving_licence" },
                    { label: "Pan Card Document", name: "pan" },
                    { label: "Aadhar Card Document", name: "aadhar" },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col flex-1">
                        <label className="text-sm text-gray-600">
                            Upload {item.label}
                        </label>
                        <input
                            type="file"
                            onChange={handleDocChange(item.name)}
                            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none file:cursor-pointer file:rounded-md file:border-0 file:bg-black file:px-3 file:py-2 file:text-white"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-black w-full my-3 text-white py-2 rounded-sm hover:bg-gray-800 transition"
                >
                    Submit Documents
                </button>
            </form>
        </div>
    )
}

export default ThirdPhase