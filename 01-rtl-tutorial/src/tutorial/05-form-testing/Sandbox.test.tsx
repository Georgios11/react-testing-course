/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, logRoles } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

//helper function to select elements
const getFormElements = () => {
	const elements = {
		emailInputElement: screen.getByRole("textbox", {
			name: /email/i,
		}),
		passwordInputElement: screen.getByLabelText("Password"),
		confirmPasswordInputElement: screen.getByLabelText(/confirm password/i),
		submitButton: screen.getByRole("button", { name: /submit/i }),
	};
	return elements;
};
describe("05-form-testing", () => {
	let user: UserEvent;
	beforeEach(() => {
		user = userEvent.setup();
		render(<Sandbox />);
	});

	test("inputs should be initially empty", () => {
		// const { container } = render(<Sandbox />);
		// screen.debug();
		// logRoles(container);
		const {
			emailInputElement,
			passwordInputElement,
			confirmPasswordInputElement,
		} = getFormElements();

		expect(emailInputElement).toHaveValue("");

		expect(passwordInputElement).toHaveValue("");

		expect(confirmPasswordInputElement).toHaveValue("");
	});

	test("should be able to type in the input fields", async () => {
		// const user = userEvent.setup();
		// render(<Sandbox />);

		const {
			emailInputElement,
			passwordInputElement,
			confirmPasswordInputElement,
		} = getFormElements();

		await user.type(emailInputElement, "test@test.com");
		expect(emailInputElement).toHaveValue("test@test.com");

		await user.type(passwordInputElement, "secret");
		expect(passwordInputElement).toHaveValue("secret");

		await user.type(confirmPasswordInputElement, "secret");
		expect(confirmPasswordInputElement).toHaveValue("secret");
	});
	test("should show email error if email is invalid", async () => {
		const { emailInputElement, submitButton } = getFormElements();
		expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

		await user.type(emailInputElement, "invalid");
		await user.click(submitButton);
		expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
	});
	test("should password error if password is les than 5 characters", async () => {
		const { emailInputElement, submitButton, passwordInputElement } =
			getFormElements();
		expect(
			screen.queryByText(/password min length 5/i),
		).not.toBeInTheDocument();

		await user.type(emailInputElement, "test@test.email");
		await user.type(passwordInputElement, "1111");
		await user.click(submitButton);
		expect(screen.getByText(/password min length 5/i)).toBeInTheDocument();
	});
	test("should show error if passwords do not match", async () => {
		const {
			emailInputElement,
			submitButton,
			passwordInputElement,
			confirmPasswordInputElement,
		} = getFormElements();
		expect(
			screen.queryByText(/password min length 5/i),
		).not.toBeInTheDocument();

		const errorMsg = /passwords do not match/i;
		await user.type(emailInputElement, "test@test.email");
		await user.type(passwordInputElement, "secret");
		await user.type(confirmPasswordInputElement, "notsecret");
		await user.click(submitButton);
		expect(screen.queryByText(errorMsg)).toBeInTheDocument();
	});
	test("valid inputs show no errors and clear fields", async () => {
		const {
			emailInputElement,
			submitButton,
			passwordInputElement,
			confirmPasswordInputElement,
		} = getFormElements();

		await user.type(emailInputElement, "test@test.email");
		await user.type(passwordInputElement, "secret");
		await user.type(confirmPasswordInputElement, "secret");
		await user.click(submitButton);

		expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
		expect(
			screen.queryByText(/password min length 5/i),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText(/passwords do not match/i),
		).not.toBeInTheDocument();

		expect(emailInputElement).toHaveValue("");
		expect(passwordInputElement).toHaveValue("");
		expect(confirmPasswordInputElement).toHaveValue("");
	});
});
