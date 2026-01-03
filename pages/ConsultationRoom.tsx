
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Send, User, MessageSquare, MoreVertical, Shield } from 'lucide-react';

const ConsultationRoom = () => {
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Doctor', text: 'Hello! I am Dr. Sarah. How are you feeling today?' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsConnecting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setMessages([...messages, { id: Date.now(), sender: 'You', text: inputText }]);
    setInputText('');
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-8 mx-auto w-24 h-24">
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-blue-600 w-24 h-24 rounded-full flex items-center justify-center border-4 border-slate-800">
              <Video className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Establishing Secure Connection</h2>
          <p className="text-slate-400 mb-8">Connecting to your assigned medical professional...</p>
          <div className="w-64 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
          </div>
          <style>{`
            @keyframes loading {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(250%); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-500 w-3 h-3 rounded-full animate-pulse"></div>
          <div>
            <h1 className="text-white font-bold text-sm">Secure Live Consultation</h1>
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <Shield className="w-3 h-3" /> End-to-end encrypted
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-white font-medium text-sm">Dr. Sarah Johnson</p>
            <p className="text-slate-400 text-xs">General Physician</p>
          </div>
          <img src="https://picsum.photos/id/64/100/100" className="w-10 h-10 rounded-full border-2 border-slate-700" alt="Doctor" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Video Feeds Container */}
        <div className="flex-1 relative bg-slate-900 p-4 flex flex-col items-center justify-center">
          {/* Main Feed (Doctor) */}
          <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl bg-slate-800">
            {isVideoOn ? (
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Doctor Feed" 
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
                <p className="font-medium">Doctor's camera is off</p>
              </div>
            )}
            
            {/* Label */}
            <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-white/10">
              Dr. Sarah Johnson (Primary)
            </div>
            
            {/* Self Feed (Patient) */}
            <div className="absolute bottom-6 right-6 w-32 md:w-56 aspect-video bg-slate-700 rounded-2xl border-4 border-slate-900 shadow-2xl overflow-hidden z-20">
              <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                <User className="w-8 h-8 text-slate-400" />
              </div>
              <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-0.5 rounded text-[10px] text-white">You</div>
            </div>
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
            <button 
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-4 rounded-full transition-all border-2 shadow-xl ${isMicOn ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-rose-500 border-rose-400 text-white'}`}
            >
              {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition-all border-2 shadow-xl ${isVideoOn ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-rose-500 border-rose-400 text-white'}`}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => navigate('/')}
              className="p-5 rounded-full bg-rose-600 border-2 border-rose-500 text-white hover:bg-rose-700 transition-all shadow-xl active:scale-90"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
            <button className="p-4 rounded-full bg-slate-800 border-2 border-slate-700 text-white hover:bg-slate-700 transition-all shadow-xl">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-full md:w-80 lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-1/3 md:h-auto">
          <div className="p-4 border-b border-slate-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <h2 className="text-white font-bold">Consultation Chat</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] text-slate-500 mb-1 font-bold uppercase">{m.sender}</span>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.sender === 'You' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type medical query..."
              className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ConsultationRoom;
