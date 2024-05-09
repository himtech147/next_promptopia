import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = await Prompt({
      creator: userId,
      prompt,
      tag,
    });
    newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("Failed to create a new prompt");
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
