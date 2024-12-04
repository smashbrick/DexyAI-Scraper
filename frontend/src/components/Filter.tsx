export default function Filter() {
	return (
		<div className="flex mt-12 justify-center items-center">
			<div className="flex flex-wrap gap-6 justify-center max-w-screen-lg w-full px-4">
				{/* Job Type Dropdown */}
				<div className="flex flex-col w-full sm:w-48">
					<label
						htmlFor="jobType"
						className="text-sm font-semibold mb-2 text-left"
					>
						Job Type:
					</label>
					<select
						id="jobType"
						name="jobType"
						className="text-sm p-2 border rounded-md"
					>
						<option value="">None</option>
						<option value="full-time">Full-Time</option>
						<option value="part-time">Part-Time</option>
					</select>
				</div>

				{/* Remote Option Dropdown */}
				<div className="flex flex-col w-full sm:w-48">
					<label
						htmlFor="remote"
						className="text-sm font-semibold mb-2 text-left"
					>
						Select Remote Option:
					</label>
					<select
						id="remote"
						name="remote"
						className="text-sm p-2 border rounded-md"
					>
						<option value="">None</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>

				{/* Company Size Dropdown */}
				<div className="flex flex-col w-full sm:w-48">
					<label
						htmlFor="companySize"
						className="text-sm font-semibold mb-2 text-left"
					>
						Company Size:
					</label>
					<select
						id="companySize"
						name="companySize"
						className="text-sm p-2 border rounded-md"
					>
						<option value="">None</option>
						<option value="small">Small (1-50)</option>
						<option value="medium">Medium (51-200)</option>
						<option value="large">Large (201+)</option>
					</select>
				</div>

				{/* Number of Records Dropdown */}
				<div className="flex flex-col w-full sm:w-48">
					<label
						htmlFor="numRecords"
						className="text-sm font-semibold mb-2 text-left"
					>
						Number of Records:
					</label>
					<select
						id="numRecords"
						name="numRecords"
						className="text-sm p-2 border rounded-md"
					>
						<option value="">None</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
			</div>
		</div>
	);
}
