import { useState } from 'react';
import { Mail, Phone, User, Eye, LoaderCircle } from 'lucide-react';

export default function TargetForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const isAnyFilled = email.trim() !== '' || phone.trim() !== '' || username.trim() !== '';
  const isButtonDisabled = !isAnyFilled || loading;

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    setLoading(true);
    // Simulate async action
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="bg-black bg-opacity-70 border border-cyan-900 rounded-xl shadow-lg px-10 py-8 w-full max-w-2xl mx-auto mt-4">
      <div className="flex items-center mb-8 space-x-2">
        <Eye className="text-green-400" size={26} />
        <h2 className="text-2xl font-bold text-green-400">Target Identification</h2>
      </div>
      <form className="space-y-6" onSubmit={handleClick}>
        <div className="space-y-1">
          <label className="flex items-center text-gray-300 text-sm mb-0.5" htmlFor="email">
            <Mail className="mr-2 text-gray-400" size={18} />
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="target@example.com"
            className="w-full rounded-md bg-black bg-opacity-60 border border-cyan-900 text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="flex items-center text-gray-300 text-sm mb-0.5" htmlFor="phone">
            <Phone className="mr-2 text-gray-400" size={18} />
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 987654321X"
            className="w-full rounded-md bg-black bg-opacity-60 border border-cyan-900 text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="flex items-center text-gray-300 text-sm mb-0.5" htmlFor="username">
            <User className="mr-2 text-gray-400" size={18} />
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="username"
            className="w-full rounded-md bg-black bg-opacity-60 border border-cyan-900 text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="pt-2">
          <button
            type="submit"
            disabled={isButtonDisabled}
            onClick={handleClick}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-md font-semibold text-lg text-black bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 hover:from-green-500 hover:to-blue-500 transition ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading && <LoaderCircle className="animate-spin" size={22} />}
            Initiate Scan
          </button>
        </div>
      </form>
    </div>
  );
} 