import { CircleUser, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/authStore";

export function PageHeader() {
  const { logout, profile: currentUser } = useAuthStore();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center"></div>
              <span className="text-xl font-bold text-gray-400">
                View Finder
              </span>
            </div>
          </Link>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <CircleUser className="w-6 h-6 text-gray-400" />
                  {currentUser && (
                    <span className="text-sm font-medium text-gray-400">
                      {currentUser.firstName} {currentUser.lastName}
                    </span>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="watch-list">Whatchlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="ghost" onClick={handleLogout}>
                    Log out
                    <LogOut />
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
