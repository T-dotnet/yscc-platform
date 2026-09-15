import { useState, useEffect, useRef } from "react";
import {
  House,
  Users,
  ChartNoAxesColumnIncreasing,
  Settings,
  CircleHelp,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Logo, Avatar } from "./UI";
import { useStore } from "../store";
import { currentStaff } from "../model";
const links = [
  ["/", "My work", House],
  ["/people", "People", Users],
  ["/quality", "Data quality", ChartNoAxesColumnIncreasing],
  ["/administration", "Administration", Settings],
];
export default function Shell({
  path,
  navigate,
  qualityCount,
  children,
  openModal,
  storageError,
}) {
  const { state } = useStore();
  const staff = currentStaff(state);
  const [mobile, setMobile] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    if (!mobile) return;
    menuRef.current?.querySelector(".mobile-only")?.focus();
    const handle = (event) => {
      if (event.key === "Escape") setMobile(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [mobile]);
  const active = path.startsWith("/people") ? "/people" : path;
  const go = (p) => {
    navigate(p);
    setMobile(false);
  };
  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {mobile && (
        <button
          className="menu-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <aside ref={menuRef} className={`sidebar ${mobile ? "open" : ""}`}>
        <div className="brand-row">
          <Logo />
          <button
            className="icon-button mobile-only"
            aria-label="Close navigation"
            onClick={() => setMobile(false)}
          >
            <X />
          </button>
        </div>
        <button className="scope" onClick={() => openModal({ type: "scope" })}>
          <strong>Northside Centre</strong>
          <ChevronDown size={16} />
          <span>Your workspace</span>
        </button>
        <nav aria-label="Main navigation">
          {links.map(([href, label, Icon]) => (
            <button
              key={href}
              className={`nav-item ${active === href ? "active" : ""}`}
              onClick={() => go(href)}
              aria-current={active === href ? "page" : undefined}
            >
              <Icon
                size={21}
                strokeWidth={1.8}
                fill={active === "/" && href === "/" ? "currentColor" : "none"}
              />
              <span>{label}</span>
              {href === "/quality" && qualityCount > 0 && (
                <span className="nav-count">{qualityCount}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className={`nav-item ${active === "/help" ? "active" : ""}`}
            aria-current={active === "/help" ? "page" : undefined}
            onClick={() => go("/help")}
          >
            <CircleHelp size={21} />
            <span>Help & guidance</span>
          </button>
          <button
            className="profile"
            onClick={() => openModal({ type: "profile" })}
          >
            <Avatar name={staff?.name || "Staff"} />
            <span>
              <strong>{staff?.name || "Staff"}</strong>
              <small>{staff?.role || "Unavailable"}</small>
            </span>
            <ChevronRight size={20} />
          </button>
        </div>
      </aside>
      <div className="app-body" inert={mobile || undefined}>
        <header className="topbar">
          <button
            className="icon-button mobile-only"
            aria-label="Open navigation"
            onClick={() => setMobile(true)}
          >
            <Menu />
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <span>
              {links.find((l) => l[0] === active)?.[1] || "Help & guidance"}
            </span>
            {path.startsWith("/people/") && (
              <>
                <span>/</span>
                <span>{path.split("/")[2]}</span>
              </>
            )}
          </div>
          <div className="topbar-right">
            <span>Prototype · sample data</span>
            <button
              className="icon-button"
              aria-label="About this prototype"
              onClick={() => openModal({ type: "about" })}
            >
              <CircleHelp size={20} />
            </button>
          </div>
        </header>
        <main id="main" className="main" tabIndex={-1}>
          {storageError && (
            <div className="error-banner" role="alert">
              Changes are only held in this open tab. Browser storage is
              unavailable; keep the tab open to retain your work.
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
