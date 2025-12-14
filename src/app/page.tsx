'use client';

import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

    // Define the portfolio data
    const aboutMe = "👋 Hey, I’m Matthijs — a software developer who turns ideas into clean, efficient code. I’m all about building apps, APIs, and systems that actually work and scale, whether it’s Flutter, Kotlin, Laravel, or just making data flow without breaking a sweat. I thrive on solving tricky problems, optimizing workflows, and learning new tech stacks faster than most people learn their coffee order (mine’s usually a can of Monster).\n" +
        "\n" +
        "When I’m not coding, I’m tinkering with personal projects, exploring the latest dev tools, or upgrading my setup to squeeze every drop of performance out of it.";
    const projects = [
        { name: "Fitalize", description: "An app to track your macros and calories.", link: "https://fitalize.app" },
    ];
    const contactInfo = "You can find me on GitHub at https://github.com/mkuilen. Let's build something great together!";

    const commands = {
        help: 'Displays a list of available commands.',
        about: 'Learn more about me.',
        projects: 'View a list of my projects.',
        contact: 'Find my contact information.',
        clear: 'Clears the terminal screen.',
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [output]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const command = input.toLowerCase().trim();
      const newOutput = [...output, `$ ${input}`];

            switch (command) {
                case 'help':
                    newOutput.push(
                        ...Object.entries(commands).map(([cmd, desc]) => `${cmd}: ${desc}`)
                    );
                    break;
                case 'about':
                    newOutput.push(aboutMe);
                    break;
                case 'projects':
                    projects.forEach(project => {
                        newOutput.push(`\nName: ${project.name}`);
                        newOutput.push(`Description: ${project.description}`);
                        newOutput.push(`Link: ${project.link}\n`);
                    });
                    break;
                case 'contact':
                    newOutput.push(contactInfo);
                    break;
                case 'clear':
                    setOutput([]);
                    break;
                case '':
                    break;
                default:
                    newOutput.push(`Command not found: ${command}. Type 'help' to see available commands.`);
                    break;
            }
            setOutput(newOutput);
            setInput('');
        }
    };

  return (
    <div className="bg-black text-lime-400 min-h-screen p-4 font-mono antialiased flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl h-[calc(100vh-2rem)] flex flex-col rounded-lg shadow-2xl p-6 bg-gray-900 border border-gray-700">
        <div className="flex-none flex space-x-2 pb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div ref={terminalRef} className="flex-grow overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed p-2">
          <p className="pb-2">
            Welcome to my portfolio! Type 'help' to get started.
          </p>
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div className="flex-none mt-4 border-t border-gray-700 pt-4">
          <label htmlFor="terminal-input" className="sr-only">Terminal Input</label>
          <div className="flex items-center">
            <span className="text-lime-400 mr-2">$</span>
            <input
              id="terminal-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputSubmit}
              className="bg-transparent border-none outline-none text-white flex-grow caret-white"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
