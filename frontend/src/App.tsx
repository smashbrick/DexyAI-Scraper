// import Footer from "./components/Footer";
// import JobCards from "./components/JobCards";
import Navbar from "./components/Navbar";
// import SearchBox from "./components/SearchBox";
import Footer from "./components/Footer";
import SearchCard from "./components/SearchCard";

export default function App() {
	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Navbar />
				<div className="flex-grow">
					<SearchCard />
				</div>
				<Footer />
			</div>
		</>
	);
}
