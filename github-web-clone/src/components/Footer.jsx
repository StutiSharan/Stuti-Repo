import React from 'react';

export default function Footer() {
	return (
		<footer className="mt-20 bg-[#161b22] p-10 text-gray-400 text-sm grid grid-cols-1 md:grid-cols-4 gap-6">
			<div>
				<h4 className="text-white font-semibold mb-3">GitHub</h4>
				<ul className="space-y-2">
					<li>Features</li>
					<li>Security</li>
					<li>Enterprise</li>
					<li>Customer stories</li>
				</ul>
			</div>
			<div>
				<h4 className="text-white font-semibold mb-3">Resources</h4>
				<ul className="space-y-2">
					<li>Docs</li>
					<li>Community forum</li>
					<li>Blog</li>
				</ul>
			</div>
			<div>
				<h4 className="text-white font-semibold mb-3">Support</h4>
				<ul className="space-y-2">
					<li>Contact GitHub</li>
					<li>Pricing</li>
					<li>Status</li>
				</ul>
			</div>
			<div>
				<h4 className="text-white font-semibold mb-3">Company</h4>
				<ul className="space-y-2">
					<li>About</li>
					<li>Careers</li>
					<li>Press</li>
				</ul>
			</div>
			<div className="col-span-full text-center mt-10 border-t border-gray-700 pt-4">
				© 2025 GitHub, Inc.
			</div>
		</footer>
	);
}
