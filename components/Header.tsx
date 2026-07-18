import NavLinks from "./NavLinks";
export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 mt-12">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-yellow-400 mb-4 drop-shadow-lg text-center">
        Sacrament Meeting Planner
      </h1>
      <NavLinks />
    </header>
  );
}
