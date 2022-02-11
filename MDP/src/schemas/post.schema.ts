import { object, string, array, mixed } from 'yup';


export const criarPostSchema = object({
    body: object({
        texto: string().required("Deve ser especificado o texto do post."),
        utilizadorId: string().required("Deve ser especificado quem fez o post."),
        tags: array().of(string())
    })
})