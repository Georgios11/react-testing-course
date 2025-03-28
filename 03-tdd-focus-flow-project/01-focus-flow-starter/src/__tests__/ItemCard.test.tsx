import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ItemCard from "../components/ItemCard";
import { type Item } from "../utils";

type MockProps = Item & {
	onDelete: (id: string) => void;
};

describe("ItemCard Component", () => {
	const mockProps: MockProps = {
		id: "1",
		title: "Test Task",
		description: "Test Description",
		category: "urgent",
		onDelete: vi.fn(),
	};

	test("renders card with correct content", () => {
		render(<ItemCard {...mockProps} />);

		expect(
			screen.getByRole("heading", { name: /test task/i }),
		).toBeInTheDocument();
		expect(screen.getByText("Test Description")).toBeInTheDocument();
		expect(screen.getByText("urgent")).toBeInTheDocument();
	});

	test("calls onDelete when delete button is clicked", async () => {
		const user = userEvent.setup();
		render(<ItemCard {...mockProps} />);
		const deleteButton = screen.getByRole("button", {
			name: "Delete task : 1",
		});
		await user.click(deleteButton);
		expect(mockProps.onDelete).toHaveBeenCalledWith("1");
	});
});
