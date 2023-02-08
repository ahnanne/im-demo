import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	:root {
		font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
		font-size: 16px;
		line-height: 24px;
		font-weight: 400;

		color-scheme: light dark;
		color: rgba(255, 255, 255, 0.87);
		background-color: #242424;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;

		--black: #181818;
		--theme: #146eb4;
	}

	.Toastify__toast {
		border-radius: 10px;
		line-height: 1.5;
		color: #585858;
		font-size: 14px;
	}
	.progress-bar {
		background: linear-gradient(-90deg, var(--theme) 0%, var(--theme) 35%, #fafafa 100%);
	}

	a {
		font-weight: 500;
		color: #646cff;
		text-decoration: inherit;
	}
	a:hover {
		color: #535bf2;
	}

	html,
	body {
		min-height: 100vh;
		padding: 0;
		margin: 0;
	}

	body {
		/* display: flex;
		place-items: center; */
	}

	h1 {
		font-size: 3.2em;
		line-height: 1.1;
	}

	button {
		border-radius: 8px;
		border: 1px solid transparent;
		padding: 0.6em 1.2em;
		font-size: 1em;
		font-weight: 500;
		font-family: inherit;
		background-color: #1a1a1a;
		cursor: pointer;
		transition: border-color 0.25s;
	}
	button:hover {
		border-color: #646cff;
	}
	button:focus,
	button:focus-visible {
		outline: 4px auto -webkit-focus-ring-color;
	}

	@media (prefers-color-scheme: light) {
		:root {
			color: #213547;
			background-color: #ffffff;
		}
		a:hover {
			color: #747bff;
		}
		button {
			background-color: #f9f9f9;
		}
	}
`;

export default GlobalStyles;
