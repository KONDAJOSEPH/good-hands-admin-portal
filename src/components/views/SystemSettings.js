"use client";

import Layout from "@/components/Layout";
import { toast } from "@/lib/util";

export default function SystemSettings() {
  const save = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    if (f.o >= f.c) { toast("Closing time must be after opening time"); return; }
    toast("Settings saved");
  };

  return (
    <Layout id="system-settings">
      <p className="lead">Clinic information, operating hours and appointment rules.</p>
      <form className="card f" onSubmit={save}>
        <div className="fgrid">
          <label>Clinic name<input name="n" defaultValue="Good Hands Dental Care" required /></label>
          <label>Phone<input name="p" defaultValue="+256 700 000 000" /></label>
          <label>Opening time<input type="time" name="o" defaultValue="08:00" /></label>
          <label>Closing time<input type="time" name="c" defaultValue="17:00" /></label>
          <label>Appointment length<select name="l"><option>30 minutes</option><option>45 minutes</option><option>60 minutes</option></select></label>
          <label>Cancel allowed up to<select name="x"><option>2 hours before</option><option>24 hours before</option></select></label>
        </div>
        <div className="row"><button className="btn">Save settings</button></div>
      </form>
    </Layout>
  );
}
