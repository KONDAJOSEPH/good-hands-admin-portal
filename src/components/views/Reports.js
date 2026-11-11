"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "@/lib/util";

const R = {
  Appointments: [["Total", 214], ["Completed", 168], ["Cancelled", 21], ["Conflicts", 3]],
  Patients: [["New registrations", 47], ["Active patients", 1182], ["Inactive", 74]],
  Revenue: [["Collected", "UGX 3.1M"], ["Outstanding", "UGX 850K"], ["Average per visit", "UGX 58,000"]],
  Payments: [["Mobile money", 96], ["Cash", 71], ["Card", 47]],
  Services: [["Dental Cleaning", "32%"], ["Dental Filling", "28%"], ["Tooth Extraction", "20%"], ["Consultation", "20%"]],
  "Dentist activity": [["Dr. Okello James", 92], ["Dr. Nakato Ruth", 76], ["Dr. Opio Samuel", 46]],
};

export default function Reports() {
  const [type, setType] = useState("Appointments");
  const [from, setFrom] = useState("2026-10-01");
  const [to, setTo] = useState("2026-11-12");
  const [out, setOut] = useState(null);

  const generate = () => {
    if (!from || !to || from > to) { toast("Choose a valid date range"); return; }
    setOut(R[type]);
    toast(type + " report ready");
  };

  return (
    <Layout id="reports">
      <p className="lead">Generate date-filtered reports. Choose a report and a period.</p>
      <div className="card">
        <div className="tools" style={{ margin: 0 }}>
          <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Report type">
            {Object.keys(R).map((k) => <option key={k}>{k}</option>)}
          </select>
          <label>From <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></label>
          <label>To <input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></label>
          <button className="btn" onClick={generate}>Generate report</button>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        {out ? (
          <>
            <div className="stats">
              {out.map(([l, v]) => <div key={l} className="stat"><span>{l}</span><b>{v}</b></div>)}
            </div>
            <button className="btn alt" onClick={() => window.print()}>Print report</button>
          </>
        ) : (
          <div className="empty">Pick a report and select Generate report.</div>
        )}
      </div>
    </Layout>
  );
}
