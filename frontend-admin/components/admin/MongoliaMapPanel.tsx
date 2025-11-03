"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip as UiTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ZoomIn, ZoomOut, RotateCcw, MapPin } from "lucide-react";
import { scaleLinear } from "d3-scale";
import {
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip as RTooltip,
} from "recharts";

// react-simple-maps (SSR off)
const ComposableMap = dynamic<any>(() => import("react-simple-maps").then(m => m.ComposableMap), { ssr: false });
const Geographies   = dynamic<any>(() => import("react-simple-maps").then(m => m.Geographies), { ssr: false });
const Geography     = dynamic<any>(() => import("react-simple-maps").then(m => m.Geography), { ssr: false });
const Marker        = dynamic<any>(() => import("react-simple-maps").then(m => m.Marker), { ssr: false });
const ZoomableGroup = dynamic<any>(() => import("react-simple-maps").then(m => m.ZoomableGroup), { ssr: false });

// ---------- Demo data (실데이터 연결만 바꾸면 그대로 동작) ----------
const WORLD_TOPO = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const MONGOLIA_AIMAG_GEO = "/geo/mongolia-aimag.json"; // public/geo/mongolia-aimag.json

// 도시 단위 사용자 수 (위경도, 소속 아이막)
const cityUsers = [
  { name: "Ulaanbaatar", aimag: "Ulaanbaatar",        coords: [106.9057, 47.8864], users: 520 },
  { name: "Darkhan",      aimag: "Darkhan-Uul",       coords: [106.5270, 49.4867], users: 190 },
  { name: "Erdenet",      aimag: "Orkhon",            coords: [104.0444, 49.0277], users: 170 },
  { name: "Tsetserleg",   aimag: "Arkhangai",         coords: [101.4586, 47.4769], users: 120 },
  { name: "Choibalsan",   aimag: "Dornod",            coords: [114.5064, 48.0650], users: 110 },
  { name: "Dalanzadgad",  aimag: "Umnugovi",          coords: [104.4233, 43.5700], users: 95  },
  { name: "Mörön",        aimag: "Khövsgöl",          coords: [100.1622, 49.6341], users: 130 },
];

const matchSeries = [
  { d: "09-01", match: 18 }, { d: "09-02", match: 22 }, { d: "09-03", match: 25 },
  { d: "09-04", match: 24 }, { d: "09-05", match: 28 }, { d: "09-06", match: 26 }, { d: "09-07", match: 31 },
];

// ---------- Helpers ----------
// 프로젝트 메모리에 따라 부드러운 색상 팔레트 사용
const BRAND = { 
  primary: "#64748b",    // slate-500 - 더 부드러운 색상
  secondary: "#94a3b8"   // slate-400 - 보조 색상
};

interface TooltipData {
  x: number;
  y: number;
  content: string;
}

interface CityUser {
  name: string;
  aimag: string;
  coords: [number, number];
  users: number;
}

export default function MongoliaMapPanel() {
  const [zoom, setZoom] = useState<number>(1.4);
  const [center, setCenter] = useState<[number, number]>([105, 46]); // Mongolia center-ish
  const [aimag, setAimag] = useState<string>("all");
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [aimagGeoAvailable, setAimagGeoAvailable] = useState<boolean>(false);

  useEffect(() => {
    fetch(MONGOLIA_AIMAG_GEO, { method: "HEAD" })
      .then((r) => setAimagGeoAvailable(r.ok))
      .catch(() => setAimagGeoAvailable(false));
  }, []);

  const maxUsers = useMemo(() => Math.max(...cityUsers.map(d => d.users)), []);
  const rScale   = useMemo(() => scaleLinear().domain([0, maxUsers]).range([4, 16]), [maxUsers]);
  const heatOp   = useMemo(() => scaleLinear().domain([0, maxUsers]).range([0.18, 0.45]), [maxUsers]);

  const aimagList = useMemo(() => ["all", ...Array.from(new Set(cityUsers.map(c => c.aimag)))], []);
  const filteredCities = useMemo(
    () => aimag === "all" ? cityUsers : cityUsers.filter(c => c.aimag === aimag),
    [aimag]
  );

  // 특정 아이막 선택 시 중심/줌 프리셋 (간단 버전: 도시 평균)
  useEffect(() => {
    if (aimag === "all") { 
      setCenter([105, 46]); 
      setZoom(1.4); 
      return; 
    }
    const list = cityUsers.filter(c => c.aimag === aimag);
    if (!list.length) return;
    const lon = list.reduce((a, b) => a + b.coords[0], 0) / list.length;
    const lat = list.reduce((a, b) => a + b.coords[1], 0) / list.length;
    setCenter([lon, lat]);
    setZoom(3);
  }, [aimag]);

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.5, 8));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.5, 1));
  const handleReset = () => { 
    setAimag("all"); 
    setCenter([105, 46]); 
    setZoom(1.4); 
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">몽골 사용자 위치 분석</div>
          <div className="flex items-center gap-2">
            <Select value={aimag} onValueChange={setAimag}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Aimag (아이막)" />
              </SelectTrigger>
              <SelectContent>
                {aimagList.map(a => (
                  <SelectItem key={a} value={a}>
                    {a === "all" ? "전체 (Mongolia)" : a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* MAP */}
          <div className="relative h-72 rounded-xl border overflow-hidden">
            <ComposableMap projectionConfig={{ scale: 550 }}>
              <ZoomableGroup center={center} zoom={zoom} translateExtent={[[-1000, -800], [1000, 800]]}>
                {/* World base (연한 회색) */}
                <Geographies geography={WORLD_TOPO}>
                  {({ geographies }: any) =>
                    geographies.map((geo: any) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: { fill: "#F8FAFC", stroke: "#E5E7EB", outline: "none" },
                          hover:   { fill: "#EEF2FF", stroke: "#CBD5E1", outline: "none" },
                          pressed: { fill: "#EEF2FF", outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Mongolia aimag boundaries (있으면 추가 표시 & hover) */}
                {aimagGeoAvailable && (
                  <Geographies geography={MONGOLIA_AIMAG_GEO}>
                    {({ geographies }: any) =>
                      geographies.map((geo: any) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(e: any) => {
                            const nm = geo.properties?.name || "Aimag";
                            setTooltip({ x: e.clientX, y: e.clientY, content: nm });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                          style={{
                            default: { fill: "transparent", stroke: BRAND.primary, strokeOpacity: 0.35, outline: "none" },
                            hover:   { fill: "#EDE9FE", stroke: BRAND.primary, strokeOpacity: 0.8, outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                )}

                {/* Heat blobs (밀도) */}
                {filteredCities.map((c: any) => (
                  <Marker key={`heat-${c.name}`} coordinates={c.coords as [number, number]}>
                    <circle r={rScale(c.users) * 2.8} fill={BRAND.secondary} opacity={heatOp(c.users)} />
                  </Marker>
                ))}

                {/* Scaled markers */}
                {filteredCities.map((c: any) => (
                  <Marker
                    key={c.name}
                    coordinates={c.coords as [number, number]}
                    onMouseEnter={(e: any) => setTooltip({ 
                      x: e.clientX, 
                      y: e.clientY, 
                      content: `${c.name} · ${c.users.toLocaleString()}명` 
                    })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <circle r={rScale(c.users)} fill={BRAND.primary} stroke="#fff" strokeWidth={1.2} />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>

            {/* tooltip */}
            {tooltip && (
              <div
                className="pointer-events-none absolute z-10 px-2 py-1 text-xs rounded-md bg-black/70 text-white"
                style={{ left: tooltip.x - 260, top: tooltip.y - 220 }}
              >
                {tooltip.content}
              </div>
            )}
          </div>

          {/* 오른쪽: 매칭 추이 or 지역 통계 */}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={matchSeries} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="d" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <RTooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="match" 
                  stroke={BRAND.primary}
                  strokeWidth={2}
                  dot={{ fill: BRAND.primary, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: BRAND.primary, strokeWidth: 2, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" style={{ color: BRAND.primary }} />
          마커 크기는 사용자 수에 비례하고, 반투명 원이 밀도를 나타냅니다.
        </div>
      </CardContent>
    </Card>
  );
}