import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck, ArrowRight, LogOut, MapPin, Siren, Users, ScrollText,
  Settings2, CheckCircle2, Lock,
} from 'lucide-react';
import DemoBar from './DemoBar.jsx';

// All data below is invented sample data. No backend, no real accounts.
// The look follows the real console: a light, navy "operations console".

const ROLES = [
  { id: 'SUPER_ADMIN', label: 'Super Admin', sub: 'IT: full control', rank: 4, person: 'Demo Super Admin' },
  { id: 'ADMIN', label: 'Admin', sub: 'Operations management', rank: 3, person: 'Demo Admin' },
  { id: 'SUPERVISOR', label: 'Supervisor', sub: 'Shift oversight', rank: 2, person: 'Demo Supervisor' },
  { id: 'GUARD', label: 'Field Guard', sub: 'Scans rounds, raises SOS', rank: 1, person: 'Demo Guard' },
];

const ALL = ['SUPER_ADMIN', 'ADMIN', 'SUPERVISOR', 'GUARD'];
const MODULES = [
  { id: 'patrol', name: 'Patrol Verification', desc: 'Sites, checkpoint scans and patrol progress.', roles: ['ADMIN', 'SUPERVISOR', 'GUARD'], icon: MapPin },
  { id: 'sos', name: 'SOS Emergency', desc: 'Raise an alert and follow the response.', roles: ALL, icon: Siren },
  { id: 'accounts', name: 'Staff Accounts', desc: 'Create and manage sign-in accounts.', roles: ['SUPER_ADMIN', 'ADMIN'], icon: Users },
  { id: 'logs', name: 'Security Logs', desc: 'Sign-in activity for every account.', roles: ['SUPER_ADMIN'], icon: ScrollText },
  { id: 'governance', name: 'System Governance', desc: 'Maintenance mode and sessions.', roles: ['SUPER_ADMIN'], icon: Settings2 },
];

const SITES = [
  { name: 'Harbour View Estate', points: ['Main gate', 'Generator house', 'East perimeter', 'Roof access'] },
  { name: 'Northgate Logistics Yard', points: ['Weighbridge', 'Warehouse A', 'Fuel bay'] },
];

const USERS = [
  { name: 'A. Okafor', role: 'SUPER_ADMIN' },
  { name: 'T. Bello', role: 'ADMIN' },
  { name: 'C. Eze', role: 'SUPERVISOR' },
  { name: 'M. Adeyemi', role: 'GUARD' },
  { name: 'S. Ibrahim', role: 'GUARD' },
];

const rankOf = (r) => ROLES.find((x) => x.id === r)?.rank ?? 0;
// Mirrors the real rule: a higher rank manages a lower one; super admin manages everyone but another super admin.
const canManage = (actor, target) => (actor === 'SUPER_ADMIN' ? target !== 'SUPER_ADMIN' : rankOf(actor) > rankOf(target));
const stamp = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

const CARD = 'bg-white border border-slate-200 rounded-2xl';

function SignIn({ onPick }) {
  return (
    <div className="demo-root min-h-[calc(100vh-40px)] bg-[#eef2f7] flex items-center justify-center px-4 py-12 font-sans">
      <div className={`${CARD} w-full max-w-md p-8 shadow-sm`}>
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0f3a63] flex items-center justify-center mb-4">
          <ShieldCheck size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 text-center">Sign in</h1>
        <p className="text-sm text-slate-500 text-center mb-6">Hogan Guards operations console (demo)</p>
        <p className="text-xs font-bold tracking-widest text-slate-400 mb-3">CHOOSE A DEMO ROLE</p>
        <div className="space-y-2.5">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => onPick(r)}
              className="w-full flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3 hover:border-[#0f3a63] hover:bg-slate-50 transition-colors text-left group"
              data-cursor-hover
            >
              <span>
                <span className="block font-semibold text-slate-900 text-sm">{r.label}</span>
                <span className="block text-xs text-slate-500">{r.sub}</span>
              </span>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-[#0f3a63] transition-colors" />
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 text-center mt-5">What you can see changes with the role you pick.</p>
      </div>
    </div>
  );
}

function Patrol({ log }) {
  const [done, setDone] = useState({});
  const scan = (site, point) => {
    const key = `${site}|${point}`;
    if (done[key]) return;
    setDone((d) => ({ ...d, [key]: stamp() }));
    log(`Checkpoint verified: ${point} (${site})`);
  };
  return (
    <div className="space-y-5">
      {SITES.map((s) => {
        const count = s.points.filter((p) => done[`${s.name}|${p}`]).length;
        const pct = Math.round((count / s.points.length) * 100);
        return (
          <div key={s.name} className={`${CARD} p-5`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">{s.name}</h3>
              <span className="text-xs font-semibold text-[#0f3a63]">{count}/{s.points.length} verified</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {s.points.map((p) => {
                const t = done[`${s.name}|${p}`];
                return (
                  <button
                    key={p}
                    onClick={() => scan(s.name, p)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm text-left transition-colors ${t ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-slate-200 text-slate-700 hover:border-[#0f3a63]'}`}
                    data-cursor-hover
                  >
                    <span>{p}</span>
                    {t ? <span className="flex items-center gap-1.5 text-xs font-mono"><CheckCircle2 size={14} /> {t}</span> : <span className="text-xs text-slate-400">Tap to scan</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="text-xs text-slate-500">In the real system each checkpoint has a signed, printable QR tag that the guard scans on their round.</p>
    </div>
  );
}

function HoldButton({ onComplete }) {
  const [p, setP] = useState(0);
  const raf = useRef(null);
  const stop = () => {
    cancelAnimationFrame(raf.current);
    raf.current = null;
    setP(0);
  };
  const start = () => {
    if (raf.current) return;
    let t0 = null;
    const tick = (ts) => {
      if (t0 === null) t0 = ts;
      const v = Math.min(100, ((ts - t0) / 1500) * 100);
      setP(v);
      if (v >= 100) {
        raf.current = null;
        setP(0);
        onComplete();
      } else {
        raf.current = requestAnimationFrame(tick);
      }
    };
    raf.current = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return (
    <button
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      className="relative w-44 h-44 rounded-full bg-red-600 text-white font-bold tracking-wider select-none touch-none overflow-hidden shadow-[0_8px_30px_rgba(220,38,38,0.35)]"
      data-cursor-hover
    >
      <span className="absolute inset-x-0 bottom-0 bg-red-900/60 transition-none" style={{ height: `${p}%` }} />
      <span className="relative flex flex-col items-center gap-1"><Siren size={30} /> HOLD FOR SOS</span>
    </button>
  );
}

function Sos({ role, log }) {
  const [alerts, setAlerts] = useState([]);
  const supervisor = rankOf(role) >= 2;
  const next = { Open: 'Acknowledged', Acknowledged: 'Resolved' };
  const advance = (id) =>
    setAlerts((l) => l.map((a) => {
      if (a.id !== id || !next[a.status]) return a;
      const status = next[a.status];
      log(`SOS #${id} ${status.toLowerCase()}`);
      return { ...a, status, timeline: [...a.timeline, `${status} at ${stamp()}`] };
    }));
  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
      <div className="flex flex-col items-center gap-3">
        <HoldButton
          onComplete={() => {
            const by = ROLES.find((r) => r.id === role).person;
            setAlerts((a) => [{ id: a.length + 1, by, status: 'Open', timeline: [`Raised by ${by} at ${stamp()}`] }, ...a]);
            log('SOS alert raised');
          }}
        />
        <p className="text-xs text-slate-500 text-center max-w-[11rem]">Hold for 1.5 seconds. A quick tap does nothing, so it can't fire by accident.</p>
      </div>
      <div className="space-y-3">
        {alerts.length === 0 && <p className="text-slate-500 text-sm border border-dashed border-slate-300 rounded-xl p-6 bg-white">No alerts yet. Try the button.</p>}
        {alerts.map((a) => (
          <div key={a.id} className={`${CARD} p-4`}>
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-900 text-sm">Alert #{a.id} · {a.by}</p>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${a.status === 'Open' ? 'text-red-600' : a.status === 'Acknowledged' ? 'text-amber-600' : 'text-emerald-600'}`}>{a.status}</span>
            </div>
            <ol className="mt-2 text-xs font-mono text-slate-500 space-y-0.5">
              {a.timeline.map((t, i) => <li key={i}>{t}</li>)}
            </ol>
            {next[a.status] && supervisor && (
              <button onClick={() => advance(a.id)} className="mt-3 text-xs font-bold bg-[#0f3a63] text-white px-3 py-1.5 rounded-lg" data-cursor-hover>
                {a.status === 'Open' ? 'Acknowledge' : 'Mark resolved'}
              </button>
            )}
          </div>
        ))}
        {!supervisor && alerts.length > 0 && <p className="text-xs text-slate-500">Only supervisors and above can acknowledge and resolve alerts.</p>}
      </div>
    </div>
  );
}

function Accounts({ role }) {
  const [msg, setMsg] = useState('');
  return (
    <div>
      <div className={`${CARD} overflow-hidden`}>
        {USERS.map((u) => {
          const ok = canManage(role, u.role);
          return (
            <div key={u.name} className="flex items-center justify-between px-5 py-4 border-b border-slate-100 last:border-0">
              <div>
                <p className="font-semibold text-slate-900 text-sm">{u.name}</p>
                <p className="text-[11px] tracking-widest text-slate-500 font-bold">{u.role.replace('_', ' ')}</p>
              </div>
              <button
                disabled={!ok}
                onClick={() => setMsg(`Managing ${u.name}: allowed, your rank is higher.`)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${ok ? 'bg-[#0f3a63] text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                data-cursor-hover
              >
                {!ok && <Lock size={11} />} Manage
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-500 mt-4">{msg || 'Higher ranks manage lower ranks; nobody manages a peer or themselves. Switch role and watch which buttons unlock.'}</p>
    </div>
  );
}

function Logs({ events }) {
  return (
    <div className={`${CARD} overflow-hidden font-mono text-xs`}>
      {events.map((e, i) => (
        <div key={i} className="flex justify-between px-5 py-3 border-b border-slate-100 last:border-0 text-slate-700">
          <span>{e.text}</span><span className="text-slate-400">{e.time}</span>
        </div>
      ))}
    </div>
  );
}

function Governance({ log }) {
  const [maint, setMaint] = useState(false);
  const [sessions, setSessions] = useState(12);
  return (
    <div className="space-y-4 max-w-xl">
      <div className={`${CARD} flex items-center justify-between p-5`}>
        <div>
          <p className="font-bold text-slate-900">Maintenance mode</p>
          <p className="text-xs text-slate-500">{maint ? 'Only Super Admin can sign in right now.' : 'Blocks non-admin sign-ins while you work.'}</p>
        </div>
        <button
          onClick={() => { setMaint(!maint); log(`Maintenance mode ${!maint ? 'enabled' : 'disabled'}`); }}
          className={`w-12 h-7 rounded-full p-1 transition-colors ${maint ? 'bg-[#0f3a63]' : 'bg-slate-300'}`}
          aria-label="Toggle maintenance mode"
          data-cursor-hover
        >
          <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${maint ? 'translate-x-5' : ''}`} />
        </button>
      </div>
      <div className={`${CARD} flex items-center justify-between p-5`}>
        <div>
          <p className="font-bold text-slate-900">Active sessions</p>
          <p className="text-xs text-slate-500">{sessions} signed in right now.</p>
        </div>
        <button
          onClick={() => { setSessions(1); log('All other sessions revoked'); }}
          className="text-xs font-bold bg-[#0f3a63] text-white px-3 py-1.5 rounded-lg"
          data-cursor-hover
        >
          Sign everyone else out
        </button>
      </div>
    </div>
  );
}

export default function HoganHubDemo() {
  const [role, setRole] = useState(null);
  const [active, setActive] = useState(null);
  const [events, setEvents] = useState([]);
  const log = (text) => setEvents((e) => [{ text, time: stamp() }, ...e].slice(0, 30));

  const pick = (r) => {
    setRole(r.id);
    setEvents([{ text: `${r.person} signed in`, time: stamp() }, { text: 'Failed sign-in: unknown account (blocked)', time: 'n/a' }]);
    setActive(MODULES.find((m) => m.roles.includes(r.id)).id);
  };

  if (!role) {
    return (
      <>
        <DemoBar title="Hogan Hub" slug="hogan-hub" tone="light" />
        <SignIn onPick={pick} />
      </>
    );
  }

  const visible = MODULES.filter((m) => m.roles.includes(role));
  const roleInfo = ROLES.find((r) => r.id === role);
  const current = visible.find((m) => m.id === active) || visible[0];

  return (
    <div className="demo-root min-h-screen bg-[#eef2f7] text-slate-800 font-sans">
      <DemoBar title="Hogan Hub" slug="hogan-hub" tone="light" />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-40px)]">
        <aside className="md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-5">
          <p className="text-[10px] font-bold tracking-widest text-slate-500">HOGAN GUARDS</p>
          <p className="text-lg font-bold text-[#0f3a63] leading-tight mb-5">Operations console</p>
          <div className="mb-6 px-3 py-2 rounded-lg bg-slate-100">
            <p className="text-[10px] tracking-widest text-slate-500 font-bold">SIGNED IN AS</p>
            <p className="text-sm font-semibold text-slate-900">{roleInfo.label}</p>
          </div>
          <p className="text-[10px] tracking-widest text-slate-500 font-bold mb-2">YOUR MODULES · {visible.length} OF {MODULES.length}</p>
          <nav className="space-y-1">
            {visible.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${current.id === m.id ? 'bg-[#0f3a63] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                data-cursor-hover
              >
                <m.icon size={16} /> {m.name}
              </button>
            ))}
          </nav>
          <button onClick={() => setRole(null)} className="mt-8 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0f3a63] transition-colors" data-cursor-hover>
            <LogOut size={14} /> Switch role
          </button>
        </aside>

        <main className="flex-1 p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">{current.name}</h2>
          <p className="text-sm text-slate-500 mb-8">{current.desc}</p>
          {current.id === 'patrol' && <Patrol log={log} />}
          {current.id === 'sos' && <Sos role={role} log={log} />}
          {current.id === 'accounts' && <Accounts role={role} />}
          {current.id === 'logs' && <Logs events={events} />}
          {current.id === 'governance' && <Governance log={log} />}
        </main>
      </div>
    </div>
  );
}
