import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UseContext";
import { API_BASE_URL } from "../../../utils/apiPath";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Send, Edit2, Trash2, Check, X, MessageCircle, Settings } from "lucide-react";

const navBarLinks = [
  { label: "Home", href: "/Home" },
  { label: "About", href: "/About" },
  { label: "Income", href: "/Income" },
  { label: "Expense", href: "/Expense" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Manage With Ai", href: "/AiChatbox" }
];

const models = ["GPT-3.5 Turbo", "GPT-4", "GPT-4o", "Claude-3.5 Sonnet"];

const AiChatBox = () => {
  const { user } = useContext(UserContext) || {};
  const [theme, setTheme] = useState("light");
  const [chatGroups, setChatGroups] = useState([]); // [{title, messages, timestamp}]
  const [currentChatIdx, setCurrentChatIdx] = useState(null); // index of current chat group
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [input, setInput] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  // Theme logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Simulate AI response
  const simulateAIResponse = (userMessage) => {
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "I understand your question. Let me help you with that.",
        "That's an interesting point. Here's what I think...",
        "Great question! Based on the information provided...",
        "I'd be happy to assist you with this topic."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessageToCurrentChat({ role: "assistant", content: randomResponse });
      setIsTyping(false);
    }, 1500);
  };

  // Add message to current chat group
  const addMessageToCurrentChat = (msg) => {
    setChatGroups(prev => {
      if (currentChatIdx === null) return prev;
      const updated = [...prev];
      updated[currentChatIdx] = {
        ...updated[currentChatIdx],
        messages: [...updated[currentChatIdx].messages, msg]
      };
      return updated;
    });
  };

  // Handle send
  const handleSend = () => {
    if (!input.trim() || currentChatIdx === null) return;

    const userMsg = { role: "user", content: input };
    addMessageToCurrentChat(userMsg);

    // If it's the first message, set the chat group title
    setChatGroups(prev => {
      const updated = [...prev];
      if (!updated[currentChatIdx].title) {
        updated[currentChatIdx].title = input.length > 30 ? input.slice(0, 30) + "..." : input;
      }
      return updated;
    });

    setInput("");
    simulateAIResponse(input);
  };

  // Handle edit/delete
  const handleEdit = (idx) => setEditIdx(idx);
  const handleEditSave = (idx) => {
    setChatGroups(prev => {
      const updated = [...prev];
      updated[currentChatIdx].messages[idx].content = editValue;
      return updated;
    });
    setEditIdx(null);
    setEditValue("");
  };
  const handleEditCancel = () => {
    setEditIdx(null);
    setEditValue("");
  };
  const handleDelete = (idx) => {
    setChatGroups(prev => {
      const updated = [...prev];
      updated[currentChatIdx].messages = updated[currentChatIdx].messages.filter((_, i) => i !== idx);
      return updated;
    });
    if (editIdx === idx) handleEditCancel();
  };

  // Start new chat group
  const startNewChat = () => {
    setChatGroups(prev => [
      { title: "", messages: [], timestamp: new Date().toLocaleTimeString() },
      ...prev
    ]);
    setCurrentChatIdx(0);
    setEditIdx(null);
    setEditValue("");
    setInput("");
  };

  // Select a chat group from history
  const selectChatGroup = (idx) => {
    setCurrentChatIdx(idx);
    setEditIdx(null);
    setEditValue("");
    setInput("");
  };

  // Clear all chat groups
  const clearHistory = () => {
    setChatGroups([]);
    setCurrentChatIdx(null);
    setEditIdx(null);
    setEditValue("");
    setInput("");
  };

  // Profile image or initial
  const ProfilePic = () => (
    user?.profileImageUrl ? (
      <div
        className='w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 rounded-full bg-cover bg-center cursor-pointer border-2 border-blue-500 flex-shrink-0'
        style={{ backgroundImage: `url('${API_BASE_URL}${encodeURI(user?.profileImageUrl)}')` }}
      />
    ) : (
      <div className="w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold cursor-pointer border-2 border-blue-500 flex-shrink-0">
        {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
      </div>
    )
  );

  // SHUTDOWN (up-to-down) animation for navbar
  const sidebarVariants = {
    hidden: { y: -40, opacity: 0, scaleY: 0.7, originY: 0 },
    visible: {
      y: 0,
      opacity: 1,
      scaleY: 1,
      originY: 0,
      transition: { type: "spring", stiffness: 200, damping: 30 }
    },
    exit: {
      y: -40,
      opacity: 0,
      scaleY: 0.7,
      originY: 0,
      transition: { duration: 0.25, ease: "easeIn" }
    }
  };

  // Sidebar component (with chat groups)
  const Sidebar = ({
    chatGroups,
    currentChatIdx,
    onSelectChatGroup,
    onStartNewChat,
    onClearHistory,
    models,
    selectedModel,
    onSelectModel
  }) => (
    <aside className="w-80 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 shadow-lg">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Assistant
          </h2>
          <Settings className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </div>
        <button
          onClick={onStartNewChat}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          + New Chat
        </button>
      </div>
      {/* Chat Groups */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Recent Chats
          </h3>
          {chatGroups.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        {chatGroups.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No conversations yet
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Start a new chat to begin
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {chatGroups.map((group, idx) => (
              <li
                key={idx}
                onClick={() => onSelectChatGroup(idx)}
                className={`group px-4 py-3 rounded-xl cursor-pointer
                  bg-white dark:bg-slate-800
                  hover:bg-blue-50 dark:hover:bg-slate-700
                  border border-slate-200 dark:border-slate-700
                  hover:border-blue-200 dark:hover:border-slate-600
                  text-slate-700 dark:text-slate-300
                  transition-all duration-200 shadow-sm hover:shadow-md
                  transform hover:scale-[1.01]
                  ${currentChatIdx === idx ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""}
                `}
              >
                <span className="block truncate font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {group.title || "Untitled Chat"}
                </span>
                {group.timestamp && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                    {group.timestamp}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Model Selection */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider">
          AI Model
        </h3>
        <select
          value={selectedModel}
          onChange={(e) => onSelectModel(e.target.value)}
          className="w-full px-4 py-3 rounded-xl 
                      border border-slate-200 dark:border-slate-600 
                      bg-white dark:bg-slate-700 
                      text-slate-700 dark:text-slate-200 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      outline-none transition-all duration-200
                      shadow-sm hover:shadow-md"
        >
          {models.map((model) => (
            <option key={model} value={model} className="bg-white dark:bg-slate-700">
              {model}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );

  // Get current chat messages
  const currentMessages = currentChatIdx !== null && chatGroups[currentChatIdx]
    ? chatGroups[currentChatIdx].messages
    : [];

  return (
    <div className={`flex h-screen font-inter antialiased ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* Sidebar */}
        <Sidebar
          chatGroups={chatGroups}
          currentChatIdx={currentChatIdx}
          onSelectChatGroup={selectChatGroup}
          onStartNewChat={startNewChat}
          onClearHistory={clearHistory}
          models={models}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />

        {/* Main Chat Area */}
        <main className="flex flex-col flex-1 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
          {/* Header */}
          <header className="flex justify-between items-center px-8 py-6 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                AI Chat Assistant
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Powered by {selectedModel}
              </p>
            </div>
          </header>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {(!currentMessages || currentMessages.length === 0) ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                  {chatGroups.length === 0 ? "Welcome to AI Chat" : "No messages in this chat"}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                  {chatGroups.length === 0
                    ? "Start a conversation with your AI assistant. Ask questions, get help, or just chat!"
                    : "Send a message to start this chat."}
                </p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                {currentMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-md relative group ${msg.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
                        }`}
                    >
                      {editIdx === idx ? (
                        <div className="space-y-3">
                          <textarea
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            rows="3"
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                              onClick={() => handleEditSave(idx)}
                            >
                              <Check className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              className="flex items-center gap-2 px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors"
                              onClick={handleEditCancel}
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="leading-relaxed">{msg.content}</p>
                          <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                              onClick={() => {
                                setEditIdx(idx);
                                setEditValue(msg.content);
                              }}
                            >
                              <Edit2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                            </button>
                            <button
                              className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                              onClick={() => handleDelete(idx)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 shadow-md">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="px-8 py-6 border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                  className="flex-1 px-4 py-3 bg-transparent border-none outline-none resize-none text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 min-h-[20px] max-h-32"
                  rows="1"
                  disabled={currentChatIdx === null}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping || currentChatIdx === null}
                  className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-center">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Profile Pic (Navbar trigger) */}
      <div className="fixed top-6 right-8 z-50">
        <button onClick={() => setShowNavbar(true)}>
          <ProfilePic />
        </button>
        {/* Animated Navbar */}
        <AnimatePresence>
          {showNavbar && (
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-900 rounded-l-xl shadow-2xl border-l border-slate-200 dark:border-slate-700 py-8 px-6 flex flex-col gap-4 origin-top z-50"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <ProfilePic />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 dark:text-slate-100 truncate">{user?.fullName || "User Name"}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email || "user@email.com"}</div>
                </div>
                <button
                  className="ml-auto p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  onClick={() => setShowNavbar(false)}
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {navBarLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AiChatBox;