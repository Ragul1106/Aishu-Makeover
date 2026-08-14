"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminImageForm from "../../components/AdminImageForm";
import AdminImageList from "../../components/AdminImageList";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
 interface ImageType {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
}

const [images, setImages] = useState<ImageType[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/images")
        .then(async (res) => {
          const data = await res.json();
          if (Array.isArray(data)) {
            setImages(data);
          } else {
            console.error("API Error:", data);
            setImages([]);
          }
        })
        .catch(() => setImages([]));
    }
  }, [status, refresh]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#fdf8f5]">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Aishu <span className="text-[#d4a5a5]">Admin</span>
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm hover:underline">
            View Website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-gray-100 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        <AdminImageForm onSuccess={() => setRefresh((r) => r + 1)} />
        <AdminImageList
          images={images}
          onUpdate={() => setRefresh((r) => r + 1)}
        />
      </div>
    </div>
  );
}