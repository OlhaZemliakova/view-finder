import { cn } from "@/lib/utils";

export function AuthLayout({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-cover bg-center",
        className
      )}
      style={{
        backgroundImage:
          "url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces/hoVj2lYW3i7oMd1o7bPQRZd1lk1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black/70 absolute inset-0" />
      <div className="relative flex flex-col md:flex-row gap-6 items-center max-w-6xl w-full">
        <div className="text-white space-y-4 max-w-md md:max-w-lg w-full px-2 md:px-4 lg:px-0">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">
            Welcome to <span className="text-blue-400">View Finder</span>
          </h1>
          <p className="text-lg leading-relaxed">
            Discover trending and upcoming movies, explore detailed information,
            and build your own personalized{" "}
            <span className="font-semibold">watchlist</span>.
          </p>
          <p className="text-lg leading-relaxed">
            Sign in or create an account to start saving your favorite titles
            and track what you want to watch next.
          </p>
        </div>
        <div className="relative w-full max-w-md px-4">{children}</div>
      </div>
    </div>
  );
}
