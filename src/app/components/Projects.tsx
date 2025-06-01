'use client'

import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  tags: Array<{
    name: string;
    color: string;
  }>;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "TBA",
      description: "More details are coming soon.",
      icon: "₿",
      iconBg: "bg-yellow-500/20",
      tags: [
        { name: "React", color: "bg-purple-500/20 text-purple-400" },
        { name: "Web3", color: "bg-yellow-500/20 text-yellow-400" },
        { name: "TypeScript", color: "bg-pink-500/20 text-pink-400" },
      ],
      liveUrl: "https://saynain.com",
      githubUrl: "https://github.com/saynain/repo",
      featured: true,
    },
    {
      id: 2,
      title: "TBA",
      description: "More details are coming soon.",
      icon: "⚡",
      iconBg: "bg-purple-500/20",
      tags: [
        { name: "Node.js", color: "bg-green-500/20 text-green-400" },
        { name: "Redis", color: "bg-red-500/20 text-red-400" },
        { name: "Docker", color: "bg-blue-500/20 text-blue-400" },
      ],
      liveUrl: "https://saynain.com",
      githubUrl: "https://github.com/saynain/repo",
      featured: true,
    },
    {
      id: 3,
      title: "TBA",
      description: "More details are coming soon.",
      icon: "🎨",
      iconBg: "bg-pink-500/20",
      tags: [
        { name: "React", color: "bg-purple-500/20 text-purple-400" },
        { name: "Storybook", color: "bg-pink-500/20 text-pink-400" },
        { name: "CSS-in-JS", color: "bg-blue-500/20 text-blue-400" },
      ],
      githubUrl: "https://github.com/saynain/repo",
      featured: true,
    },
    {
      id: 4,
      title: "TBA",
      description: "More details are coming soon.",
      icon: "🔍",
      iconBg: "bg-green-500/20",
      tags: [
        { name: "Solidity", color: "bg-yellow-500/20 text-yellow-400" },
        { name: "Python", color: "bg-green-500/20 text-green-400" },
        { name: "Security", color: "bg-red-500/20 text-red-400" },
      ],
      githubUrl: "https://github.com/saynain/repo",
    },
    {
      id: 5,
      title: "TBA",
      description: "More details are coming soon.",
      icon: "🤖",
      iconBg: "bg-blue-500/20",
      tags: [
        { name: "Python", color: "bg-green-500/20 text-green-400" },
        { name: "ML", color: "bg-purple-500/20 text-purple-400" },
        { name: "APIs", color: "bg-blue-500/20 text-blue-400" },
      ],
      githubUrl: "https://github.com/saynain/repo",
    },
    {
      id: 6,
      title: "TBA",
      description: "More details are coming soon.",
      icon: "🖼️",
      iconBg: "bg-orange-500/20",
      tags: [
        { name: "Ethereum", color: "bg-blue-500/20 text-blue-400" },
        { name: "IPFS", color: "bg-green-500/20 text-green-400" },
        { name: "Next.js", color: "bg-purple-500/20 text-purple-400" },
      ],
      liveUrl: "https://saynain.com",
      githubUrl: "https://github.com/saynain/repo",
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <div 
      className={`bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-slate-800 p-6 rounded-xl border border-pink-400/20 
        hover:border-pink-400/40 transition-all duration-300 group hover:scale-105 transform
        ${hoveredProject === project.id ? 'ring-2 ring-pink-400/50' : ''}`}
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${project.iconBg} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          <span className="text-xl">{project.icon}</span>
        </div>
        <div className="flex space-x-2">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-pink-400 transition-colors"
              aria-label="View live demo"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-pink-400 transition-colors"
              aria-label="View source code"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-pink-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <span 
            key={tagIndex}
            className={`${tag.color} px-2 py-1 rounded text-xs transition-all duration-300 hover:scale-105`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-pink-400">Featured Projects</h2>
        
        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-center mb-12 text-purple-400">More Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </>
        )}
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Want to see more? Check out my GitHub for additional projects and contributions.
          </p>
          <a 
            href="https://github.com/saynain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
            </svg>
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
