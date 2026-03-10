import { ReactNode } from "react";
import un_photo_1534067783941_51c9c23ecefd_261adc91 from "@/assets/unsplash/photo-1534067783941-51c9c23ecefd_261adc91.jpg";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-background">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={un_photo_1534067783941_51c9c23ecefd_261adc91.src}
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
