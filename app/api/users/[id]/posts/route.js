import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//params used when dynamic vars in route path
export const GET = async (request, { params }) => {
  try {
    connectToDB();
    // In MongoDB, Population is the process of replacing the specified path in the document of one collection with the actual document from the other collection.
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
