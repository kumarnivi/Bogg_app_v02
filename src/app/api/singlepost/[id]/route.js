import connectMOongo from "../../../../../utiles/connectMongo";
import postModel from "../../../../../models/postModel";

export async function GET(req, { params }) {
  try {
    await connectMOongo();
    
    // Optionally log the ID
    // console.log("Post ID:", params.id);

    const postData = await postModel.findOne({ _id: params.id });

    return Response.json(postData);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
