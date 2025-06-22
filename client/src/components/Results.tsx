import React from 'react';
import { CheckCircle, XCircle, Info, Mail, Phone as PhoneIcon, User as UserIcon, ShieldAlert } from 'lucide-react';

function EmailDetails({ data }: { data: any }) {
  if (!data) return null;
  const d = data.data || {};
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2"><Mail className="inline" size={20}/> Email Details</h3>
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

function PhoneDetails({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2"><PhoneIcon className="inline" size={20}/> Phone Number Details</h3>
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

export default function Results({ emailResult, phoneResult, username }: {
  emailResult?: any;
  phoneResult?: any;
  username?: string;
}) {
  if (!emailResult && !phoneResult && !username) return null;
  return (
    <div className="mt-8 w-full max-w-2xl mx-auto bg-black bg-opacity-70 border border-cyan-900 rounded-xl shadow-lg px-8 py-6 text-gray-100">
      <EmailDetails data={emailResult} />
      <PhoneDetails data={phoneResult} />
      {username && (
        <div>
          <h3 className="text-lg font-bold text-cyan-400 mb-2 flex items-center gap-2"><UserIcon size={20}/> Username Details</h3>
          <div className="bg-black bg-opacity-40 rounded p-3 text-sm">(Username lookup coming soon...)</div>
        </div>
      )}
    </div>
  );
} 