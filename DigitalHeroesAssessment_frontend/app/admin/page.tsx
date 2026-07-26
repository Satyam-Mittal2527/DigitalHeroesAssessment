"use client";

import { useEffect, useState } from "react";
import { getClients, updateClientStatus, getCurrentUser } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Lead {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  budget: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("NEW");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const initialize = async () => {
      try {
        // Check authentication
        const userResponse = await getCurrentUser();

        if (!userResponse.success) {
          router.replace("/login");
          return;
        }

        // Fetch clients
        const clientResponse = await getClients(activeTab);

        if (clientResponse.success) {
          setData(clientResponse.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [activeTab, router]);


  const filteredLeads = data.filter(
    (lead) =>
      lead.FirstName.toLowerCase().includes(search.toLowerCase()) ||
      lead.LastName.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async (id: string, newStatus: string) => {

    try {
      const response = await updateClientStatus(id, newStatus);
    } catch (error) {
      console.log(error)
    }

    setData((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const tabs = [
    { value: "NEW", label: "New" },
    { value: "CONTACTED", label: "Contacted" },
    { value: "CLOSED", label: "Closed" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Lead Management
        </h1>

        {/* Search */}

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Tabs */}

        <div className="flex gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === tab.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-900 hover:bg-gray-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}

        {loading ? (
          <div className="text-center text-lg">
            Loading...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            No Leads Found
          </div>
        ) : (
          <div className="space-y-5">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl border shadow p-6"
              >
                <div className="flex justify-between">

                  <div>

                    <h2 className="text-2xl font-semibold text-gray-900">
                      {lead.FirstName} {lead.LastName}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {lead.email}
                    </p>

                    <p className="mt-3 font-medium text-blue-600">
                      Budget: {lead.budget}
                    </p>

                    <p className="mt-4 text-gray-700">
                      {lead.message}
                    </p>

                    <p className="mt-5 text-sm text-gray-500">
                      Submitted on{" "}
                      {new Date(
                        lead.created_at
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="flex flex-col items-end gap-3">

                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(
                          lead.id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">
                        Contacted
                      </option>
                      <option value="CLOSED">
                        Closed
                      </option>
                    </select>

                    <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800">
                      View Details
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}