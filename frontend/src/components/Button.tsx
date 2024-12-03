export default function Button({ children }: { children: React.ReactNode }) {
	return (
		<button className="bg-black text-white p-4 text-sm border rounded-full">
			{children}
		</button>
	);
}
