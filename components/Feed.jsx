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
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const searchHandler = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedPosts(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName, true);
    setSearchedPosts(searchResult);
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext, viaTagOnly = false) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    if (viaTagOnly) {
      return posts.filter((item) => regex.test(item.tag));
    }
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

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

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
