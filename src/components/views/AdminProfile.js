"use client";

import Layout from "@/components/Layout";
import { toast } from "@/lib/util";

export default function AdminProfile() {
  const saveDetails = (e) => { e.preventDefault(); toast("Changes saved"); };
  const changePassword = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form));
    if (f.n1 !== f.n2) { toast("New passwords do not match"); return; }
    form.reset();
    toast("Password updated");
  };

  return (
    <Layout id="admin-profile">
      <p className="lead">Your administrator details and password.</p>
      <div className="two" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <form className="card f" onSubmit={saveDetails}>
          <h2>Details</h2>
          <label>Full name<input defaultValue="Namuli Grace" required /></label>
          <label>Email<input type="email" defaultValue="grace@goodhands.ug" required /></label>
          <div className="row"><button className="btn">Save changes</button></div>
        </form>
        <form className="card f" onSubmit={changePassword}>
          <h2>Change password</h2>
          <label>Current password<input type="password" name="cur" required /></label>
          <label>New password<input type="password" name="n1" minLength={8} required /></label>
          <label>Confirm new password<input type="password" name="n2" required /></label>
          <div className="row"><button className="btn">Update password</button></div>
        </form>
      </div>
    </Layout>
  );
}
