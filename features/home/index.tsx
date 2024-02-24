import Footer from "@/features/home/footer";
import Header from "@/features/home/header";
import Main from "./main";

export default function Home() {
  return (
    <div className="w-full border">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

