// ChatUIWithFeatures.jsx
import React, { useState } from "react";
import { FiSend, FiPaperclip, FiPhone, FiUpload } from "react-icons/fi";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import { contacts } from "../data/MessagesDummyData";

const Messages = () => {
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([
        { from: "Owen", text: "Hi Dr. Chen, I've been experiencing a persistent cough and some shortness of breath.", date: "Today" },
        { from: "Dr. Amelia Chen", text: "Hello", date: "Today" },
        { from: "Owen", text: "Thank you, Dr. Chen. I appreciate your prompt response.", date: "Yesterday" },
        { from: "Dr. Amelia Chen", text: "You're welcome, Owen. I'm here to help.", date: "Yesterday" },
    ]);
    const [status, setStatus] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    const sendMessage = () => {
        if (!message.trim()) return;
        setMessages([...messages, { from: selectedContact.name, text: message, date: "Today" }]);
        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    const callUser = () => alert("Calling " + selectedContact.name);
    const shareFile = () => alert("Opening file dialog");

    const filteredData = contacts.filter((contact) => {
        const matchesSearch = contact.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory =
            filterCategory === "All" ||
            contact.role.toLowerCase() + 's' === filterCategory.toLowerCase();
        const matchStatus = status ? contact.status === "unread" : true;

        return matchesSearch && matchesCategory && matchStatus;
    });

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
                    <div className="max-w-[90%] mx-auto py-8 space-y-10">
                        <div className="flex h-screen font-sans">
                            {/* Sidebar (Chat List) */}
                            <div className="w-1/4 bg-white p-4">
                                <h1 className="text-2xl font-semibold mb-6">Chat</h1>
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search by Name / UID / Role"
                                    className="w-full mb-4 p-2 rounded bg-gray-100 text-sm"
                                />
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {["All", "Patients", "Staff", "Doctors",].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilterCategory(cat)}
                                            className={`px-1 py-1 text-xs rounded-full ${filterCategory === cat
                                                ? "bg-purple-600 text-white"
                                                : "bg-purple-200 hover:bg-purple-100"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setStatus(!status)}
                                        className={`px-1 py-1 text-xs rounded-full ${status ? "bg-purple-600 text-white" : "bg-purple-200 hover:bg-purple-100"
                                            }`}
                                    >
                                        Unread
                                    </button>
                                </div>
                                {filteredData.map((contact) => (
                                    <div
                                        key={contact.id}
                                        onClick={() => setSelectedContact(contact)}
                                        className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-purple-100 ${selectedContact.id === contact.id ? "bg-purple-50" : ""
                                            }`}
                                    >
                                        <img
                                            src={`https://i.pravatar.cc/40?u=${contact.id}`}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">{contact.name}</p>
                                            <p className="text-xs text-gray-500">{contact.time}</p>
                                        </div>
                                        {contact.status === 'unread' ? <div className="w-2 h-2 bg-green-500 rounded-full"></div> : null}
                                    </div>
                                ))}
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 flex flex-col">
                                {/* Header */}
                                <div className="flex flex-col items-center py-6 ">
                                    <img
                                        src={`https://i.pravatar.cc/120?u=${selectedContact.id}`}
                                        alt="Profile"
                                        className="w-28 h-28 rounded-full object-cover mb-4"
                                    />
                                    <h2 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h2>
                                    <p className="text-sm text-gray-500">UID: 12345</p>
                                    <p className="text-sm text-purple-600 font-medium">
                                        {selectedContact.name.toLowerCase().startsWith("dr.")
                                            ? "Doctor"
                                            : selectedContact.role || "Patient"}
                                    </p>
                                </div>

                                {/* Action Buttons floated left/right */}
                                <div className="flex justify-between px-8 mt-4">
                                    
                                    <button 
                                    onClick={callUser}
                                    className="px-4 py-1 rounded-full bg-gray-100 text-sm font-medium">
                                        Call
                                    </button>
                                    <button 
                                    onClick={shareFile}
                                    className="px-4 py-1 rounded-full bg-gray-100 text-sm font-medium">
                                        Share File
                                    </button>
                                </div>



                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                                    {messages.map((msg, index) => {
                                        const isDoctor = msg.from.toLowerCase().startsWith("dr.");

                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-end gap-2 ${isDoctor ? "justify-end" : "justify-start"}`}
                                            >
                                                {!isDoctor && (
                                                    <img
                                                        src={`https://i.pravatar.cc/40?u=${msg.from}`}
                                                        alt={msg.from}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                )}

                                                <div className={`max-w-md ${isDoctor ? "text-right" : "text-left"}`}>
                                                    <p className="text-xs text-gray-500 mb-1">{msg.from}</p>
                                                    <div
                                                        className={`px-4 py-2 rounded-xl text-sm ${isDoctor
                                                                ? "bg-purple-600 text-white"
                                                                : "bg-gray-100 text-gray-900"
                                                            }`}
                                                    >
                                                        {msg.text}
                                                    </div>
                                                </div>

                                                {isDoctor && (
                                                    <img
                                                        src={`https://i.pravatar.cc/40?u=${msg.from}`}
                                                        alt={msg.from}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>


                                {/* Input */}
                                <div className="border-t p-4 flex items-center gap-2">
                                    <img
                                        src={`https://i.pravatar.cc/40?u=me`}
                                        className="w-8 h-8 rounded-full"
                                        alt="You"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 p-2 rounded bg-gray-100"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button className="text-gray-500">
                                        <FiPaperclip />
                                    </button>
                                    <button
                                        onClick={sendMessage}
                                        className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-1"
                                    >
                                        <FiSend /> Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Messages;
