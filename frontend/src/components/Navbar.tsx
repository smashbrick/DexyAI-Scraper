import { Briefcase } from "lucide-react";
import { WandSparkles } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="flex justify-between shadow-md p-5 ">
			<Briefcase size={28} color="#333" />
			<div className="flex">
				<span className="md:text-lg font-semibold">JobScraper</span>
				<WandSparkles />
			</div>
		</nav>
	);
};

export default Navbar;
