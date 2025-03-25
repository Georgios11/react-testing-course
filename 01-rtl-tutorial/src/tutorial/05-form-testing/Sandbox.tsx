import { useEffect, useState } from "react";
import validator from "validator";
const labelStyles = "block text-grey-700 font-medium mb-2";
const inputStyles = "w-full px-3 py-2 border border-grey-300 rounded-md";
const buttonStyles =
	"w-full bg-blue-500 text-white py-2 px-4 rounder-md rounded-md hover:bg-blue-600";
const Sandbox = () => {
	const [signupInput, setSignupInput] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");

	// useEffect(() => {
	// 	console.log(signupInput);
	// }, [signupInput]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setSignupInput((prev) => ({
			...prev,
			[id]: value,
		}));
	};
	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!validator.isEmail(signupInput.email)) {
			return setError("Invalid Email");
		}
		if (!validator.isLength(signupInput.password, { min: 5 })) {
			return setError("Password min length 5");
		}
		if (signupInput.password !== signupInput.confirmPassword) {
			return setError("Passwords do not match");
		}
		setError("");
		setSignupInput({
			email: "",
			password: "",
			confirmPassword: "",
		});
	};
	return (
		<div className="container mx-auto max-w-md mt-10 p-6 bg-white rounder-lg shadow-md">
			<form className=" space-y-4">
				<div className="mb-3">
					<label htmlFor="email" className={labelStyles}>
						Email address
					</label>
					<input
						type="email"
						id="email"
						value={signupInput.email}
						onChange={handleChange}
						className={inputStyles}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className={labelStyles}>
						Password
					</label>
					<input
						type="password"
						id="password"
						value={signupInput.password}
						onChange={handleChange}
						className={inputStyles}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="confirmPassword" className={labelStyles}>
						Confirm Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						value={signupInput.confirmPassword}
						onChange={handleChange}
						className={inputStyles}
					/>
				</div>
				{error && <p className="text-red-500">{error}</p>}
				<button
					type="button"
					onClick={handleSubmit}
					className={buttonStyles}
				>
					{" "}
					Submit
				</button>
			</form>
		</div>
	);
};
export default Sandbox;
