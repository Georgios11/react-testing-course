import React from "react";
import Item from "./Item";
import { type Post } from "../hooks/usePosts";

type ListProps = {
	posts: Post[];
	onLike: (postId: string) => Promise<void>;
	onDelete: (postId: string) => Promise<void>;
};
const List = ({ posts, onLike, onDelete }: ListProps) => {
	const postsElement = posts.map((post) => (
		<Item key={post.id} post={post} onLike={onLike} onDelete={onDelete} />
	));
	return <div className="space-y-4">{postsElement}</div>;
};

export default List;
