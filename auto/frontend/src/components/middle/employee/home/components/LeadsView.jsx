import { useState } from 'react';
import usStates from './us_states';

export default function LeadsView({ leads: initialLeads = [], onLeadsChange }) {
  const [leads, setLeads] = useState(initialLeads);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || '';

  const handleDelete = async (id, index) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    setLoading(id);
    try {
      const response = await fetch(`${API_URL}/api/insurance/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }

      const updatedLeads = leads.filter((_, i) => i !== index);
      setLeads(updatedLeads);

      if (onLeadsChange) {
        onLeadsChange(updatedLeads);
      }

      alert('Lead deleted successfully');
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Failed to delete lead. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleEditClick = (lead, index) => {
    setEditingId(index);
    setEditForm({ ...lead });
  };

  const handleEditSave = async (index) => {
    const leadId = editForm._id || editForm.id;
    if (!leadId) {
      alert('Lead ID not found');
      return;
    }

    setLoading(leadId);
    try {
      const response = await fetch(`${API_URL}/api/insurance/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead');
      }

      const updatedLead = await response.json();

      const updatedLeads = [...leads];
      updatedLeads[index] = updatedLead.data || updatedLead || editForm;
      setLeads(updatedLeads);
      setEditingId(null);

      if (onLeadsChange) {
        onLeadsChange(updatedLeads);
      }

      alert('Lead updated successfully');
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('Failed to update lead. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 px-6 py-4">
      <div className="mx-auto max-w-8xl">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-900">Insurance Leads</h1>
          <p className="mt-2 text-gray-600">Manage and track all your insurance leads in one place</p>
        </div>

        {/* Table Container - with fixed height for scrolling */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <div className="max-h-[calc(100vh-200px)] overflow-auto">
            <table className="w-full border-collapse">
              {/* Sticky Header */}
              <thead className="sticky top-0 z-10">
                <tr className="bg-linear-to-r from-[#124D95] to-blue-700 shadow-md">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Lead ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    State
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    {/* Currently */}
                     Insured
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    {/* Looking To  */}
                    Switch
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    {/* Looking To  */}
                    House Owner
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Zip Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Created At (EST)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {leads.map((lead, index) => {
                  const leadId = lead._id || lead.id;
                  const isLoading = loading === leadId;
                  const isEditing = editingId === index;

                  return (
                    <tr
                      key={leadId || index}
                      className="transition-colors duration-150 hover:bg-blue-50/50"
                    >
                      {/* Lead ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {lead.leadTrackingId}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editForm.firstName || ""}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              className="w-28 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                              placeholder="First"
                              disabled={isLoading}
                            />
                            <input
                              type="text"
                              value={editForm.lastName || ""}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              className="w-28 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                              placeholder="Last"
                              disabled={isLoading}
                            />
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-gray-900">
                            {lead.firstName} {lead.lastName || ""}
                          </span>
                        )}
                      </td>

                      {/* Age */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editForm.age || ""}
                            onChange={(e) =>
                              handleInputChange("age", e.target.value)
                            }
                            className="w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            disabled={isLoading}
                          />
                        ) : (
                          <span className="text-sm text-gray-700">
                            {lead.age || "-"}
                          </span>
                        )}
                      </td>

                      {/* State */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <select
                            value={editForm.state || ""}
                            onChange={(e) =>
                              handleInputChange("state", e.target.value)
                            }
                            className="w-40 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            disabled={isLoading}
                          >
                            <option value="">state.name</option>
                            {usStates.map((state) => (
                              <option key={state.code} value={state.name}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-linear-to-r from-blue-100 to-blue-200 px-2.5 py-1 text-xs font-semibold text-blue-800">
                            {lead.state}
                          </span>
                        )}
                      </td>


                      {/* Currently Insured */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <select
                            value={editForm.currentlyInsured}
                            onChange={(e) =>
                              handleInputChange(
                                "currentlyInsured",
                                e.target.value === "true"
                              )
                            }
                            className="w-28 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            disabled={isLoading}
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        ) : (
                          <span
                            className={`text-sm font-semibold ${lead.currentlyInsured
                              ? "text-green-600"
                              : "text-red-600"
                              }`}
                          >
                            {lead.currentlyInsured ? "Yes" : "No"}
                          </span>
                        )}
                      </td>

                      {/* Looking To Switch */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <select
                            value={editForm.lookingToSwitchForLowerRates}
                            onChange={(e) =>
                              handleInputChange(
                                "lookingToSwitchForLowerRates",
                                e.target.value === "true"
                              )
                            }
                            className="w-32 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            disabled={isLoading}
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        ) : (
                          <span
                            className={`text-sm font-semibold ${lead.lookingToSwitchForLowerRates
                              ? "text-green-600"
                              : "text-red-600"
                              }`}
                          >
                            {lead.lookingToSwitchForLowerRates ? "Yes" : "No"}
                          </span>
                        )}
                      </td>

                      {/* isOwner of House */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <select
                            value={editForm.isOwnerOfHouse}
                            onChange={(e) =>
                              handleInputChange(
                                "isOwnerOfHouse",
                                e.target.value === "true"
                              )
                            }
                            className="w-32 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            disabled={isLoading}
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </select>
                        ) : (
                          <span
                            className={`text-sm font-semibold ${lead.isOwnerOfHouse
                              ? "text-green-600"
                              : "text-red-600"
                              }`}
                          >
                            {lead.isOwnerOfHouse ? "Yes" : "No"}
                          </span>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editForm.countryCode || ""}
                              onChange={(e) =>
                                handleInputChange("countryCode", e.target.value)
                              }
                              className="w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                              placeholder="+1"
                              disabled={isLoading}
                            />
                            <input
                              type="text"
                              value={editForm.phoneNumber || ""}
                              onChange={(e) =>
                                handleInputChange("phoneNumber", e.target.value)
                              }
                              className="w-32 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                              placeholder="Phone"
                              disabled={isLoading}
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-700">
                            {lead.countryCode} {lead.phoneNumber}
                          </span>
                        )}
                      </td>

                      {/* Zip */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.zipCode || ""}
                            onChange={(e) =>
                              handleInputChange("zipCode", e.target.value)
                            }
                            className="w-24 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            placeholder="Zip Code"
                            disabled={isLoading}
                          />
                        ) : (
                          <span className="text-sm text-gray-700">
                            {lead.zipCode || "-"}
                          </span>
                        )}
                      </td>

                      {/* Created At (EST) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {new Date(lead.createdAt).toLocaleString("en-US", {
                            timeZone: "America/New_York",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </span>
                      </td>

                      {/* Actions */}
                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleEditSave(index)}
                                disabled={isLoading}
                                className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                              >
                                {isLoading ? "Saving..." : "Save"}
                              </button>

                              <button
                                onClick={handleEditCancel}
                                disabled={isLoading}
                                className="rounded-md bg-gray-400 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditClick(lead, index)}
                                disabled={isLoading}
                                className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(leadId, index)}
                                disabled={isLoading}
                                className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                              >
                                {isLoading ? "Deleting..." : "Delete"}
                              </button>
                            </>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {leads.length === 0 && (
          <div className="mt-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No leads found</h3>
            <p className="mt-2 text-sm text-gray-600">Get started by adding your first lead.</p>
          </div>
        )}
      </div>
    </div>
  );
}