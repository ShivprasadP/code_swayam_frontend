import 'react';


const Footer = () => {
	return (
		<footer id='footer'
			className="bg-gray-800 text-white py-4 mt-20">
			<div className="container mx-auto grid 
	grid-cols-4 gap-4 text-center">
				<div className="flex flex-col justify-center">
					<h2 className="text-lg font-bold">
						Lets Create
					</h2>
					<input type="email" placeholder="Enter your email"
						className="mt-2 px-4 py-2 bg-gray-700 text-white 
		border border-gray-600 rounded-md focus:ring
			focus:border-green-400" />
				</div>

				<div className="flex flex-col justify-center">
					<h2 className="text-lg font-semibold">
						Our Services
					</h2>
					<ul className="mt-2">
						<li className="hover:text-gray-300">
							Inspiration Gallery
						</li>
						<li className="hover:text-gray-300">
							Case Studies
						</li>
						<li className="hover:text-gray-300">
							Trend Insights
						</li>
						<li className="hover:text-gray-300">
							Workshops and Webinars
						</li>
						<li className="hover:text-gray-300">
							Community Involvement
						</li>
					</ul>
				</div>

				<div className="flex flex-col justify-center">
					<h2 className="text-lg font-bold">
						Our Company
					</h2>
					<ul className="mt-2">
						<li className="hover:text-gray-300">
							Our Services
						</li>
						<li className="hover:text-gray-300">
							Home Section
						</li>
					</ul>
				</div>

				<div className="flex flex-col justify-center">
					<h2 className="text-lg font-bold">Contact Us</h2>
					<address className="mt-2">
						Don Bosco Street, Ottawa, Canada
					</address>
					<p className="mt-1">Phone: +1234567890</p>
					<p>Email: letscreate153@gmail.com</p>
					<div className="mt-2 flex justify-center">
						<a href="#" className="mr-2 text-4xl 
			hover:text-green-300 cursor-default">
						</a>
						<a href="#" className="mr-2 text-4xl 
			hover:text-green-300 cursor-default">
						</a>
						<a href="#" className="hover:text-green-300
			text-4xl cursor-default">
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
