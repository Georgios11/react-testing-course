/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../Form";

export const getFormElements = () => {
	const emailInput = screen.getByRole("textbox", { name: /email/i });
	const ratingSelect = screen.getByRole("combobox", { name: /rating/i });
	const textArea = screen.getByRole("textbox", { name: /your review/i });
	const submitButton = screen.getByRole("button", { name: /submit/i });

	return { emailInput, ratingSelect, textArea, submitButton };
};

describe("Review Form", () => {
	const mockOnSubmit = vi.fn();
	beforeEach(() => {
		mockOnSubmit.mockClear();
	});
	test("renders form elements correctly", () => {
		render(<Form onSubmit={mockOnSubmit} />);

		const { emailInput, ratingSelect, textArea, submitButton } =
			getFormElements();

		expect(emailInput).toHaveValue("");
		expect(ratingSelect).toHaveValue("");
		expect(textArea).toHaveValue("");
		expect(submitButton).toBeInTheDocument();
	});
	test("shows error message when review is too short", async () => {
		const user = userEvent.setup();
		render(<Form onSubmit={mockOnSubmit} />);

		const { emailInput, ratingSelect, textArea, submitButton } =
			getFormElements();
		await user.type(emailInput, "test@example.com");
		await user.selectOptions(ratingSelect, "5");
		await user.type(textArea, "short");
		await user.click(submitButton);
		expect(
			screen.getByText(/Review must be at least 10 characters long/i),
		).toBeInTheDocument();

		expect(mockOnSubmit).not.toHaveBeenCalled();
	});
	test("submits form with valid data", async () => {
		const user = userEvent.setup();
		render(<Form onSubmit={mockOnSubmit} />);

		const { emailInput, ratingSelect, textArea, submitButton } =
			getFormElements();
		await user.type(emailInput, "test@example.com");
		await user.selectOptions(ratingSelect, "5");
		await user.type(textArea, "This is a valid review text");
		await user.click(submitButton);

		expect(mockOnSubmit).toHaveBeenCalledTimes(1);
		expect(mockOnSubmit).toHaveBeenCalledWith({
			email: "test@example.com",
			rating: "5",
			text: "This is a valid review text",
		});
	});
});
