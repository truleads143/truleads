import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function InsuranceForm() {
  const [leadTrackingId, setLeadTrackingId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission

  useEffect(() => {
    // Prevent duplicate injection if script already exists (e.g. on re-render / hot reload)
    if (document.getElementById("LeadiDscript_campaign")) return;

    const script = document.createElement("script");
    script.id = "LeadiDscript_campaign";
    script.async = true;
    // Use explicit https: — protocol-relative URLs (//...) can fail or be blocked on mobile browsers
    script.src =
      "https://create.lidstatic.com/campaign/88f38970-ed1c-9495-5610-8e53a95964c3.js?snippet_version=2";

    // Inject into <head> instead of <body> — mobile browsers (especially iOS Safari)
    // are stricter about script execution context and timing in the body
    document.head.appendChild(script);

    // Catch load failures (e.g. ad blockers, network issues on mobile)
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

    // Mobile-friendly triggers
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

    // Clear localStorage except preserved key
    Object.keys(localStorage).forEach((key) => {
      if (key !== PRESERVE_KEY) {
        localStorage.removeItem(key);
      }
    });

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
    });

    // Clear cache storage (best effort)
    if (window.caches) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
  };

  const handleReactivateSession = () => {
    clearTrackingData();
    setIsSubmitted(false); // Reset submission state
    setFormData({
      firstName: "",
      lastName: "",
      zipCode: "",
      countryCode: "+1",
      phoneNumber: "",
      dateOfBirth: "",
      age: "",
      salary: 16000,
      insuranceProvider: "",
      state: "",
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
    salary: 16000,
    insuranceProvider: '',
    state: '',
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
      // Only allow numbers and limit to 10 digits
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          phoneNumber: numbersOnly
        }));
      }
    }
    else if (name === "zipCode") {
      // Only allow numbers and limit to 5 digits
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 5) {
        setFormData(prev => ({
          ...prev,
          zipCode: numbersOnly
        }));
      }
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

  const formatSalary = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
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

    if (!formData.consent) {
      setError("Please accept the terms and conditions.");
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
        salary: formData.salary,
        insuranceProvider: formData.insuranceProvider,
        state: formData.state,
        consent: formData.consent,
        leadTrackingId: leadTrackingId || "MOBILE"
      };

      const { data } = await axios.post(
        `${API_BASE_URL}/api/insurance`,
        payload,
        { withCredentials: true }
      );

      // 🔥 Google Ads conversion (ONLY on successful submit)
      if (window.gtag_report_conversion) {
        window.gtag_report_conversion();
      }

      // Dialics enrichment call before marking as submitted
      const dialicsUrl1 = `https://api-service.dialics.com/api/enrichment-data/1280133e-a70b-4080-8a1b-3d597200a99b?callerId=${formData.countryCode}${formData.phoneNumber}&first_name=${formData.firstName}&last_name=${formData.lastName}&zip_code=${formData.zipCode}&state=${formData.state}`;

      const dialicsUrl2 = `https://api-service.dialics.com/api/enrichment-data/1280133e-a70b-4080-8a1b-3d597200a99b?callerId=${formData.countryCode}${formData.phoneNumber}&first_name=${formData.firstName}&last_name=${formData.lastName}&date_of_birth=${formData.dateOfBirth}&age=${formData.age}&zip_code=${formData.zipCode}&state=${formData.state}`;

      const [dialicsRes1, dialicsRes2] = await Promise.all([
        fetch(dialicsUrl1),
        fetch(dialicsUrl2)
      ]);

      if (!dialicsRes1.ok || !dialicsRes2.ok) {
        throw new Error("One or more Dialics API calls failed");
      }

      const [dialicsData1, dialicsData2] = await Promise.all([
        dialicsRes1.json(),
        dialicsRes2.json()
      ]);

      console.log("Lead sent to Dialics (call 1)", dialicsData1);
      console.log("Lead sent to Dialics (call 2)", dialicsData2);

      // Only mark as submitted if both Dialics calls succeeded
      setIsSubmitted(true);
      clearTrackingData();

    } catch (err) {
      console.error("Submit error:", err);

      if (err.response) {
        setError(err.response.data?.message || "Something went wrong");
      } else if (err.request) {
        setError("No response from server. Please try again.");
      } else {
        setError(err.message || "Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Thank You Screen
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
                We'll be in touch with you shortly to discuss your health insurance options.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
              <p className="text-white text-lg mb-2">
                Need immediate assistance?
              </p>
              <a
                href="tel:+12102456181"
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

  // Original Form
  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column - Call to Action */}
          <div className="relative bg-linear-to-br from-[#124D95] to-[#0a2647] p-6 sm:p-8 md:p-12 order-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                See If You Qualify For<br />
                <span className="text-cyan-400">Low or $0</span> Health<br />
                Coverage
              </h2>
            </div>

            <div className="relative z-10 space-y-4 sm:space-y-6">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-cyan-300 font-semibold text-base sm:text-lg mb-1">
                      IMPACT YOUR FAMILY'S HEALTH NOW
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Learn the coverages your family needs to make certain you gain access to the best healthcare for you.
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
                      SET YOURSELVES UP FOR A BETTER TOMORROW
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      See how you can protect your family's financial futures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
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

              {/* Salary Range Slider */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Salary: <span className="text-blue-600 font-semibold">{formatSalary(formData.salary)}</span>
                </label>
                <input
                  type="range"
                  name="salary"
                  min="16000"
                  max="50000"
                  step="1000"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((formData.salary - 16000) / (50000 - 16000)) * 100}%, #e5e7eb ${((formData.salary - 16000) / (50000 - 16000)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$16,000</span>
                  <span>$50,000</span>
                </div>
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
                    By selecting check box, you represent that you are 18+ years of age and agree to the{' '}
                    <Link to="/privacy" className="text-red-500 underline hover:text-red-600">Privacy Policy</Link>.
                    By selecting the above check box "you agree by your electronic signature that you give
                    express written consent to receive marketing communications regarding insurance products and
                    services from{' '}
                    <a href="https://www.truhealthinsurance.com" target='_blank' rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">TruHealthInsurance </a>
                    at the phone
                    number provided by you, including wireless numbers, if applicable, even if you have previously
                    registered the provided number on the Do Not Call Registry. SMS/MMS and data messaging rates
                    may apply.<span className='text-red-500'> *</span> By selecting the above check box you give your electronic signature and provide
                    your express written consent via this chat / webform to receive marketing communications
                    regarding insurance products and services via live, automated dialing system telephone call
                    Artificial Voice and Pre-recorded voice and/or Text interaction for a licensed sales agent
                    associated with{' '}
                    <a href="https://www.truhealthinsurance.com" target='_blank' rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">TruHealthInsurance</a> and one or more of its
                    marketing partners at the phone number provided by you, including wireless numbers, if applicable,
                    even if you have previously registered the provided number on the Do Not Call Registry. Carrier call
                    rates may apply. Your consent is not required to get a quote or purchase. Your consent can be revoked
                    at any time for any reason by contacting us at{' '}
                    <a href="mailto:info@truhealthinsurance.com" className="text-blue-600 underline hover:text-blue-700">info@truhealthinsurance.com</a>. TCPA LeadID's
                    are used with the information for compliance.
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