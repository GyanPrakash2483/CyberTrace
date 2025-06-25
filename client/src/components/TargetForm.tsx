import { useState } from 'react';
import { Mail, Phone, User, Eye, LoaderCircle } from 'lucide-react';
import Results from './Results';
import config from '../config';

export default function TargetForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [usernameResult, setUsernameResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [emailResult, setEmailResult] = useState<any>(null);
  const [emailScanResult, setEmailScanResult] = useState<any>(null);
  const [phoneResult, setPhoneResult] = useState<any>(null);
  const [phoneScanResult, setPhoneScanResult] = useState<any>(null);
  const [ghuntResult, setGhuntResult] = useState<any>(null);
  const [maigretResult, setMaigretResult] = useState<any>(null);
  const [scanLoading, setScanLoading] = useState({ email: false, phone: false });
  const [error, setError] = useState<string | null>(null);

  const isAnyFilled = email.trim() !== '' || phone.trim() !== '' || username.trim() !== '';
  const isButtonDisabled = !isAnyFilled || loading;

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    setLoading(true);
    setError(null);
    setEmailResult(null);
    setEmailScanResult(null);
    setPhoneResult(null);
    setPhoneScanResult(null);
    setUsernameResult(null);
    setGhuntResult(null);
    setMaigretResult(null);
    setScanLoading({ email: false, phone: false });

    try {
      const promises: Promise<any>[] = [];

      if (email.trim()) {
        setScanLoading(prev => ({ ...prev, email: true }));
        promises.push(
          fetch(`${config.API_BASE_URL}/api/email-lookup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          })
            .then(res => res.json())
            .then(res => setEmailResult(res))
        );
        promises.push(
          fetch(`${config.API_BASE_URL}/api/email-scan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          })
            .then(res => res.json())
            .then(res => setEmailScanResult(res))
            .finally(() => setScanLoading(prev => ({ ...prev, email: false })))
        );
        promises.push(
          fetch(`${config.API_BASE_URL}/api/ghunt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          })
            .then(res => res.json())
            .then(res => setGhuntResult(res))
        );
      }
      if (phone.trim()) {
        setScanLoading(prev => ({ ...prev, phone: true }));
        promises.push(
          fetch(`${config.API_BASE_URL}/api/phone-lookup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
          })
            .then(res => res.json())
            .then(res => setPhoneResult(res))
        );
        promises.push(
          fetch(`${config.API_BASE_URL}/api/phone-scan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
          })
            .then(res => res.json())
            .then(res => setPhoneScanResult(res))
            .finally(() => setScanLoading(prev => ({ ...prev, phone: false })))
        );
      }
      if (username.trim()) {
        promises.push(
          fetch(`${config.API_BASE_URL}/api/username-lookup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
          })
            .then(res => res.json())
            .then(res => setUsernameResult(res))
        );
        promises.push(
          fetch(`${config.API_BASE_URL}/api/maigret`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
          })
            .then(res => res.json())
            .then(res => setMaigretResult(res.profiles))
        );
      }

      await Promise.all(promises);
    } catch (err: any) {
      setError('An error occurred while fetching results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        {error && <div className="mt-4 text-red-400 text-center">{error}</div>}
      </div>
      <Results
        emailResult={email && emailResult}
        emailScanResult={email && emailScanResult}
        phoneResult={phone && phoneResult}
        phoneScanResult={phone && phoneScanResult}
        usernameResult={username && usernameResult}
        scanLoading={scanLoading}
        ghuntResult={email && ghuntResult}
        maigretResult={username && maigretResult}
      />
    </>
  );
}