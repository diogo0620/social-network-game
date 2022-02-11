import { object, string, array } from 'yup';


export const criarComentarioSchema = object({
    body: object({
        postId: string().required("Deve ser especificado o post que pretende comentar."),
        texto: string().required("Deve ser especificado o texto do comentário."),
        utilizadorId: string().required("Deve ser especificado quem fez o comentário."),
        tags: array().of(string()),
    })
})