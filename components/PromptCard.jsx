import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    //copy to clipboard
    navigator.clipboard.writeText(post.prompt).then(() => {
      console.log("Copied to clipboard: ", post.prompt);
    });
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter font-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div
          className="copy_btn justify-start items-start"
          onClick={handleCopy}
        >
          <div>
            <Image
              src={"/assets/icons/tick.svg"}
              width={14}
              height={14}
              alt="tick_icon"
              // style='transition: "all 300ms ease-in-out"'
              className={`absolute ${
                copied == post.prompt ? "opacity-100" : "opacity-0"
              } transition-opacity ease-in-out delay-150 duration-3000 `}
            ></Image>
            <Image
              src={"/assets/icons/copy.svg"}
              width={14}
              height={14}
              alt="copy_icon"
              className={`${
                copied == post.prompt ? "opacity-0" : "opacity-100"
              } transition-opacity ease-in-out delay-150 duration-3000`}
            ></Image>
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-5">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
