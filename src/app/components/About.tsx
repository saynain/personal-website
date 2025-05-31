export default function About() {
    const skills = [
      { name: "React", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
      { name: "Blockchain", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      { name: "TypeScript", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
      { name: "Node.js", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Web3", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
      { name: "Smart Contracts", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    ];
  
    return (
      <section id="about" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-pink-400">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Engineer • Developer • Blockchain Enthusiast</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I&apos;m a passionate developer with a deep love for technology and innovation. My journey spans 
                full-stack development, blockchain technology, and distributed systems. I believe in the 
                power of code to transform ideas into reality.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring the latest developments in cryptocurrency, 
                DeFi protocols, and emerging blockchain technologies. I&apos;m always excited to discuss 
                the intersection of technology and finance.
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
              <div className="bg-gradient-to-br from-slate-800 to-gray-900 p-8 rounded-2xl border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold hover:scale-105 transition-transform duration-300">
                    🤓
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-white">Tech Stack Nerd</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    &quot;I optimize for performance, scalability, and developer experience. 
                    Always learning, always building.&quot;
                  </p>
                  
                  {/* Fun Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-400">50+</div>
                      <div className="text-xs text-gray-400">Projects Built</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-pink-400">24/7</div>
                      <div className="text-xs text-gray-400">Learning Mode</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500/20 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
          
          {/* Additional Info Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
              <div className="text-3xl mb-4">🚀</div>
              <h4 className="text-lg font-bold text-white mb-2">Innovation First</h4>
              <p className="text-gray-400 text-sm">
                Always exploring cutting-edge technologies and pushing the boundaries of what&apos;s possible.
              </p>
            </div>
            
            <div className="text-center bg-slate-800/50 rounded-lg p-6 border border-pink-500/20">
              <div className="text-3xl mb-4">🔗</div>
              <h4 className="text-lg font-bold text-white mb-2">Blockchain Native</h4>
              <p className="text-gray-400 text-sm">
                Deep understanding of decentralized systems, smart contracts, and DeFi protocols.
              </p>
            </div>
            
            <div className="text-center bg-slate-800/50 rounded-lg p-6 border border-yellow-500/20">
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="text-lg font-bold text-white mb-2">Performance Focused</h4>
              <p className="text-gray-400 text-sm">
                Obsessed with clean code, optimal performance, and exceptional user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  