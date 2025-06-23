import React from 'react';
import { CheckCircle, XCircle, Info, Mail, Phone as PhoneIcon, User as UserIcon, ShieldAlert, LoaderCircle } from 'lucide-react';

function EmailDetails({ data }: { data: any }) {
  if (!data) return null;
  const d = data.data || {};
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2"><Mail className="inline" size={20}/> Email Details (Hunter API)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Email:</span>
            <span>{d.email}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <span className={d.status === 'valid' ? 'text-green-400' : 'text-red-400'}>{d.status}</span>
            {d.status === 'valid' ? <CheckCircle className="text-green-400" size={18}/> : <XCircle className="text-red-400" size={18}/>} 
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Result:</span>
            <span>{d.result}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Score:</span>
            <span>{d.score}</span>
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Webmail:</span>
            <span>{d.webmail ? 'Yes' : 'No'}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Disposable:</span>
            <span>{d.disposable ? 'Yes' : 'No'}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Accept All:</span>
            <span>{d.accept_all ? 'Yes' : 'No'}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Gibberish:</span>
            <span>{d.gibberish ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-400 flex items-center gap-1"><Info size={14}/> SMTP Check: <span className={d.smtp_check ? 'text-green-400 ml-1' : 'text-red-400 ml-1'}>{d.smtp_check ? 'Passed' : 'Failed'}</span></div>
    </div>
  );
}

function EmailScanDetails({ data, loading }: { data: any, loading: boolean }) {
  if (loading) {
    return (
      <div className="mb-6 flex items-center gap-2 text-cyan-300">
        <LoaderCircle className="animate-spin" size={20} />
        Scanning for accounts...
      </div>
    );
  }
  if (!data || !data.scanResults) return null;
  const results = Object.entries(data.scanResults).filter(([, info]: any) => info.accountExist);
  if (results.length === 0) {
    return (
      <div className="mb-6 text-cyan-300">No accounts found for this email.</div>
    );
  }
  const email = data.email || '';
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2"><Mail className="inline" size={20}/> Email Account Existence Scan</h3>
        {email && (
          <a
            href={`https://www.facebook.com/search/top?q=${encodeURIComponent(email)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-300 underline hover:text-blue-400"
          >
            Top results on facebook
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map(([service, info]: any) => (
          <div key={service} className="mb-2 flex items-center gap-2">
            <span className="font-semibold">{service}:</span>
            <span className="text-green-400">Exists</span>
            <CheckCircle className="text-green-400" size={18}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneDetails({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2"><PhoneIcon className="inline" size={20}/> Phone Number Details (Numverify API)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Number:</span>
            <span>{data.number}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Valid:</span>
            <span className={data.valid ? 'text-green-400' : 'text-red-400'}>{data.valid ? 'Yes' : 'No'}</span>
            {data.valid ? <CheckCircle className="text-green-400" size={18}/> : <XCircle className="text-red-400" size={18}/>} 
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Carrier:</span>
            <span>{data.carrier || 'N/A'}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Line Type:</span>
            <span>{data.line_type || 'N/A'}</span>
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Country:</span>
            <span>{data.country_name} ({data.country_code})</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Location:</span>
            <span>{data.location || 'N/A'}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">International Format:</span>
            <span>{data.international_format}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneScanDetails({ data, loading }: { data: any, loading: boolean }) {
  if (loading) {
    return (
      <div className="mb-6 flex items-center gap-2 text-cyan-300">
        <LoaderCircle className="animate-spin" size={20} />
        Scanning for accounts...
      </div>
    );
  }
  if (!data || !data.scanResults) return null;
  const results = Object.entries(data.scanResults).filter(([, info]: any) => info.accountExist);
  if (results.length === 0) {
    return (
      <div className="mb-6 text-cyan-300">No accounts found for this phone number.</div>
    );
  }
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2"><PhoneIcon className="inline" size={20}/> Phone Account Existence Scan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map(([service, info]: any) => (
          <div key={service} className="mb-2 flex items-center gap-2">
            <span className="font-semibold">{service}:</span>
            <span className="text-green-400">Exists</span>
            <CheckCircle className="text-green-400" size={18}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsernameDetails({ data }: { data: any }) {
  if (!data || !data.results) return null;
  const results = Object.entries(data.results).filter(([, info]: any) => info.accountExist);
  if (results.length === 0) {
    return (
      <div className="mb-6 text-cyan-300">No accounts found for this username.</div>
    );
  }
  const username = data.username || '';
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2"><UserIcon className="inline" size={20}/> Username Account Existence Scan</h3>
        {username && (
          <a
            href={`https://www.facebook.com/search/top?q=${encodeURIComponent(username)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-300 underline hover:text-blue-400"
          >
            Top results on facebook
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map(([service, info]: any) => (
          <div key={service} className="mb-2 flex items-center gap-2">
            <span className="font-semibold">{service}:</span>
            <span className="text-green-400">Exists</span>
            {info.profile && (
              <a href={info.profile} target="_blank" rel="noopener noreferrer" className="underline text-cyan-300 ml-2">Profile</a>
            )}
            <CheckCircle className="text-green-400" size={18}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Results({ emailResult, emailScanResult, phoneResult, phoneScanResult, usernameResult, scanLoading }: {
  emailResult?: any;
  emailScanResult?: any;
  phoneResult?: any;
  phoneScanResult?: any;
  usernameResult?: any;
  scanLoading: { email: boolean; phone: boolean };
}) {
  if (!emailResult && !emailScanResult && !phoneResult && !phoneScanResult && !usernameResult) return null;
  return (
    <div className="mt-8 w-full max-w-2xl mx-auto bg-black bg-opacity-70 border border-cyan-900 rounded-xl shadow-lg px-8 py-6 text-gray-100">
      <EmailDetails data={emailResult} />
      <EmailScanDetails data={emailScanResult} loading={scanLoading.email} />
      <PhoneDetails data={phoneResult} />
      <PhoneScanDetails data={phoneScanResult} loading={scanLoading.phone} />
      <UsernameDetails data={usernameResult} />
    </div>
  );
} 