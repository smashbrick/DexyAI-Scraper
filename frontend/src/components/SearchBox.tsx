import { useState } from "react";

export default function SearchBox({ setSharedData }: SearchBoxProps) {
	const [error, setError] = useState<string | null>(null); // Error message state
	const [jobName, setJobName] = useState(""); // State to hold job name input
	const [loading, setLoading] = useState(false); // Loading state

	// Utility to convert a string into a slug
	const toSlug = (str: string) =>
		str
			.toLowerCase()
			.trim()
			.replace(/\s+/g, "-") // Replace spaces with dashes
			.replace(/[^a-z0-9-]/g, ""); // Remove invalid characters

	// Handle the button click to send a fetch request
	const handleScrapeClick = async () => {
		setError(null); // Reset error state
		setLoading(true); // Set loading state

		try {
			if (!jobName.trim()) {
				throw new Error("Job name cannot be empty.");
			}

			const jobParam = toSlug(jobName); // Convert job name to slug before using it in the URL

			// Construct the URL with job name
			const url = `http://127.0.0.1:5000/scrape?job-name=${jobParam}`;

			// Fetch data from the backend
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();

			// Pass the scraped data to the parent component
			setSharedData(data);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unknown error occurred."
			);
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	return (
		<div className="flex flex-col items-center mt-16 gap-4">
			<h1 className="md:text-3xl text-2xl font-bold">Explore</h1>

			<div className="flex flex-wrap items-center gap-4 text-base w-full max-w-3xl">
				<span className="whitespace-nowrap">Show me</span>

				{/* Job Role Input */}
				<input
					type="text"
					className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md"
					placeholder="Eg. Software engineer"
					value={jobName}
					onChange={(e) => setJobName(e.target.value)} // Update jobName as user types
				/>
				<span className="whitespace-nowrap">roles</span>

				{/* Scrape Button */}
				<button
					className={`rounded-md text-white px-4 py-2 text-sm w-[120px] ${
						loading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
					}`}
					onClick={handleScrapeClick}
					disabled={loading} // Disable button while loading
				>
					{loading ? "Loading..." : "Scrape"}
				</button>
			</div>

			{/* Display error if any */}
			{error && <div className="text-red-500">{error}</div>}
		</div>
	);
}

interface SearchBoxProps {
	setSharedData: (data: JobData[]) => void;
}

interface JobData {
	job_title: string;
	company_name: string;
	company_size: string;
	company_location: string;
}
