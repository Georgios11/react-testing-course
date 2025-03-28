/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sandbox from "../Sandbox";

import { getFormElements } from "./Form.test";

describe("Reviews App", () => {
	test("renders reviews app title", () => {
		render(<Sandbox />);
		expect(
			screen.getByRole("heading", { level: 1, name: /reviews app/i }),
		).toBeInTheDocument();
	});

	test("adds a new review when form is submitted", async () => {
		const user = userEvent.setup();
		render(<Sandbox />);

		const { emailInput, ratingSelect, textArea, submitButton } =
			getFormElements();

		//fill out the form
		await user.type(emailInput, "test@example.com");
		await user.selectOptions(ratingSelect, "5");
		await user.type(textArea, "Great product");
		await user.click(submitButton);

		expect(screen.getByText("test@example.com")).toBeInTheDocument();
		expect(screen.getByText("Great product")).toBeInTheDocument();
		expect(screen.getByText("⭐".repeat(5))).toBeInTheDocument();
	});
	test("adds a new review when form is submitted", async () => {
		const user = userEvent.setup();
		render(<Sandbox />);

		const { emailInput, ratingSelect, textArea, submitButton } =
			getFormElements();

		//fill out the form
		await user.type(emailInput, "test@example.com");
		await user.selectOptions(ratingSelect, "5");
		await user.type(textArea, "Great product");
		await user.click(submitButton);

		expect(screen.getByText("test@example.com")).toBeInTheDocument();
		expect(screen.getByText("Great product")).toBeInTheDocument();
		expect(screen.getByText("⭐".repeat(5))).toBeInTheDocument();
	});
	test("alternative - adds a new review when form is submitted", async () => {
		const user = userEvent.setup();
		render(<Sandbox />);
		const reviews = screen.queryAllByRole("article");

		expect(reviews).toHaveLength(0);
		const { emailInput, ratingSelect, textArea, submitButton } =
			getFormElements();

		//fill out the form
		await user.type(emailInput, "test@example.com");
		await user.selectOptions(ratingSelect, "5");
		await user.type(textArea, "Great product");
		await user.click(submitButton);

		expect(screen.getAllByRole("article")).toHaveLength(1);
	});
});
