interface LoadingStateProps {
  message: string;
  variant?: "fullPage" | "content" | "inline";
  className?: string;
}

export const LoadingState = ({
  message,
  variant = "content",
  className = "",
}: LoadingStateProps) => {
  const variants = {
    fullPage: "min-h-[calc(100vh-2rem)]",
    content: "min-h-[400px]",
    inline: "py-8",
  };

  return (
    <div
      className={`flex items-center justify-center ${variants[variant]} ${className}`}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};
