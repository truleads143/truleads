import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

// Custom Hook to manage form state, including word count utility
const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Utility to count characters
  const countCharacters = (text) => {
    // 1. Initial check for null/undefined input
    if (typeof text !== 'string' || !text) {
        return 0;
    }
    
    // 2. Normalize Whitespace
    // a) .trim() removes spaces from the start and end.
    // b) .replace(/\s+/g, ' ') replaces any sequence of one or more whitespace 
    //    characters (including tabs, newlines, and multiple spaces) with a single space.
    const cleanedText = text.trim().replace(/\s+/g, ' ');

    // 3. Return the total number of characters in the cleaned string.
    return cleanedText.length;
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors immediately upon change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return { formData, setFormData, errors, setErrors, handleChange, countCharacters };
};

// Reusable Form Field Component (moved outside to prevent re-rendering and fix focus issue)
const FormField = ({ label, name, type = 'text', required = false, isSelect = false, options, formData, handleChange, errors, children, rows }) => {
    const error = errors[name];
    const isTextArea = type === 'textarea';

    const inputClasses = `
      w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'}
      rounded bg-gray-100 text-gray-800 transition duration-150
      focus:border-[#A67C37] focus:ring-2 focus:ring-[#ECE0C6]
      focus:outline-none
    `;

    // Dropdown options preparation
    let selectOptions = isSelect ? options : [];
    
    // Logic to conditionally prepend "Select..." only if required or if the field value is blank
    if (isSelect) {
      if (formData[name] === '' || required) {
          // Prepend the "Select..." option (value is empty string)
          selectOptions = [{ value: '', label: 'Select...' }, ...options];
      }
    }


    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {isSelect ? (
          <select
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required={required}
            className={inputClasses}
          >
            {selectOptions.map(option => (
              <option 
                key={option.value} 
                value={option.value} 
                // Disable the 'Select...' option if the field is required to prevent accidental selection
                disabled={required && option.value === ''} 
              >
                {option.label}
              </option>
            ))}
          </select>
        ) : isTextArea ? (
          <textarea
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required={required}
            rows={rows}
            maxLength={200 * 10} // High limit, relying on word counter for soft limit
            className={inputClasses}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            required={required}
            className={inputClasses}
          />
        )}

        {error && (
          <p className="mt-1 text-xs text-red-500 font-semibold">{error}</p>
        )}
        {children}
      </div>
    );
  };


const Query = () => {


  const API_BASE_URL = import.meta.env.VITE_API_URL || ''; // empty = same site, Netlify/Vercel forward /api to the backend

  const navigate = useNavigate(); // Initialize useNavigate
  const INITIAL_STATE = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    // CHANGED: Default to 'Phone'
    preferredContact: 'Phone', 
    // Default to empty string for the 'Select...' option
    serviceType: '', 
    otherServiceName: '',
    description: '',
  };

  const { formData, setFormData, errors, setErrors, handleChange, countCharacters } = useForm(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'success'|'error', message: '...' }

  const MAX_CHARACTER_COUNT = 200;

  // Derived state for conditional rendering
  const isOtherService = formData.serviceType === 'OTHER';
  const descriptionCharacterCount = countCharacters(formData.description);

  // Dynamic props for the Description field based on serviceType
  const descriptionLabel = isOtherService
    ? `Other Service Description (Required - Max ${MAX_CHARACTER_COUNT} Characters)`
    : `General Description/Notes (Optional - Max ${MAX_CHARACTER_COUNT} Characters)`;

  const descriptionRequired = isOtherService;

  // --- Validation Logic ---
  const validate = useCallback(() => {
    let newErrors = {};
    let isValid = true;

    // Email validation regex (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone validation regex (basic 10-digit number)
    const phoneRegex = /^\d{10}$/;

    // Required Fields (text inputs)
    if (!formData.fullName.trim()) { newErrors.fullName = 'Full Name is required.'; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = 'Email is required.'; isValid = false; }
    if (!formData.phone.trim()) { newErrors.phone = 'Phone number is required.'; isValid = false; }

    // NEW VALIDATION: Desired Service Type is required
    if (!formData.serviceType.trim()) { 
        newErrors.serviceType = 'Desired Service Type is required.'; 
        isValid = false; 
    }

    // Format Validation
    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'; isValid = false;
    }
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a 10-digit phone number (digits only).'; isValid = false;
    }

    // Conditional Required Fields
    if (isOtherService) {
      if (!formData.otherServiceName.trim()) {
        newErrors.otherServiceName = 'Service Name is required when choosing "Other".'; isValid = false;
      }
      // Description is required for 'OTHER' service type
      if (!formData.description.trim()) {
        newErrors.description = 'A description is required for the "Other" service.'; isValid = false;
      }
    }

    // Character Count Limits (only applied to the 'description' field)
    if (descriptionCharacterCount > MAX_CHARACTER_COUNT) {
      newErrors.description = `Description must be under ${MAX_CHARACTER_COUNT} characters.`; isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, isOtherService, descriptionCharacterCount]);


  // --- Submission Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null); // Clear previous alerts

    if (!validate()) {
      setAlert({ type: 'error', message: 'Please correct the highlighted errors before submitting.' });
      return;
    }

    setIsSubmitting(true);
    // The backend saves the "Other" service name from `otherServiceType`
    const payload = { ...formData, otherServiceType: formData.otherServiceName };

    // Placeholder for Axios POST request to a mock endpoint
    console.log('Submitting payload:', payload);
    console.log('POST to:', `${API_BASE_URL}/api/generate-leads`);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/generate-leads`, payload);

      if (response.status === 201) {
        setAlert({
          type: 'success',
          message: 'Success! Your query has been submitted. We will contact you shortly.'
        });
        setFormData(INITIAL_STATE); // Reset form on successful submission
      } else {
        throw new Error('Server returned an error.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      const serverMessage = error?.response?.data?.message;
      setAlert({
        type: 'error',
        message: serverMessage
          ? `We couldn't submit your query: ${serverMessage}`
          : "We couldn't reach our server just now. Please try again in a minute, or email us at connect@truleads.agency."
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center items-start pt-10">
      <div className="w-full max-w-4xl">

        {/* --- Header / Description Section --- */}
        <header className="text-center mb-10 p-6 rounded-sm shadow-md bg-white">
          <h1 className="text-3xl font-extrabold text-[#0F2A4A] mb-4">
            Request Expert Assistance
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Our dedicated team is ready to connect you with specialized services. Please select your area of interest from our offerings below. If your need is not listed, choose "Other" and provide a brief description.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm font-medium">
            <button onClick={() => navigate('/verticals/ACA')} className="px-3 cursor-pointer py-1 bg-[#ECE0C6] text-[#0F2A4A] rounded-full shadow-sm">ACA (Affordable Care Act)</button>
            <button onClick={() => navigate('/verticals/FE')} className="px-3 cursor-pointer py-1 bg-[#ECE0C6] text-[#0F2A4A] rounded-full shadow-sm">Final Expense</button>
            <button onClick={() => navigate('/verticals/SSDI')} className="px-3 cursor-pointer py-1 bg-[#ECE0C6] text-[#0F2A4A] rounded-full shadow-sm">SSDI (Social Security Disability)</button>
            <button onClick={() => navigate('/verticals/Medicare')} className="px-3 cursor-pointer py-1 bg-[#ECE0C6] text-[#0F2A4A] rounded-full shadow-sm">Medicare</button>
            <button onClick={() => navigate('/verticals/AutoInsurance')} className="px-3 cursor-pointer py-1 bg-[#ECE0C6] text-[#0F2A4A] rounded-full shadow-sm">Auto Insurance</button>
          </div>
        </header>

        {/* --- Form Card --- */}
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-sm shadow-2xl hover:shadow-cyan-500/50 transition duration-300">
          <h2 className="text-2xl font-bold text-[#0F2A4A] mb-6 border-b-2 border-cyan-500 pb-2">
            Lead Query Form
          </h2>

          {/* Alert Message */}
          {alert && (
            <div className={`p-4 mb-4 rounded font-medium transition duration-300 ${alert.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Full Name */}
              <FormField
                label="Full Name"
                name="fullName"
                required
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />

              {/* Email */}
              <FormField
                label="Email Address"
                name="email"
                type="email"
                required
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />

              {/* Phone */}
              <FormField
                label="Phone Number (10 Digits)"
                name="phone"
                type="tel"
                required
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />

              {/* Preferred Contact (Defaults to Phone, no Select... option) */}
              <FormField
                label="Preferred Contact Method"
                name="preferredContact"
                isSelect
                options={[
                  { value: 'Phone', label: 'Phone' },
                  { value: 'Email', label: 'Email' }
                ]}
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            </div>

            {/* Address (Optional) */}
            <FormField
              label="Address (Optional)"
              name="address"
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />

            {/* Service Type Dropdown (NOW REQUIRED) */}
            <FormField
              label="Desired Service Type"
              name="serviceType"
              isSelect
              required={true} // <-- Field is now required
              options={[
                { value: 'ACA', label: 'Affordable Care Act (ACA)' },
                { value: 'FE', label: 'Final Expense' },
                { value: 'SSDI', label: 'Social Security Disability Insurance (SSDI)' },
                { value: 'MEDICARE', label: 'Medicare' },
                { value: 'AUTO_INSURANCE', label: 'Auto Insurance' },
                { value: 'OTHER', label: 'Other (Please specify below)' }
              ]}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />

            {/* --- Conditional Fields for "Other" --- */}
            {isOtherService && (
              <div className="bg-gray-100 p-4 rounded-sm mb-4 border border-cyan-200 transition-all duration-300">
                <h3 className="text-lg font-semibold text-[#0F2A4A] mb-3">Specify 'Other' Service Details</h3>

                {/* Other Service Name (still required) */}
                <FormField
                  label="Other Service Name"
                  name="otherServiceName"
                  required
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>
            )}

            {/* Description (Combined Field - Label and Required status change based on serviceType) */}
            <FormField
              label={descriptionLabel}
              name="description"
              type="textarea"
              rows={isOtherService ? 3 : 4}
              required={descriptionRequired}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            >
              <p className={`text-xs mt-1 ${descriptionCharacterCount > MAX_CHARACTER_COUNT ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                Character Count: {descriptionCharacterCount}/{MAX_CHARACTER_COUNT}
              </p>
            </FormField>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-3 mt-6 text-lg font-semibold rounded shadow-lg transition duration-200
                flex items-center justify-center
                ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#0F2A4A] text-white hover:bg-cyan-500 hover:shadow-xl hover:shadow-[#A67C37]/50 focus:outline-none focus:ring-4 focus:ring-[#ECE0C6]'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Query;
