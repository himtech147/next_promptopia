import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
// GET (read requests)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response(`Prompt with id ${params.id} found`, { status: 404 });
    }
    // prompt is found, return it
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch prompt with id ${params.id}`, {
      status: 500,
    });
  }
};

// PATCH (update requests)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(`Prompt with id ${params.id} not found`, {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response(`Failed to update prompt with id ${params.id}`, {
      status: 500,
    });
  }
};

// DELETE (delete requests)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response(`Prompt with id ${params.id} deleted`, {
      status: 200,
    });
  } catch (error) {
    return new Response(`Failed to delete prompt with id ${params.id}`, {
      status: 500,
    });
  }
};
