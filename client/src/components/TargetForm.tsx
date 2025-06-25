import { useState } from 'react';
import { Mail, Phone, User, Eye, LoaderCircle } from 'lucide-react';
import Results from './Results';
import config from '../config';
import { useRef } from 'react';

function DorkResults({ dorkResult }: { dorkResult: any }) {
  if (!dorkResult) return null;
  return (
    <div className="mt-8 w-full max-w-2xl mx-auto bg-black bg-opacity-70 border border-cyan-900 rounded-xl shadow-lg px-8 py-6 text-gray-100">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">Google Dorks</h3>
      {dorkResult.email_dorks && dorkResult.email_dorks.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-green-300 mb-2">Email Dorks</h4>
          <div className="flex flex-wrap gap-3">
            {dorkResult.email_dorks.map((d: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-cyan-950/60 border border-cyan-800 rounded-lg px-3 py-2 mb-2 shadow-sm">
                <code className="text-xs text-cyan-200 whitespace-pre-wrap font-mono bg-transparent p-0">{d.query}</code>
                {d.url && (
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline text-xs font-semibold">Google</a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {dorkResult.phone_dorks && dorkResult.phone_dorks.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-green-300 mb-2">Phone Dorks</h4>
          <div className="flex flex-wrap gap-3">
            {dorkResult.phone_dorks.map((d: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-cyan-950/60 border border-cyan-800 rounded-lg px-3 py-2 mb-2 shadow-sm">
                <code className="text-xs text-cyan-200 whitespace-pre-wrap font-mono bg-transparent p-0">{d.query}</code>
                {d.url && (
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline text-xs font-semibold">Google</a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {dorkResult.username_dorks && dorkResult.username_dorks.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-green-300 mb-2">Username Dorks</h4>
          <div className="flex flex-wrap gap-3">
            {dorkResult.username_dorks.map((d: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-cyan-950/60 border border-cyan-800 rounded-lg px-3 py-2 mb-2 shadow-sm">
                <code className="text-xs text-cyan-200 whitespace-pre-wrap font-mono bg-transparent p-0">{d.query}</code>
                {d.url && (
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline text-xs font-semibold">Google</a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {(!dorkResult.email_dorks?.length && !dorkResult.phone_dorks?.length && !dorkResult.username_dorks?.length) && (
        <div className="text-gray-400">No dorks generated for the given input.</div>
      )}
    </div>
  );
}

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
  const [dorkResult, setDorkResult] = useState<any>(null);
  const [dorkLoading, setDorkLoading] = useState(false);
  const [dorkError, setDorkError] = useState<string | null>(null);

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
    setDorkResult(null);
    setDorkError(null);
    setDorkLoading(true);

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

      // Dork lookup request
      promises.push(
        fetch(`${config.API_BASE_URL}/api/dork-lookup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, phone, username })
        })
          .then(res => res.json().then(data => ({ ok: res.ok, data })))
          .then(({ ok, data }) => {
            if (!ok) throw new Error(data.error || 'Failed to fetch dorks');
            setDorkResult(data);
          })
          .catch(err => setDorkError(err.message || 'Failed to fetch dorks'))
      );

      await Promise.all(promises);
    } catch (err: any) {
      setError('An error occurred while fetching results.');
    } finally {
      setLoading(false);
      setDorkLoading(false);
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
        {dorkError && <div className="mt-2 text-red-400 text-center">{dorkError}</div>}
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
      <DorkResults dorkResult={dorkResult} />
    </>
  );
}