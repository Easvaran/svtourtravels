"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Package,
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronLeft,
  Menu,
  Car,
  IndianRupee,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSettings } from "@/lib/SettingsContext";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Manage Tours", href: "/admin/tours", icon: Map },
  { name: "Manage Vehicles", href: "/admin/vehicles", icon: Car },
  { name: "Manage Services", href: "/admin/services", icon: Settings },
  { name: "Manage Payments", href: "/admin/payments", icon: IndianRupee },
  { name: "Manage Reviews", href: "/admin/reviews", icon: Star },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = useSettings();
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-30 hidden lg:flex",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2 group">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto" />
              ) : (
                <div className="w-10 h-10 bg-[#00bcd4] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {settings.websiteName.substring(0, 2).toUpperCase()}
                </div>
              )}
              <span className="font-bold text-xl text-[#00bcd4] group-hover:text-gray-900 transition-colors">
                {(settings.websiteName || 'SV TOUR & TRAVELS').split(" ")[0].toUpperCase()} <span className="text-gray-900">ADMIN</span>
              </span>
            </Link>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-[#00bcd4] text-white shadow-lg shadow-[#00bcd4]/20" 
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                <Icon size={20} className={cn(isActive ? "text-white" : "group-hover:text-[#00bcd4]")} />
                {!isCollapsed && <span className="font-semibold text-sm">{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold text-sm"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 z-[40] transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar - Mobile Drawer */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white z-[50] transition-transform duration-300 transform lg:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto" />
            ) : (
              <div className="w-10 h-10 bg-[#00bcd4] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {settings.websiteName.substring(0, 2).toUpperCase()}
              </div>
            )}
            <span className="font-bold text-xl text-[#00bcd4] group-hover:text-gray-900 transition-colors">
              {(settings.websiteName || 'SV TOUR & TRAVELS').split(" ")[0].toUpperCase()} <span className="text-gray-900">ADMIN</span>
            </span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-[#00bcd4] text-white shadow-lg shadow-[#00bcd4]/20" 
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                <Icon size={20} className={cn(isActive ? "text-white" : "group-hover:text-[#00bcd4]")} />
                <span className="font-semibold text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold text-sm"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 capitalize truncate max-w-[150px] sm:max-w-none">
              {pathname.split("/").pop() === "admin" ? "Overview" : pathname.split("/").pop()?.replace(/-/g, " ")}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#00bcd4]/10 rounded-full flex items-center justify-center text-[#00bcd4] font-bold">
              AD
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 overflow-y-auto h-[calc(100vh-5rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}
