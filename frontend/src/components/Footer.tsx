const Footer = () => {
	return (
		<footer
			style={{
				textAlign: "center",
				padding: "1rem",
				backgroundColor: "#f4f4f4",
				marginTop: "2rem",
			}}
		>
			<p>© 2024 Job Scraper. All rights reserved.</p>
			<p>
				Built with{" "}
				<a
					href="https://reactjs.org/"
					target="_blank"
					rel="noopener noreferrer"
				>
					React
				</a>{" "}
				and{" "}
				<a
					href="https://fastapi.tiangolo.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					FastAPI
				</a>
				.
			</p>
			<p>
				<a href="mailto:info@jobscraper.com">Contact Us</a> |
				<a
					href="https://github.com/username/jobscraper"
					target="_blank"
					rel="noopener noreferrer"
				>
					{" "}
					GitHub
				</a>
			</p>
		</footer>
	);
};

export default Footer;
