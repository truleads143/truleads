import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function InsuranceForm() {
  const [leadTrackingId, setLeadTrackingId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    if (document.getElementById("LeadiDscript_campaign")) return;

    const script = document.createElement("script");
    script.id = "LeadiDscript_campaign";
    script.async = true;
    script.src =
      "https://create.lidstatic.com/campaign/4412a355-3a72-433d-f865-b27c3d264f2a.js?snippet_version=2";

    document.head.appendChild(script);

    script.onerror = () => {
      console.error('❌ LeadID script failed to load');
    };

    return () => {
      const existingScript = document.getElementById("LeadiDscript_campaign");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    let attempts = 0;
    const maxAttempts = 60;

    const startPolling = () => {
      if (interval) return;

      interval = setInterval(() => {
        attempts++;

        if (window.LeadiD?.token) {
          setLeadTrackingId(window.LeadiD.token);
          clearInterval(interval);
        }

        if (attempts >= maxAttempts) {
          clearInterval(interval);
          console.warn("❌ LeadID timeout");
        }
      }, 500);
    };

    window.addEventListener("touchstart", startPolling, { once: true });
    window.addEventListener("scroll", startPolling, { once: true });
    window.addEventListener("click", startPolling, { once: true });

    return () => {
      window.removeEventListener("touchstart", startPolling);
      window.removeEventListener("scroll", startPolling);
      window.removeEventListener("click", startPolling);
      if (interval) clearInterval(interval);
    };
  }, []);

  const clearTrackingData = () => {
    const NS = "dashboard_v1";
    const PRESERVE_KEY = `${NS}:inProgressEntries`;

    Object.keys(localStorage).forEach((key) => {
      if (key !== PRESERVE_KEY) {
        localStorage.removeItem(key);
      }
    });

    sessionStorage.clear();

    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
    });

    if (window.caches) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
  };

  const handleReactivateSession = () => {
    clearTrackingData();
    setIsSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      zipCode: "",
      countryCode: "+1",
      phoneNumber: "",
      dateOfBirth: "",
      age: "",
      insuranceProvider: "",
      state: "",
      isOwnerOfHouse: null,
      currentlyInsured: null,
      lookingToSwitch: null,
      consent: false
    });
    setError("");
    window.location.reload();
  };

  useEffect(() => {
    // console.log('📊 leadTrackingId state changed to:', leadTrackingId);
  }, [leadTrackingId]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    countryCode: '+1',
    phoneNumber: '',
    dateOfBirth: '',
    age: '',
    insuranceProvider: '',
    state: '',
    isOwnerOfHouse: null,
    currentlyInsured: null,
    lookingToSwitch: null,
    consent: false
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const usStates = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
    { code: 'DC', name: 'Washington D.C.' }
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "dateOfBirth") {
      const age = calculateAge(value);

      setFormData(prev => ({
        ...prev,
        dateOfBirth: value,
        age: age >= 0 ? age : ""
      }));
    } 
    else if (name === "phoneNumber") {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          phoneNumber: numbersOnly
        }));
      }
    }
    else if (name === "zipCode") {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 5) {
        setFormData(prev => ({
          ...prev,
          zipCode: numbersOnly
        }));
      }
    }
    else if (name === "currentlyInsured" || name === "lookingToSwitch" || name == "isOwnerOfHouse") {
      setFormData(prev => ({
        ...prev,
        [name]: value === "true"
      }));
    }
    else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = async () => {
    setError("");
    
    if (!formData.firstName || !formData.phoneNumber || !formData.state || !formData.zipCode) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.zipCode.length !== 5) {
      setError("Zip code must be exactly 5 digits.");
      return;
    }

    if (formData.age < 18) {
      setError("You must be at least 18 years old.");
      return;
    }

    if (formData.currentlyInsured === null) {
      setError("Please select if you are currently insured.");
      return;
    }

    if (formData.lookingToSwitch === null) {
      setError("Please select if you are looking to switch for lower rates.");
      return;
    }

    if (!formData.consent) {
      setError("Please accept the terms and conditions.");
      return;
    }

    if (formData.isOwnerOfHouse === '') {
      setError("Please select if you are a homeowner.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        zipCode: formData.zipCode,
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        age: formData.age,
        insuranceProvider: formData.insuranceProvider,
        state: formData.state,
        isOwnerOfHouse: formData.isOwnerOfHouse, // new field added
        currentlyInsured: formData.currentlyInsured,
        lookingToSwitchForLowerRates: formData.lookingToSwitch,
        consent: formData.consent,
        leadTrackingId: leadTrackingId || "MOBILE"
      };

      const { data } = await axios.post(
        `${API_BASE_URL}/api/insurance`,
        payload,
        { withCredentials: true }
      );

      if (window.gtag_report_conversion) {
        window.gtag_report_conversion();
      }

      setIsSubmitted(true);
      clearTrackingData();

    } catch (err) {
      console.error("Submit error:", err);

      if (err.response) {
        setError(err.response.data?.message || "Something went wrong");
      } else if (err.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-3 sm:px-4 flex items-center justify-center">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-linear-to-br from-[#124D95] to-[#0a2647] p-8 sm:p-12 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-cyan-400/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Thank You!
              </h1>
              <p className="text-xl text-cyan-300 mb-2">
                Your form has been submitted successfully
              </p>
              <p className="text-gray-300">
                We'll be in touch with you shortly to discuss your autoinsurance options.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
              <p className="text-white text-lg mb-2">
                Need immediate assistance?
              </p>
              <a
                href="tel:+12102456181 "
                className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors duration-300 inline-flex items-center gap-2"
              >
                +1 2102456181 
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>

            <button
              onClick={handleReactivateSession}
              className="w-full max-w-md mx-auto font-bold py-4 px-6 rounded transition duration-200 text-lg bg-cyan-400 hover:bg-cyan-500 text-[#0a2647]"
            >
              Submit Another Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="relative bg-linear-to-br from-[#124D95] to-[#0a2647] p-6 sm:p-8 md:p-12 order-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                See If You Qualify For<br />
                <span className="text-cyan-400">Low-Cost</span><br />
                Auto Insurance Coverage
              </h2>
            </div>

            <div className="relative z-10 space-y-4 sm:space-y-6">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-cyan-300 font-semibold text-base sm:text-lg mb-1">
                      Collision Coverage
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Pays for damage to your vehicle from collisions with other cars, objects, or if your car rolls over.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 3v18M5 7h14M7 7l-2 5h4l-2-5zm10 0l-2 5h4l-2-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-cyan-300 font-semibold text-base sm:text-lg mb-1">
                     Liability Coverage
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Required by law in most states. Covers damages to other vehicles and injuries to other people when you're at fault.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-cyan-300 font-semibold text-base sm:text-lg mb-1">
                     Personal Injury Protection
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Covers medical expenses, lost wages, and other benefits for you and your passengers regardless of fault.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 sm:p-8 md:p-12 order-2">
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  required
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 sm:gap-2">
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    name="countryCode"
                    value="+1"
                    disabled
                    className="w-16 sm:w-16 px-2 sm:px-2 py-2.5 sm:py-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed text-xs sm:text-base text-center font-medium"
                  />
                  <input
                    type="tel"
                    required
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    maxLength="10"
                    className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <select
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white"
                >
                  <option value="">Select State</option>
                  {usStates.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  required
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  maxLength="5"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="date"
                  required
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  readOnly
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed text-sm sm:text-base"
                />
              </div>

              {/* Currently Insured Field */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currently insured? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="currentlyInsured"
                      value="true"
                      checked={formData.currentlyInsured === true}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer w-4 h-4"
                    />
                    <span className="text-sm sm:text-base">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="currentlyInsured"
                      value="false"
                      checked={formData.currentlyInsured === false}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer w-4 h-4"
                    />
                    <span className="text-sm sm:text-base">No</span>
                  </label>
                </div>
              </div>

              {/* Looking to Switch Field */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Looking to switch for lower rates? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="lookingToSwitch"
                      value="true"
                      checked={formData.lookingToSwitch === true}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer w-4 h-4"
                    />
                    <span className="text-sm sm:text-base">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="lookingToSwitch"
                      value="false"
                      checked={formData.lookingToSwitch === false}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer w-4 h-4"
                    />
                    <span className="text-sm sm:text-base">No</span>
                  </label>
                </div>
              </div>

              {/* is owner of house Field */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you a homeowner? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isOwnerOfHouse"
                      value="true"
                      checked={formData.isOwnerOfHouse === true}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer w-4 h-4"
                    />
                    <span className="text-sm sm:text-base">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isOwnerOfHouse"
                      value="false"
                      checked={formData.isOwnerOfHouse === false}
                      onChange={handleChange}
                      className="mr-2 cursor-pointer w-4 h-4"
                    />
                    <span className="text-sm sm:text-base">No</span>
                  </label>
                </div>
              </div>

              <div className="text-xs sm:text-xs text-gray-600 space-y-2">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 sm:mt-1 mr-2 shrink-0 cursor-pointer w-4 h-4"
                  />
                  <span className="leading-relaxed">
                    By selecting this checkbox, you confirm that you are 18 years of age or older and agree to the{' '}
                    <Link to="/privacy" className="text-red-500 underline hover:text-red-600">
                      Privacy Policy
                    </Link>.
                    
                    By checking this box, you provide your electronic signature and give express written consent to receive
                    marketing communications regarding auto insurance products and services from{' '}
                    <a
                      href="https://www.truautoinsurify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-700"
                    >
                      TruAutoInsurance
                    </a>{' '}
                    and its marketing partners at the phone number you provide, including wireless numbers if applicable.
                    
                    This may include live calls, automated dialing systems, artificial or pre-recorded voice messages,
                    and SMS/text messages, even if your number is listed on a federal or state Do Not Call Registry.
                    Message and data rates may apply.<span className="text-red-500"> *</span>
                    
                    Your consent is not required to obtain a quote or purchase auto insurance coverage.
                    You may revoke your consent at any time by contacting us at{' '}
                    <a
                      href="mailto:connect@truleads.agency"
                      className="text-blue-600 underline hover:text-blue-700"
                    >
                      connect@truleads.agency
                    </a>.
                    
                    TCPA LeadIDs are used for compliance and record-keeping purposes.
                  </span>

                </label>
              </div>

              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full font-bold py-3 sm:py-4 px-6 rounded transition duration-200 text-base sm:text-lg
                  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-[#0d3768] via-[#124D95] to-[#0d3768] text-white hover:opacity-90"}
                `}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}