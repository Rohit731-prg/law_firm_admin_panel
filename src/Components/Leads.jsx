import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { LuSearch, LuArrowDownToLine } from "react-icons/lu";
import { FcOk, FcCancel } from "react-icons/fc";
import useLeadsStore from "../Store/LeadStore";
import { leadsTable } from "../Utils/tableData";

const InfoBlock = ({ label, value }) => (
  <div>
    <p className="text-gray-500 font-medium">{label}</p>
    <p className="text-gray-800 break-words">{value || "—"}</p>
  </div>
);

const DownloadButton = ({ label, url, filename }) => (
  <button
    onClick={() => downloadDocs(url, filename)}
    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-navy-600 text-navy-700 hover:bg-black hover:text-white transition text-sm"
  >
    <LuArrowDownToLine /> {label}
  </button>
);

const downloadDocs = async (url, filename) => {
  if (!url) return toast.error("File not available");
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    toast.error("Download failed");
  }
};

function Leads() {
  const [leadsInfoShow, setLeadsInfoShow] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [search, setSearch] = useState("");

  const { leads, lead, getAllLeads, getLeadDetails, acceptLead, rejectLead } =
    useLeadsStore();

  useEffect(() => {
    getAllLeads();
  }, []);

  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectUser = async (id) => {
    await getLeadDetails(id);
    setLeadsInfoShow(true);
  };

  const rejectLeadFunction = () => {
    if (!rejectNote.trim()) return toast.error("Please enter a note");
    rejectLead(lead?._id, rejectNote);
    setRejectNote("");
  };

  const renderLeadsTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
          <tr>
            {leadsTable.map((item, i) => (
              <th key={i} className="py-3 px-2">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredLeads.length ? (
            filteredLeads.map((lead) => (
              <tr
                key={lead._id}
                onClick={() => handleSelectUser(lead._id)}
                className="hover:bg-gray-50 cursor-pointer transition"
              >
                <td className="py-3 px-2">
                  <img
                    src={lead.image}
                    alt="lead"
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                </td>
                <td className="px-2">{lead.name}</td>
                <td className="px-2">{lead.phone}</td>
                <td className="px-2 text-xs text-gray-500">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td
                  className={`px-2 font-medium ${lead.verify ? "text-green-600" : "text-red-500"
                    }`}
                >
                  {lead.verify ? "Verified" : "Not Verified"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={leadsTable.length}
                className="text-center py-10 text-gray-500"
              >
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderDocuments = (docs) =>
    Object.entries(docs || {}).map(([key, file]) => (
      <DownloadButton
        key={key}
        label={`Download ${key.replace("_", " ").toUpperCase()}`}
        url={file?.docs}
        filename={`${key}.pdf`}
      />
    ));

  const renderDetails = () => (
    <div className="space-y-6">
      {/* Personal Details */}
      <Section title="Personal Details">
        <img
          src={lead.image}
          alt="lead"
          className="w-20 h-20 rounded-sm object-cover mb-3"
        />
        <div className="grid sm:grid-cols-2 gap-y-3 text-sm">
          <InfoBlock label="Full Name" value={lead.name} />
          <InfoBlock label="Email" value={lead.email} />
          <InfoBlock
            label="Phone"
            value={
              <span className="flex items-center gap-2">
                {lead.phone} {lead.verify ? <FcOk /> : <FcCancel />}
              </span>
            }
          />
          <InfoBlock
            label="Address"
            value={
              <>
                {lead.address?.street}
                <br />
                {lead.address?.city}, {lead.address?.state}
                <br />
                {lead.address?.pincode}
                <br />
                {lead.address?.policeStation}
              </>
            }
          />
          <InfoBlock label="PAN" value={lead.pan?.Number} />
          <InfoBlock label="Aadhar" value={lead.aadhar?.Number} />
        </div>
      </Section>

      {/* Referral Details */}
      <Section title="Referral Details">
        <div className="grid sm:grid-cols-2 gap-y-3 text-sm">
          <InfoBlock
            label="Driving Licence Number"
            value={lead.driving_licence?.Number}
          />
          <InfoBlock
            label="Referral Number"
            value={
              <>
                {lead.referal_number?.Number}
                <br />
                <span className="text-gray-500 font-medium mt-2 block">
                  Relation:
                </span>{" "}
                {lead.referal_number?.relation?.toUpperCase()}
              </>
            }
          />
        </div>
      </Section>

      {/* User Documents */}
      <Section title="User Documents">
        <div className="flex flex-wrap gap-3">
          {renderDocuments({
            pan: lead.pan,
            aadhar: lead.aadhar,
            driving_licence: lead.driving_licence,
          })}
        </div>
      </Section>

      {/* Vehicle Details */}
      <Section title="Vehicle Details">
        <div className="grid sm:grid-cols-3 gap-y-3 text-sm">
          {[
            ["Number", lead.vehicle?.number],
            ["Engine", lead.vehicle?.engine_number],
            ["Tax Expiry", lead.vehicle?.tax?.expair_date],
            ["Insurance Expiry", lead.vehicle?.insurance?.expair_date],
            ["Chasis", lead.vehicle?.chasis_number],
            ["Brand", lead.vehicle?.brand],
          ].map(([label, value]) => (
            <InfoBlock key={label} label={label} value={value} />
          ))}
        </div>
      </Section>

      {/* Vehicle Documents */}
      <Section title="Vehicle Documents">
        <div className="flex flex-wrap gap-3">
          {renderDocuments({
            tax: lead.vehicle?.tax,
            insurance: lead.vehicle?.insurance,
            pollution: lead.vehicle?.pollution,
          })}
        </div>
      </Section>

      <button
        onClick={() => acceptLead(lead?._id)}
        className="bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 transition-all cursor-pointer font-semibold w-full py-2 rounded-lg mt-5"
      >
        Accept Details
      </button>

      <textarea
        className="w-full bg-gray-200 outline-none p-2 rounded-lg"
        value={rejectNote}
        onChange={(e) => setRejectNote(e.target.value)}
        placeholder="Enter a note or reason for rejection"
      ></textarea>

      <button
        onClick={() => rejectLeadFunction()}
        className="bg-red-400 text-white hover:bg-white hover:text-red-400 hover:border-red-400 border-2 transition-all cursor-pointer font-semibold w-full py-2 rounded-lg"
      >
        Reject Details
      </button>
    </div>
  );

  return (
    <main className="flex flex-row min-h-screen bg-gray-100 font-mulish">
      <Sidebar />
      <main className="px-6 py-6 w-full">
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          Track, manage, and convert your leads with ease
        </p>

        <main className="flex flex-col lg:flex-row gap-8">
          {/* Leads List */}
          <section className="lg:w-2/5 bg-white shadow-sm rounded-xl p-5">
            <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg mb-4 bg-gray-50">
              <LuSearch className="text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none w-full text-sm bg-transparent"
                placeholder="Search leads by name"
              />
            </div>
            {renderLeadsTable()}
          </section>

          {/* Lead Details */}
          <section className="lg:w-3/5 bg-white shadow-sm rounded-xl p-6">
            {leadsInfoShow ? (
              renderDetails()
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                <p>Please choose a user first</p>
                <p className="text-sm mt-2">
                  User details will appear here after selection
                </p>
              </div>
            )}
          </section>
        </main>
      </main>
      <Toaster />
    </main>
  );
}

const Section = ({ title, children }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <h3 className="text-lg font-semibold text-navy-700 mb-3">{title}</h3>
    {children}
  </div>
);

export default Leads;
