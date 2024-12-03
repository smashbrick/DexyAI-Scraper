// import Footer from "./components/Footer";
import JobCards from "./components/JobCards";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Footer from "./components/Footer";

export default function App() {
	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Navbar />
				<div className="flex-grow">
					<SearchBox title="Explore jobs!" />
					<JobCards />
				</div>
				<Footer />
			</div>
		</>
	);
}
