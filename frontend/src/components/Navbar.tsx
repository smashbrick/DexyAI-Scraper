import { Briefcase } from "lucide-react";

const Navbar = () => {
	return (
		<nav
			className="flex justify-between"
			style={{
				display: "flex",
				alignItems: "center",
				padding: "10px",
				backgroundColor: "#f4f4f4",
			}}
		>
			<Briefcase size={32} color="#333" />
			<span
				style={{
					marginLeft: "10px",
					fontSize: "24px",
					fontWeight: "bold",
					color: "#333",
				}}
			>
				JobScraper
			</span>
		</nav>
	);
};

export default Navbar;
