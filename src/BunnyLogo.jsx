import React from 'react';

function BunnyLogo({ className }) {
	return (
		<div className={className}>
			<svg width="64" height="64" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
				{/* Ears */}
				<rect x="3" y="1" width="2" height="5" fill="#fff" />
				<rect x="11" y="1" width="2" height="5" fill="#fff" />
				<rect x="3" y="1" width="2" height="2" fill="#fbb" />
				<rect x="11" y="1" width="2" height="2" fill="#fbb" />
				{/* Head */}
				<rect x="2" y="5" width="12" height="8" fill="#fff" />
				{/* Cheeks */}
				<rect x="3" y="11" width="2" height="2" fill="#fbb" />
				<rect x="11" y="11" width="2" height="2" fill="#fbb" />
				{/* Eyes */}
				<rect x="5" y="8" width="1" height="1" fill="#222" />
				<rect x="10" y="8" width="1" height="1" fill="#222" />
				{/* Nose */}
				<rect x="7" y="10" width="2" height="1" fill="#f88" />
				{/* Mouth */}
				<rect x="7" y="12" width="1" height="1" fill="#222" />
				<rect x="8" y="12" width="1" height="1" fill="#222" />
			</svg>
			<div className="crt-flicker" />
		</div>
	);
}

export default BunnyLogo; 