import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   BRAND
   ═══════════════════════════════════════════ */
const B = {
  accent: "#d9ff00", bg: "#030303",
  fontD: "'Syne', sans-serif", fontB: "'Outfit', system-ui, sans-serif",
};

/* ═══════════════════════════════════════════
   MODEL CATALOG — 221 models organized
   ═══════════════════════════════════════════ */
const MODEL_CATEGORIES = [
  { label: "Image Generation", count: 42, color: "#d9ff00", icon: "🖼",
    models: ["Midjourney V7","Flux Dev","Flux 2 Pro","Flux Schnell","Google Imagen 4","Google Imagen 4 Ultra","Ideogram V3","GPT-4o","GPT Image 1.5","SeedDream V4","SeedDream V4.5","SeedDream V5","HiDream Fast","HiDream Full","SDXL","Nano Banana Pro","Nano Banana 2","Flux Kontext Pro","Flux Kontext Max","Hunyuan 3.0","Chroma","Qwen Image","Reve","Grok Imagine","Wan 2.6","Vidu Q2"] },
  { label: "Video Generation", count: 68, color: "#00d4ff", icon: "🎬",
    models: ["Kling 3.0 Pro","Kling 2.6 Pro","Veo 3.1","Veo 3","Sora 2 Pro","Runway Act Two","MiniMax Hailuo 2.3","Wan 2.6","Wan 2.5","LTX 2 Pro","Seedance 2.0","Seedance 1.5 Pro","PixVerse 5.5","Grok Imagine","Hunyuan Fast","LeonardoAI Motion 2.0","Vidu Q2 Pro","OVI","Higgsfield DOP"] },
  { label: "Image-to-Image", count: 38, color: "#ff6b9d", icon: "🔄",
    models: ["Flux Kontext Pro I2I","Flux Kontext Max I2I","Midjourney V7 I2I","GPT-4o Edit","GPT Image 1.5 Edit","Nano Banana Edit","Flux 2 Pro Edit","Flux 2 Dev Edit","SeedDream V4.5 Edit","Qwen Image Edit Plus","Ghibli Style","Face Swap","Dress Change","Skin Enhancer","Product Photography"] },
  { label: "Image-to-Video", count: 42, color: "#a78bfa", icon: "✨",
    models: ["Kling 3.0 I2V","Kling O1 I2V","Veo 3.1 I2V","Runway I2V","MiniMax Hailuo 2.3 I2V","Wan 2.6 I2V","Seedance 2.0 I2V","PixVerse 5.5 I2V","LTX 2 Pro I2V","Midjourney V7 I2V","Sora 2 I2V","Grok Imagine I2V","Hunyuan I2V"] },
  { label: "Lip Sync", count: 8, color: "#f472b6", icon: "🎙",
    models: ["Hailuo LipSync","Sync LipSync","LTX 2.3 LipSync","Wan 2.2 Speech","Createify LipSync","VEED LipSync","Latent Sync","InfiniteTalk"] },
  { label: "Video Tools", count: 12, color: "#34d399", icon: "🛠",
    models: ["Watermark Remover","Image Upscaler (Topaz)","Image Upscaler (SeedVR2)","Background Remover","Object Eraser","Image Extension","Video Effects","Motion Controls","Color Photo","Add Watermark"] },
  { label: "Cinema & Reference", count: 11, color: "#fbbf24", icon: "🎥",
    models: ["Kling O1 Reference","Kling O1 Standard Ref","Veo 3.1 Reference","MiniMax Subject Ref","Midjourney V7 Style Ref","Midjourney V7 Omni Ref","Vidu Q1 Reference","Vidu Q2 Reference","Wan 2.1 Reference","Ideogram Character"] },
];

const TOTAL_MODELS = 221;

/* ═══════════════════════════════════════════
   T2I / T2V / LIPSYNC MODELS (for studios)
   ═══════════════════════════════════════════ */
const T2I_MODELS = [
  { id:"nano-banana-pro", name:"Nano Banana Pro", endpoint:"nano-banana-pro", ars:["1:1","3:4","4:3","9:16","16:9","3:2","2:3","5:4","4:5","21:9"] },
  { id:"flux-schnell", name:"Flux Schnell", endpoint:"flux-schnell-image", ars:["1:1","16:9","9:16","4:3","3:2"] },
  { id:"flux-dev", name:"Flux Dev", endpoint:"flux-dev-image", ars:[] },
  { id:"midjourney-v7-text-to-image", name:"Midjourney V7", endpoint:"midjourney-v7-text-to-image", ars:["1:1","16:9","9:16","4:3","3:4"] },
  { id:"google-imagen4", name:"Google Imagen 4", endpoint:"google-imagen4", ars:["1:1","16:9","9:16","4:3","3:4","3:2","2:3"] },
  { id:"ideogram-v3-t2i", name:"Ideogram V3", endpoint:"ideogram-v3-t2i", ars:["1:1","16:9","9:16","4:3","3:4"] },
  { id:"gpt4o-text-to-image", name:"GPT-4o Image", endpoint:"gpt4o-text-to-image", ars:["1:1","16:9","9:16"] },
  { id:"bytedance-seedream-v4", name:"SeedDream V4", endpoint:"bytedance-seedream-v4", ars:["1:1","16:9","9:16","4:3","3:4"] },
  { id:"hidream-i1-fast", name:"HiDream Fast", endpoint:"hidream-i1-fast", ars:["1:1","16:9","9:16","4:3","3:4","3:2","2:3"] },
  { id:"sdxl-image", name:"SDXL", endpoint:"sdxl-image", ars:[] },
  { id:"flux-2-dev", name:"Flux 2 Dev", endpoint:"flux-2-dev", ars:["1:1","16:9","9:16","4:3","3:4"] },
  { id:"hunyuan-image-3.0", name:"Hunyuan 3.0", endpoint:"hunyuan-image-3.0", ars:["1:1","16:9","9:16","4:3","3:4"] },
];
const T2V_MODELS = [
  { id:"kling-v3.0-pro-text-to-video", name:"Kling 3.0 Pro", endpoint:"kling-v3.0-pro-text-to-video", ars:["16:9","9:16","1:1"], durations:[5,10] },
  { id:"veo3.1-text-to-video", name:"Veo 3.1", endpoint:"veo3.1-text-to-video", ars:["16:9","9:16"], durations:[8] },
  { id:"wan2.6-text-to-video", name:"Wan 2.6", endpoint:"wan2.6-text-to-video", ars:["16:9","9:16","1:1"], durations:[5] },
  { id:"minimax-hailuo-2.3-pro-t2v", name:"MiniMax 2.3 Pro", endpoint:"minimax-hailuo-2.3-pro-t2v", ars:["16:9","9:16","1:1"], durations:[5,10] },
  { id:"seedance-v2.0-t2v", name:"Seedance 2.0", endpoint:"seedance-v2.0-t2v", ars:["16:9","9:16","1:1"], durations:[5] },
  { id:"openai-sora-2-pro-text-to-video", name:"Sora 2 Pro", endpoint:"openai-sora-2-pro-text-to-video", ars:["16:9","9:16","1:1"], durations:[5,10] },
];
const LIPSYNC_MODELS = [
  { id:"sync-lipsync", name:"Sync LipSync", endpoint:"sync-lipsync", type:"image" },
  { id:"ltx-2.3-lipsync", name:"LTX 2.3 LipSync", endpoint:"ltx-2.3-lipsync", type:"image" },
  { id:"wan2.2-speech-to-video", name:"Wan Speech-to-Video", endpoint:"wan2.2-speech-to-video", type:"video" },
];
const CAMERA_MAP = { "Modular 8K Digital":"modular 8K digital cinema camera", "Full-Frame Cine":"full-frame digital cinema camera", "Grand Format 70mm":"grand format 70mm film camera", "Studio S35":"Super 35 studio digital camera", "Classic 16mm Film":"classic 16mm film camera" };
const LENS_MAP = { "Creative Tilt":"creative tilt lens effect", "Compact Anamorphic":"compact anamorphic lens", "Extreme Macro":"extreme macro lens", "70s Cinema Prime":"1970s cinema prime lens", "Classic Anamorphic":"classic anamorphic lens", "Premium Modern":"premium modern prime lens" };
const QUICK_PROMPTS = [
  { label:"Portrait", prompt:"Professional portrait photograph, shallow depth of field, soft studio lighting, 85mm lens" },
  { label:"Landscape", prompt:"Breathtaking landscape photograph, golden hour, wide angle, dramatic clouds, 4K" },
  { label:"Fantasy", prompt:"Epic fantasy scene, magical atmosphere, volumetric lighting, highly detailed, concept art" },
  { label:"Sci-Fi", prompt:"Futuristic sci-fi environment, neon lights, cyberpunk city, rain reflections, cinematic" },
  { label:"Fashion", prompt:"High fashion editorial, avant-garde styling, studio lighting, Vogue aesthetic, professional" },
  { label:"Product", prompt:"Commercial product photography, clean white background, studio lighting, professional" },
];
const ENHANCE_TAGS = { quality:["ultra-detailed","8K resolution","award-winning"], lighting:["cinematic lighting","golden hour","neon glow"], mood:["moody atmosphere","epic and dramatic","dark and mysterious"], style:["photorealistic","concept art","anime style"] };

/* ═══════════════════════════════════════════ ICONS ═══════════════════════════════════════════ */
const I = {
  image: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  video: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  lipsync: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  cinema: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
  key: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.25-2.25"/></svg>,
  send: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  download: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  sparkle: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/></svg>,
  chevron: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  arrow: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
};

/* ═══════════════════════════════════════════ FAVICON ═══════════════════════════════════════════ */
function SetFavicon() {
  useEffect(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#d9ff00"/><text x="16" y="23" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="20" fill="#000">U</text></svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.href = url;
    document.title = "USRFRNDLY.AI — AI Creative Studio";
  }, []);
  return null;
}

/* ═══════════════════════════════════════════ LOGO ═══════════════════════════════════════════ */
function Logo({ size = 28 }) {
  return (
    <div style={{ width: size, height: size, background: B.accent, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(217,255,0,0.2)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)" }} />
      <span style={{ fontFamily: B.fontD, fontSize: size * 0.5, fontWeight: 800, color: "#000", lineHeight: 1, position: "relative" }}>U</span>
    </div>
  );
}

/* ═══════════════════════════════════════════ API CLIENT (hits your backend) ═══════════════════════════════════════════ */
import { supabase, signUp, signIn, signInWithGoogle, signOut, getSession, getUser, getCredits as fetchCredits } from './lib/supabase.js';

const api = {
  async gen(endpoint, payload, type = "image") {
    const session = await getSession();
    if (!session) throw new Error("Please sign in to generate");

    // Step 1: Submit (backend checks credits, deducts, sends to Muapi)
    const r = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${session.access_token}` },
      body: JSON.stringify({ endpoint, payload, type }),
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || `Error: ${r.status}`);

    // If result came back directly (no polling needed)
    if (d.url) return d;

    const requestId = d.request_id || d.id;
    if (!requestId) return d;

    // Step 2: Poll via backend (keeps Muapi key hidden)
    for (let i = 0; i < 150; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const pollRes = await fetch(`/api/poll?id=${requestId}`);
      const pollData = await pollRes.json();

      if (pollData.status === "completed") {
        return pollData;
      }
      if (pollData.status === "failed") {
        throw new Error(pollData.error || "Generation failed");
      }
      // Otherwise keep polling
    }
    throw new Error("Generation timed out");
  },
  async getCredits() {
    const session = await getSession();
    if (!session) return 0;
    const r = await fetch("/api/credits", { headers: { "Authorization": `Bearer ${session.access_token}` } });
    const d = await r.json();
    return d.credits || 0;
  }
};

/* ═══════════════════════════════════════════ DROPDOWN ═══════════════════════════════════════════ */
function DD({ label, value, options, onChange, render }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 9, padding: "7px 13px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, fontFamily: B.fontB, whiteSpace: "nowrap" }}>
        {label && <span style={{ color: "#27272a", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>{label}</span>}
        <span>{value}</span>
        <span style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s", display: "flex" }}>{I.chevron}</span>
      </button>
      {open && <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, minWidth: 200, maxHeight: 280, overflowY: "auto", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 4, zIndex: 100, boxShadow: "0 20px 60px -12px rgba(0,0,0,0.95)" }}>
        {options.map((o, i) => { const v = typeof o === "string" ? o : o.id; const a = v === value || (typeof value === "string" && typeof o !== "string" && o.name === value);
          return <button key={i} onClick={() => { onChange(o); setOpen(false); }} style={{ width: "100%", textAlign: "left", padding: "9px 13px", background: a ? "rgba(217,255,0,0.04)" : "transparent", border: "none", borderRadius: 9, color: a ? B.accent : "#a1a1aa", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "block", fontFamily: B.fontB }}>{render ? render(o) : (typeof o === "string" ? o : o.name)}</button>;
        })}
      </div>}
    </div>
  );
}

/* ═══════════════════════════════════════════ AUTH MODAL ═══════════════════════════════════════════ */
function AuthModal({ onClose, onAuth }) {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !pw) { setErr("Enter email and password"); return; }
    setLoading(true); setErr(null);
    try {
      if (mode === "signup") {
        await signUp(email, pw);
        setErr(null);
        setMode("check_email");
      } else {
        await signIn(email, pw);
        onAuth();
        onClose();
      }
    } catch (e) { setErr(e.message); }
    setLoading(false);
  };

  const handleGoogle = async () => {
    try { await signInWithGoogle(); } catch (e) { setErr(e.message); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 22, padding: 36, width: "90%", maxWidth: 420, boxShadow: "0 40px 100px -20px rgba(0,0,0,0.95)", animation: "fadeUp 0.3s ease-out" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <Logo size={26} />
          <h2 style={{ fontFamily: B.fontD, fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "0.04em" }}>
            {mode === "check_email" ? "CHECK EMAIL" : mode === "signup" ? "SIGN UP" : "SIGN IN"}
          </h2>
        </div>

        {mode === "check_email" ? (
          <div>
            <p style={{ fontSize: 14, color: "#a1a1aa", marginBottom: 20, marginTop: 16, lineHeight: 1.7, fontFamily: B.fontB }}>
              We sent a confirmation link to <span style={{ color: B.accent, fontWeight: 700 }}>{email}</span>. Click it to activate your account, then come back and sign in.
            </p>
            <button onClick={() => setMode("signin")} style={{ width: "100%", padding: 14, background: B.accent, border: "none", borderRadius: 11, color: "#000", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: B.fontB, boxShadow: "0 0 20px rgba(217,255,0,0.2)" }}>Back to Sign In</button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: "#27272a", marginBottom: 24, lineHeight: 1.7, fontFamily: B.fontB }}>
              {mode === "signup" ? "Create your account to start generating." : "Sign in to your account."}
              {" "}<span style={{ color: "#52525b" }}>5 free credits on signup.</span>
            </p>

            <button onClick={handleGoogle} style={{ width: "100%", padding: 13, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 11, color: "#a1a1aa", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: B.fontB, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
              <span style={{ fontSize: 11, color: "#27272a", fontFamily: B.fontB }}>or</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
            </div>

            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 11, color: "#fff", fontSize: 14, fontFamily: B.fontB, outline: "none", marginBottom: 10, boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = "rgba(217,255,0,0.2)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.05)"} />

            <input value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" type="password" onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }} style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 11, color: "#fff", fontSize: 14, fontFamily: B.fontB, outline: "none", marginBottom: 16, boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = "rgba(217,255,0,0.2)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.05)"} />

            {err && <p style={{ color: "#ef4444", fontSize: 12, marginBottom: 12, fontFamily: B.fontB }}>{err}</p>}

            <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: 14, background: B.accent, border: "none", borderRadius: 11, color: "#000", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: B.fontB, boxShadow: "0 0 20px rgba(217,255,0,0.2)", marginBottom: 12, opacity: loading ? 0.6 : 1 }}>
              {loading ? "Loading..." : mode === "signup" ? "Create Account" : "Sign In"}
            </button>

            <p style={{ fontSize: 12, color: "#3f3f46", textAlign: "center", fontFamily: B.fontB }}>
              {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
              <span onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setErr(null); }} style={{ color: B.accent, cursor: "pointer", fontWeight: 700 }}>
                {mode === "signup" ? "Sign in" : "Sign up free"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ RESULT + PROMPT BAR ═══════════════════════════════════════════ */
function Result({ result, type }) {
  if (!result?.url) return null;
  const v = type === "video" || type === "lipsync";
  return (
    <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", maxWidth: 680, width: "100%", margin: "0 auto", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 20px 60px -12px rgba(0,0,0,0.8)" }}>
      {v ? <video src={result.url} controls autoPlay loop muted style={{ width: "100%", display: "block" }} /> : <img src={result.url} alt="" style={{ width: "100%", display: "block" }} />}
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <a href={result.url} download target="_blank" rel="noreferrer" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9, padding: "7px 12px", color: "#fff", textDecoration: "none", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, fontFamily: B.fontB }}>{I.download} Save</a>
      </div>
    </div>
  );
}

function PBar({ prompt, setPrompt, onGo, busy, children, ph }) {
  return (
    <div style={{ background: "rgba(8,8,8,0.96)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 20, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 28px 56px -12px rgba(0,0,0,0.85)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onGo(); } }} placeholder={ph || "Describe what you want to create..."} rows={1} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14, fontWeight: 500, resize: "none", lineHeight: 1.6, maxHeight: 100, fontFamily: B.fontB }} />
        <button onClick={onGo} disabled={busy || !prompt.trim()} style={{ width: 42, height: 42, borderRadius: 12, background: prompt.trim() ? B.accent : "rgba(255,255,255,0.02)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: prompt.trim() ? "pointer" : "default", flexShrink: 0, color: prompt.trim() ? "#000" : "#1a1a1a", boxShadow: prompt.trim() ? "0 0 16px rgba(217,255,0,0.15)" : "none", transition: "all 0.2s" }}>{I.send}</button>
      </div>
      {children}
    </div>
  );
}

function Spin({ t, n }) {
  return <div style={{ textAlign: "center", marginBottom: 36, marginTop: 44, animation: "fadeUp 0.4s ease-out" }}><div style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid rgba(217,255,0,0.06)", borderTopColor: B.accent, animation: "spin 0.65s linear infinite", margin: "0 auto 20px" }} /><p style={{ color: B.accent, fontSize: 13, fontWeight: 700, fontFamily: B.fontB }}>{t}</p><p style={{ color: "#1a1a1a", fontSize: 11, marginTop: 5, fontFamily: B.fontB }}>{n}</p></div>;
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
function HomePage({ goTo, openAuth, user }) {
  const [countUp, setCountUp] = useState(0);
  useEffect(() => { let n = 0; const iv = setInterval(() => { n += 3; if (n >= TOTAL_MODELS) { n = TOTAL_MODELS; clearInterval(iv); } setCountUp(n); }, 12); return () => clearInterval(iv); }, []);

  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ minHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px 40px", position: "relative" }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(217,255,0,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", right: "15%", width: 300, height: 300, background: "radial-gradient(circle, rgba(0,212,255,0.02) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ animation: "fadeUp 0.6s ease-out", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(217,255,0,0.04)", border: "1px solid rgba(217,255,0,0.08)", borderRadius: 20, marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: B.accent, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: B.accent, fontFamily: B.fontB, letterSpacing: "0.08em" }}>{countUp}+ AI MODELS LIVE</span>
          </div>
        </div>

        <h1 style={{ fontFamily: B.fontD, fontSize: "clamp(52px, 12vw, 140px)", fontWeight: 800, color: "#fff", lineHeight: 0.88, textAlign: "center", letterSpacing: "-0.02em", animation: "fadeUp 0.7s ease-out", animationFillMode: "both", animationDelay: "0.1s", position: "relative", zIndex: 1 }}>
          <span style={{ display: "block" }}>USRFRNDLY</span>
          <span style={{ color: B.accent, display: "block", fontSize: "0.7em" }}>.AI</span>
        </h1>

        <p style={{ fontFamily: B.fontB, fontSize: "clamp(14px, 2vw, 18px)", color: "#3f3f46", maxWidth: 520, textAlign: "center", lineHeight: 1.7, marginTop: 28, animation: "fadeUp 0.7s ease-out", animationFillMode: "both", animationDelay: "0.2s" }}>
          One studio. Every model. Generate images, videos, lip sync, and cinematic shots — all from one interface.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 36, animation: "fadeUp 0.7s ease-out", animationFillMode: "both", animationDelay: "0.3s" }}>
          <button onClick={() => goTo("image")} style={{ padding: "14px 32px", background: B.accent, border: "none", borderRadius: 12, color: "#000", fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: B.fontB, boxShadow: "0 0 30px rgba(217,255,0,0.2)", display: "flex", alignItems: "center", gap: 8, transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            Start Creating {I.arrow}
          </button>
          {!user && <button onClick={openAuth} style={{ padding: "14px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, color: "#52525b", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: B.fontB }}>Sign Up Free</button>}
        </div>
      </section>

      {/* STUDIOS GRID */}
      <section style={{ padding: "0 24px 60px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontFamily: B.fontD, fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "0.04em", marginBottom: 8 }}>STUDIOS</h2>
        <p style={{ fontFamily: B.fontB, fontSize: 13, color: "#27272a", marginBottom: 28 }}>Four specialized workspaces for every creative need.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { id: "image", icon: "🖼", title: "Generate", desc: "Text-to-image across 42 models", c: "#d9ff00" },
            { id: "video", icon: "🎬", title: "Motion", desc: "AI video from text prompts", c: "#00d4ff" },
            { id: "lipsync", icon: "🎙", title: "Sync", desc: "Portrait animation & lip sync", c: "#f472b6" },
            { id: "cinema", icon: "🎥", title: "Cinema", desc: "Cinematic camera builder", c: "#fbbf24" },
          ].map((s, i) => (
            <button key={s.id} onClick={() => goTo(s.id)} style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, textAlign: "left", cursor: "pointer", transition: "all 0.25s", animation: "fadeUp 0.5s ease-out", animationFillMode: "both", animationDelay: `${0.1 + i * 0.08}s` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = s.c + "33"; e.currentTarget.style.background = s.c + "06"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; e.currentTarget.style.background = "rgba(255,255,255,0.015)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontFamily: B.fontD, fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "0.04em", marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontFamily: B.fontB, fontSize: 12, color: "#3f3f46", lineHeight: 1.5 }}>{s.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* MODEL CATEGORIES */}
      <section style={{ padding: "0 24px 60px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontFamily: B.fontD, fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "0.04em", marginBottom: 8 }}>{TOTAL_MODELS} MODELS</h2>
        <p style={{ fontFamily: B.fontB, fontSize: 13, color: "#27272a", marginBottom: 28 }}>The largest multi-model AI creative engine available.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MODEL_CATEGORIES.map((cat, ci) => (
            <details key={ci} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 14, overflow: "hidden", animation: "fadeUp 0.5s ease-out", animationFillMode: "both", animationDelay: `${0.05 * ci}s` }}>
              <summary style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, listStyle: "none", fontFamily: B.fontB }}>
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{cat.label}</div>
                  <div style={{ fontSize: 11, color: "#27272a", marginTop: 2 }}>{cat.count} models</div>
                </div>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
                  <div style={{ width: `${(cat.count / 70) * 100}%`, height: "100%", background: cat.color, borderRadius: 2, opacity: 0.6 }} />
                </div>
              </summary>
              <div style={{ padding: "0 20px 16px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cat.models.map((m, mi) => (
                  <span key={mi} style={{ padding: "5px 12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 8, fontSize: 11, fontWeight: 600, color: "#52525b", fontFamily: B.fontB }}>{m}</span>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.03)", textAlign: "center" }}>
        <div style={{ fontFamily: B.fontD, fontSize: 18, fontWeight: 800, color: "#1a1a1a", letterSpacing: "0.06em" }}>USRFRNDLY<span style={{ color: "rgba(217,255,0,0.3)" }}>.AI</span></div>
        <p style={{ fontFamily: B.fontB, fontSize: 11, color: "#18181b", marginTop: 8 }}>Powered by muapi.ai engine</p>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════ GENERATE STUDIO ═══════════════════════════════════════════ */
function GenStudio({ user, openAuth, onCreditsChange }) {
  const [p, setP] = useState(""); const [m, setM] = useState(T2I_MODELS[0]); const [ar, setAr] = useState("1:1");
  const [busy, setBusy] = useState(false); const [res, setRes] = useState(null); const [err, setErr] = useState(null); const [enh, setEnh] = useState(false);
  const [hist, setHist] = useState(() => { try { return JSON.parse(localStorage.getItem("uf_ih") || "[]"); } catch { return []; } });
  const go = async () => { if (!p.trim()) return; if (!user) { openAuth(); return; } setBusy(true); setErr(null); setRes(null);
    try { const pl = { prompt: p }; if (m.ars.length) pl.aspect_ratio = ar; console.log("[USRFRNDLY] Submitting:", m.endpoint, pl); const r = await api.gen(m.endpoint, pl, "image"); console.log("[USRFRNDLY] Result:", r); setRes(r); if (onCreditsChange) onCreditsChange(); const nh = [{ url: r.url, prompt: p, model: m.name, time: Date.now() }, ...hist].slice(0, 50); setHist(nh); localStorage.setItem("uf_ih", JSON.stringify(nh)); } catch (e) { console.error("[USRFRNDLY] Error:", e); setErr(e.message); } setBusy(false); };
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: res ? "flex-start" : "center", padding: 24, overflowY: "auto" }}>
      {!res && !busy && <div style={{ textAlign: "center", marginBottom: 40, animation: "fadeUp 0.6s ease-out" }}><div style={{ fontSize: 10, fontWeight: 700, color: "rgba(217,255,0,0.35)", letterSpacing: "0.3em", marginBottom: 16, fontFamily: B.fontB }}>USRFRNDLY.AI</div><div style={{ width: 80, height: 80, background: "rgba(217,255,0,0.03)", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", border: "1px solid rgba(217,255,0,0.06)" }}><span style={{ color: B.accent, transform: "scale(2)" }}>{I.image}</span></div><h1 style={{ fontFamily: B.fontD, fontSize: "clamp(44px, 8vw, 80px)", fontWeight: 800, color: "#fff", letterSpacing: "0.04em", lineHeight: 0.9, marginBottom: 12 }}>GENERATE</h1><p style={{ color: "#1a1a1a", fontSize: 13, fontFamily: B.fontB }}>AI image generation across 42 models</p></div>}
      {res && <div style={{ marginBottom: 28, marginTop: 12, width: "100%", maxWidth: 680 }}><Result result={res} type="image" /></div>}
      {busy && <Spin t={`Generating with ${m.name}...`} n="This may take 10–30 seconds" />}
      {!res && !busy && <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", marginBottom: 20, maxWidth: 680 }}>{QUICK_PROMPTS.map(q => <button key={q.label} onClick={() => setP(q.prompt)} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 18, color: "#27272a", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: B.fontB, transition: "all 0.2s" }} onMouseEnter={e => { e.target.style.borderColor = "rgba(217,255,0,0.15)"; e.target.style.color = B.accent; }} onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.04)"; e.target.style.color = "#27272a"; }}>{q.label}</button>)}</div>}
      <div style={{ width: "100%", maxWidth: 680, position: res ? "sticky" : "relative", bottom: res ? 20 : "auto", zIndex: 40 }}>
        <PBar prompt={p} setPrompt={setP} onGo={go} busy={busy} ph="Describe the image you want to create...">
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <DD label="Model" value={m.name} options={T2I_MODELS} onChange={x => { setM(x); if (x.ars.length && !x.ars.includes(ar)) setAr(x.ars[0]); }} render={x => x.name} />
            {m.ars.length > 0 && <DD label="Ratio" value={ar} options={m.ars} onChange={setAr} />}
            <button onClick={() => setEnh(!enh)} style={{ padding: "7px 12px", background: enh ? "rgba(217,255,0,0.04)" : "rgba(255,255,255,0.01)", border: `1px solid ${enh ? "rgba(217,255,0,0.1)" : "rgba(255,255,255,0.04)"}`, borderRadius: 9, color: enh ? B.accent : "#27272a", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: B.fontB }}>{I.sparkle} Enhance</button>
          </div>
          {enh && <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{Object.values(ENHANCE_TAGS).flat().map(t => <button key={t} onClick={() => setP(x => x ? `${x}, ${t}` : t)} style={{ padding: "4px 10px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 14, color: "#1a1a1a", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: B.fontB }} onMouseEnter={e => { e.target.style.color = B.accent; }} onMouseLeave={e => { e.target.style.color = "#1a1a1a"; }}>{t}</button>)}</div>}
        </PBar>
        {err && <p style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, textAlign: "center", marginTop: 10, fontFamily: B.fontB }}>{err}</p>}
      </div>
      {hist.length > 0 && !busy && <div style={{ width: "100%", maxWidth: 680, marginTop: 32 }}><h3 style={{ fontFamily: B.fontD, fontSize: 18, color: "#1a1a1a", letterSpacing: "0.15em", marginBottom: 14 }}>RECENT</h3><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8 }}>{hist.slice(0, 8).map((x, i) => <div key={i} onClick={() => setRes(x)} style={{ aspectRatio: "1", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s", position: "relative" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(217,255,0,0.12)"; e.currentTarget.style.transform = "scale(1.02)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "scale(1)"; }}><img src={x.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /><div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 7px 7px", background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}><span style={{ fontSize: 9, fontWeight: 700, color: "#27272a", fontFamily: B.fontB }}>{x.model}</span></div></div>)}</div></div>}
    </div>
  );
}

/* ═══════════════════════════════════════════ MOTION STUDIO ═══════════════════════════════════════════ */
function MotionStudio({ user, openAuth, onCreditsChange }) {
  const [p, setP] = useState(""); const [m, setM] = useState(T2V_MODELS[0]); const [ar, setAr] = useState("16:9"); const [dur, setDur] = useState(5);
  const [busy, setBusy] = useState(false); const [res, setRes] = useState(null); const [err, setErr] = useState(null);
  const go = async () => { if (!p.trim()) return; if (!user) { openAuth(); return; } setBusy(true); setErr(null); setRes(null); try { setRes(await api.gen(m.endpoint, { prompt: p, aspect_ratio: ar, duration: dur }, "video")); if (onCreditsChange) onCreditsChange(); } catch (e) { setErr(e.message); } setBusy(false); };
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: res ? "flex-start" : "center", padding: 24, overflowY: "auto" }}>
      {!res && !busy && <div style={{ textAlign: "center", marginBottom: 40, animation: "fadeUp 0.6s ease-out" }}><div style={{ fontSize: 10, fontWeight: 700, color: "rgba(0,212,255,0.4)", letterSpacing: "0.3em", marginBottom: 16, fontFamily: B.fontB }}>USRFRNDLY.AI</div><div style={{ width: 80, height: 80, background: "rgba(0,212,255,0.03)", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", border: "1px solid rgba(0,212,255,0.08)" }}><span style={{ color: "#00d4ff", transform: "scale(2)" }}>{I.video}</span></div><h1 style={{ fontFamily: B.fontD, fontSize: "clamp(44px, 8vw, 80px)", fontWeight: 800, color: "#fff", letterSpacing: "0.04em", lineHeight: 0.9, marginBottom: 12 }}>MOTION</h1><p style={{ color: "#1a1a1a", fontSize: 13, fontFamily: B.fontB }}>AI video generation from text</p></div>}
      {res && <div style={{ marginBottom: 28, marginTop: 12, width: "100%", maxWidth: 680 }}><Result result={res} type="video" /></div>}
      {busy && <Spin t={`Rendering with ${m.name}...`} n="Videos can take 30–120 seconds" />}
      <div style={{ width: "100%", maxWidth: 680 }}>
        <PBar prompt={p} setPrompt={setP} onGo={go} busy={busy} ph="Describe the video scene...">
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <DD label="Model" value={m.name} options={T2V_MODELS} onChange={x => { setM(x); if (!x.ars.includes(ar)) setAr(x.ars[0]); if (!x.durations.includes(dur)) setDur(x.durations[0]); }} render={x => x.name} />
            <DD label="Ratio" value={ar} options={m.ars} onChange={setAr} />
            <DD label="Duration" value={`${dur}s`} options={m.durations} onChange={setDur} render={d => `${d}s`} />
          </div>
        </PBar>
        {err && <p style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, textAlign: "center", marginTop: 10, fontFamily: B.fontB }}>{err}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ SYNC STUDIO ═══════════════════════════════════════════ */
function SyncStudio() {
  const [m, setM] = useState(LIPSYNC_MODELS[0]);
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, overflowY: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40, animation: "fadeUp 0.6s ease-out" }}><div style={{ fontSize: 10, fontWeight: 700, color: "rgba(244,114,182,0.4)", letterSpacing: "0.3em", marginBottom: 16, fontFamily: B.fontB }}>USRFRNDLY.AI</div><div style={{ width: 80, height: 80, background: "rgba(244,114,182,0.03)", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", border: "1px solid rgba(244,114,182,0.08)" }}><span style={{ color: "#f472b6", transform: "scale(2)" }}>{I.lipsync}</span></div><h1 style={{ fontFamily: B.fontD, fontSize: "clamp(44px, 8vw, 80px)", fontWeight: 800, color: "#fff", letterSpacing: "0.04em", lineHeight: 0.9, marginBottom: 12 }}>SYNC</h1><p style={{ color: "#1a1a1a", fontSize: 13, fontFamily: B.fontB }}>Portrait animation & lip sync</p></div>
      <div style={{ width: "100%", maxWidth: 680 }}>
        <div style={{ background: "rgba(8,8,8,0.96)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <DD label="Model" value={m.name} options={LIPSYNC_MODELS} onChange={setM} render={x => x.name} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[{ e: "🖼", l: "Upload Portrait", s: "JPG, PNG" }, { e: "🎙", l: "Upload Audio", s: "MP3, WAV" }].map((x, i) => <label key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 24, background: "rgba(255,255,255,0.01)", border: "2px dashed rgba(255,255,255,0.04)", borderRadius: 16, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(244,114,182,0.12)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; }}><span style={{ fontSize: 28 }}>{x.e}</span><span style={{ fontSize: 11, fontWeight: 700, color: "#3f3f46", fontFamily: B.fontB }}>{x.l}</span><span style={{ fontSize: 10, color: "#1a1a1a", fontFamily: B.fontB }}>{x.s}</span></label>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ CINEMA STUDIO ═══════════════════════════════════════════ */
function CinemaStudio() {
  const [p, setP] = useState(""); const [cam, setCam] = useState(Object.keys(CAMERA_MAP)[0]); const [lens, setLens] = useState(Object.keys(LENS_MAP)[0]); const [f, setF] = useState(35); const [ap, setAp] = useState("f/1.4");
  const built = () => { if (!p.trim()) return ""; return [p, `shot on a ${CAMERA_MAP[cam]}`, `using a ${LENS_MAP[lens]} at ${f}mm`, `aperture ${ap}`, "cinematic lighting", "natural color science", "8K resolution"].join(", "); };
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, overflowY: "auto", background: "#020202" }}>
      <div style={{ textAlign: "center", marginBottom: 32, animation: "fadeUp 0.6s ease-out" }}><div style={{ fontSize: 10, fontWeight: 700, color: "rgba(251,191,36,0.35)", letterSpacing: "0.3em", marginBottom: 16, fontFamily: B.fontB }}>USRFRNDLY.AI CINEMA</div><h1 style={{ fontFamily: B.fontD, fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 800, background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.3))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 0.95, letterSpacing: "0.02em" }}>WHAT WOULD YOU SHOOT<br />WITH INFINITE BUDGET?</h1></div>
      <div style={{ width: "100%", maxWidth: 680 }}>
        <PBar prompt={p} setPrompt={setP} onGo={() => {}} busy={false} ph="Describe your cinematic shot...">
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <DD label="Camera" value={cam} options={Object.keys(CAMERA_MAP)} onChange={setCam} />
            <DD label="Lens" value={lens} options={Object.keys(LENS_MAP)} onChange={setLens} />
            <DD label="Focal" value={`${f}mm`} options={[8,14,24,35,50,85]} onChange={setF} render={x => `${x}mm`} />
            <DD label="f-Stop" value={ap} options={["f/1.4","f/4","f/11"]} onChange={setAp} />
          </div>
          {p.trim() && <div style={{ padding: "12px 16px", background: "rgba(251,191,36,0.02)", borderRadius: 12, border: "1px solid rgba(251,191,36,0.06)" }}><p style={{ fontSize: 9, fontWeight: 800, color: "#fbbf24", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6, fontFamily: B.fontB }}>Compiled Prompt</p><p style={{ fontSize: 12, color: "#3f3f46", lineHeight: 1.7, fontFamily: B.fontB }}>{built()}</p></div>}
        </PBar>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ APP ═══════════════════════════════════════════ */
export default function App() {
  const [tab, setTab] = useState("home");
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const c = await api.getCredits();
        setCredits(c);
      }
      setLoading(false);
    };
    checkAuth();

    // Listen for auth changes (Google OAuth redirect, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const c = await api.getCredits();
        setCredits(c);
      } else {
        setUser(null);
        setCredits(0);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setCredits(0);
    setTab("home");
  };

  const refreshCredits = async () => {
    const c = await api.getCredits();
    setCredits(c);
  };

  const tabs = [
    { id: "home", label: "Home", icon: I.home },
    { id: "image", label: "Generate", icon: I.image },
    { id: "video", label: "Motion", icon: I.video },
    { id: "lipsync", label: "Sync", icon: I.lipsync },
    { id: "cinema", label: "Cinema", icon: I.cinema },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: B.bg, fontFamily: B.fontB, overflow: "hidden" }}>
      <SetFavicon />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(217,255,0,0.1); } 50% { box-shadow: 0 0 40px rgba(217,255,0,0.25); } }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.04); border-radius: 999px; }
        textarea::placeholder, input::placeholder { color: #18181b; }
        details summary::-webkit-details-marker { display: none; }
        details summary { list-style: none; }
        details[open] summary { border-bottom: 1px solid rgba(255,255,255,0.02); margin-bottom: 4px; }
      `}</style>

      {/* HEADER */}
      <header style={{ width: "100%", height: 52, background: "rgba(3,3,3,0.98)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", borderBottom: "1px solid rgba(255,255,255,0.025)", zIndex: 50, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }} onClick={() => setTab("home")}>
            <Logo size={26} />
            <span style={{ fontFamily: B.fontD, fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "0.03em", lineHeight: 1 }}>USRFRNDLY<span style={{ color: B.accent }}>.AI</span></span>
          </div>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.04)" }} />
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "5px 12px", background: tab === t.id ? "rgba(217,255,0,0.03)" : "transparent",
                border: tab === t.id ? "1px solid rgba(217,255,0,0.06)" : "1px solid transparent",
                borderRadius: 8, color: tab === t.id ? "#fff" : "#1a1a1a", fontSize: 11, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: B.fontB, whiteSpace: "nowrap",
              }}>
                <span style={{ color: tab === t.id ? B.accent : "#1a1a1a", display: "flex" }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user ? (
            <>
              {/* Credits badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: "rgba(217,255,0,0.04)", border: "1px solid rgba(217,255,0,0.08)", borderRadius: 8 }}>
                <span style={{ color: B.accent, fontSize: 12, fontWeight: 800, fontFamily: B.fontB }}>{credits}</span>
                <span style={{ color: "#3f3f46", fontSize: 10, fontWeight: 600, fontFamily: B.fontB }}>credits</span>
              </div>
              {/* User email + sign out */}
              <span style={{ fontSize: 11, color: "#3f3f46", fontWeight: 600, fontFamily: B.fontB, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
              <button onClick={handleSignOut} style={{ padding: "5px 10px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 8, color: "#27272a", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: B.fontB }}>Sign Out</button>
            </>
          ) : (
            <button onClick={() => setShowAuth(true)} style={{
              padding: "7px 16px", background: B.accent, border: "none", borderRadius: 9, color: "#000",
              fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: B.fontB,
              boxShadow: "0 0 16px rgba(217,255,0,0.15)",
            }}>Sign In</button>
          )}
        </div>
      </header>

      <main style={{ flex: 1, overflow: "hidden", background: B.bg }}>
        {tab === "home" && <HomePage goTo={setTab} openAuth={() => setShowAuth(true)} user={user} />}
        {tab === "image" && <GenStudio user={user} openAuth={() => setShowAuth(true)} onCreditsChange={refreshCredits} />}
        {tab === "video" && <MotionStudio user={user} openAuth={() => setShowAuth(true)} onCreditsChange={refreshCredits} />}
        {tab === "lipsync" && <SyncStudio />}
        {tab === "cinema" && <CinemaStudio />}
      </main>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={async () => {
        const u = await getUser();
        setUser(u);
        const c = await api.getCredits();
        setCredits(c);
      }} />}
    </div>
  );
}
