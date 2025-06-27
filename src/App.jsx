// Main App component
import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import BunnyLogo from './BunnyLogo';
import TerminalInputLine from './TerminalInputLine';
import React from 'react';
import { COMMANDS, THEMES, ASCII_ARTS, FORTUNES, FAKE_FILES } from './commands';

const PROMPT = 'talia@bunmoder:~$ ';

const WELCOME_LINES = [
	'Welcome to TaliOS.',
	'Type help to see available commands.'
];

const GLITCH_MESSAGE = 'REMEMBER OUR PROMISE';
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

const MemoBunnyLogo = React.memo(BunnyLogo);
const MemoTerminalInputLine = React.memo(TerminalInputLine);

function App() {
	// All the state for the terminal and its boot sequence
	const [lines, setLines] = useState([]);
	const [input, setInput] = useState('');
	const inputRef = useRef(null);
	const scrollRef = useRef(null);
	const [caretPos, setCaretPos] = useState(0);

	// Boot sequence stuff
	const [bootStage, setBootStage] = useState('logo-fade');
	const [logoSlide, setLogoSlide] = useState(false);
	const [typedWelcome, setTypedWelcome] = useState(['', '']);
	const [typewriterLine, setTypewriterLine] = useState(0);
	const [typewriterChar, setTypewriterChar] = useState(0);
	const [typedPrompt, setTypedPrompt] = useState('');
	const [promptChar, setPromptChar] = useState(0);
	const [theme, setTheme] = useState(() => {
		// Try to grab the theme from localStorage, or just use the default
		const saved = localStorage.getItem('theme');
		return (saved && THEMES.includes(saved)) ? saved : 'signalis';
	});
	const [glitch, setGlitch] = useState(false);
	const [glitchText, setGlitchText] = useState('');
	const [scan, setScan] = useState(false);
	const [history, setHistory] = useState([]);
	const historyIndexRef = useRef(-1);

	// Boot sequence effects
	useEffect(() => {
		// Logo fade in, then slide up
		if (bootStage === 'logo-fade') {
			const t = setTimeout(() => {
				setLogoSlide(true);
				setBootStage('slide');
			}, 900);
			return () => clearTimeout(t);
		}
		if (bootStage === 'slide') {
			const t = setTimeout(() => setBootStage('typewriter'), 900);
			return () => clearTimeout(t);
		}
	}, [bootStage]);

	useEffect(() => {
		// Type out the welcome message, one line at a time
		if (bootStage === 'typewriter') {
			if (typewriterLine < WELCOME_LINES.length) {
				if (typewriterChar < WELCOME_LINES[typewriterLine].length) {
					const t = setTimeout(() => {
						setTypedWelcome((prev) => {
							const updated = [...prev];
							updated[typewriterLine] += WELCOME_LINES[typewriterLine][typewriterChar];
							return updated;
						});
						setTypewriterChar(typewriterChar + 1);
					}, 28);
					return () => clearTimeout(t);
				} else {
					setTypewriterLine(typewriterLine + 1);
					setTypewriterChar(0);
				}
			} else {
				setTimeout(() => setBootStage('prompt'), 400);
			}
		}
	}, [bootStage, typewriterLine, typewriterChar]);

	useEffect(() => {
		// Type out the prompt after the welcome message
		if (bootStage === 'prompt') {
			if (promptChar < PROMPT.length) {
				const t = setTimeout(() => {
					setTypedPrompt((prev) => prev + PROMPT[promptChar]);
					setPromptChar(promptChar + 1);
				}, 22);
				return () => clearTimeout(t);
			} else {
				setTimeout(() => setBootStage('terminal'), 300);
			}
		}
	}, [bootStage, promptChar]);

	useEffect(() => {
		// Scroll to the bottom when new output appears
		if (bootStage === 'terminal') {
			scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [lines, bootStage]);

	// Glitch effect logic
	useEffect(() => {
		if (!glitch) return;
		let frame = 0;
		let interval;
		const glitchFrames = 12;
		let lastFrame = '';
		function randomGlitchStr() {
			if (Math.random() < 0.18) return GLITCH_MESSAGE;
			return Array.from({ length: GLITCH_MESSAGE.length }, () =>
				GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
			).join('');
		}
		interval = setInterval(() => {
			const str = randomGlitchStr();
			setGlitchText(str);
			lastFrame = str;
			frame++;
			if (frame > glitchFrames) {
				setGlitch(false);
				// Make the last output line keep the final glitch frame
				setLines(prev => {
					const newLines = [...prev];
					for (let i = newLines.length - 1; i >= 0; i--) {
						if (newLines[i].glitch) {
							newLines[i] = { ...newLines[i], text: lastFrame };
							break;
						}
					}
					return newLines;
				});
				setTimeout(() => setGlitchText(''), 10); 
				clearInterval(interval);
			}
		}, 50);
		return () => clearInterval(interval);
	}, [glitch]);

	// Change the theme and save it
	useEffect(() => {
		document.body.classList.remove('theme-signalis', 'theme-bunny', 'theme-crt', 'theme-nightmare', 'theme-shark');
		document.body.classList.add('theme-' + theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const handleCommand = useCallback((cmdRaw) => {
		const cmd = cmdRaw.trim();
		let response = '';
		if (cmd === 'clear') {
			setLines([]);
			setHistory((prev) => prev.length > 0 && prev[prev.length - 1] === cmd ? prev : [...prev, cmd]);
			return;
		}
		if (cmd === 'help') {
			response = 'Available commands: about, projects, contact, clear, help, ascii, fortune, theme, date, echo, scan, ls, cat';
		} else if (cmd === 'about') {
			response = '> she/her\n> 25 years old\n> programmer, writer\n> world of warcraft / class of 09\n> horror movies / metal music';
		} else if (cmd === 'projects') {
			response = (
				<div className="projects-columns">
					<div>
						<span>{'>'} <a href="https://archiveofourown.org/works/64907299/chapters/166837144" target="_blank" rel="noopener noreferrer">between you and me</a></span><br/>
						<span>{'>'} <a href="https://archiveofourown.org/works/64732726" target="_blank" rel="noopener noreferrer">her seats still open</a></span><br/>
						<span>{'>'} <a href="https://archiveofourown.org/works/64935793" target="_blank" rel="noopener noreferrer">late night lights</a></span>
					</div>
					<div>
						<span>{'>'} <a href="https://archiveofourown.org/works/66131902/chapters/170433520" target="_blank" rel="noopener noreferrer">marked absent</a></span><br/>
						<span>{'>'} <a href="https://bunmoder.itch.io/" target="_blank" rel="noopener noreferrer">itch.io versions</a></span>
					</div>
				</div>
			);
		} else if (cmd === 'contact') {
			response = [
				<span key="twitter">{'>'} Twitter: <a href="https://twitter.com/bunmoder" target="_blank" rel="noopener noreferrer">@bunmoder</a></span>,
				<span key="discord">{'>'} Discord Server: <a href="https://discord.gg/XFHZeSwxfB" target="_blank" rel="noopener noreferrer">Shark Tank</a></span>
			];
		} else if (cmd === 'ascii') {
			response = ASCII_ARTS[Math.floor(Math.random() * ASCII_ARTS.length)];
		} else if (cmd === 'fortune') {
			response = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
		} else if (cmd.startsWith('theme')) {
			const arg = cmd.split(' ')[1];
			if (THEMES.includes(arg)) {
				setTheme(arg);
				response = `Theme set to: ${arg}`;
			} else {
				response = `Available themes: ${THEMES.join(', ')}`;
			}
		} else if (cmd === 'date') {
			response = new Date().toLocaleString();
		} else if (cmd === 'echo') {
			response = 'usage: echo [text]';
		} else if (cmd.startsWith('echo ')) {
			response = cmd.slice(5);
		} else if (cmd === 'promise.sh') {
			setGlitch(true);
			response = GLITCH_MESSAGE.replace(/./g, ' ');
			setTimeout(() => setGlitch(false), 800);
		} else if (cmd === 'scan') {
			setScan(true);
			response = '[ SCANNING... ]';
			setTimeout(() => {
				setScan(false);
				setLines((prev) => [...prev, { type: 'output', text: 'Scan complete. No threats detected. 🐇' }]);
			}, 1200);
		} else if (cmd === 'ls') {
			response = Object.keys(FAKE_FILES).join('    ');
		} else if (cmd === 'cat') {
			response = 'usage: cat [file]';
		} else if (cmd.startsWith('cat ')) {
			const file = cmd.split(' ')[1];
			response = FAKE_FILES[file] || `cat: ${file}: No such file`;
		} else {
			response = `Command not found: ${cmd}`;
		}
		setLines((prev) => [
			...prev,
			{ type: 'input', text: cmd },
			{ type: 'output', text: response, glitch: cmd === 'promise.sh' },
		]);
		setHistory((prev) => prev.length > 0 && prev[prev.length - 1] === cmd ? prev : [...prev, cmd]);
	}, [setTheme, setGlitch, setScan, setLines, setHistory]);

	const handleKeyDown = useCallback((e) => {
		if (e.key === 'Enter') {
			historyIndexRef.current = -1;
			handleCommand(input.trim());
			setInput('');
			setCaretPos(0);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (history.length === 0) return;
			if (historyIndexRef.current < 0) historyIndexRef.current = history.length - 1;
			else historyIndexRef.current = Math.max(0, historyIndexRef.current - 1);
			setInput(history[historyIndexRef.current] || '');
			setCaretPos((history[historyIndexRef.current] || '').length);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (history.length === 0) return;
			if (historyIndexRef.current < 0) return;
			historyIndexRef.current++;
			if (historyIndexRef.current >= history.length) {
				setInput('');
				setCaretPos(0);
				historyIndexRef.current = -1;
			} else {
				setInput(history[historyIndexRef.current] || '');
				setCaretPos((history[historyIndexRef.current] || '').length);
			}
		} else if (e.key === 'Tab') {
			e.preventDefault();
			let matches = [];
			let prefix = input.trim();
			// Autocomplete for 'cat <file>'
			if (prefix.startsWith('cat ')) {
				const filePrefix = prefix.slice(4);
				matches = Object.keys(FAKE_FILES).filter(f => f.startsWith(filePrefix));
				if (matches.length === 1) {
					setInput('cat ' + matches[0]);
					setCaretPos(('cat ' + matches[0]).length);
				} else if (matches.length > 1) {
					setLines(prev => [...prev, { type: 'output', text: matches.join('    ') }]);
				}
			} else {
				// Autocomplete for commands
				matches = COMMANDS.filter(cmd => cmd.startsWith(prefix));
				if (matches.length === 1) {
					setInput(matches[0]);
					setCaretPos(matches[0].length);
				} else if (matches.length > 1) {
					setLines(prev => [...prev, { type: 'output', text: matches.join('    ') }]);
				}
			}
		}
	}, [handleCommand, input, history]);

	const handleChange = useCallback((e) => {
		setInput(e.target.value);
		setCaretPos(e.target.selectionStart || 0);
	}, []);

	const logoClass = `boot-logo-absolute${logoSlide || bootStage !== 'logo-fade' ? ' logo-top' : ''}`;

	const handleTerminalClick = useCallback((e) => {
		if (e.target.closest('a,button')) return;
		inputRef.current?.focus();
	}, []);

	return (
		<div className={`signalis-container terminal-fixed${glitch ? ' glitch' : ''}${scan ? ' scan' : ''}`}
			style={{ color: 'var(--darkreader-text--signalis-orange, var(--darkreader-text-000000, #e8e6e3))' }}
			onClick={handleTerminalClick}>
			<div className={logoClass + (glitch ? ' glitch' : '')}>
				<MemoBunnyLogo className={logoClass} />
			</div>
			<div className={"terminal-welcome" + (glitch ? ' glitch' : '')}
				style={{ color: 'var(--darkreader-text--signalis-orange, var(--darkreader-text-000000, #e8e6e3))' }}>
				<div>{bootStage === 'terminal' ? 'Welcome to TaliOS.' : typedWelcome[0]}</div>
				<div>{bootStage === 'terminal' ? 'Type help to see available commands.' : typedWelcome[1]}</div>
			</div>
			<div className="terminal-scrollable">
				{lines.map((line, i) => {
					if (line.type === 'input')
						return <div key={i}><span className={"prompt" + (glitch ? ' glitch' : '')} style={{ color: 'var(--darkreader-text--signalis-orange, var(--darkreader-text-000000, #e8e6e3))' }}>{PROMPT}</span>{line.text}</div>;
					if (line.type === 'output') {
						// Show glitching text if this is the latest glitch output and glitch is active
						if (line.glitch && glitch && i === lines.length - 1) {
							return <div key={i} className={glitch ? 'glitch' : ''}>{glitchText || line.text}</div>;
						}
						if (typeof line.text === 'string' && line.text.includes('\n')) {
							return (
								<div key={i}>
									{line.text.split('\n').map((l, idx) => (
										<div key={idx}>{l}</div>
									))}
								</div>
							);
						}
						if (Array.isArray(line.text)) {
							return (
								<div key={i}>
									{line.text.map((el, idx) => (
										<div key={idx}>{el}</div>
									))}
								</div>
							);
						}
						return <div key={i}>{line.text}</div>;
					}
					return null;
				})}
				<div ref={scrollRef} />
			</div>
			{bootStage !== 'terminal' ? (
				<MemoTerminalInputLine
					prompt={typedPrompt}
					input={input}
					caretPos={caretPos}
					onInputClick={() => inputRef.current?.focus()}
					inputRef={inputRef}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					isActive={bootStage === 'prompt'}
				/>
			) : (
				<MemoTerminalInputLine
					prompt={PROMPT}
					input={input}
					caretPos={caretPos}
					onInputClick={() => inputRef.current?.focus()}
					inputRef={inputRef}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					isActive={true}
				/>
			)}
		</div>
	);
}

export default App;