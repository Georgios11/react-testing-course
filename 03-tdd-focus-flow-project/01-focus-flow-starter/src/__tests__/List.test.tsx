import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import List from "../components/List";
import { type Item } from "../utils";
vi.mock("../components/ItemCard.tsx", () => {
	return {
		default: () => <article>item card</article>,
	};
});
describe("List Component", () => {
	const mockItems: Item[] = [
		{
			id: "1",
			title: "Test Item 1",
			description: "Content 1",
			category: "urgent",
		},
		{
			id: "2",
			title: "Test Item 2",
			description: "Content 2",
			category: "normal",
		},
	];

	const mockOnDelete = vi.fn();

	test("renders the flow board heading", () => {
		render(<List onDelete={mockOnDelete} items={mockItems} />);
		expect(
			screen.getByRole("heading", { level: 2, name: /flow board/i }),
		).toBeInTheDocument();
	});
	test("renders correct number of item cards", () => {
		render(<List onDelete={mockOnDelete} items={mockItems} />);
		const cards = screen.getAllByRole("article");
		expect(cards).toHaveLength(2);
	});
	test("renders empty grid when items not provided", () => {
		render(<List onDelete={mockOnDelete} items={[]} />);

		expect(screen.queryAllByRole("article")).toHaveLength(0);
	});
});
