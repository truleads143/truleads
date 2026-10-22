import React, { useState, useEffect } from 'react';
import { Check, Shield, Phone, DollarSign, User, Calendar, FileText, AlertCircle, Send, RotateCcw, MapPin } from 'lucide-react';
import axios from "axios"

export default function ACASubsidyForm() {
    const MIN_INCOME = 5000;
    const MAX_INCOME = 50000;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        income: 20000, // Default to 20000rs as requested
        zipcode: '', // New field
        state: '', // New field
        dob: '',
        consentMarketing: true,
        consentPrivacy: true,
        consentACA: true
    });

    const [errors, setErrors] = useState({});
    const [age, setAge] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [referenceId, setReferenceId] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false); 
    const [isSubmitting, setIsSubmitting] = useState(false); // 👈 NEW

    const API_BASE_URL = 'http://localhost:3000'; 

    const calculateAgeReturn = (dateString) => {
        if (!dateString) return null;
        
        const birthDate = new Date(dateString);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        return calculatedAge >= 0 && calculatedAge <= 120 ? calculatedAge : null;
    };

    const validateForm = (data) => {
        const newErrors = {};
        let valid = true;

        if (!data.firstName.trim()) {
            newErrors.firstName = 'Please enter your first name';
            valid = false;
        }

        if (!data.lastName.trim()) {
            newErrors.lastName = 'Please enter your last name';
            valid = false;
        }

        const digitsOnly = data.phone.replace(/\D/g, '');
        if (!digitsOnly || digitsOnly.length < 10) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
            valid = false;
        }

        // New Zipcode validation (5 digits)
        const zipcodeDigits = data.zipcode.replace(/\D/g, '');
        if (!zipcodeDigits || zipcodeDigits.length !== 5) {
            newErrors.zipcode = 'Please enter a valid 5-digit Zip Code';
            valid = false;
        }

        // New State validation
        if (!data.state.trim() || data.state.trim().length < 2) {
            newErrors.state = 'Please enter your State (e.g., CA)';
            valid = false;
        }

        // Updated Income validation (using the new min/max)
        const incomeValue = Number(data.income);
        if (!incomeValue || incomeValue < MIN_INCOME || incomeValue > MAX_INCOME) {
            newErrors.income = `Annual income must be between ${MIN_INCOME} and ${MAX_INCOME} Rs.`;
            valid = false;
        }

        // Validate DOB / Age logic here
        if (!data.dob) {
             newErrors.dob = 'Please select your date of birth';
             valid = false;
        } else {
            const tempAge = calculateAgeReturn(data.dob);
            if (tempAge === null || tempAge < 18 || tempAge > 120) {
                newErrors.dob = 'Applicant must be between 18 and 120 years old.';
                valid = false;
            }
        }

        if (!data.consentMarketing || !data.consentPrivacy || !data.consentACA) {
            valid = false; 
        }

        return { valid, newErrors };
    };
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        let newValue = type === 'checkbox' ? checked : value;

        if (name === 'income') {
             newValue = Number(newValue);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
        
        setErrors(prev => ({ ...prev, [name]: '' }));
        
        if (name === 'dob') {
            const calculatedAge = calculateAgeReturn(newValue);
            setAge(calculatedAge);
        }
        
        if (submitAttempted) {
             const { valid, newErrors } = validateForm({ ...formData, [name]: newValue });
             setErrors(newErrors);
             setIsValid(valid);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setSubmitAttempted(true);
        const { valid, newErrors } = validateForm(formData);
        setErrors(newErrors);
        setIsValid(valid);

        if (!valid) {
            return;
        }
        
        const finalAge = calculateAgeReturn(formData.dob); 
        
        if (finalAge === null || finalAge < 18) {
            setErrors(prev => ({ ...prev, api: 'Invalid age/DOB. Must be 18 or older.' }));
            return;
        }

        setIsSubmitting(true); // 👈 START LOADING
        
        const refId = 'ACA-' + Math.floor(1000 + Math.random() * 9000); 
        const submissionDateISO = new Date().toISOString();

        setReferenceId(refId); 
        
        const payload = {
            ...formData,
            income: Number(formData.income), 
            age: finalAge, 
            referenceId: refId, 
            submissionDate: submissionDateISO 
        };

        console.log('ACA Form Submission:', payload);

        try {
            // const response = await axios.post(`${API_BASE_URL}/api/aca/generate-acasubsidy`, payload);
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            resetForm(); 
            setIsSubmitted(true);
        } catch (error) {
            console.error('Submission Error:', error);
            
            const serverErrorMessage = error.response?.data?.message || 'Submission failed: Unknown server error.';
            setErrors({ api: serverErrorMessage }); 
        } finally {
            setIsSubmitting(false); // 👈 STOP LOADING
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            income: 20000, // Reset default
            zipcode: '', // Reset
            state: '', // Reset
            dob: '',
            consentMarketing: true,
            consentPrivacy: true,
            consentACA: true
        });
        setAge(null);
        setErrors({});
        setIsSubmitted(false);
        setIsValid(false);
        setSubmitAttempted(false); 
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-5">
                <div className="w-full max-w-4xl">
                    <div className="bg-white rounded shadow-xl overflow-hidden">
                        <div className="p-16 flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-lg animate-bounce">
                                <Check className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-green-600 mb-4">Application Submitted!</h3>
                            <p className="text-gray-700 mb-2">Thank you for completing the ACA subsidy eligibility check.</p>
                            <p className="text-gray-700 mb-8">A licensed agent will contact you within 24 hours to discuss your options.</p>

                            <div className="bg-blue-50 border-2 border-dashed border-blue-500 rounded-full px-8 py-4 my-6">
                                <span className="text-blue-900 font-semibold text-lg">
                                    Reference ID: <span className="font-bold">{referenceId}</span>
                                </span>
                            </div>

                            <button
                                onClick={resetForm}
                                className="mt-6 px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all flex items-center gap-3"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Start New Submission
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-5">
            <div className="w-full max-w-4xl my-5">
                <div className="bg-white rounded shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
                    {/* Left Sidebar */}
                    <div className="md:w-2/5 bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                    <path d="M0,50 Q25,40 50,50 T100,50" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" />
                                    <path d="M0,30 Q25,20 50,30 T100,30" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" />
                                    <path d="M0,70 Q25,60 50,70 T100,70" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#wave)" />
                            </svg>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-white/15 rounded-sm flex items-center justify-center">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">ACA Health Subsidy</h2>
                                    <p className="text-sm opacity-90">Licensed Insurance Agency</p>
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold leading-tight mb-5">
                                Check Your Eligibility for Affordable Health Coverage
                            </h1>
                            <p className="opacity-90 mb-8">
                                Find out if you qualify for government subsidies that can reduce your health insurance costs by up to 80%.
                            </p>

                            <ul className="space-y-5">
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span>Lower monthly premiums</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span>Comprehensive coverage</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span>No cost for eligibility check</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span>Expert assistance with enrollment</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Form Section */}
                    <div className="flex-1 p-10">
                        <div className="mb-8 pb-5 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-blue-900 mb-2">Eligibility Check Form</h2>
                            <p className="text-gray-600">Complete this quick form to see if you qualify for ACA subsidies</p>
                        </div>

                        <div className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-800">
                                            First Name <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="Enter your first name"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                        {submitAttempted && errors.firstName && (
                                            <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-800">
                                            Last Name <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Enter your last name"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                        {submitAttempted && errors.lastName && (
                                            <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Phone & Zipcode */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-800">
                                            Phone Number <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="(555) 123-4567"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                        {submitAttempted && errors.phone && (
                                            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* New Zipcode Field */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-800">
                                            Zip Code <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="zipcode"
                                                value={formData.zipcode}
                                                onChange={handleInputChange}
                                                maxLength={5}
                                                placeholder="e.g., 90210"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                        {submitAttempted && errors.zipcode && (
                                            <p className="text-red-600 text-sm mt-1">{errors.zipcode}</p>
                                        )}
                                    </div>
                                </div>

                                {/* State & Date of Birth */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* New State Field */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-800">
                                            State <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                maxLength={2}
                                                placeholder="e.g., CA"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:bg-white transition-all uppercase"
                                            />
                                        </div>
                                        {submitAttempted && errors.state && (
                                            <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                                        )}
                                    </div>

                                    {/* Date of Birth Field */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-800">
                                            Date of Birth <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleInputChange}
                                                max={getTodayDate()}
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                        {submitAttempted && errors.dob && (
                                            <p className="text-red-600 text-sm mt-1">{errors.dob}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Income Slider */}
                                <div>
                                    <label className=" mb-2 font-semibold text-gray-800 flex justify-between items-end">
                                        <span>Annual Income <span className="text-red-600">*</span></span>
                                        <span className="text-xl font-bold text-blue-700">
                                            {formatCurrency(formData.income)}
                                        </span>
                                    </label>
                                    <div className="relative p-3 bg-gray-50 border-2 border-gray-200 rounded">
                                        <input
                                            type="range"
                                            name="income"
                                            min={MIN_INCOME}
                                            max={MAX_INCOME}
                                            step="1000"
                                            value={formData.income}
                                            onChange={handleInputChange}
                                            className="w-full h-2 bg-blue-200 rounded appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-blue-300 [&::-webkit-slider-runnable-track]:rounded"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                            <span>{formatCurrency(MIN_INCOME)}</span>
                                            <span>{formatCurrency(MAX_INCOME)}</span>
                                        </div>
                                    </div>
                                    {submitAttempted && errors.income && (
                                        <p className="text-red-600 text-sm mt-1">{errors.income}</p>
                                    )}
                                </div>

                                {/* Age Display */}
                                <div>
                                    <div className={`bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded p-5 text-center transition-all ${age !== null ? 'animate-pulse' : ''}`}>
                                        <div className="text-sm text-gray-600 mb-1">Your Calculated Age</div>
                                        <div className="text-4xl font-bold text-blue-900">
                                            {age !== null ? age : '--'}
                                        </div>
                                        <div className="text-gray-600 font-medium">years old (Must be 18+)</div>
                                    </div>
                                </div>

                                {/* Consent Section */}
                                <div className="bg-gray-50 rounded p-6 border-l-4 border-blue-700">
                                    <div className="flex items-center mb-5">
                                        <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center mr-4">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-blue-900">Consent & Authorization</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className={`flex items-start p-4 bg-white rounded border transition-all ${formData.consentMarketing ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200'}`}>
                                            <input
                                                type="checkbox"
                                                name="consentMarketing"
                                                checked={formData.consentMarketing}
                                                onChange={handleInputChange}
                                                className="mt-1 mr-4 w-5 h-5 cursor-pointer"
                                            />
                                            <label className="flex-1 cursor-pointer text-sm leading-relaxed">
                                                <strong className="text-blue-900">Marketing Consent:</strong> I consent to receive marketing communications regarding health insurance options via phone, email, and text message. Message and data rates may apply.
                                            </label>
                                        </div>

                                        <div className={`flex items-start p-4 bg-white rounded border transition-all ${formData.consentPrivacy ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200'}`}>
                                            <input
                                                type="checkbox"
                                                name="consentPrivacy"
                                                checked={formData.consentPrivacy}
                                                onChange={handleInputChange}
                                                className="mt-1 mr-4 w-5 h-5 cursor-pointer"
                                            />
                                            <label className="flex-1 cursor-pointer text-sm leading-relaxed">
                                                <strong className="text-blue-900">Privacy Policy:</strong> I have read and agree to the <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 font-semibold hover:underline">Terms of Service</a>.
                                            </label>
                                        </div>

                                        <div className={`flex items-start p-4 bg-white rounded border transition-all ${formData.consentACA ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200'}`}>
                                            <input
                                                type="checkbox"
                                                name="consentACA"
                                                checked={formData.consentACA}
                                                onChange={handleInputChange}
                                                className="mt-1 mr-4 w-5 h-5 cursor-pointer"
                                            />
                                            <label className="flex-1 cursor-pointer text-sm leading-relaxed">
                                                <strong className="text-blue-900">Authorization:</strong> I authorize ACA Health Subsidy Plan to check my eligibility for ACA subsidies and provide me with available plan options.
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Disclaimer */}
                                <div className="bg-yellow-50 rounded p-5 border-l-4 border-yellow-400">
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-yellow-700 mr-3 mt-0.5 flex-shrink-0" />
                                        <div className="text-sm leading-relaxed">
                                            <strong>Important Disclaimer:</strong> ACA Health Subsidy Plan is a licensed insurance agency, not a government agency. We provide free assistance with ACA Marketplace enrollment. Subsidy amounts are estimates based on the information provided and may change upon official application.
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Section */}
                                <div className="text-center pt-6 border-t border-gray-200">
                                    {submitAttempted && errors.api && (
                                        <p className="text-red-600 text-sm mb-4 bg-red-100 p-2 rounded">{errors.api}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting} // 👈 prevent multiple clicks
                                        className={`px-11 py-4 rounded-full font-semibold text-white transition-all flex items-center justify-center gap-3 mx-auto shadow-lg ${
                                            isSubmitting
                                                ? 'bg-blue-400 cursor-wait'
                                                : (isValid || !submitAttempted
                                                    ? 'bg-gradient-to-r from-blue-700 to-blue-500 hover:-translate-y-1 hover:shadow-xl'
                                                    : 'bg-gray-400 cursor-not-allowed')
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Send className="w-5 h-5 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Submit Eligibility Check
                                            </>
                                        )}
                                    </button>
                                    <p className="mt-4 text-sm text-gray-600">
                                        All fields marked with <span className="text-red-600">*</span> are required
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
