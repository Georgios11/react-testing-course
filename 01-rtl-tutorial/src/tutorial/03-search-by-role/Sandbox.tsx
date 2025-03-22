/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
const Sandbox = () => {
	const [showAsyncButton, setShowAsyncButton] = useState(false);
	const [showError, setShowError] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowAsyncButton(true);
			return () => clearTimeout(timer);
		}, 1000);
	}, []);
	return (
		<div>
			<nav>
				<a href="/">Home</a>
				<a href="/about">About</a>
			</nav>
			<h1>Main heading</h1>
			<h2>Subheading</h2>
			<img src="example.jpg" alt="example" />
			<button>Click me</button>
			<button>Submit</button>
			<button>Cancel</button>
			{/*Conditional error button to demonstrate queryByRole */}
			{showError && <button>error</button>}
			{/*Demonstrate find by role */}
			{showAsyncButton && <button>Async Button</button>}
		</div>
	);
};
export default Sandbox;
