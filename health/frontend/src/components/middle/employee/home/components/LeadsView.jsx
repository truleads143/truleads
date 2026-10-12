import { useState } from 'react';

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
                    salary
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Zip Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                    Created At
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
                        <span className="text-sm font-medium text-gray-900">{lead.leadTrackingId}</span>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editForm.firstName || ''}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className="w-28 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                              placeholder="First"
                              disabled={isLoading}
                            />
                            <input
                              type="text"
                              value={editForm.lastName || ''}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                            value={editForm.age || ''}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            className="w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            disabled={isLoading}
                          />
                        ) : (
                          <span className="text-sm text-gray-700">{lead.age || "-"}</span>
                        )}
                      </td>

                      {/* State */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.state || ''}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className="w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            disabled={isLoading}
                          />
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-linear-to-r from-blue-100 to-blue-200 px-2.5 py-1 text-xs font-semibold text-blue-800">
                            {lead.state}
                          </span>
                        )}
                      </td>

                      {/* salary */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editForm.salary || ''}
                            onChange={(e) => handleInputChange('salary', e.target.value)}
                            className="w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            disabled={isLoading}
                          />
                        ) : (
                          <span className="text-sm text-gray-700">
                            {lead.salary}
                          </span>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editForm.countryCode || ''}
                              onChange={(e) => handleInputChange('countryCode', e.target.value)}
                              className="w-14 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                              placeholder="+1"
                              disabled={isLoading}
                            />
                            <input
                              type="text"
                              value={editForm.phoneNumber || ''}
                              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                              className="w-32 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                              disabled={isLoading}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-sm text-gray-700">{lead.countryCode} {lead.phoneNumber}</span>
                          </div>
                        )}
                      </td>

                      {/* Zip */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.zipCode || ''}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            className="w-24 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-[#124D95] focus:outline-none focus:ring-2 focus:ring-[#124D95]/20"
                            disabled={isLoading}
                          />
                        ) : (
                          <span className="text-sm text-gray-700">{lead.zipCode || "-"}</span>
                        )}
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-600">
                            {new Date(lead.createdAtEST).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSave(index)}
                              disabled={isLoading}
                              className="inline-flex items-center gap-1.5 rounded-md bg-linear-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {isLoading ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={handleEditCancel}
                              disabled={isLoading}
                              className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditClick(lead, index)}
                              disabled={isLoading}
                              className="inline-flex items-center gap-1.5 rounded-md bg-linear-to-r from-[#124D95] to-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-[#0f3d75] hover:to-blue-800 hover:shadow focus:outline-none focus:ring-2 focus:ring-[#124D95] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(leadId, index)}
                              disabled={isLoading}
                              className="inline-flex items-center gap-1.5 rounded-md bg-linear-to-r from-red-600 to-rose-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-red-700 hover:to-rose-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              {isLoading ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        )}
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