"use client";

import { useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import { P } from "@/lib/sample";
import { fetchRows } from "@/lib/api";
import { bc, fmt, toast } from "@/lib/util";

function Fields({ fields, vals, set, errs = {} }) {
  return fields.map(([k, label, type, options]) => (
    <label key={k}>
      {label}
      {type === "select" ? (
        <select value={vals[k] ?? options[0]} onChange={(e) => set(k, e.target.value)}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={vals[k] ?? ""} onChange={(e) => set(k, e.target.value)} />
      )}
      {errs[k] && <span className="err">{errs[k]}</span>}
    </label>
  ));
}

const missing = (p, o) => p.fields.filter(([k, , t]) => t !== "select" && !String(o[k] ?? "").trim());
const complete = (p, o) => {
  const r = { ...o };
  p.fields.forEach(([k, , t, opts]) => {
    if (t === "select" && r[k] == null) r[k] = opts[0];
    if (t === "number") r[k] = +r[k];
  });
  return r;
};

export default function DataPage({ id }) {
  const p = P[id];
  const dlg = useRef(null);
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [st, setSt] = useState("");
  const [draft, setDraft] = useState({});
  const [ed, setEd] = useState(null);
  const [errs, setErrs] = useState({});

  useEffect(() => {
    let live = true;
    setRows(null); setError(""); setQ(""); setSt(""); setDraft({});
    fetchRows(id).then((r) => live && setRows(r)).catch((e) => live && setError(e.message));
    return () => { live = false; };
  }, [id]);

  const list = rows || [];
  const count = (c) => list.filter((r) => bc(r.status) === c).length;
  const statuses = [...new Set(list.map((r) => r.status))];
  const shown = list
    .map((r, i) => [r, i])
    .filter(([r]) => (!st || r.status === st) && Object.values(r).join(" ").toLowerCase().includes(q.toLowerCase()));
  const hasActions = !p.ro || p.verify;
  const cards = rows && [["Total", list.length, "b", "▦"], ["Pending", count("w"), "o", "◷"], ["Active", count("g"), "g", "✓"]]
    .map(([l, n, c, icon]) => (
      <div key={l} className={"sc " + c}><i>{icon}</i><div><small>{l}</small><b>{n}</b></div></div>
    ));

  const update = (i, patch) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const add = (e) => {
    e.preventDefault();
    if (missing(p, draft).length) { toast("Fill in every field"); return; }
    setRows((rs) => [complete(p, draft), ...rs]);
    setDraft({});
    toast("Saved");
  };
  const openEdit = (i) => { setEd({ i, vals: rows[i] }); setErrs({}); dlg.current.showModal(); };
  const save = (e) => {
    e.preventDefault();
    const m = missing(p, ed.vals);
    if (m.length) { setErrs(Object.fromEntries(m.map(([k, l]) => [k, l + " is required."]))); return; }
    update(ed.i, complete(p, ed.vals));
    dlg.current.close();
    toast("Changes saved");
  };
  const toggle = (i) => {
    const on = rows[i].status === "Active";
    update(i, { status: on ? "Inactive" : "Active" });
    toast(on ? "Account deactivated" : "Account activated");
  };

  let body;
  if (error) body = <div className="empty"><b>Could not load data</b><br />{error}</div>;
  else if (!rows) body = <><div className="sk" /><div className="sk" /><div className="sk" /></>;
  else if (!shown.length) body = <div className="empty"><b>Nothing matches</b><br />Clear the search or change the filter.</div>;
  else body = (
    <table>
      <thead>
        <tr>{p.cols.map(([k, l]) => <th key={k}>{l}</th>)}{hasActions && <th />}</tr>
      </thead>
      <tbody>
        {shown.map(([r, i]) => {
          const on = r.status === "Active";
          return (
            <tr key={i}>
              {p.cols.map(([k]) => (
                <td key={k}>{k === "status" ? <span className={"b " + bc(r[k])}>{r[k]}</span> : fmt(r[k])}</td>
              ))}
              {hasActions && (
                <td className="act">
                  {p.verify ? (
                    r.status === "Pending" && (
                      <button className="vf" onClick={() => { update(i, { status: "Verified" }); toast("Receipt verified"); }}>Verify</button>
                    )
                  ) : (
                    <>
                      <button className="ic" onClick={() => openEdit(i)} aria-label="Edit" title="Edit">✎</button>
                      {!p.edit && (
                        <button className={"ic " + (on ? "x" : "ok")} onClick={() => toggle(i)} aria-label={on ? "Deactivate" : "Activate"} title={on ? "Deactivate" : "Activate"}>
                          {on ? "⊘" : "↺"}
                        </button>
                      )}
                    </>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <Layout id={id} cards={cards}>
      <p className="lead">{p.d}</p>
      {p.add && (
        <form className="panel" onSubmit={add} noValidate>
          <h2>+ {p.add}</h2>
          <div className="fr">
            <Fields fields={p.fields} vals={draft} set={(k, v) => setDraft((d) => ({ ...d, [k]: v }))} />
            <button className="btn">{p.add}</button>
          </div>
        </form>
      )}
      <div className="tools">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${p.t.split(" ")[0].toLowerCase()}…`} aria-label="Search" />
        <div className="chips">
          {["", ...statuses].map((s) => (
            <button key={s || "all"} className={"chip" + (st === s ? " on" : "")} onClick={() => setSt(s)}>{s || "All"}</button>
          ))}
        </div>
      </div>
      <div className="tw">{body}</div>
      {id === "treatment-records" && (
        <div className="note">Administrative visibility does not mean unrestricted access to clinical notes. Least-privilege rules apply and views are logged by the backend.</div>
      )}
      <dialog ref={dlg}>
        <form className="f" onSubmit={save}>
          <h2 style={{ margin: 0 }}>Edit record</h2>
          {ed && <Fields fields={p.fields} vals={ed.vals} set={(k, v) => setEd((s) => ({ ...s, vals: { ...s.vals, [k]: v } }))} errs={errs} />}
          <div className="row">
            <button type="button" className="btn alt" onClick={() => dlg.current.close()}>Cancel</button>
            <button className="btn">Save changes</button>
          </div>
        </form>
      </dialog>
    </Layout>
  );
}
