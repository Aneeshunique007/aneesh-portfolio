import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playMechanicalClick } from '../utils/audio';
import './MosaicMap.css';

// ─────────────────────────────────────────────────────────────────────────────
// CITY HOTSPOT PINS — Aneesh's exact engineering stations
// ─────────────────────────────────────────────────────────────────────────────
const CITY_PINS = [
  { id: 'trivandrum', lat: 8.52, lng: 76.94, label: 'Trivandrum HQ, Kerala', region: 'Base Operations', note: 'Global HQ • Technopark • AI Architecture & Production Systems', isHQ: true },
  { id: 'kochi', lat: 9.93, lng: 76.27, label: 'Kochi, Munnar & Backwaters', region: 'Central Kerala', note: 'Fort Kochi Heritage, Tea Highlands & Vembanad Backwaters' },
  { id: 'alleppey', lat: 9.49, lng: 76.33, label: 'Alleppey & Varkala, Kerala', region: 'South Kerala Coast', note: 'Houseboat Canals & Ocean Cliff Beaches' },
  { id: 'kozhikode', lat: 11.25, lng: 75.78, label: 'Kozhikode, Wayanad & Kannur', region: 'Malabar / N. Kerala', note: 'Malabar Spice Coast & Western Ghats Mountain Trails' },
  { id: 'bangalore', lat: 12.97, lng: 77.59, label: 'Bangalore (Bengaluru)', region: 'Karnataka', note: 'Silicon Valley of India • High-Performance Tech Sprints' },
  { id: 'mysore', lat: 12.30, lng: 76.64, label: 'Mysore & Coorg', region: 'Karnataka', note: 'Royal Heritage Architecture & Misty Coffee Highlands' },
  { id: 'chennai', lat: 13.08, lng: 80.27, label: 'Chennai, Tamil Nadu', region: 'Coromandel Coast', note: 'Coromandel Coastline & Deep Tech Infrastructure Hub' },
  { id: 'pondicherry', lat: 11.94, lng: 79.81, label: 'Pondicherry (Puducherry)', region: 'Tamil Nadu Coast', note: 'White Town Boulevard & French Quarter Maritime Zone' },
  { id: 'madurai', lat: 9.93, lng: 78.12, label: 'Madurai, Tamil Nadu', region: 'South Tamil Nadu', note: 'Ancient Meenakshi Temple City & Cultural Epicenter' },
  { id: 'mumbai', lat: 19.08, lng: 72.88, label: 'Mumbai, Maharashtra', region: 'Maharashtra', note: 'Marine Drive & Maximum City • Deep Tech Infrastructure' },
  { id: 'goa', lat: 15.30, lng: 73.86, label: 'Goa Coastal Trail', region: 'Goa', note: 'North & South Coastal Run • Maritime Expedition' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTION — Equirectangular
// ─────────────────────────────────────────────────────────────────────────────
function project(lng, lat, vb) {
  const nx = (lng + 180) / 360;
  const ny = (90 - lat) / 180;
  return [vb.x + nx * vb.w, vb.y + ny * vb.h];
}

// ─────────────────────────────────────────────────────────────────────────────
// SANITIZE: Break antimeridian crossing rings (|dLng| > 40) into clean lines
// Prevents any horizontal line artifacts across Russia, Fiji, Antarctica, etc.
// ─────────────────────────────────────────────────────────────────────────────
function sanitizeGeometry(geom) {
  if (!geom) return null;
  const polys = geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates];
  const newPolys = [];

  for (const poly of polys) {
    const newPoly = [];
    for (const ring of poly) {
      let currentSegment = [ring[0]];
      for (let i = 1; i < ring.length; i++) {
        const prev = ring[i - 1];
        const curr = ring[i];
        if (Math.abs(curr[0] - prev[0]) > 40) {
          if (currentSegment.length > 1) newPoly.push(currentSegment);
          currentSegment = [curr];
        } else {
          currentSegment.push(curr);
        }
      }
      if (currentSegment.length > 1) newPoly.push(currentSegment);
    }
    if (newPoly.length > 0) newPolys.push(newPoly);
  }
  return { type: 'MultiPolygon', coordinates: newPolys };
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAW: GeoJSON land with dark stealth shading fill + glowing outline
// Returns the last point drawn for the pen-tip glow
// ─────────────────────────────────────────────────────────────────────────────
function drawGeoJSONWithFill(ctx, geometry, progress, vb, strokeColor, lineWidth, fillColor) {
  if (progress <= 0 || !geometry) return null;

  const allRings = [];
  if (geometry.type === 'MultiPolygon') {
    for (const poly of geometry.coordinates) {
      for (const ring of poly) allRings.push(ring);
    }
  } else if (geometry.type === 'Polygon') {
    for (const ring of geometry.coordinates) allRings.push(ring);
  }

  let totalSegs = 0;
  for (const ring of allRings) totalSegs += ring.length - 1;

  const targetSegs = Math.floor(totalSegs * Math.min(1, progress));
  let drawn = 0;
  let lastPt = null;

  // 1. Shaded polygon fills
  if (fillColor && progress > 0.06) {
    ctx.fillStyle = fillColor;
    for (const ring of allRings) {
      const segsInRing = ring.length - 1;
      if (drawn + segsInRing > targetSegs) break;
      ctx.beginPath();
      const [sx, sy] = project(ring[0][0], ring[0][1], vb);
      ctx.moveTo(sx, sy);
      for (let i = 1; i < ring.length; i++) {
        const [px, py] = project(ring[i][0], ring[i][1], vb);
        if (Math.abs(ring[i][0] - ring[i - 1][0]) > 40) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      if (Math.abs(ring[0][0] - ring[ring.length - 1][0]) < 40) {
        ctx.closePath();
      }
      ctx.fill();
      drawn += segsInRing;
    }
  }

  // 2. Progressive razor-sharp outline
  drawn = 0;
  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.setLineDash([]);

  outer: for (const ring of allRings) {
    const [sx, sy] = project(ring[0][0], ring[0][1], vb);
    ctx.moveTo(sx, sy);
    for (let i = 1; i < ring.length; i++) {
      if (drawn >= targetSegs) break outer;
      const [px, py] = project(ring[i][0], ring[i][1], vb);
      if (Math.abs(ring[i][0] - ring[i - 1][0]) > 40) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
      lastPt = [px, py];
      drawn++;
    }
  }
  ctx.stroke();

  return lastPt;
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAW: Country border lines (thin, subtle)
// ─────────────────────────────────────────────────────────────────────────────
function drawCountryBorders(ctx, features, progress, vb) {
  if (progress <= 0 || !features) return;
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.07 * progress})`;
  ctx.lineWidth = 0.4;
  ctx.setLineDash([]);
  for (const feat of features) {
    const geo = feat.geometry;
    if (!geo) continue;
    const polys = geo.type === 'MultiPolygon' ? geo.coordinates : [geo.coordinates];
    for (const poly of polys) {
      for (const ring of poly) {
        ctx.beginPath();
        const [sx, sy] = project(ring[0][0], ring[0][1], vb);
        ctx.moveTo(sx, sy);
        for (let i = 1; i < ring.length; i++) {
          const [px, py] = project(ring[i][0], ring[i][1], vb);
          if (Math.abs(ring[i][0] - ring[i - 1][0]) > 40) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAW: All 36 Indian States & Union Territories
// ─────────────────────────────────────────────────────────────────────────────
function drawIndiaStates(ctx, states, alpha, vb) {
  if (alpha <= 0 || !states) return;

  ctx.save();
  ctx.strokeStyle = `rgba(255, 170, 0, ${0.45 * alpha})`;
  ctx.lineWidth = 0.8;
  ctx.fillStyle = `rgba(22, 16, 30, ${0.45 * alpha})`;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (const feat of states) {
    const geo = feat.geometry;
    if (!geo) continue;
    const polys = geo.type === 'MultiPolygon' ? geo.coordinates : [geo.coordinates];
    for (const poly of polys) {
      for (const ring of poly) {
        if (ring.length < 3) continue;
        ctx.beginPath();
        const [sx, sy] = project(ring[0][0], ring[0][1], vb);
        ctx.moveTo(sx, sy);
        for (let i = 1; i < ring.length; i++) {
          const [px, py] = project(ring[i][0], ring[i][1], vb);
          ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAW: Pen-tip glow dot
// ─────────────────────────────────────────────────────────────────────────────
function drawPenTip(ctx, pt, alpha) {
  if (!pt || alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(pt[0], pt[1], 3.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffaa00';
  ctx.shadowColor = '#ffaa00';
  ctx.shadowBlur = 14;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}


// ─────────────────────────────────────────────────────────────────────────────
// DRAW: City beacon with pulsing ring + label
// ─────────────────────────────────────────────────────────────────────────────
function drawBeacon(ctx, px, py, t, pin, W) {
  const r = pin.isHQ ? 5.5 : 4;
  const color = pin.isHQ ? '#ffaa00' : '#ff1e27';
  const pulse = 0.5 + 0.5 * Math.sin(t * 2.5 + (px + py) * 0.02);
  const ringR = r + (pin.isHQ ? 12 : 8) * pulse;

  // Outer pulse ring
  ctx.beginPath();
  ctx.arc(px, py, ringR, 0, Math.PI * 2);
  ctx.strokeStyle = color + '44';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Second ring
  ctx.beginPath();
  ctx.arc(px, py, r + 2.5, 0, Math.PI * 2);
  ctx.strokeStyle = color + '66';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Core dot
  ctx.beginPath();
  ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = pin.isHQ ? 20 : 12;
  ctx.fill();
  ctx.shadowBlur = 0;

  // City name label
  const labelSize = Math.max(9, W * 0.011);
  ctx.font = `700 ${labelSize}px 'Share Tech Mono', 'Courier New', monospace`;
  ctx.fillStyle = pin.isHQ ? '#ffaa00' : 'rgba(244,245,248,0.9)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#040206';
  ctx.shadowBlur = 6;
  ctx.fillText(pin.id.toUpperCase(), px + r + 5, py);
  ctx.shadowBlur = 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function smoothStep(t) { return t * t * (3 - 2 * t); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function MosaicMap() {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // geo refs — loaded async
  const landRef = useRef(null); // 50m land MultiPolygon
  const countriesRef = useRef(null); // 50m country features
  const indiaOutlineRef = useRef(null); // Official Survey of India national boundary
  const statesRef = useRef(null); // All 36 Indian States & UTs (official Survey of India)

  const scrollRef = useRef(0);
  const [activePin, setActivePin] = useState(null);
  const [pinPositions, setPinPositions] = useState([]);
  const [geoLoaded, setGeoLoaded] = useState(false);
  const [viewSize, setViewSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  // ── Load GeoJSON files in parallel
  useEffect(() => {
    Promise.all([
      fetch('/world-land-50m.json').then((r) => r.json()),
      fetch('/world-countries-50m.json').then((r) => r.json()),
      fetch('/india-detail.json').then((r) => r.json()),
      fetch('/india-states.json').then((r) => r.json()),
    ])
      .then(([land, countries, indiaDetail, states]) => {
        // Sanitize geometries to break antimeridian / dateline wrap lines
        landRef.current = sanitizeGeometry(land.features[0].geometry);
        countriesRef.current = countries.features.map((f) => ({
          ...f,
          geometry: sanitizeGeometry(f.geometry),
        }));
        const outlineGeom = indiaDetail.features ? indiaDetail.features[0].geometry : indiaDetail.geometry;
        indiaOutlineRef.current = sanitizeGeometry(outlineGeom);
        statesRef.current = states.features;
        setGeoLoaded(true);
      })
      .catch((e) => console.error('MosaicMap: GeoJSON load error', e));
  }, []);

  // ── Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = clamp(-rect.top / scrollable, 0, 1);
      scrollRef.current = raw;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Size canvas (DPR-aware)
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
      setViewSize({ w: c.offsetWidth, h: c.offsetHeight });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ── Main rAF render loop
  useEffect(() => {
    const render = (timestamp) => {
      const c = canvasRef.current;
      if (!c) { animRef.current = requestAnimationFrame(render); return; }
      const ctx = c.getContext('2d');
      if (!ctx) { animRef.current = requestAnimationFrame(render); return; }

      const W = c.width;
      const H = c.height;
      const t = timestamp / 1000;
      const p = scrollRef.current;

      // ── Clear transparently against clean deep black cosmic space ──
      ctx.clearRect(0, 0, W, H);

      // ── Stage progress ──────────────────────────────────────────────
      // s1: 0.00→0.40  Draw world continents
      // sZoomIndia: 0.40→0.70  Camera zoom 1: World → ALL INDIA
      // sZoomSouth: 0.70→1.00  Camera zoom 2: All India → SOUTH INDIA + City pins
      const s1 = clamp(p / 0.40, 0, 1);
      const sZoomIndia = clamp((p - 0.40) / 0.30, 0, 1);
      const sZoomSouth = clamp((p - 0.70) / 0.30, 0, 1);
      const sPins = clamp((p - 0.65) / 0.35, 0, 1);

      // ── Viewboxes: World → All India → South India ──────────────────
      const worldVB = { x: 0, y: 0, w: W, h: H };

      // 1. All India Viewbox (lat 6.2°N–38.2°N, lng 67°E–98°E — complete official national territory)
      const inFullTL = project(67, 38.2, worldVB);
      const inFullBR = project(98, 6.2, worldVB);
      const fullW = inFullBR[0] - inFullTL[0];
      const fullH = inFullBR[1] - inFullTL[1];
      const scaleFull = Math.min(W / fullW, H / fullH) * 0.84;
      const focusFullCx = (inFullTL[0] + inFullBR[0]) / 2;
      const focusFullCy = (inFullTL[1] + inFullBR[1]) / 2;
      const indiaFullVB = {
        x: W * 0.5 - focusFullCx * scaleFull,
        y: H * 0.5 - focusFullCy * scaleFull,
        w: W * scaleFull,
        h: H * scaleFull,
      };

      // 2. South India Viewbox (lat 7.8°N–15.8°N, lng 72.5°E–81.5°E)
      const inSouthTL = project(72.5, 15.8, worldVB);
      const inSouthBR = project(81.5, 7.8, worldVB);
      const southW = inSouthBR[0] - inSouthTL[0];
      const southH = inSouthBR[1] - inSouthTL[1];
      const scaleSouth = Math.min(W / southW, H / southH) * 0.84;
      const focusSouthCx = (inSouthTL[0] + inSouthBR[0]) / 2;
      const focusSouthCy = (inSouthTL[1] + inSouthBR[1]) / 2;
      const indiaSouthVB = {
        x: W * 0.5 - focusSouthCx * scaleSouth,
        y: H * 0.5 - focusSouthCy * scaleSouth,
        w: W * scaleSouth,
        h: H * scaleSouth,
      };

      // Camera lerp: World → All India → South India
      let vb;
      if (p <= 0.40) {
        vb = worldVB;
      } else if (p <= 0.70) {
        const z1 = smoothStep(sZoomIndia);
        vb = {
          x: lerp(worldVB.x, indiaFullVB.x, z1),
          y: lerp(worldVB.y, indiaFullVB.y, z1),
          w: lerp(worldVB.w, indiaFullVB.w, z1),
          h: lerp(worldVB.h, indiaFullVB.h, z1),
        };
      } else {
        const z2 = smoothStep(sZoomSouth);
        vb = {
          x: lerp(indiaFullVB.x, indiaSouthVB.x, z2),
          y: lerp(indiaFullVB.y, indiaSouthVB.y, z2),
          w: lerp(indiaFullVB.w, indiaSouthVB.w, z2),
          h: lerp(indiaFullVB.h, indiaSouthVB.h, z2),
        };
      }


      // ── 2. Country borders (subtle, below land fill; fades during India focus) ──
      if (s1 > 0.3 && countriesRef.current) {
        const countryBorderAlpha = Math.min(1, (s1 - 0.3) / 0.4) * (1 - smoothStep(sZoomIndia) * 0.85);
        if (countryBorderAlpha > 0.01) {
          drawCountryBorders(ctx, countriesRef.current, countryBorderAlpha, vb);
        }
      }

      // ── 3. World land (shaded obsidian fill + titanium white outline) ──
      let penTip = null;
      if (landRef.current) {
        const fillAlpha = Math.min(0.65, s1 * 0.75);
        const fillColor = `rgba(16, 12, 22, ${fillAlpha})`;
        const strokeAlpha = lerp(0.65, 0.95, s1);
        const strokeColor = `rgba(244, 245, 248, ${strokeAlpha})`;
        const lw = lerp(0.6, 1.2, s1);

        // On zoom stage: draw official India national boundary overlay in crucible gold
        if (sZoomIndia > 0.1 && indiaOutlineRef.current) {
          ctx.globalAlpha = lerp(1, 0.35, smoothStep(sZoomIndia));
          drawGeoJSONWithFill(ctx, landRef.current, 1, vb, strokeColor, lw * 0.7, fillColor);
          ctx.globalAlpha = 1;

          const inAlpha = smoothStep(sZoomIndia);
          const inStroke = `rgba(255, 170, 0, ${lerp(0.6, 1.0, inAlpha)})`;
          const inFill = `rgba(22, 16, 30, ${0.55 * inAlpha})`;
          drawGeoJSONWithFill(ctx, indiaOutlineRef.current, 1, vb, inStroke, lw * 1.5, inFill);
        } else {
          penTip = drawGeoJSONWithFill(ctx, landRef.current, s1, vb, strokeColor, lw, fillColor);
        }
      }

      // ── 3b. All 36 Indian States & UTs (official Surveyor General boundaries) ──
      if (sZoomIndia > 0.05 && statesRef.current) {
        drawIndiaStates(ctx, statesRef.current, smoothStep(sZoomIndia), vb);
      }

      // ── 4. Pen-tip glow (only while actively drawing, s1 < 1) ──────
      if (penTip && s1 < 1 && sZoomIndia < 0.1) {
        const tipAlpha = Math.min(1, (1 - s1) * 4) * (1 - sZoomIndia * 3);
        drawPenTip(ctx, penTip, Math.max(0, tipAlpha));
      }

      // ── 5. City pins ───────────────────────────────────────────────
      if (sPins > 0) {
        const newPos = [];
        CITY_PINS.forEach((pin, pi) => {
          const pinP = clamp(sPins * CITY_PINS.length * 0.45 - pi * 0.2, 0, 1);
          if (pinP <= 0) return;
          const [px, py] = project(pin.lng, pin.lat, vb);
          if (px < -30 || px > W + 30 || py < -30 || py > H + 30) return;
          ctx.globalAlpha = Math.min(1, pinP * 2);
          drawBeacon(ctx, px, py, t, pin, W);
          ctx.globalAlpha = 1;
          newPos.push({ ...pin, sx: px, sy: py });
        });
        setPinPositions(newPos);
      } else {
        setPinPositions([]);
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [geoLoaded]);

  const handlePinClick = useCallback((pin) => {
    playMechanicalClick();
    setActivePin((prev) => (prev?.id === pin.id ? null : pin));
  }, []);

  return (
    <section
      ref={trackRef}
      className="mosaic-frame-scrubber-track"
      aria-label="Procedural world map — scroll to draw"
    >
      <div className="mosaic-frame-sticky-stage">
        {/* Pure canvas — zero images */}
        <canvas ref={canvasRef} className="mosaic-draw-canvas" />

        {/* Click-target buttons over each beacon */}
        {pinPositions.map((pin) => (
          <button
            key={pin.id}
            type="button"
            className={`mosaic-pin-btn ${activePin?.id === pin.id ? 'is-active' : ''} ${pin.isHQ ? 'is-hq' : ''}`}
            style={{ left: pin.sx, top: pin.sy }}
            onClick={() => handlePinClick(pin)}
            aria-label={pin.label}
          />
        ))}

        {/* Active pin tooltip */}
        {activePin && (() => {
          const pp = pinPositions.find((x) => x.id === activePin.id);
          if (!pp) return null;
          const lp = Math.min(78, Math.max(4, (pp.sx / viewSize.w) * 100));
          const tp = Math.min(76, Math.max(8, (pp.sy / viewSize.h) * 100 - 16));
          return (
            <div className="mosaic-pin-tooltip" style={{ left: `${lp}%`, top: `${tp}%` }}>
              <div className="tooltip-header">
                <span className="tooltip-city">{activePin.label}</span>
                <span className="tooltip-region">{activePin.region}</span>
              </div>
              <span className="tooltip-note">{activePin.note}</span>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
