/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Select from "react-select";

export default function SearchBox({ setSharedData }: SearchBoxProps) {
	// const [locations, setLocations] = useState<any[]>([]); // State to hold location data
	// const [roles, setRoles] = useState<any[]>([]); // State to hold job role data

	const [error, setError] = useState<string | null>(null); // Error message state
	const [jobName, setJobName] = useState(""); // State to hold job name input
	const [locationName, setLocationName] = useState(""); // State to hold location name input

	// Debounce timeout ID for jobName and locationName inputs
	const [debounceTimeout, setDebounceTimeout] = useState<any>(null);

	// Function to fetch location data, but requires Authentication and introducees captcha when implemented
	// const fetchLocations = async (query: string) => {
	// 	try {
	// 		const response = await fetch(
	// 			`http://127.0.0.1:8000/location?location-name=${query}`
	// 		);
	// 		const data = await response.json();
	// 		const locationTags = data.data?.autocomplete?.locationTags || [];
	// 		console.log(locationTags);
	// 		// Transform locationTags into the format expected by react-select
	// 		const formattedLocations = locationTags.map((location: any) => ({
	// 			value: location.id,
	// 			label: location.displayName,
	// 			slug: location.slug,
	// 		}));

	// 		setLocations(formattedLocations);
	// 	} catch (err) {
	// 		setError(err instanceof Error ? err.message : "An error occurred");
	// 	}
	// };

	// Function to fetch job role data, but requires authentication so the values have instead been hardcoded through wellfound
	// const fetchRoles = async (query: string) => {
	// 	try {
	// 		if (query === "") {
	// 			return;
	// 		}
	// 		const response = await fetch(
	// 			`http://127.0.0.1:8000/getKeyword?job-name=${query}`
	// 		);
	// 		const data = await response.json();
	// 		const roleKeywords = data.data?.autocomplete?.roleKeywords || [];
	// 		console.log(roleKeywords);

	// 		// Transform roleKeywords into the format expected by react-select
	// 		const formattedRoles = roleKeywords.map((role: any) => ({
	// 			value: role.id,
	// 			label: role.displayName,
	// 			slug: role.slug,
	// 		}));

	// 		setRoles(formattedRoles);
	// 	} catch (err) {
	// 		setError(err instanceof Error ? err.message : "An error occurred");
	// 	}
	// };

	// Handle input change for the location Select
	// const handleLocationInputChange = (newValue: string) => {
	// 	setLocationName(newValue); // Preserve the location input

	// 	// Clear the existing debounce timeout
	// 	if (debounceTimeout) clearTimeout(debounceTimeout);

	// 	// Set a new debounce timeout for location input
	// 	const timeout = setTimeout(() => {
	// 		fetchLocations(newValue); // Fetch locations after the user stops typing
	// 	}, 500); // 500ms delay

	// 	setDebounceTimeout(timeout); // Store timeout ID
	// };

	// Handle input change for the role Select
	const handleRoleInputChange = (newValue: string) => {
		setJobName(newValue); // Preserve the job input

		// Clear the existing debounce timeout
		if (debounceTimeout) clearTimeout(debounceTimeout);

		// Set a new debounce timeout for job input
		const timeout = setTimeout(() => {
			fetchRoles(newValue); // Fetch roles after the user stops typing
		}, 500); // 500ms delay

		setDebounceTimeout(timeout); // Store timeout ID
	};

	// Handle the button click to send fetch request with location and job name
	const handleScrapeClick = async () => {
		try {
			const locationParam = locationName || ""; // If no location, pass an empty string
			const jobParam = jobName;

			// Construct the URL with location and job name
			//software-engineer/india
			const url = `http://127.0.0.1:8000/scrape?job-name=${jobParam}&location-name=${locationParam}`;

			const response = await fetch(url);
			const data = await response.json();

			// Handle the data as needed
			setSharedData(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		}
	};

	return (
		<>
			<div className="flex flex-col items-center mt-16 gap-4">
				<h1 className="md:text-3xl text-2xl font-bold">Explore</h1>

				<div className="flex flex-wrap items-center gap-4 text-base w-full max-w-3xl">
					<span className="whitespace-nowrap">Show me</span>

					<span className="whitespace-nowrap">roles, hiring in</span>
					{/* Job Role Select Dropdown */}
					<Select
						options={roles}
						className="flex-1 min-w-[150px]"
						placeholder="Select a Role"
						isClearable
						inputValue={jobName} // Controlled input value
						onInputChange={handleRoleInputChange} // Fetch data on input change
					/>

					{/* Job location select dropdown that requires API */}
					{/* 
					<Select
						options={locations}
						className="flex-1 min-w-[150px]"
						placeholder="Any City"
						isClearable
						inputValue={locationName} // Controlled input value
						onInputChange={handleLocationInputChange} // Fetch data on input change
					/> */}

					{/* Scrape Button */}
					<button
						className="rounded-md bg-black text-white px-4 py-2 text-sm w-[120px]" // Ensure the button width is fixed
						onClick={handleScrapeClick}
					>
						Scrape
					</button>
				</div>

				{/* Display error if any */}
				{error && <div className="text-red-500">{error}</div>}
			</div>
		</>
	);
}

interface SearchBoxProps {
	setSharedData: (data: any) => void;
}
