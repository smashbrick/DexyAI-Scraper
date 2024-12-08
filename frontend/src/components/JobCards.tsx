export default function JobCards({ data }) {
	// Ensure data is an array even if undefined or null is passed
	const jobs = data || [];

	return (
		<div className="flex flex-wrap justify-center gap-6 mt-16 mb-5">
			{jobs.map((job, index) => (
				<div
					key={index}
					className="border p-4 rounded-lg shadow-lg w-72 flex flex-col gap-4"
				>
					<h2 className="text-xl font-bold">{job.jobTitle}</h2>
					<p className="text-sm text-gray-600">Company: {job.companyName}</p>
					<p className="text-sm text-gray-600">Salary: {job.salary}</p>
					<p className="text-sm text-gray-600">Location: {job.location}</p>
					<p className="text-sm text-gray-600">
						Remote: {job.remote === "Yes" ? "Remote" : "On-site"}
					</p>
					<p className="text-sm text-gray-600">
						Company Size: {job.companySize}
					</p>
					<div className="flex gap-4 mt-4 w-full">
						<button className="rounded-md border border-black text-black p-2 flex-grow text-sm">
							Save
						</button>
						<a
							href={job.jobLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex-grow"
						>
							<button className="rounded-md bg-black text-white p-2 w-full text-sm">
								Apply
							</button>
						</a>
					</div>
				</div>
			))}
		</div>
	);
}
