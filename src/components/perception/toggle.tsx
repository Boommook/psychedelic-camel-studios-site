"use client";
import { useSyncExternalStore } from "react";
import { Eye, Sparkles } from "lucide-react";
const event = "perception-change";
function subscribe(callback: () => void) {
  window.addEventListener(event, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(event, callback);
    window.removeEventListener("storage", callback);
  };
}
function snapshot() {
  return document.documentElement.dataset.perception === "altered";
}
export function PerceptionToggle() {
  const altered = useSyncExternalStore(subscribe, snapshot, () => false);
  function toggle() {
    const value = altered ? "normal" : "altered";
    document.documentElement.dataset.perception = value;
    try {
      localStorage.setItem("perception", value);
    } catch {
      /* Storage can be unavailable; keep the in-memory theme. */
    }
    window.dispatchEvent(new Event(event));
  }
  return (
    <button
      className="perception-toggle"
      role="switch"
      aria-checked={altered}
      aria-label="Altered perception"
      onClick={toggle}
    >
      <Eye size={15} />
      <span className={!altered ? "selected" : ""}>Normal</span>
      <span className="toggle-track">
        <span />
      </span>
      <span className={altered ? "selected" : ""}>Altered</span>
      <Sparkles size={13} />
    </button>
  );
}
