import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ImageGallery from "../components/ImageGallery";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <ImageGallery />

      <footer className="bg-[#2d2a26] text-white py-12 text-center">
        <p className="text-2xl font-bold mb-2">
          Aishu <span className="text-[#e8b4b8]">Makeover</span>
        </p>
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} Aishu Makeover. All rights reserved.
        </p>
      </footer>
    </main>
  );
}