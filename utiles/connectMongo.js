import mongoose from "mongoose";

const connectMOongo = async () => mongoose.connect(`mongodb+srv://ramnivi27:raamnivi2529@cluster-1.hurucu0.mongodb.net/myBlogDB?retryWrites=true&w=majority&appName=Cluster-1
`)


export default connectMOongo;


