import mongoose from 'mongoose';


export interface PostDocument extends mongoose.Document{
    utilizadorId:string;
    texto:string;
    tags: string[];
    data: Date;
    reacoes : [{utilizadorId: String, tipo: String, data: Date}];
    
}

const PostSchema = new mongoose.Schema({
    utilizadorId:{type:String, required:true},
    texto: {type:String, required:true},
    tags: {type:Array},
    data: {type:Date,default:Date.now},
    reacoes : {type: Array}
})


const Post = mongoose.model<PostDocument>('Post', PostSchema);
export default Post;


