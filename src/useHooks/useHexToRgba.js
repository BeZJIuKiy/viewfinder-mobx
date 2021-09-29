import React from 'react';

export const useHexToRgba = (hex, a=1) => {
	const newHex = (hex[0] === "#") ? hex.replace("#", "") : hex;
	const rgb = [];

	if (newHex.length < 6) {
		for (let i = 0; i < newHex.length; ++i) {
			rgb.push(parseInt((newHex[i] + newHex[i]), 16));
		}
	} else {
		for (let i = 0; i < newHex.length; i += 2) {
			rgb.push(parseInt(newHex[i] + newHex[i + 1], 16));
		}
	}
	const [r, g, b] = rgb;

	return `rgba(${r}, ${g}, ${b}, ${a})`;
};