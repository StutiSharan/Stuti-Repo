import React from "react";

const GitHubStats = () => (
  <section
    className="py-16 px-4 md:px-10 bg-[#0F172A] text-center text-[#CBD5E1]"
    id="github"
  >
    <h2 className="text-3xl font-extrabold text-[#38BDF8] mb-8 tracking-wide">
      GitHub Stats
    </h2>
    <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-8 items-center space-y-6 lg:space-y-0">
      <img
        src="https://github-readme-stats.vercel.app/api?username=StutiSharan&show_icons=true&theme=tokyonight&cache_seconds=1800
"        alt="GitHub Stats"
        className="rounded-xl shadow-lg transition-transform hover:scale-105 duration-300"
      />
      <img
        src="https://github-readme-streak-stats.herokuapp.com/?user=StutiSharan&theme=tokyonight"
        alt="GitHub Streak"
        className="rounded-xl shadow-lg transition-transform hover:scale-105 duration-300"
      />
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-[#38BDF8] mb-4">
        Contribution Heatmap
      </h3>
      <img
        src="https://ghchart.rshah.org/StutiSharan"
        alt="GitHub chart"
        className="mx-auto w-full max-w-3xl border border-[#1E293B] rounded-lg p-4 bg-[#1E293B]"
      />
    </div>
  </section>
);

export default GitHubStats;
