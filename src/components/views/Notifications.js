"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { NOTES } from "@/lib/sample";
import { toast } from "@/lib/util";

export default function Notifications() {
  const [list, setList] = useState(NOTES);
  const publish = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    setList((l) => [{ t: f.elements.t.value, s: "Announcement · just now" }, ...l]);
    f.reset();
    toast("Published");
  };

  return (
    <Layout id="notifications">
      <p className="lead">System notifications and clinic announcements.</p>
      <div className="two" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card">
          <h2>Notifications</h2>
          {list.length ? list.map((n, i) => (
            <div key={i} className="li"><b>{n.t}</b><br /><small>{n.s}</small></div>
          )) : <div className="empty">No notifications yet.</div>}
        </div>
        <div className="card">
          <h2>New announcement</h2>
          <form className="f" onSubmit={publish}>
            <label>Title<input name="t" required /></label>
            <label>Message<textarea name="m" rows="3" /></label>
            <div className="row"><button className="btn">Publish announcement</button></div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
