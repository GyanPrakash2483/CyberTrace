import { useRef, useState } from 'react';
import { CheckCircle, XCircle, Info, Mail, Phone as PhoneIcon, User as UserIcon, ShieldAlert, LoaderCircle, Search } from 'lucide-react';
import config from '../config';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export function EmailDetails({ data }: { data: any }) {
  if (!data) return null;
  const d = data.data || {};
  // Helper to check if email is quora
  const isQuora = d.email && d.email.toLowerCase().endsWith('@quora.com');

  // SweetAlert handler
  const handleQuoraSearch = () => {
    Swal.fire({
      title: 'Search Quora',
      input: 'text',
      inputLabel: 'Enter name to search on Quora',
      inputPlaceholder: 'Name',
      showCancelButton: true,
      confirmButtonText: 'Search Quora',
      cancelButtonText: 'Cancel',
      showDenyButton: true,
      denyButtonText: 'Search Profile',
      background: '#222',
      color: '#fff',
      customClass: {
        popup: 'swal2-dark',
        confirmButton: 'bg-red-600',
        denyButton: 'bg-cyan-700',
        cancelButton: 'bg-gray-700',
        input: 'bg-gray-900 text-white',
      },
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage('Please enter a name');
        }
        return name;
      },
      preDeny: () => {
        // Always return the value of the input field
        const input = (Swal.getInput() as HTMLInputElement);
        if (!input.value) {
          Swal.showValidationMessage('Please enter a name');
          return false;
        }
        return input.value;
      }
    }).then((result) => {
      // Use result.value for both confirm and deny
      if (result.isConfirmed && result.value) {
        window.open(`https://quora.com/search?q=${encodeURIComponent(result.value)}`, '_blank');
      } else if (result.isDenied && result.value) {
        window.open(`https://quora.com/search?q=${encodeURIComponent(result.value)}&type=profile`, '_blank');
      }
    });
  };
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2"><Mail className="inline" size={20}/> Email Details (Hunter API)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Email:</span>
            <span>{d.email}</span>
            {/* Quora search button */}
            {isQuora && (
              <button
                className="ml-2 px-2 py-0.5 bg-red-600 text-xs text-white rounded shadow inline-block"
                style={{ fontSize: '0.75rem', lineHeight: 1, verticalAlign: 'middle' }}
                onClick={handleQuoraSearch}
              >
                Search for accounts
              </button>
            )}
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

  // SweetAlert handler for Quora
  const handleQuoraSearch = () => {
    Swal.fire({
      title: 'Search Quora',
      input: 'text',
      inputLabel: 'Enter name to search on Quora',
      inputPlaceholder: 'Name',
      showCancelButton: true,
      confirmButtonText: 'Search Quora',
      cancelButtonText: 'Cancel',
      showDenyButton: true,
      denyButtonText: 'Search Profile',
      background: '#222',
      color: '#fff',
      customClass: {
        popup: 'swal2-dark',
        confirmButton: 'bg-red-600',
        denyButton: 'bg-cyan-700',
        cancelButton: 'bg-gray-700',
        input: 'bg-gray-900 text-white',
      },
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage('Please enter a name');
        }
        return name;
      },
      preDeny: () => {
        // Always return the value of the input field
        const input = (Swal.getInput() as HTMLInputElement);
        if (!input.value) {
          Swal.showValidationMessage('Please enter a name');
          return false;
        }
        return input.value;
      }
    }).then((result) => {
      // Use result.value for both confirm and deny
      if (result.isConfirmed && result.value) {
        window.open(`https://quora.com/search?q=${encodeURIComponent(result.value)}`, '_blank');
      } else if (result.isDenied && result.value) {
        window.open(`https://quora.com/search?q=${encodeURIComponent(result.value)}&type=profile`, '_blank');
      }
    });
  };

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
              {/* Quora search button for Quora Exists */}
              {service === 'Quora' && (
                <button
                  className="ml-2 px-2 py-0.5 bg-red-600 text-xs text-white rounded shadow inline-block"
                  style={{ fontSize: '0.75rem', lineHeight: 1, verticalAlign: 'middle' }}
                  onClick={handleQuoraSearch}
                >
                  Search for accounts
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PhoneDetails({ data }: { data: any }) {
  const [showIframe, setShowIframe] = useState(false);
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
      {data.number && (
        <div className="w-full flex flex-col items-center mt-6">
          <button
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-semibold shadow"
            onClick={() => setShowIframe((prev) => !prev)}
          >
            {showIframe ? 'Hide Name Search' : 'Search for Name'}
          </button>
          {showIframe && (
            <div className="mt-4 w-full flex justify-center">
              <iframe
                src={`https://naam.ai/${encodeURIComponent(data.number)}`}
                title="Naam AI Search"
                width="700"
                height="700"
                style={{ border: '1px solid #0ff', borderRadius: '8px', background: 'white', display: 'block' }}
              />
            </div>
          )}
        </div>
      )}
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

export function GhuntResults({ data }: { data: any }) {
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

function generateFakeUsernames(baseUsername: string): string[] {
  const suffixes = [
    '1', '01', '123', '321', '111', '000', 'real', 'official', 'x', 'xx', 'xxx',
    'the', 'not', 'fake', '0', '007', 'insta', 'ig', 'fan', 'admin',
    '2024', '2023', '2003'
  ];
  const prefixes = [
    '', '_', 'the', 'real', 'official', 'fake', 'not', 'x', 'xx', 'xxx',
    '1', '2', '007', 'user', 'fan', 'admin', 'z', 'real_', 'only'
  ];
  const patterns = [
    '{}{}', '{}{}', '{}.{}', '{}-{}', '{}{}', '_{}{}', '{}{}1',
    '{}{}x', '{}{}z', '{}{}official', '{}.real', '{}{}_', '{}.{}', '{}{}{}',
    '{}{}{}', '{}{}', '{}.{}.', '{}{}{}', '{}.{}{}', '{}{}', '{}{}123'
  ];
  const fakeUsernames = new Set<string>();
  while (fakeUsernames.size < 50) { // 50 for UI performance
    const prefix = Math.random() < 0.5 ? prefixes[Math.floor(Math.random() * prefixes.length)] : '';
    const suffix = Math.random() < 0.7 ? suffixes[Math.floor(Math.random() * suffixes.length)] : '';
    const mid = Math.random() < 0.3 ? Array.from({length: Math.floor(Math.random()*2)+1}, () => String.fromCharCode(97 + Math.floor(Math.random()*26))).join('') : '';
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    let fake = '';
    const count = (pattern.match(/\{\}/g) || []).length;
    try {
      if (count === 3) {
        fake = pattern.replace('{}', prefix).replace('{}', baseUsername).replace('{}', suffix);
      } else if (count === 2) {
        fake = pattern.replace('{}', prefix + baseUsername).replace('{}', mid + suffix);
      } else {
        fake = pattern.replace('{}', prefix + baseUsername);
      }
    } catch {
      continue;
    }
    fake = fake.replace(/\s+/g, '').toLowerCase();
    if (fake !== baseUsername.replace(/\s+/g, '').toLowerCase()) {
      fakeUsernames.add(fake);
    }
  }
  return Array.from(fakeUsernames);
}

function UsernameDetails({ data, maigretResult }: { data: any, maigretResult?: any }) {
  const [fakeLoading, setFakeLoading] = useState(false);
  const [fakeProgress, setFakeProgress] = useState(0);
  const [fakeResults, setFakeResults] = useState<any[]>([]);
  const [fakeTotal, setFakeTotal] = useState(0);
  const [fakeError, setFakeError] = useState<string | null>(null);

  if (!data || !data.results) return null;
  const results = Object.entries(data.results).filter(([, info]: any) => info.accountExist);
  const username = data.username || '';

  const handleFakeSearch = async () => {
    setFakeLoading(true);
    setFakeProgress(0);
    setFakeResults([]);
    setFakeError(null);
    const fakeUsernames = generateFakeUsernames(username);
    setFakeTotal(fakeUsernames.length);
    const resultsArr: any[] = [];
    for (let i = 0; i < fakeUsernames.length; i++) {
      const fake = fakeUsernames[i];
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/socialscan`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: fake })
        });
        const json = await res.json();
        resultsArr.push({ username: fake, ...json });
      } catch (err) {
        resultsArr.push({ username: fake, error: 'API error' });
      }
      setFakeProgress(i + 1);
      setFakeResults([...resultsArr]);
    }
    setFakeLoading(false);
  };

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
      {/* Fake Account Search Button and Progress - moved below Maigret Results */}
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-md font-semibold shadow disabled:opacity-50"
          onClick={handleFakeSearch}
          disabled={fakeLoading}
        >
          {fakeLoading ? 'Searching Fake Accounts...' : 'Search Fake Accounts'}
        </button>
        {fakeLoading && (
          <div className="mt-4 w-full">
            <div className="h-3 bg-cyan-900 rounded">
              <div
                className="h-3 bg-cyan-400 rounded transition-all"
                style={{ width: `${(fakeProgress / (fakeTotal || 1)) * 100}%` }}
              />
            </div>
            <div className="text-xs text-cyan-200 mt-1">{fakeProgress} / {fakeTotal} usernames searched</div>
          </div>
        )}
        {fakeError && <div className="text-red-400 mt-2">{fakeError}</div>}
      </div>
      {/* Fake Results */}
      {fakeResults.length > 0 && (
        <div className="mt-6">
          <h4 className="text-cyan-300 font-semibold mb-2">Fake Username Results</h4>
          <div className="max-h-64 overflow-y-auto border border-cyan-900 rounded bg-black bg-opacity-40 p-2">
            {fakeResults.map((res, idx) => {
              // Support both { username: [...] } and { results: { username: [...] }, username: ... }
              let platforms: any[] = [];
              if (res.results && res.username && res.results[res.username]) {
                platforms = res.results[res.username];
              } else if (res[res.username]) {
                platforms = res[res.username];
              }
              // Only show platforms where account is found AND a profile link is available
              const foundAccounts = Array.isArray(platforms)
                ? platforms.filter((p: any) => p.available === 'False' && p.link)
                : [];
              const foundCount = foundAccounts.length;
              return (
                <div key={res.username + idx} className="mb-4">
                  <span className="font-mono text-cyan-200">{res.username}</span>
                  {res.error ? (
                    <span className="text-red-400 ml-2">{res.error}</span>
                  ) : (
                    <span className="ml-2 text-green-400">{foundCount} account{foundCount !== 1 ? 's' : ''} found</span>
                  )}
                  {/* Show found accounts with links only */}
                  {foundCount > 0 && (
                    <div className="ml-4 mt-1 space-y-1">
                      <ul className="list-disc ml-4">
                        {foundAccounts.map((acc: any, i: number) => (
                          <li key={acc.platform + i} className="text-xs">
                            <span className="font-semibold text-cyan-200">{acc.platform}:</span>
                            <a href={acc.link} target="_blank" rel="noopener noreferrer" className="underline text-cyan-300 ml-1">{acc.link}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
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