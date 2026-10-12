import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Add this import
// ... other imports
import { Send, MessageSquare, Minimize, X } from "lucide-react";

// --- Configuration ---
const PRIMARY_COLOR = "bg-indigo-600";
const HOVER_COLOR = "hover:bg-indigo-700";
const ACCENT_COLOR = "bg-teal-100";
const ACCENT_TEXT_COLOR = "text-teal-800";
const BOT_MESSAGE_COLOR = "bg-gray-100";
const USER_MESSAGE_COLOR = "bg-indigo-600";
const TYPING_DELAY_MS = 1000; // 1 second delay

const questionsList = [
    { q: "How do I submit a request?", a: "To submit a request, please navigate to the 'Query' form in the main menu, fill out the required details accurately, and click the 'Submit' button at the bottom. **Our streamlined process ensures your needs are captured efficiently from the start.**" },
    { q: "What services do you provide?", a: "We proudly offer assistance with several insurance and benefit programs, including **ACA** (Affordable Care Act), **FE** (Final Expense), **SSDI** (Social Security Disability Insurance), **Medicare**, Auto Insurance, and various other specialized programs. **Our portfolio is designed to cover high-demand verticals.**" },
    { q: "Can I track my request?", a: "Currently, we don't offer real-time tracking via this widget. However, you will immediately receive an email confirmation once a new lead or request has been successfully generated. **This confirmation serves as proof of immediate activation and processing.**" },
    { q: "What are your operating hours?", a: "Our support team is available from **9 AM to 5 PM EST, Monday through Friday**. Outside these hours, you can still submit a query. **We ensure that every submission is addressed promptly at the start of the next business day.**" },
    { q: "Do you offer customer support?", a: "Yes, we offer comprehensive customer support. If your question isn't answered here, you can submit a manual query and we'll connect you with a live agent. **We prioritize prompt and effective resolution for all client inquiries.**" },
    { q: "What is the company's experience in the industry?", a: "TruLeads LLC has been successfully **publishing high-intent connections for 1.5 years**. **This specialized experience has allowed us to refine our systems for maximum quality and compliance in the live transfer space.**" },
    { q: "What U.S. geographic areas do you cover?", a: "We have the infrastructure and capacity to **dial and source high-quality connections across all 50 states in the U.S.**, ensuring comprehensive coverage regardless of your preferred market. **This nationwide scope provides unmatched flexibility for your campaigns.**" }
];
// ---------------------

// Typing Animation Component (Modern WhatsApp style dots)
const TypingIndicator = () => (
    <div className={`flex items-center space-x-1 ${BOT_MESSAGE_COLOR} text-gray-800 p-3 rounded-xl rounded-tl-sm shadow-sm max-w-fit`}>
        <p className="font-medium text-indigo-600 mb-1">Lucy AI</p>
        <div className="flex space-x-0.5 ml-2">
            <motion.div
                className="h-2 w-2 rounded-full bg-gray-500"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
            />
            <motion.div
                className="h-2 w-2 rounded-full bg-gray-500"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
            />
            <motion.div
                className="h-2 w-2 rounded-full bg-gray-500"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
            />
        </div>
    </div>
);


export default function LucyAI() {
    const [open, setOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [askedQuestions, setAskedQuestions] = useState([]);
    const [responses, setResponses] = useState([{ user: "", ai: "👋 Hey there! How can I assist you today?" }]);
    const [userInput, setUserInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const chatBodyRef = useRef(null);

    const navigate = useNavigate(); // Initialize useNavigate

    // Auto-scroll to the bottom of the chat when responses or typing state changes
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [responses, isTyping]);

    // Redirects to the Query form and closes the chat
    const redirectToQueryForm = () => {
    setOpen(false);
    navigate('/query');
   };

    // Handles user-typed input (Manual Query)
    const handleSendMessage = (text) => {
        if (text.trim() === "" || isTyping) return;

        // 1. Add ONLY the user message immediately
        const userMessage = { user: text, ai: null };
        setResponses((prev) => [...prev, userMessage]);
        setUserInput("");

        // 2. Set typing indicator
        setIsTyping(true);

        // 3. Simulate AI delay and add ONLY the AI response
        setTimeout(() => {
            const aiResponse = `I will connect you to a **Human Agent** now.`;
            setResponses((prev) => [
                ...prev,
                // FIX: Only add the AI response (user is null) to prevent double entry
                { user: null, ai: aiResponse, isManual: true }
            ]);
            setIsTyping(false);
        }, TYPING_DELAY_MS);
    };

    // Handles clicking a predefined question
    const handleQuestionClick = (q) => {
        if (isTyping) return;

        // 1. Add ONLY the user message immediately
        const userMessage = { user: q.q, ai: null };
        setResponses((prev) => [...prev, userMessage]);
        setAskedQuestions((prev) => [...prev, q.q]);

        // 2. Set typing indicator
        setIsTyping(true);

        // 3. Simulate AI delay and add ONLY the AI response
        setTimeout(() => {
            setResponses((prev) => [
                ...prev,
                // FIX: Only add the AI response (user is null) to prevent double entry
                { user: null, ai: q.a, isQuestion: true }
            ]);
            setIsTyping(false);
        }, TYPING_DELAY_MS);
    };

    const remainingQuestions = questionsList.filter(q => !askedQuestions.includes(q.q));
    const hasRemainingQuestions = remainingQuestions.length > 0;

    return (
        <>
            {/* Floating AI Widget (Same x, y, z coordinates - bottom-5 right-5, z-50) */}
            {open && (
                <motion.div
                    // Height is now h-[80%] for responsive resizing
                    className="fixed bottom-5 right-5 w-80 h-[80%] bg-white shadow-2xl rounded-xl flex flex-col z-50 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Header */}
                    <div className={`flex justify-between items-center p-4 ${PRIMARY_COLOR} text-white rounded-t-xl shadow-md`}>
                        <div className="flex items-center space-x-2">
                            <MessageSquare size={20} />
                            <span className="font-semibold text-lg">LUCY AI Chat</span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => { setOpen(false); setMinimized(true); }}
                                className="p-1 rounded-full hover:bg-white/20 transition duration-150"
                                aria-label="Minimize Chat"
                            >
                                <Minimize size={18} />
                            </button>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-1 rounded-full hover:bg-white/20 transition duration-150"
                                aria-label="Close Chat"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Chat Body */}
                    <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                        {responses.map((r, idx) => (
                            <div key={idx}>
                                {/* User Message Bubble */}
                                {r.user && (
                                    <div className="flex justify-end">
                                        <div className={`max-w-[80%] ${USER_MESSAGE_COLOR} text-white p-3 rounded-xl rounded-br-sm shadow-md`}>
                                            <p>{r.user}</p>
                                        </div>
                                    </div>
                                )}

                                {/* AI Message Bubble */}
                                {r.ai && (
                                    <div className="flex justify-start mt-2">
                                        <div className={`max-w-[80%] ${BOT_MESSAGE_COLOR} text-gray-800 p-3 rounded-xl rounded-tl-sm shadow-sm`}>
                                            <p className="font-medium text-indigo-600 mb-1">Lucy AI</p>

                                            {/* AI Text Response */}
                                            <p className={r.isManual ? 'font-bold text-red-600' : ''} dangerouslySetInnerHTML={{ __html: r.ai.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                                            {/* Contact Us Button (Conditionally render only for manual/human agent messages) */}
                                            {r.isManual && (
                                                <button
                                                    onClick={() =>redirectToQueryForm()}
                                                    // Modern Tailwind Styles
                                                    className={`mt-3 ${PRIMARY_COLOR} text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-150 ${HOVER_COLOR}`}
                                                >
                                                    Connect to an Agent
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start mt-2">
                                <TypingIndicator />
                            </div>
                        )}

                        {/* Suggested Questions (Dynamic - Excludes asked questions) */}
                        {!isTyping && hasRemainingQuestions && (
                            <div className="mt-4 pt-2 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-2 font-semibold">Need more help? Try these:</p>
                                <div className="flex flex-wrap gap-2">
                                    {remainingQuestions.map((q, idx) => (
                                        <button
                                            key={idx}
                                            // --- MODIFIED CLASS STYLES BELOW ---
                                            className={`text-sm ${ACCENT_COLOR} ${ACCENT_TEXT_COLOR} px-3 py-1.5 
                                 rounded-l-none rounded-r-full 
                                 transition duration-150 ease-in-out hover:shadow-md border border-teal-300 
                                 text-left flex-grow max-w-full`}
                                            // rounded-l-none: ensures sharp left corners.
                                            // rounded-r-full: creates a pill shape on the right corners.
                                            // ------------------------------------
                                            onClick={() => handleQuestionClick(q)}
                                            disabled={isTyping}
                                        >
                                            {q.q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Input */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') handleSendMessage(userInput);
                                }}
                                placeholder="Type your question..."
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                disabled={isTyping}
                            />
                            <button
                                onClick={() => handleSendMessage(userInput)}
                                disabled={userInput.trim() === "" || isTyping}
                                className={`p-3 rounded-full text-white ${PRIMARY_COLOR} ${HOVER_COLOR} transition duration-150 disabled:bg-gray-400`}
                                aria-label="Send Message"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Default circular button when minimized or closed */}
            {(!open || minimized) && (
                <motion.button
                    className={`fixed bottom-5 right-5 z-50 ${PRIMARY_COLOR} text-white p-4 rounded-full shadow-xl transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer`}
                    onClick={() => { setOpen(true); setMinimized(false); }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    aria-label="Open Chatbot"
                >
                    <MessageSquare size={24} />
                </motion.button>
            )}
        </>
    );
}