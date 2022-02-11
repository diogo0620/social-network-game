import mongoose from 'mongoose';

export interface ComentarioDocument extends mongoose.Document{
    postId:string;
    utilizadorId:string;
    texto:string;
    tags: string[];
    data: Date;
    reacoes : [{utilizadorId: String, tipo: String, data: Date}];
}

const ComentarioSchema = new mongoose.Schema({
    postId:{type:String, required:true},
    utilizadorId:{type:String, required:true},
    texto: {type:String, required:true},
    tags: {type:Array},
    data: {type:Date,default:Date.now},
    reacoes : {type: Array}
})

const Comentario = mongoose.model<ComentarioDocument>('Comentario', ComentarioSchema);
export default Comentario;