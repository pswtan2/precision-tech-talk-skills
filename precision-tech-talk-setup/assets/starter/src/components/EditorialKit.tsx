import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {FONT, theme} from "../theme";

const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};

const Shell: React.FC<{seconds: number; side: "left" | "right"; children: React.ReactNode}> = ({seconds, side, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = interpolate(frame, [0, 8, seconds * fps - 9, seconds * fps], [0, 1, 1, 0], clamp);
  const scrim = side === "right"
    ? "linear-gradient(90deg,transparent 32%,rgba(0,0,0,.1) 48%,rgba(0,0,0,.5))"
    : "linear-gradient(90deg,rgba(0,0,0,.5),rgba(0,0,0,.1) 52%,transparent 68%)";
  return <AbsoluteFill style={{fontFamily: FONT, color: theme.text, opacity, pointerEvents: "none"}}><AbsoluteFill style={{background: scrim}} />{children}</AbsoluteFill>;
};

export const TimedScene: React.FC<{from: number; to: number; side?: "left" | "right"; children: React.ReactNode}> = ({from, to, side = "right", children}) => {
  const {fps} = useVideoConfig();
  return <Sequence from={Math.round(from * fps)} durationInFrames={Math.round((to - from) * fps)}><Shell seconds={to - from} side={side}>{children}</Shell></Sequence>;
};

export const Pop: React.FC<{delay?: number; x?: number; y?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({delay = 0, x = 0, y = 18, style, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({fps, frame: frame - delay, config: {damping: 18, stiffness: 170, mass: .75}});
  return <div style={{...style, opacity: p, transform: `translate(${(1 - p) * x}px, ${(1 - p) * y}px) scale(${.965 + p * .035})`}}>{children}</div>;
};

export const SectionEyebrow: React.FC<{en: string; zh: string; meta?: string}> = ({en, zh, meta}) => <div style={{position: "absolute", left: 82, top: 58}}>
  <Pop x={-16} y={0}><div style={{borderLeft: `5px solid ${theme.accentSoft}`, paddingLeft: 15, fontSize: 25, fontWeight: 900, color: theme.accentSoft, letterSpacing: 6}}>{en}</div></Pop>
  <Pop delay={3} y={12}><div style={{fontSize: 29, fontWeight: 850, marginTop: 9}}>{zh}{meta && <span style={{fontSize: 17, opacity: .62, marginLeft: 12}}>{meta}</span>}</div></Pop>
</div>;

export const MetricCounter: React.FC<{from?: number; to: number; unit?: string; label: string; delay?: number}> = ({from = 0, to, unit = "", label, delay = 11}) => {
  const frame = useCurrentFrame();
  const value = Math.round(interpolate(frame, [delay, delay + 20], [from, to], clamp));
  return <Pop delay={delay} y={12}><div style={{fontSize: 92, fontWeight: 950, color: theme.accentSoft}}>{value.toLocaleString()}{unit}</div><div style={{fontSize: 22, opacity: .72, marginTop: 10}}>{label}</div></Pop>;
};

export const ComparisonBars: React.FC<{items: Array<{label: string; value: number; note?: string; color?: string; delay?: number}>}> = ({items}) => {
  const frame = useCurrentFrame();
  return <div style={{display: "grid", gap: 26}}>{items.map((item, index) => {
    const delay = item.delay ?? 11 + index * 5;
    const width = interpolate(frame, [delay, delay + 20], [0, item.value], clamp);
    return <Pop key={item.label} delay={delay} x={18} y={0}><div><div style={{display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 850}}><span>{item.label}</span><span style={{color: item.color ?? theme.accentSoft}}>{item.note ?? `${item.value}%`}</span></div><div style={{height: 20, borderRadius: 8, overflow: "hidden", background: "rgba(255,255,255,.1)", marginTop: 10}}><div style={{width: `${width}%`, height: "100%", background: item.color ?? `linear-gradient(90deg,${theme.accent},${theme.accentSoft})`}} /></div></div></Pop>;
  })}</div>;
};

export const ProcessFlow: React.FC<{items: Array<{title: string; subtitle?: string; delay?: number}>}> = ({items}) => <div style={{display: "flex", alignItems: "center", gap: 18}}>{items.map((item, index) => <React.Fragment key={item.title}>
  <Pop delay={item.delay ?? 11 + index * 6} y={14}><div style={{minWidth: 190, padding: "24px 18px", borderRadius: 17, textAlign: "center", background: "rgba(7,15,32,.86)", border: "1px solid rgba(40,215,255,.42)"}}><div style={{fontSize: 28, fontWeight: 900}}>{item.title}</div>{item.subtitle && <div style={{fontSize: 18, opacity: .68, marginTop: 7}}>{item.subtitle}</div>}</div></Pop>
  {index < items.length - 1 && <Pop delay={(item.delay ?? 11 + index * 6) + 4} x={-12} y={0}><div style={{fontSize: 45, color: theme.accentSoft}}>→</div></Pop>}
</React.Fragment>)}</div>;

export const DecisionList: React.FC<{items: Array<{number: string; title: string; detail: string; delay?: number}>}> = ({items}) => <div style={{display: "grid", gap: 18}}>{items.map((item, index) => <Pop key={item.number} delay={item.delay ?? 11 + index * 6} x={22} y={0}><div style={{display: "grid", gridTemplateColumns: "84px 1fr", padding: "22px 26px", borderRadius: 17, background: "rgba(7,15,32,.84)", border: "1px solid rgba(40,215,255,.32)"}}><div style={{fontSize: 43, fontWeight: 950, color: theme.accentSoft}}>{item.number}</div><div><div style={{fontSize: 29, fontWeight: 850}}>{item.title}</div><div style={{fontSize: 19, opacity: .7, marginTop: 6}}>{item.detail}</div></div></div></Pop>)}</div>;

export const EvidenceBrowserCard: React.FC<{image: string; source: string; headline: string; metric?: string; delay?: number}> = ({image, source, headline, metric, delay = 7}) => <Pop delay={delay} x={30} y={12} style={{width: 810, height: 560}}><div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 20, background: "#f4f6f8", border: "1px solid rgba(40,215,255,.45)", boxShadow: "0 24px 90px rgba(0,0,0,.55)"}}>
  <div style={{height: 43, display: "flex", alignItems: "center", gap: 7, padding: "0 15px", background: "#e9edf2"}}><i style={{width: 10, height: 10, borderRadius: 9, background: "#ff5f57"}}/><i style={{width: 10, height: 10, borderRadius: 9, background: "#febc2e"}}/><i style={{width: 10, height: 10, borderRadius: 9, background: "#28c840"}}/><span style={{marginLeft: 12, fontSize: 14, color: "#596273"}}>{source}</span></div>
  <Img src={staticFile(image)} style={{width: "100%", height: 350, objectFit: "contain", background: "white"}} />
  <div style={{position: "absolute", left: 24, right: 24, bottom: 22, padding: "20px 24px", borderRadius: 14, background: "rgba(6,12,24,.94)", borderLeft: `5px solid ${theme.accentSoft}`}}><div style={{fontSize: 29, fontWeight: 900}}>{headline}</div>{metric && <div style={{fontSize: 25, color: theme.accentSoft, fontWeight: 850, marginTop: 9}}>{metric}</div>}</div>
</div></Pop>;

