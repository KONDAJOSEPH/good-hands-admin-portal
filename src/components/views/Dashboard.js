import Layout from "@/components/Layout";
import { P } from "@/lib/sample";

const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const V = [1.4, 1.7, 1.9, 2.2, 2.4, 2.9];
const W = 560, H = 210;
const x = (i) => 40 + (i * (W - 60)) / 5;
const y = (v) => H - 30 - (v / 3.2) * (H - 50);
const STATS = [["Total patients", "1,256", "#1b4a8c"], ["Dentists", "12", "#0f9d8a"], ["Receptionists", "5", "#7a5af8"], ["Appointments", "2,480", "#1b4a8c"], ["Total revenue", "UGX 12.5M", "#0f9d8a"], ["Outstanding", "UGX 850K", "#c0392b"]];
const TOP = [["Dental Cleaning", 32], ["Dental Filling", 28], ["Tooth Extraction", 20], ["Consultation", 20]];

export default function Dashboard() {
  return (
    <Layout id="dashboard">
      <p className="lead">Clinic activity at a glance. Figures below are sample data.</p>
      <div className="stats">
        {STATS.map(([l, v, c]) => (
          <div key={l} className="stat" style={{ "--c": c }}><span>{l}</span><b>{v}</b></div>
        ))}
      </div>
      <div className="two">
        <div className="card">
          <h2>Revenue overview (UGX millions)</h2>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Revenue rising from 1.4 to 2.9 million UGX between January and June">
            <g stroke="var(--line)">{[0, 1, 2, 3].map((g) => <line key={g} x1="40" x2={W - 20} y1={y(g)} y2={y(g)} />)}</g>
            <g fill="var(--mut)" fontSize="11">
              {[0, 1, 2, 3].map((g) => <text key={g} x="8" y={y(g) + 4}>{g}M</text>)}
              {M.map((n, i) => <text key={n} x={x(i)} y={H - 8} textAnchor="middle">{n}</text>)}
            </g>
            <polyline points={V.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke="var(--navy2)" strokeWidth="3" strokeLinejoin="round" />
            {V.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r="4" fill="var(--card)" stroke="var(--navy2)" strokeWidth="2"><title>{M[i]}: UGX {v}M</title></circle>
            ))}
          </svg>
        </div>
        <div className="card">
          <h2>Top services</h2>
          {TOP.map(([n, v]) => (
            <div key={n} className="bar"><div><span>{n}</span><b>{v}%</b></div><i><s style={{ width: v * 3 + "%" }} /></i></div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2>Recent clinic activity</h2>
        {P["audit-logs"].rows.map((r) => (
          <div key={r.time + r.record} className="li"><b>{r.action}</b> · {r.record}<br /><small>{r.actor}, {r.time}</small></div>
        ))}
      </div>
      <div className="note">Sample data only. Connect each screen to the Django REST API and enforce role permissions on the backend.</div>
    </Layout>
  );
}
