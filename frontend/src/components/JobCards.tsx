import { useState, useEffect } from "react";

export default function JobCards({ data }: JobCardsProps) {
	const jobs = data || [];
	const [savedJobs, setSavedJobs] = useState<Job[]>([]);

	// Load saved jobs from localStorage on component mount
	useEffect(() => {
		const savedJobsFromStorage = localStorage.getItem("savedJobs");
		if (savedJobsFromStorage) {
			setSavedJobs(JSON.parse(savedJobsFromStorage));
		}
	}, []);

	// Generate a unique ID for each job
	const generateUniqueId = (job: Job) => {
		return `${job.job_title}-${job.company_name}`; // Unique combination of job_title and company_name
	};

	// Save job to localStorage
	const handleSaveJob = (job: Job) => {
		const updatedSavedJobs = [...savedJobs];
		const jobId = generateUniqueId(job);
		const jobIndex = savedJobs.findIndex(
			(savedJob) => generateUniqueId(savedJob) === jobId
		);

		if (jobIndex === -1) {
			updatedSavedJobs.push(job); // Add job to saved jobs
		}

		// Update state and localStorage
		setSavedJobs(updatedSavedJobs);
		localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
	};

	// Remove job from saved list
	const handleUnsaveJob = (job: Job) => {
		const jobId = generateUniqueId(job);
		const updatedSavedJobs = savedJobs.filter(
			(savedJob) => generateUniqueId(savedJob) !== jobId
		);

		// Update state and localStorage
		setSavedJobs(updatedSavedJobs);
		localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
	};

	return (
		<>
			{/* Job Cards Section */}
			<div className="flex flex-wrap justify-center gap-6 mt-16 mb-5">
				{jobs.map((job) => {
					const jobId = generateUniqueId(job);
					const isSaved = savedJobs.some(
						(savedJob) => generateUniqueId(savedJob) === jobId
					);

					return (
						<div
							key={jobId}
							className="border p-4 rounded-lg shadow-lg w-72 flex flex-col gap-4 h-full"
						>
							<h2 className="text-xl font-bold">{job.job_title}</h2>
							<p className="text-sm text-gray-600">
								Company: {job.company_name}
							</p>
							<p className="text-sm text-gray-600">
								Location: {job.company_location}
							</p>
							<p className="text-sm text-gray-600">
								Remote:{" "}
								{job.company_location.includes("Remote") ? "Remote" : "On-site"}
							</p>
							<p className="text-sm text-gray-600">
								Company Size: {job.company_size}
							</p>

							<div className="flex gap-4 mt-auto w-full">
								<button
									onClick={() => handleSaveJob(job)}
									className={`rounded-md ${
										isSaved ? "bg-gray-400" : "bg-black"
									} text-white p-2 flex-grow text-sm`}
								>
									{isSaved ? "Unsave" : "Save"}
								</button>
							</div>
						</div>
					);
				})}
			</div>

			{/* Saved Jobs Section */}
			{savedJobs.length > 0 && (
				<div className="mt-10">
					<div className="text-2xl font-semibold mb-4">Saved Jobs</div>
					<div className="flex flex-wrap justify-center gap-6">
						{savedJobs.map((job) => {
							const jobId = generateUniqueId(job);

							return (
								<div
									key={jobId}
									className="border p-4 rounded-lg shadow-lg w-72 flex flex-col gap-4 h-full"
								>
									<h2 className="text-xl font-bold">{job.job_title}</h2>
									<p className="text-sm text-gray-600">
										Company: {job.company_name}
									</p>

									<p className="text-sm text-gray-600">
										Location: {job.company_location}
									</p>
									<p className="text-sm text-gray-600">
										Remote:{" "}
										{job.company_location.includes("Remote")
											? "Remote"
											: "On-site"}
									</p>
									<p className="text-sm text-gray-600">
										Company Size: {job.company_size}
									</p>

									<div className="flex gap-4 mt-auto w-full">
										<button
											onClick={() => handleUnsaveJob(job)}
											className="rounded-md bg-gray-400 text-white p-2 flex-grow text-sm"
										>
											Unsave
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
}

// Define the type for a job
interface Job {
	job_title: string;
	company_name: string;
	company_location: string;
	company_size: string;
}

interface JobCardsProps {
	data: Job[];
}
