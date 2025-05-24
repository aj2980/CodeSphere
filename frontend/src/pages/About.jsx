import Navbar from "../components/Navbar";
import logo from "../images/logo.jpg";

const benefits = [
	{
		title: "Multi-language Support",
		desc: "Write and run code in Python, C, C++, Java, JavaScript, and more—instantly, right in your browser.",
		icon: "💻",
	},
	{
		title: "Project Management",
		desc: "Organize your code into projects, save your progress, and access your work from any device.",
		icon: "📁",
	},
	{
		title: "AI Code Assistant",
		desc: "Get instant code explanations, suggestions, and debugging help from our integrated AI chatbot.",
		icon: "🤖",
	},
	{
		title: "Modern, Responsive UI",
		desc: "Enjoy a clean, intuitive interface that works beautifully on both desktop and mobile.",
		icon: "🎨",
	},
	{
		title: "Productivity Boost",
		desc: "Prototype, test, and debug code quickly with real-time output and AI-powered help.",
		icon: "⚡",
	},
	{
		title: "Learning Friendly",
		desc: "Students can ask the AI for explanations, code improvements, or error fixes to learn faster.",
		icon: "📚",
	},
];

const About = () => (
	<>
		<Navbar />
		<div className="flex flex-col items-center min-h-screen bg-[#18181b] text-white px-4 py-10">
			<img
				src={logo}
				alt="CodeSphere Logo"
				className="about-logo mb-8"
			/>
			<h1 className="text-4xl font-bold mb-4 text-blue-400 text-center drop-shadow-lg">
				About CodeSphere
			</h1>
			<p className="max-w-2xl text-lg text-center mb-8 text-gray-300">
				<span className="font-semibold text-blue-400">CodeSphere</span> is an
				online code editor and project management platform.
				<br />
				You can create, edit, and run code in multiple languages, manage your
				projects, and get instant AI-powered code assistance.
			</p>
			<div className="w-full flex flex-wrap justify-center gap-8 mb-12">
				{benefits.map((b, i) => (
					<div
						key={b.title}
						className="bg-gradient-to-br from-[#23233a] to-[#23232a] border border-[#2a2a3e] rounded-2xl shadow-lg p-7 w-72 flex flex-col items-center hover:scale-105 transition-transform duration-300 projects project about-card-animate"
						style={{
							boxShadow:
								"0 4px 15px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
							animationDelay: `${i * 0.07}s`,
						}}
					>
						<div className="text-4xl mb-3">{b.icon}</div>
						<h2 className="text-xl font-semibold mb-2 text-blue-300 text-center">
							{b.title}
						</h2>
						<p className="text-gray-300 text-center">{b.desc}</p>
					</div>
				))}
			</div>
			<div className="max-w-xl text-gray-300 text-center mb-8 bg-[#23232a] rounded-xl shadow-lg p-8 border border-[#2a2a3e]">
				<h2 className="text-2xl font-semibold text-blue-300 mb-4">
					How CodeSphere Helps You
				</h2>
				<ul className="list-disc list-inside text-left mx-auto max-w-md mb-4 space-y-2">
					<li>
						Accessible anywhere—just open your browser, no installation needed.
					</li>
					<li>
						Instant feedback and output for faster learning and debugging.
					</li>
					<li>
						AI assistant helps you understand, fix, and improve your code.
					</li>
					<li>Organize your work and revisit projects anytime.</li>
					<li>Perfect for students, professionals, and teams alike.</li>
				</ul>
				<p>
					Made with{" "}
					<span className="text-red-400">❤</span> using{" "}
					<span className="text-blue-400 font-semibold">React</span>,{" "}
					<span className="text-green-400 font-semibold">Node.js</span>, and
					modern web technologies.
				</p>
			</div>
		</div>
	</>
);

export default About;