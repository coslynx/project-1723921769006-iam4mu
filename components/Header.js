"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Fitness Goal Tracker
        </Link>
        <nav className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {session && (
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          )}
          {!session && (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}