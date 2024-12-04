import Filter from "./Filter";

export default function SearchBox({ title }: SearchBoxProps) {
	return (
		<>
			<div
				className="flex
        justify-center
				flex-col
				items-center
        mt-16
        md:text-3xl	
        text-2xl
        font-bold
				gap-6

      "
			>
				<h1>{title}</h1>

				<div
					className="flex
gap-4
text-base
					"
				>
					<input
						type="text"
						placeholder="Search..."
						className="w-full px-4 py-2  text-gray-600  border rounded-md"
					/>
					<button className="rounded-md bg-black text-white p-2  text-sm">
						Scrape
					</button>
				</div>
			</div>
			<Filter />
		</>
	);
}

interface SearchBoxProps {
	title: string;
}
