"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  console.log(data);
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const searchHandler = (e) => {
    e.preventDefault();
    setsearchText(e.target.value);
  };

  const handleTagClick = () => {};
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("api/prompt");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log("Unable to fetch posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="flex-center w-full relative">
        <input
          type="text"
          placeholder="Search for tag or username..."
          value={searchText}
          onChange={searchHandler}
          required
          className="search_input peer animate-pulse-slow"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={(handleTagClick) => {}} />
    </section>
  );
};

export default Feed;
