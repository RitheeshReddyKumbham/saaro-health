// ChatUIWithFeatures.jsx
import React, { useState } from "react";
import { FiSend, FiPaperclip, FiPhone, FiUpload } from "react-icons/fi";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import { contacts } from "../data/MessagesDummyData";


const Messages = () => {
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [messages, setMessages] = useState([
        { from: "Owen", text: "Hi Dr. Chen, I've been experiencing a persistent cough and some shortness of breath.", date: "Today" },
        { from: "Dr. Amelia Chen", text: "Hello", date: "Today" },
        { from: "Owen", text: "Thank you, Dr. Chen. I appreciate your prompt response.", date: "Yesterday" },
        { from: "Dr. Amelia Chen", text: "You're welcome, Owen. I'm here to help.", date: "Yesterday" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: selectedContact.name, text: input, date: "Today" }]);
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };
    const filteredData=contacts.filter((contact)=>{
        return contact.name.toLowerCase().includes(input.toLowerCase())
    })

    const callUser = () => alert("Calling " + selectedContact.name);
    const shareFile = () => alert("Opening file dialog");

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
                    <div className=" max-w-[90%] mx-auto py-8 space-y-10">
                        <div className="flex h-screen font-sans">
                            
                            <div className="w-1/4 border-r bg-white p-4">
                            <div>
                                <h1 className="text-2xl font-semibold mb-6">Chat </h1>
                            </div>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e)=>setInput(e.target.value)}
                                    placeholder="Search by Name / UID / Role"
                                    className="w-full mb-4 p-2 rounded bg-gray-100 text-sm"
                                />
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {["All", "Patients", "Staff", "Doctors", "Unread"].map((cat) => (
                                        <button
                                            key={cat}
                                            className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-purple-100"
                                        >
                                            {cat}
                                        </button>
                                    ))}
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
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 flex flex-col">
                                {/* Header */}
                                <div className="p-4 flex justify-between items-center border-b">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`https://i.pravatar.cc/60?u=${selectedContact.id}`}
                                            className="w-14 h-14 rounded-full"
                                            alt="Profile"
                                        />
                                        <div>
                                            <h2 className="text-lg font-bold">{selectedContact.name}</h2>
                                            <p className="text-sm text-gray-500">UID: 12345 <br /> {selectedContact.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={callUser} className="bg-gray-100 px-4 py-2 rounded"><FiPhone /></button>
                                        <button onClick={shareFile} className="bg-gray-100 px-4 py-2 rounded"><FiUpload /></button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`flex ${msg.from.includes("Dr.") ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.from.includes("Dr.") ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"}`}>
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
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
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button className="text-gray-500"><FiPaperclip /></button>
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
}

export default Messages