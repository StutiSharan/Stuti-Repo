import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // npm i lucide-react

const menus = [
  { title: "Platform", items: [
      {name:"GitHub Copilot",desc:"Write better code with AI"},
      {name:"Codespaces",desc:"Instant dev environments"},
      {name:"Issues",desc:"Plan and track work"},
      {name:"Code Review",desc:"Manage code changes"},
      {name:"Discussions",desc:"Collaborate outside of code"}
    ]
  },
  { title: "Solutions", items: [
      {name:"GitHub Spark",desc:"Build and deploy intelligent apps"},
      {name:"GitHub Models",desc:"Manage and compare prompts"},
      {name:"Actions",desc:"Automate any workflow"},
      {name:"Security",desc:"Find and fix vulnerabilities"}
    ]
  },
  { title: "Resources", items: [
      {name:"Documentation",desc:"Learn how to use GitHub"},
      {name:"Blog",desc:"Read about latest updates"},
      {name:"Skills",desc:"Level up with tutorials"},
      {name:"Marketplace",desc:"Explore apps & actions"}
    ]
  },
  { title: "Open Source", items: [
      {name:"Explore",desc:"Trending projects"},
      {name:"Topics",desc:"Browse topics"},
      {name:"Collections",desc:"Curated lists"}
    ]
  },
  { title: "Enterprise", items: [
      {name:"Enterprise Cloud",desc:"Scalable cloud"},
      {name:"Enterprise Server",desc:"Self-hosted option"}
    ]
  }
];

export default function Navbar() {
  const [open, setOpen] = useState(null);

  return (
    <nav 
      className="w-full flex justify-between items-center px-8 py-4 text-white relative"
      style={{ backgroundColor: "#030417" }}
    >
      {/* Logo + Menus */}
      <div className="flex items-center gap-6">
        <span className="text-2xl font-bold">🐙 GitHub</span>
        {menus.map((menu, i) => (
          <div key={i} className="relative"
               onMouseEnter={() => setOpen(i)}
               onMouseLeave={() => setOpen(null)}>
            <button className="flex items-center gap-1 hover:text-gray-300 transition">
              {menu.title}
              <ChevronDown size={16} className={`transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="absolute top-10 left-0 bg-white text-black border border-gray-200 rounded-lg shadow-2xl p-4 grid grid-cols-2 gap-4 w-[500px] animate-fadeIn z-50">
                {menu.items.map((item, j) => (
                  <div key={j} className="p-2 hover:bg-gray-100 rounded cursor-pointer transition">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="hover:text-gray-300 transition">Pricing</button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="px-3 py-1 rounded hover:bg-gray-800 transition">Sign in</button>
        <button className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition">Sign up</button>
      </div>
    </nav>
  );
}
