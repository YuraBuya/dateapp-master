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
const KOREA_PROVINCES_GEO = "/geo/korea-provinces.json"; // public/geo/korea-provinces.json

// 도시 단위 사용자 수 (위경도, 소속 도시/시)
const cityUsers = [
  { name: "서울", province: "서울특별시", coords: [126.9780, 37.5665], users: 1247 },
  { name: "부산", province: "부산광역시", coords: [129.0756, 35.1796], users: 543 },
  { name: "대구", province: "대구광역시", coords: [128.6014, 35.8714], users: 342 },
  { name: "인천", province: "인천광역시", coords: [126.7052, 37.4563], users: 298 },
  { name: "광주", province: "광주광역시", coords: [126.8526, 35.1595], users: 187 },
  { name: "대전", province: "대전광역시", coords: [127.3845, 36.3504], users: 245 },
  { name: "울산", province: "울산광역시", coords: [129.3114, 35.5384], users: 156 },
  { name: "수원", province: "경기도", coords: [127.0286, 37.2636], users: 423 },
  { name: "고양", province: "경기도", coords: [126.8320, 37.6583], users: 312 },
  { name: "용인", province: "경기도", coords: [127.1778, 37.2411], users: 267 },
  { name: "성남", province: "경기도", coords: [127.1378, 37.4201], users: 289 },
  { name: "춘천", province: "강원도", coords: [127.7300, 37.8813], users: 98 },
  { name: "청주", province: "충청북도", coords: [127.4897, 36.6424], users: 145 },
  { name: "천안", province: "충청남도", coords: [127.1522, 36.8151], users: 167 },
  { name: "전주", province: "전라북도", coords: [127.1480, 35.8242], users: 178 },
  { name: "목포", province: "전라남도", coords: [126.3922, 34.8118], users: 89 },
  { name: "포항", province: "경상북도", coords: [129.3435, 36.0190], users: 123 },
  { name: "창원", province: "경상남도", coords: [128.6811, 35.2281], users: 201 },
  { name: "제주", province: "제주특별자치도", coords: [126.5312, 33.4996], users: 134 },
];

const matchSeries = [
  { d: "09-01", match: 45 }, { d: "09-02", match: 52 }, { d: "09-03", match: 48 },
  { d: "09-04", match: 58 }, { d: "09-05", match: 64 }, { d: "09-06", match: 59 }, { d: "09-07", match: 71 },
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
  province: string;
  coords: [number, number];
  users: number;
}

export default function KoreaMapPanel() {
  const [zoom, setZoom] = useState<number>(6);
  const [center, setCenter] = useState<[number, number]>([127.5, 36.5]); // Korea center
  const [province, setProvince] = useState<string>("all");
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [provinceGeoAvailable, setProvinceGeoAvailable] = useState<boolean>(false);

  useEffect(() => {
    fetch(KOREA_PROVINCES_GEO, { method: "HEAD" })
      .then((r) => setProvinceGeoAvailable(r.ok))
      .catch(() => setProvinceGeoAvailable(false));
  }, []);

  const maxUsers = useMemo(() => Math.max(...cityUsers.map(d => d.users)), []);
  const rScale   = useMemo(() => scaleLinear().domain([0, maxUsers]).range([4, 16]), [maxUsers]);
  const heatOp   = useMemo(() => scaleLinear().domain([0, maxUsers]).range([0.18, 0.45]), [maxUsers]);

  const provinceList = useMemo(() => ["all", ...Array.from(new Set(cityUsers.map(c => c.province)))], []);
  const filteredCities = useMemo(
    () => province === "all" ? cityUsers : cityUsers.filter(c => c.province === province),
    [province]
  );

  // 특정 도/시 선택 시 중심/줌 프리셋 (간단 버전: 도시 평균)
  useEffect(() => {
    if (province === "all") { 
      setCenter([127.5, 36.5]); 
      setZoom(6); 
      return; 
    }
    const list = cityUsers.filter(c => c.province === province);
    if (!list.length) return;
    const lon = list.reduce((a, b) => a + b.coords[0], 0) / list.length;
    const lat = list.reduce((a, b) => a + b.coords[1], 0) / list.length;
    setCenter([lon, lat]);
    setZoom(8);
  }, [province]);

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.5, 12));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.5, 4));
  const handleReset = () => { 
    setProvince("all"); 
    setCenter([127.5, 36.5]); 
    setZoom(6); 
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">한국 사용자 위치 분석</div>
          <div className="flex items-center gap-2">
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent>
                {provinceList.map(p => (
                  <SelectItem key={p} value={p}>
                    {p === "all" ? "전체 (대한민국)" : p}
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
            <ComposableMap projectionConfig={{ scale: 2000 }}>
              <ZoomableGroup center={center} zoom={zoom} translateExtent={[[-1000, -800], [1000, 800]]}>
                {/* World base (연한 회색) */}
                <Geographies geography={WORLD_TOPO}>
                  {({ geographies }: any) =>
                    geographies.map((geo: any) => {
                      // 한국만 하이라이트
                      const isKorea = geo.properties?.NAME === "South Korea";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: { 
                              fill: isKorea ? "#F1F5F9" : "#F8FAFC", 
                              stroke: isKorea ? "#CBD5E1" : "#E5E7EB", 
                              outline: "none" 
                            },
                            hover: { 
                              fill: isKorea ? "#EEF2FF" : "#F8FAFC", 
                              stroke: isKorea ? "#64748b" : "#E5E7EB", 
                              outline: "none" 
                            },
                            pressed: { fill: "#EEF2FF", outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Korea province boundaries (있으면 추가 표시 & hover) */}
                {provinceGeoAvailable && (
                  <Geographies geography={KOREA_PROVINCES_GEO}>
                    {({ geographies }: any) =>
                      geographies.map((geo: any) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(e: any) => {
                            const nm = geo.properties?.name || "Province";
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