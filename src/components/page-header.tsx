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

export function PageHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center"></div>
              <span className="text-xl font-bold text-gray-900">
                View Finder
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/tv-shows"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              TV Shows
            </Link>
          </nav>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CircleUser />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem><Link to="watch-list">Whatchlist</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="ghost">
                    Log out
                    <LogOut />
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/login"> Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
