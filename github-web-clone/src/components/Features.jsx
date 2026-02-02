import React from 'react';

export default function Features() {
	const features = [
		{
			title: 'Code hosting',
			desc: 'Host and review code, manage projects, and build software alongside millions of developers.',
			img: 'https://github.githubassets.com/images/modules/site/home-campaign/feature-repos.png',
		},
		{
			title: 'Pull requests',
			desc: 'Collaborate on code, review changes, and improve code quality together.',
			img: 'https://github.githubassets.com/images/modules/site/home-campaign/feature-pull-requests.png',
		},
		{
			title: 'Actions & Automation',
			desc: 'Automate your workflow with GitHub Actions and save time.',
			img: 'https://github.githubassets.com/images/modules/site/home-campaign/feature-actions.png',
		},
	];

	return (
		<section className="mt-20 px-4 md:px-32 grid md:grid-cols-3 gap-12 text-center">
			{features.map((f,i)=>(
				<div key={i} className="bg-[#161b22] p-6 rounded-md shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300">
					<img src={f.img} alt={f.title} className="mx-auto mb-4 w-32 h-32" />
					<h3 className="text-xl font-semibold mb-2">{f.title}</h3>
					<p className="text-gray-400">{f.desc}</p>
				</div>
			))}
		</section>
	);
}
