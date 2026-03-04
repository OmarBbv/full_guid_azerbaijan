import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-background">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548625361-58a9a9d27293?q=80&w=2000&auto=format&fit=crop"
          alt="Auth Background"
          className="w-full h-full object-cover scale-110 blur-sm opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/80 to-background" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 py-12 flex justify-center">
        {children}
      </div>
    </div>
  );
}
