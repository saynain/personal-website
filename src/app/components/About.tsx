'use client'

export default function About() {
  const skills = [
    { name: "SAP Basis", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { name: "Linux", color: "bg-green-500/20 text-green-400 border-green-500/30" },
    { name: "Proxmox", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { name: "Databases", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    { name: "Kubernetes", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
    { name: "Networking", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
    { name: "Development", color: "bg-red-500/20 text-red-400 border-red-500/30" },
    { name: "Blockchain", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-pink-400">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              From Carpenter to Computer Science
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              My journey into tech began with a unique path - transitioning from carpentry to becoming 
              a trainee at a SAP hosting company in 2019. While pursuing my Computer Science degree 
              at HVL Bergen (2020-2023), I worked full-time, gaining invaluable hands-on experience 
              in enterprise infrastructure and SAP Basis hosting.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I specialize in hosting provider technologies, from virtualization with Proxmox to 
              network architecture using VyOS. My experience spans database management (PostgreSQL, 
              HANA, Sybase), Linux system administration, and web infrastructure with Nginx, Apache, 
              and HAProxy.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Currently diving deep into Kubernetes and cloud-native technologies while running my 
              own homelab for continuous experimentation. I&apos;m passionate about automation, 
              open-source innovation, and the transformative potential of blockchain technology.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className={`${skill.color} px-3 py-1 rounded-full text-sm border transition-all duration-300 hover:scale-105 cursor-default`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-gray-900 p-8 rounded-2xl border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold hover:scale-105 transition-transform duration-300">
                🤓
                </div>
                <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tech Stack Nerd</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  &quot;I optimize for performance, scalability, and developer experience. 
                  Always automating the boring stuff.&quot;
                </p>
                
                {/* Professional Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-200/50 dark:bg-slate-700/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-400">4+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Years Enterprise</div>
                  </div>
                  <div className="bg-gray-200/50 dark:bg-slate-700/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-pink-400">24/7</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Learning Mode</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500/20 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
        
        {/* Expertise Areas */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center bg-gray-100/50 dark:bg-slate-800/50 rounded-lg p-6 border border-blue-500/20">
            <div className="text-3xl mb-4">🏗️</div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Infrastructure & SAP</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              SAP Basis, enterprise hosting, virtualization with Proxmox, and complex 
              tenant architecture design.
            </p>
          </div>
          
          <div className="text-center bg-gray-100/50 dark:bg-slate-800/50 rounded-lg p-6 border border-pink-500/20">
            <div className="text-3xl mb-4">🌐</div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Networking & DevOps</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              VyOS networking, Nginx,HAProxy, Kubernetes orchestration, and cloud-native 
              technologies.
            </p>
          </div>
          
          <div className="text-center bg-gray-100/50 dark:bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
            <div className="text-3xl mb-4">🏠</div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Homelab Enthusiast</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Running multiple servers for continuous learning, testing open-source 
              technologies and automation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
