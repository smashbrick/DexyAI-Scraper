const Footer = () => {
	return (
		<footer className="text-center py-4 shadow-2xl bg-gray-800 text-white mt-auto">
			<p>© 2024 Job Scraper. All rights reserved.</p>
			<p>
				Built with{" "}
				<a
					href="https://reactjs.org/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500"
				>
					React
				</a>{" "}
				and{" "}
				<a
					href="https://fastapi.tiangolo.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500"
				>
					Flask
				</a>
				.
			</p>
		</footer>
	);
};

export default Footer;
