import connectMOongo from "../../../../../utiles/connectMongo";
import postModel from "../../../../../models/postModel";

export async function GET(req, { params }) {
  try {
    await connectMOongo();

    if (!params?.id) {
      return Response.json({ message: "Post ID is required" }, { status: 400 });
    }

    const postData = await postModel.findOne({ _id: params.id });

    if (!postData) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }

    return Response.json(postData);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
