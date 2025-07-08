import connectMOongo from "../../../../../utiles/connectMongo";
import postModel from "../../../../../models/postModel";


export async function GET(req, {params}) {
  // here need to add the params befor adding a request , bcz 1st we get request then we can get params
  try{
  await connectMOongo();
  params.id
  const postData = await postModel.findOne({_id: params.id});
  return Response.json(postData)
  }
 catch (error) {
 return Response.json({message:error.message})
 }
   
}