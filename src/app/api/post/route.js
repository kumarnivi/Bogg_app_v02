import connectMongo from "../../../../utiles/connectMongo";
import postModel from "../../../../models/postModel";

export async function GET(req) {
  try {
    await connectMongo();

    // Get the query param from the URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    console.log("Search query:", query);

    // If there is a query, search by title (case-insensitive)
    let postData;
    if (query) {
      postData = await postModel.find({
      $or : [
        {title: new RegExp(query, 'i')},
         {description: new RegExp(query, 'i')},
      ]
      });
    } else {
      postData = await postModel.find({});
    }

    return new Response(JSON.stringify(postData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
