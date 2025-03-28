import ItemCard from "./ItemCard";
import { type Item } from "../utils";

const List = ({
	items,
	onDelete,
}: {
	items: Item[];
	onDelete: (id: string) => void;
}) => {
	console.log(items, onDelete);
	return <div>List</div>;
};

export default List;
