import { useState } from "react";

interface JobCardProps {
	jobTitle: string;
	salary: string;
	location: string;
	remote: string;
	companySize: string;
	companyName: string; // Company name
	jobLink: string; // URL for the job's apply page
}

export default function JobCards() {
	// Sample job data
	const jobs = [
		{
			jobTitle: "Software Engineer",
			salary: "$70,000 - $90,000",
			location: "New York, NY",
			remote: "Yes",
			companySize: "Medium (51-200)",
			companyName: "TechCorp", // Added company name
			jobLink: "https://example.com/job1", // Link to apply
		},
		{
			jobTitle: "Product Manager",
			salary: "$90,000 - $120,000",
			location: "San Francisco, CA",
			remote: "No",
			companySize: "Large (201+)",
			companyName: "InnovateTech", // Added company name
			jobLink: "https://example.com/job2", // Link to apply
		},
		{
			jobTitle: "Frontend Developer",
			salary: "$60,000 - $80,000",
			location: "Austin, TX",
			remote: "Yes",
			companySize: "Small (1-50)",
			companyName: "WebWorks", // Added company name
			jobLink: "https://example.com/job3", // Link to apply
		},
	];

	const [savedJobs, setSavedJobs] = useState<string[]>([]); // Track saved jobs

	// Handle saving a job
	const saveJob = (jobTitle: string) => {
		setSavedJobs((prev) => [...prev, jobTitle]);
		alert(`${jobTitle} has been saved!`);
	};

	return (
		<div className="flex flex-wrap justify-center gap-6 mt-8 mb-5">
			{jobs.map((job, index) => (
				<div
					key={index}
					className="border p-4 rounded-lg shadow-lg w-72 flex flex-col gap-4"
				>
					<h2 className="text-xl font-bold">{job.jobTitle}</h2>
					<p className="text-sm text-gray-600">
						Company: {job.companyName}
					</p>{" "}
					{/* Company name added */}
					<p className="text-sm text-gray-600">Salary: {job.salary}</p>
					<p className="text-sm text-gray-600">Location: {job.location}</p>
					<p className="text-sm text-gray-600">
						Remote: {job.remote === "Yes" ? "Remote" : "On-site"}
					</p>
					<p className="text-sm text-gray-600">
						Company Size: {job.companySize}
					</p>
					<div className="flex gap-4 mt-4">
						<button
							className="bg-gray-200 text-sm p-2 rounded-md"
							onClick={() => saveJob(job.jobTitle)}
						>
							Save
						</button>
						<a href={job.jobLink} target="_blank" rel="noopener noreferrer">
							<button className="bg-blue-500 text-white text-sm p-2 rounded-md">
								Apply
							</button>
						</a>
					</div>
				</div>
			))}
		</div>
	);
}
