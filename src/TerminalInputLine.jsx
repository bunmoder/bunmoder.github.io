// This handles everything about the input area

import React from 'react';

function TerminalInputLine({ prompt, input, caretPos, onInputClick, inputRef, onChange, onKeyDown, isActive }) {
	return (
		<div className="terminal-input-line">
			<span className="prompt" style={{ color: 'var(--darkreader-text--signalis-orange, var(--darkreader-text--000000, #e8e6e3))' }}>{prompt}</span>
			<span className="input-cursor-wrapper" onClick={onInputClick}>
				<span style={{ position: 'relative', display: 'inline-block' }}>
					{isActive ? (
						<>
							{input.slice(0, caretPos)}<span className="cursor">█</span>{input.slice(caretPos)}
							<input
								ref={inputRef}
								className="terminal-input real-input"
								value={input}
								onChange={onChange}
								onKeyDown={onKeyDown}
								autoFocus
								spellCheck={false}
								autoComplete="off"
								aria-label="Terminal input"
								tabIndex={0}
								maxLength={32}
							/>
						</>
					) : null}
				</span>
			</span>
		</div>
	);
}

export default TerminalInputLine; 