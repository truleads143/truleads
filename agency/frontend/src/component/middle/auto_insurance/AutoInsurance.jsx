import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// You might want to use a more specific icon from a library like Heroicons
// For simplicity, using a basic SVG path here.
const CarIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        className="w-20 h-20 text-[#A67C37] opacity-80 mb-6 mx-auto"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25a9 9 0 00-9-9H9.375A.375.375 0 009 3.375v1.875m-4.5 0h7.5m-7.5 0c1.542 0 2.97.609 4.045 1.684M12 10.5h.008v.008H12V10.5zm.375 0h.008v.008h-.008V10.5zm.375 0h.008v.008h-.008V10.5z" 
        />
    </svg>
);

const AutoInsuranceComingSoon = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'submitting'

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNotifyMe = async (e) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        // Basic email validation
        if (!email || !email.includes('@') || !email.includes('.')) {
            setSubmissionStatus('error');
            setTimeout(() => setSubmissionStatus(null), 3000); // Clear error after 3 seconds
            return;
        }

        try {
            // Simulate API call
            // In a real application, you would send 'email' to your backend
            // Example: const response = await axios.post('/api/subscribe-auto-insurance', { email });
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

            // Assume success for this example
            setSubmissionStatus('success');
            setEmail(''); // Clear email input
            setTimeout(() => setSubmissionStatus(null), 5000); // Clear success message after 5 seconds

        } catch (error) {
            console.error("Subscription failed:", error);
            setSubmissionStatus('error');
            setTimeout(() => setSubmissionStatus(null), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex flex-col justify-center items-center text-center">
            <div className="w-full max-w-2xl bg-white p-8 sm:p-10 lg:p-12 rounded-sm shadow-xl hover:shadow-cyan-500/50 transition duration-300">

                <CarIcon /> {/* Icon for visual appeal */}

                <h1 className="text-4xl font-extrabold text-[#0F2A4A] mb-4 sm:mb-6">
                    Auto Insurance
                    <span className="block text-xl sm:text-2xl text-[#A67C37] mt-2">Coming Soon!</span>
                </h1>

                <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8">
                    We're currently fine-tuning our comprehensive auto insurance solutions to bring you the best coverage and rates.
                    Get ready for a smoother ride with unparalleled protection for your vehicle.
                </p>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#0F2A4A] mb-4">
                        Be the First to Know!
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Enter your email below to get exclusive updates and be notified the moment our auto insurance services launch.
                    </p>

                    <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            value={email}
                            onChange={handleEmailChange}
                            className="flex-grow p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ECE0C6] bg-gray-100 text-gray-800"
                            required
                        />
                        <button
                            type="submit"
                            disabled={submissionStatus === 'submitting'}
                            className={`
                                px-6 py-3 rounded text-white font-semibold transition duration-200 ease-in-out
                                flex items-center justify-center gap-2
                                ${submissionStatus === 'submitting' 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-[#A67C37] hover:bg-[#06A5C4] focus:outline-none focus:ring-2 focus:ring-[#ECE0C6]'}
                            `}
                        >
                            {submissionStatus === 'submitting' ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Notifying...
                                </>
                            ) : (
                                'Notify Me!'
                            )}
                        </button>
                    </form>

                    {submissionStatus === 'success' && (
                        <p className="mt-4 text-green-600 font-medium">Thanks! We'll keep you updated.</p>
                    )}
                    {submissionStatus === 'error' && (
                        <p className="mt-4 text-red-600 font-medium">Please enter a valid email address.</p>
                    )}
                </div>


            </div>
        </div>
    );
};

export default AutoInsuranceComingSoon;