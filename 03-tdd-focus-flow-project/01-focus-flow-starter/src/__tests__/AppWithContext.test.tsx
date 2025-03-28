import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { FlowProvider } from "../FlowContext";
import AppWithContext from "../AppWithContext";

const getFormElements = () => {
	return {
		titleInput: screen.getByRole("textbox", { name: /title/i }),
		descriptionInput: screen.getByRole("textbox", { name: /description/i }),
		categorySelect: screen.getByRole("combobox", { name: /category/i }),
		submitButton: screen.getByRole("button", { name: /add task/i }),
	};
};

const customRenderAppWithContext = () => {
	return render(
		<FlowProvider>
			<AppWithContext />
		</FlowProvider>,
	);
};

const addTestItem = async (user: UserEvent) => {
	const { categorySelect, descriptionInput, submitButton, titleInput } =
		getFormElements();
	await user.type(titleInput, "Test Item");
	await user.type(descriptionInput, "Test Content");
	await user.selectOptions(categorySelect, "urgent");
	await user.click(submitButton);
};

describe("AppWithContext Component", () => {
	let user: UserEvent;
	beforeEach(() => {
		vi.clearAllMocks();
		user = userEvent.setup();
		customRenderAppWithContext();
	});
	test("renders heading and form elements", () => {
		expect(
			screen.getByRole("heading", { level: 1, name: /focus flow/i }),
		).toBeInTheDocument();
		const elements = getFormElements();
		Object.values(elements).forEach((element) => {
			expect(element).toBeInTheDocument();
		});
	});
	test("handles adding an item", async () => {
		const cardsBefore = screen.queryAllByRole("article");
		expect(cardsBefore).toHaveLength(0);

		await addTestItem(user);
		const cardsAfter = screen.getAllByRole("article");
		expect(cardsAfter).toHaveLength(1);

		expect(screen.getByText("Test Item")).toBeInTheDocument();
		expect(screen.getByText("Test Content")).toBeInTheDocument();
		expect(screen.getByText("urgent")).toBeInTheDocument();
	});
	test("handles deleting an item", async () => {
		await addTestItem(user);
		const deleteButton = screen.getByRole("button", { name: /delete/i });
		expect(deleteButton).toBeInTheDocument();
		await user.click(deleteButton);

		expect(screen.queryByText("Test Item")).not.toBeInTheDocument();
		expect(screen.queryAllByRole("article")).toHaveLength(0);
	});
});
