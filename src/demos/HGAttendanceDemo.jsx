import React, { useState } from 'react';
import { LayoutDashboard, ScanLine, CalendarDays, Plane, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import DemoBar from './DemoBar.jsx';

// Invented sample staff and schedules. The real system is a Laravel + React
// app backed by MySQL; none of its code or data is used here.

const SHIFT_START = 8 * 60; // 08:00
const GRACE = 10; // minutes
const STEPS = [2, 6, 4, 9, 3, 7, 5, 8, 4, 6]; // simulated minutes between scans

const fmt = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

const SEED = [
  { id: 1, name: 'Adaeze Nwosu', post: 'Harbour View Estate' },
  { id: 2, name: 'Tunde Balogun', post: 'Harbour View Estate' },
  { id: 3, name: 'Chidi Eze', post: 'Northgate Yard' },
  { id: 4, name: 'Musa Danjuma', post: 'Northgate Yard' },
  { id: 5, name: 'Ngozi Okeke', post: 'HQ Reception' },
  { id: 6, name: 'Segun Adeyemi', post: 'HQ Reception' },
  { id: 7, name: 'Folake Ajayi', post: 'Lekki Plaza' },
  { id: 8, name: 'Ibrahim Sani', post: 'Lekki Plaza' },
].map((s, i) => ({ ...s, status: i < 2 ? 'in' : 'out', clockIn: i < 2 ? SHIFT_START - 6 + i * 3 : null, clockOut: null, scans: i < 2 ? 1 : 0, late: false }));

// D = day 08–17, N = overnight 19–07, O = off
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ROSTER = [
  ['D', 'D', 'D', 'D', 'D', 'O', 'O'],
  ['D', 'D', 'O', 'D', 'D', 'D', 'O'],
  ['N', 'N', 'N', 'O', 'O', 'N', 'N'],
  ['O', 'O', 'N', 'N', 'N', 'N', 'O'],
  ['D', 'D', 'D', 'D', 'D', 'O', 'O'],
  ['D', 'O', 'D', 'D', 'O', 'D', 'D'],
  ['O', 'D', 'D', 'O', 'D', 'D', 'D'],
  ['D', 'D', 'O', 'D', 'D', 'O', 'D'],
];

const LEAVES = [
  { id: 1, name: 'Ngozi Okeke', type: 'Annual leave', range: '12–16 Nov', note: 'Overlaps with Segun Adeyemi (14–18 Nov) at HQ Reception' },
  { id: 2, name: 'Tunde Balogun', type: 'Sick leave', range: '3–4 Nov', note: '' },
  { id: 3, name: 'Folake Ajayi', type: 'Annual leave', range: '20–24 Nov', note: '' },
];

function Stat({ label, value, hint }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">{label}</p>
      <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{hint}</p>
    </div>
  );
}

function ScanList({ scans, empty }) {
  if (!scans.length) return <p className="text-sm text-slate-500 text-center py-6">{empty}</p>;
  return (
    <ul className="divide-y divide-slate-100">
      {scans.map((s, i) => (
        <li key={i} className="flex items-center justify-between py-2.5 text-sm">
          <span className="text-slate-800 font-medium">{s.name}</span>
          <span className="flex items-center gap-3">
            <span className={`text-xs font-semibold ${s.kind === 'in' ? 'text-emerald-600' : 'text-slate-500'}`}>{s.kind === 'in' ? 'Clock-in' : 'Clock-out'}{s.late ? ' · late' : ''}</span>
            <span className="text-xs font-mono text-slate-400">{s.time}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function HGAttendanceDemo() {
  const [tab, setTab] = useState('dashboard');
  const [staff, setStaff] = useState(SEED);
  const [scans, setScans] = useState(() => SEED.filter((s) => s.status === 'in').map((s) => ({ name: s.name, kind: 'in', time: fmt(s.clockIn), late: false })).reverse());
  const [clock, setClock] = useState(SHIFT_START - 10);
  const [step, setStep] = useState(0);
  const [last, setLast] = useState(null);
  const [toast, setToast] = useState(null);
  const [leaves, setLeaves] = useState(LEAVES.map((l) => ({ ...l, status: 'Pending', audit: [] })));

  const scan = (id) => {
    const person = staff.find((s) => s.id === id);
    if (last === id) {
      setToast({ tone: 'warn', text: `Ignored: ${person.name} was just scanned. That looks like an accidental double-tap.` });
      return;
    }
    if (person.scans >= 2) {
      setToast({ tone: 'bad', text: `Rejected: ${person.name} has reached the daily limit of 2 scans.` });
      return;
    }
    const now = clock + STEPS[step % STEPS.length];
    setClock(now);
    setStep(step + 1);
    setLast(id);
    if (person.status === 'out') {
      const late = now > SHIFT_START + GRACE;
      setStaff((l) => l.map((s) => (s.id === id ? { ...s, status: 'in', clockIn: now, scans: s.scans + 1, late } : s)));
      setScans((l) => [{ name: person.name, kind: 'in', time: fmt(now), late }, ...l].slice(0, 12));
      setToast({ tone: late ? 'warn' : 'ok', text: `${person.name} clocked in at ${fmt(now)}${late ? ' (after the 10-minute grace window, flagged late)' : ''}.` });
    } else {
      setStaff((l) => l.map((s) => (s.id === id ? { ...s, status: 'done', clockOut: now, scans: s.scans + 1 } : s)));
      setScans((l) => [{ name: person.name, kind: 'out', time: fmt(now) }, ...l].slice(0, 12));
      setToast({ tone: 'ok', text: `${person.name} clocked out at ${fmt(now)}.` });
    }
  };

  const open = staff.filter((s) => s.status === 'in').length;
  const done = staff.filter((s) => s.status === 'done').length;
  const late = staff.filter((s) => s.late).length;

  const coverage = WEEK.map((_, d) => ROSTER.filter((r) => r[d] !== 'O').length);

  const decide = (id, status) => {
    setLeaves((l) => l.map((x) => (x.id === id ? { ...x, status, audit: [...x.audit, `${status} by demo.admin at ${fmt(clock)}`] } : x)));
  };

  const NAV = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scan', label: 'Scan terminal', icon: ScanLine },
    { id: 'schedules', label: 'Schedules', icon: CalendarDays },
    { id: 'leaves', label: 'Leaves', icon: Plane },
  ];

  return (
    <div className="demo-root min-h-screen bg-[#eef2f7] text-slate-800 font-sans">
      <DemoBar title="HG Attendance System" slug="hg-attendance-system" tone="light" />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-40px)]">
        <aside className="md:w-60 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-500">HOGAN GUARDS</p>
          <p className="text-lg font-bold text-[#0f3a63] leading-tight mb-5">Attendance Portal</p>
          <div className="text-xs bg-slate-100 rounded-lg px-3 py-2 mb-5 text-slate-600">demo.admin · super admin</div>
          <nav className="flex md:flex-col gap-1 overflow-x-auto">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${tab === n.id ? 'bg-[#0f3a63] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                data-cursor-hover
              >
                <n.icon size={16} /> {n.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 sm:p-10">
          {tab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Today at HQ</h2>
              <p className="text-sm text-slate-500 mb-6">Simulated clock {fmt(clock)} · use the Scan terminal and watch this update</p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <Stat label="Open sessions" value={open} hint="People currently clocked in" />
                <Stat label="Completed sessions" value={done} hint="Finished shifts today" />
                <Stat label="Late clock-ins" value={late} hint="Arrivals after the grace window" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">Recent scans</h3>
                <ScanList scans={scans} empty="No scans recorded yet today." />
              </div>
            </div>
          )}

          {tab === 'scan' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Scan terminal</h2>
              <p className="text-sm text-slate-500 mb-6">Tap a badge to simulate a scan. Try scanning someone twice in a row, or three times in a day.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {staff.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scan(s.id)}
                    className="text-left bg-white border border-slate-200 hover:border-[#0f3a63] rounded-xl p-4 transition-colors"
                    data-cursor-hover
                  >
                    <p className="font-semibold text-slate-900 text-sm">{s.name}</p>
                    <p className="text-xs text-slate-500 mb-2">{s.post}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${s.status === 'in' ? 'bg-emerald-100 text-emerald-700' : s.status === 'done' ? 'bg-slate-200 text-slate-600' : 'bg-amber-100 text-amber-700'}`}>
                      {s.status === 'in' ? 'Clocked in' : s.status === 'done' ? 'Shift complete' : 'Not in'}
                    </span>
                  </button>
                ))}
              </div>
              <div className={`min-h-[3.5rem] rounded-xl px-4 py-3 text-sm flex items-start gap-3 border ${!toast ? 'bg-white border-slate-200 text-slate-500' : toast.tone === 'ok' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : toast.tone === 'warn' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                {!toast ? 'Waiting for a scan…' : (
                  <>
                    {toast.tone === 'ok' ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : toast.tone === 'warn' ? <AlertTriangle size={18} className="shrink-0 mt-0.5" /> : <XCircle size={18} className="shrink-0 mt-0.5" />}
                    <span>{toast.text}</span>
                  </>
                )}
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 mt-6">
                <h3 className="font-bold text-slate-900 mb-2">Recent scans</h3>
                <ScanList scans={scans} empty="No scans recorded yet today." />
              </div>
            </div>
          )}

          {tab === 'schedules' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Schedule overview</h2>
              <p className="text-sm text-slate-500 mb-6">All staff on one grid, so gaps are easy to spot. Days with thin cover are flagged.</p>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-widest text-slate-500 border-b border-slate-200">
                      <th className="px-4 py-3">Staff</th>
                      {WEEK.map((d) => <th key={d} className="px-3 py-3 text-center">{d}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {SEED.map((s, i) => (
                      <tr key={s.id} className="border-b border-slate-100 last:border-0">
                        <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{s.name}</td>
                        {ROSTER[i].map((c, d) => (
                          <td key={d} className="px-2 py-2 text-center">
                            <span className={`inline-block min-w-[3.5rem] px-2 py-1 rounded text-xs font-semibold ${c === 'D' ? 'bg-blue-50 text-blue-700' : c === 'N' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-400'}`}>
                              {c === 'D' ? '08–17' : c === 'N' ? 'Overnight' : 'Off'}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-[11px] uppercase tracking-widest font-bold text-slate-500">Cover</td>
                      {coverage.map((c, d) => (
                        <td key={d} className="px-2 py-3 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${c < 5 ? 'bg-amber-100 text-amber-800' : 'text-slate-600'}`}>{c}{c < 5 ? ' · thin' : ''}</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'leaves' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Leave requests</h2>
              <p className="text-sm text-slate-500 mb-6">Every decision is written to an audit trail.</p>
              <div className="space-y-4">
                {leaves.map((l) => (
                  <div key={l.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{l.name} <span className="text-slate-400 font-normal">· {l.type}</span></p>
                        <p className="text-sm text-slate-500">{l.range}</p>
                      </div>
                      {l.status === 'Pending' ? (
                        <div className="flex gap-2">
                          <button onClick={() => decide(l.id, 'Approved')} className="text-xs font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-lg" data-cursor-hover>Approve</button>
                          <button onClick={() => decide(l.id, 'Rejected')} className="text-xs font-bold bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg" data-cursor-hover>Reject</button>
                        </div>
                      ) : (
                        <span className={`text-xs font-bold uppercase tracking-wider ${l.status === 'Approved' ? 'text-emerald-600' : 'text-slate-500'}`}>{l.status}</span>
                      )}
                    </div>
                    {l.note && l.status === 'Pending' && (
                      <p className="mt-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2"><AlertTriangle size={13} /> {l.note}</p>
                    )}
                    {l.audit.length > 0 && <p className="mt-3 text-xs font-mono text-slate-400">Audit: {l.audit.join(' → ')}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
