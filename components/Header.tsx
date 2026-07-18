import NavLinks from "./NavLinks";
export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 mt-12">
      <h1 className="text-center text-5xl font-extrabold tracking-wider text-indigo-400 mb-6 drop-shadow-lg">
        Sacrament Planner
      </h1>
      <NavLinks />
    </header>
  );
}
