
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <p>Landing page goes here.</p>
      </div>
    </div>
  );
}
