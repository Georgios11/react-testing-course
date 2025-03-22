/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const Sandbox = () => {
	const [count, setCount] = useState(0);
	const [isLiked, setIsLiked] = useState(false);

	const handleIncrease = () => {
		setCount((count) => ++count);
	};
	const handleDecrease = () => {
		setCount((count) => --count);
	};
	const handleToggleLike = () => {
		setIsLiked((isLiked) => !isLiked);
	};

	return (
		<div className="p-8 text-center">
			<h2 className="text-2xl font-bold mb-4">Count : {count}</h2>
			<button
				onClick={handleIncrease}
				className="bg-blue-500 text-white px-4 py-2 rounder mr-2"
			>
				Increase
			</button>
			<button
				onClick={handleDecrease}
				className="bg-red-500 text-white px-4 py-2 rounder mr-2"
			>
				Decrease
			</button>
			{isLiked ? (
				<button
					onClick={handleToggleLike}
					className="block mx-auto text-2xl text-red-500 mt-16"
				>
					<FaHeart />
				</button>
			) : (
				<button
					onClick={handleToggleLike}
					className="block mx-auto text-2xl text-red-500 mt-16"
				>
					<FaRegHeart />
				</button>
			)}
		</div>
	);
};
export default Sandbox;
