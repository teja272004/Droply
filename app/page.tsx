"use client";

import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  FileText, // Added PDF/Document icon
  File, // Generic file icon
  FileAudio, // Audio file icon
  FileVideo, // Video file icon
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const icons = [ImageIcon, FileText, File, FileAudio, FileVideo];
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        setFade(true); // Start fade-in
      }, 500); // Half a second for fade-out
    }, 3000); // Change icon every 3 seconds

    return () => clearInterval(iconInterval);
  }, [icons.length]);

  const CurrentIcon = icons[currentIconIndex];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Use the unified Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                    Store your{" "}
                    <span className="text-amber-500">files</span> with ease
                  </h1>
                  <p className="text-lg md:text-xl text-zinc-400">
                    Simple. Secure. Fast.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button size="lg" variant="solid" color="amber">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button size="lg" variant="flat" color="amber">
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="solid"
                        color="amber"
                        endContent={<ArrowRight className="h-4 w-4" />}
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {/* Pulsing background glow */}
                  <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl animate-pulse-light" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Dynamic Rotating Icon with fade transition */}
                    <CurrentIcon
                      className={`h-28 md:h-36 w-28 md:w-36 text-amber-500 drop-shadow-lg transition-all duration-500 ease-in-out ${
                        fade ? "opacity-100 scale-100" : "opacity-0 scale-90"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-zinc-900">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                What You Get
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <Card className="border border-zinc-800 bg-zinc-950 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-shadow">
                <CardBody className="p-6 text-center">
                  <CloudUpload className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-amber-500" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                    Quick Uploads
                  </h3>
                  <p className="text-zinc-400">Drag, drop, done.</p>
                </CardBody>
              </Card>

              <Card className="border border-zinc-800 bg-zinc-950 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-shadow">
                <CardBody className="p-6 text-center">
                  <Folder className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-amber-500" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                    Smart Organization
                  </h3>
                  <p className="text-zinc-400">Keep it tidy, find it fast.</p>
                </CardBody>
              </Card>

              <Card className="border border-zinc-800 bg-zinc-950 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-shadow sm:col-span-2 md:col-span-1 mx-auto sm:mx-0 max-w-md sm:max-w-full">
                <CardBody className="p-6 text-center">
                  <Shield className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-amber-500" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                    Locked Down
                  </h3>
                  <p className="text-zinc-400">Your files, your eyes only.</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-zinc-950">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Ready?
            </h2>
            <SignedOut>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="solid"
                    color="amber"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Let's Go
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="solid"
                  color="amber"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Simple footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-bold text-white">Droply</h2>
            </div>
            <p className="text-zinc-400 text-sm">
              &copy; {new Date().getFullYear()} Droply
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}