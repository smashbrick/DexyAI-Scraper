import { useState } from "react";
import SearchBox from "./SearchBox";
import JobCards from "./JobCards";

export default function SearchCard() {
	const [data, setSharedData] = useState([]);

	return (
		<>
			<SearchBox setSharedData={setSharedData} />
			<JobCards data={data} />
		</>
	);
}
