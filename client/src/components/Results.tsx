import { useRef, useState } from 'react';
import { CheckCircle, XCircle, Info, Mail, Phone as PhoneIcon, User as UserIcon, ShieldAlert, LoaderCircle, Search } from 'lucide-react';
import config from '../config';

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
        {results.map(([service, info]: any) => {
          let profileLink = null;
          if (service === 'Github' && info.profile) {
            const match = info.profile.match(/github.com\/(.+)$/);
            const username = match ? match[1] : 'Profile';
            profileLink = (
              <a
                href={info.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-cyan-300 ml-2"
              >
                {username}
              </a>
            );
          }
          return (
            <div key={service} className="mb-2 flex items-center gap-2">
              <span className="font-semibold">{service}:</span>
              <span className="text-green-400">Exists</span>
              {profileLink}
              <CheckCircle className="text-green-400" size={18}/>
            </div>
          );
        })}
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

function GhuntResults({ data }: { data: any }) {
  if (!data) return null;
  // Try to extract key info from the GHunt results
  const profile = data.PROFILE_CONTAINER?.profile;
  const photoUrl = profile?.profilePhotos?.PROFILE?.url;
  const name = profile?.names?.PROFILE?.fullname;
  const email = profile?.emails?.PROFILE?.value;
  const personId = profile?.personId;
  const coverUrl = profile?.coverPhotos?.PROFILE?.url;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Mail className="inline" size={20}/> GHunt Results
      </h3>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {photoUrl && (
          <img src={photoUrl} alt="Profile" className="w-24 h-24 rounded-full border-2 border-cyan-400 object-cover" />
        )}
        <div className="flex-1">
          {name && (
            <div className="mb-2">
              <span className="font-semibold">Name:</span> {name}
            </div>
          )}
          {email && (
            <div className="mb-2">
              <span className="font-semibold">Email:</span> {email}
          </div>
          )}
          {personId && (
          <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Google Map Reviews:</span>
              <a
                href={`https://www.google.com/maps/contrib/${personId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-300 underline hover:text-blue-400 ml-2"
              >
                {`https://www.google.com/maps/contrib/${personId}`}
              </a>
          </div>
          )}
        </div>
      </div>
      {coverUrl && (
        <div className="mt-4 flex flex-col items-center">
          <span className="font-semibold mb-1">Cover Photo:</span>
          <img src={coverUrl} alt="Cover" className="rounded border border-cyan-400 max-w-full" style={{ maxHeight: 200 }} />
        </div>
      )}
    </div>
  );
}

function MaigretResults({ maigret }: { maigret: any }) {
  if (!maigret || !Array.isArray(maigret) || maigret.length === 0) return null;
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2 mb-4">
        <ShieldAlert className="inline" size={20}/> Maigret Results
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {maigret.map((profile: { site: string, url: string }) => (
          <div key={profile.site + profile.url} className="bg-black bg-opacity-60 rounded p-3 flex flex-col gap-1 border border-cyan-900">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-cyan-300">{profile.site}</span>
            </div>
            <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline break-all mb-1">
              {profile.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsernameDetails({ data, maigretResult }: { data: any, maigretResult?: any }) {
  if (!data || !data.results) return null;
  const results = Object.entries(data.results).filter(([, info]: any) => info.accountExist);
  if (results.length === 0 && (!maigretResult || maigretResult.length === 0)) {
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
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map(([service, info]: [string, any]) => (
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
      )}
      {/* Maigret Results Section */}
      {maigretResult && maigretResult.length > 0 && <MaigretResults maigret={maigretResult} />}
    </div>
  );
}

export default function Results({ emailResult, emailScanResult, phoneResult, phoneScanResult, usernameResult, scanLoading, ghuntResult, maigretResult }: {
  emailResult?: any;
  emailScanResult?: any;
  phoneResult?: any;
  phoneScanResult?: any;
  usernameResult?: any;
  scanLoading: { email: boolean; phone: boolean };
  ghuntResult?: any;
  maigretResult?: any;
}) {
  const resultsRef = useRef<HTMLDivElement>(null);

  if (!emailResult && !emailScanResult && !phoneResult && !phoneScanResult && !usernameResult && !ghuntResult && !maigretResult) return null;

  const handlePrint = () => {
    if (!resultsRef.current) return;
    // Hide the print button before printing
    const printButton = document.getElementById('print-results-btn');
    if (printButton) printButton.style.display = 'none';
    window.print();
    setTimeout(() => {
      if (printButton) printButton.style.display = '';
    }, 500);
  };

  return (
    <>
      <div ref={resultsRef} className="mt-8 w-full max-w-2xl mx-auto bg-black bg-opacity-70 border border-cyan-900 rounded-xl shadow-lg px-8 py-6 text-gray-100 print:bg-white print:text-black print:shadow-none print:border-none">
        <EmailDetails data={emailResult} />
        <EmailScanDetails data={emailScanResult} loading={scanLoading.email} />
        <GhuntResults data={ghuntResult} />
        <PhoneDetails data={phoneResult} />
        <PhoneScanDetails data={phoneScanResult} loading={scanLoading.phone} />
        {usernameResult && <UsernameDetails data={usernameResult} maigretResult={maigretResult} />}
        {!usernameResult && maigretResult && maigretResult.length > 0 && <MaigretResults maigret={maigretResult} />}
      </div>
      <div className="w-full max-w-2xl mx-auto flex justify-end mt-4">
        <button
          id="print-results-btn"
          className="print:hidden px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-semibold shadow"
          onClick={handlePrint}
        >
          Download as PDF
        </button>
      </div>
    </>
  );
}