"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  console.log("sdssd", session);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`api/users/${session?.user.id}/posts`);
        console.log(`api/users/${session?.user.id}/posts`);
        const data = await res.json();
        console.log(data);
        console.log(`api/users/${session?.user.id}/posts`);

        setPosts(data);
      } catch (error) {
        console.log("Unable to fetch posts", error);
      }
    };
    // only fetch when we have the user
    console.log("sess id", session);
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  const handleEdit = () => {};
  const handleDelete = async () => {};

  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
