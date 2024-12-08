import { useState } from "react";
import SearchBox from "./SearchBox";
import JobCards from "./JobCards";

export default function SearchCard() {
	const [data, setSharedData] = useState([]);

	// Dummy data for testing
	const dummyData = [
		{
			jobTitle: "Software Engineer",
			companyName: "Tech Corp",
			salary: "₹12,00,000 per year",
			location: "Bangalore, India",
			remote: "Yes",
			companySize: "201-500 employees",
			jobLink: "https://example.com/software-engineer-job",
		},
		{
			jobTitle: "Frontend Developer",
			companyName: "Innovatech Solutions",
			salary: "₹8,00,000 per year",
			location: "Mumbai, India",
			remote: "No",
			companySize: "51-200 employees",
			jobLink: "https://example.com/frontend-developer-job",
		},
	];

	return (
		<>
			<SearchBox setSharedData={setSharedData} />
			<JobCards data={data.length > 0 ? data : dummyData} />
		</>
	);
}
