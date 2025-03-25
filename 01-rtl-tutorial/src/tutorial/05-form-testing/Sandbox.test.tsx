/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, logRoles } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

describe("05-form-testing", () => {
	test("inputs should be initially empty", () => {
		const { container } = render(<Sandbox />);
		screen.debug();
		logRoles(container);

		const emailInputElement = screen.getByRole("textbox", {
			name: /email/i,
		});
		expect(emailInputElement).toHaveValue("");

		const passwordInputElement = screen.getByLabelText("Password");
		expect(passwordInputElement).toHaveValue("");

		const confirmPasswordInputElement =
			screen.getByLabelText(/confirm password/i);
		expect(confirmPasswordInputElement).toHaveValue("");
	});

	test("should be able to type in the input fields", async () => {
		const user = userEvent.setup();
		render(<Sandbox />);

		const emailInputElement = screen.getByRole("textbox", {
			name: /email/i,
		});
		await user.type(emailInputElement, "test@test.com");
		expect(emailInputElement).toHaveValue("test@test.com");

		const passwordInputElement = screen.getByLabelText("Password");
		await user.type(passwordInputElement, "secret");
		expect(passwordInputElement).toHaveValue("secret");

		const confirmPasswordInputElement =
			screen.getByLabelText(/confirm password/i);
		await user.type(confirmPasswordInputElement, "secret");
		expect(confirmPasswordInputElement).toHaveValue("secret");
	});
});
