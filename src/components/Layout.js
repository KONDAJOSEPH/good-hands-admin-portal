"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { P, ORDER } from "@/lib/sample";
import { toast } from "@/lib/util";

export default function Layout({ id, cards, children }) {
  const pathname = usePathname();
  const nav = useRef(null);
  const page = P[id];

  useEffect(() => {
    nav.current?.querySelector("a.on")?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [id]);

  const flipTheme = () => {
    const r = document.documentElement;
    const dark = r.dataset.theme === "dark" || (!r.dataset.theme && matchMedia("(prefers-color-scheme:dark)").matches);
    r.dataset.theme = dark ? "light" : "dark";
  };

  return (
    <>
      <div className="app">
        <header className="hero">
          <div className="hrow">
            <img className="logo" src="/logo.jpg" alt="Good Hands Dental Care logo" />
            <div className="ttl"><b>Admin</b><small>Good Hands Dental Care</small></div>
            <span className="sp" />
            <button className="ib" onClick={flipTheme} aria-label="Switch theme">◐</button>
            <Link href="/notifications" className="ib" aria-label="Notifications" style={{ display: "grid", placeItems: "center", textDecoration: "none" }}>
              🔔<i className="dot" />
            </Link>
            <span className="who">Welcome, <b>Administrator</b></span>
            <Link className="av" href="/admin-profile" aria-label="Admin profile">AN</Link>
            <a href="#" className="lo" onClick={(e) => { e.preventDefault(); toast("Log out is handled by your auth backend"); }}>Log out</a>
          </div>
          <nav className="pills" ref={nav} aria-label="Main">
            {ORDER.map((k) => (
              <Link key={k} href={"/" + k} className={pathname === "/" + k ? "on" : ""}>
                {P[k].t.replace(" management", "")}
              </Link>
            ))}
          </nav>
        </header>
        <main>
          <div className="ph">
            <div className="pt"><h1>{page.t}</h1></div>
            <div className="cards">{cards}</div>
          </div>
          <div className="wrap">{children}</div>
        </main>
      </div>
      <div id="toast" role="status" />
    </>
  );
}
