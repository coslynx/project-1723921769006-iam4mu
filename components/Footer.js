"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row sm:justify-around">
        <p className="text-gray-600 text-sm">
          © 2023 Fitness Goal Tracker. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <Link href="/" className="text-gray-600 text-sm hover:underline">
            Home
          </Link>
          {session && (
            <Link
              href="/dashboard"
              className="text-gray-600 text-sm hover:underline"
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/about"
            className="text-gray-600 text-sm hover:underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 text-sm hover:underline"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}