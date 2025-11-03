'use client'

import { useState, useEffect, memo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navGroups } from "./nav-config";
import SidebarItem from "./SidebarItem";
import { cn } from "@/lib/utils";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // localStorage에서 collapsed 상태 로드
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved) {
      setCollapsed(JSON.parse(saved));
    }
  }, []);

  // collapsed 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out flex flex-col",
      "bg-gradient-to-b from-gray-50 to-white border-r border-gray-200",
      "dark:from-gray-900 dark:to-gray-950 dark:border-gray-800",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* 상단 헤더 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          {/* 로고 - 클릭 가능 */}
          <button 
            onClick={() => router.push('/admin')} 
            className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            
            {/* 서비스 이름 */}
            {!collapsed && (
              <div className="flex-1">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">관리자 대시보드</p>
              </div>
            )}
          </button>
          
          {/* 토글 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapsed}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {/* 그룹 제목 */}
            {!collapsed && (
              <h3 className="px-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
            )}
            
            {/* 메뉴 아이템들 */}
            <div className="space-y-1">
              {group.items.map((item) => {
                // Dashboard 또는 Admin 경우 루트(/)와 해당 경로들을 활성으로 처리
                let isActive = false;
                if (item.href === '/dashboard') {
                  isActive = pathname === '/' || pathname === '/dashboard' || pathname === '/admin';
                } else if (item.href === '/admin') {
                  isActive = pathname === '/admin';
                } else {
                  isActive = pathname === item.href;
                }
                
                return (
                  <SidebarItem
                    key={item.href}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                    active={isActive}
                    badge={item.badge}
                    collapsed={collapsed}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 사용자 정보 */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        {!collapsed ? (
          <div className="space-y-3">
            {/* 테마 토글 */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">테마</span>
              <ThemeToggle />
            </div>
            
            <Separator />
            
            {/* 사용자 정보 */}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/admin-avatar.svg" alt="Admin" />
                <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  관리자
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@dateapp.com
                </p>
              </div>
            </div>
            
            <Separator />
            
            {/* 로그아웃 버튼 */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {/* 축소된 테마 토글 */}
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
            
            {/* 축소된 사용자 아바타 */}
            <Avatar className="h-8 w-8 mx-auto">
              <AvatarImage src="/admin-avatar.svg" alt="Admin" />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">
                AD
              </AvatarFallback>
            </Avatar>
            
            {/* 축소된 로그아웃 버튼 */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-center p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-950"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Sidebar);
