'use client'

import { useState } from 'react';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('sindre.ryland@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/saynain",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
        </svg>
      ),
      description: "Check out my code"
    },
    {
      name: "Documentation",
      url: "https://docs.saynain.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
        </svg>
      ),
      description: "Read my documentation"
    },
    {
      name: "Blog",
      url: "https://blog.saynain.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
        </svg>
      ),
      description: "Read my articles"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sindre-ryland-932a50239/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
        </svg>
      ),
      description: "Connect professionally"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 text-pink-400">Let&apos;s Collaborate</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Always excited to collaborate on open-source projects, especially those involving 
          blockchain technology.
        </p>
        
        {/* Social Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-gray-100/50 dark:bg-gray-800/50 border border-pink-400/20 px-4 py-6 rounded-lg hover:border-pink-400/40 hover:bg-pink-400/5 transition-all duration-300 group"
            >
              <div className="text-gray-600 dark:text-gray-400 group-hover:text-pink-400 transition-colors">
                {social.icon}
              </div>
              <div className="text-center">
                <div className="text-gray-900 dark:text-white font-medium text-sm">{social.name}</div>
                <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">{social.description}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Main CTA */}
        <div className="mb-12">
          <a 
            href="mailto:sindre.ryland@gmail.com"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 text-white"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            Get In Touch
          </a>
        </div>

        {/* Crypto Address (Optional) */}
        <div className="bg-gray-100/50 dark:bg-slate-800/50 rounded-lg p-6 border border-yellow-500/20 mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Support My Work 🚀</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            If you find my projects helpful, consider supporting with crypto!
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <span>BTC:</span>
              <code className="bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">Wallet Address to be added</code>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-400">
              <span>ETH:</span>
              <code className="bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">Wallet Address to be added</code>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-gray-500 dark:text-gray-400 text-sm space-y-2">
          <p>Built with ❤️ using Next.js, TypeScript, and Tailwind CSS</p>
          <p>© 2024 Saynain. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </span>
            <span>•</span>
            <span>Based in Bergen, Norway</span>
            <span>•</span>
            <span>saynain.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
