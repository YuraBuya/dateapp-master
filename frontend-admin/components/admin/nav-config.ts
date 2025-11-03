import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  CreditCard, 
  ShieldCheck, 
  Settings,
  LucideIcon 
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  group?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "회원 관리", href: "/admin/users", icon: Users },
  { title: "매칭 관리", href: "/admin/matching", icon: Heart },
  { title: "결제 관리", href: "/admin/billing", icon: CreditCard },
  { title: "신고 관리", href: "/admin/reports", icon: ShieldCheck, badge: 7 },
  { title: "시스템 설정", href: "/admin/settings", icon: Settings },
];

export const navGroups: NavGroup[] = [
  {
    title: "dashboard",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard }
    ]
  },
  {
    title: "management",
    items: [
      { title: "회원 관리", href: "/admin/users", icon: Users },
      { title: "매칭 관리", href: "/admin/matching", icon: Heart },
      { title: "결제 관리", href: "/admin/billing", icon: CreditCard }
    ]
  },
  {
    title: "reports",
    items: [
      { title: "신고 관리", href: "/admin/reports", icon: ShieldCheck, badge: 7 }
    ]
  },
  {
    title: "settings",
    items: [
      { title: "시스템 설정", href: "/admin/settings", icon: Settings }
    ]
  }
];