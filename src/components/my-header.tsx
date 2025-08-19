import { CircleUser } from "lucide-react";
import { Button } from "./ui/button";

export function MyHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center"></div>
            <span className="text-xl font-bold text-gray-900">View Finder</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Movies
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              TV Shows
            </a>
          </nav>
          <div className="flex items-center">
            <CircleUser />
            <Button variant="link">Login</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
