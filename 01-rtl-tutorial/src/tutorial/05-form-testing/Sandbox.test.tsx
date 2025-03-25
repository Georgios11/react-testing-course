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
});
