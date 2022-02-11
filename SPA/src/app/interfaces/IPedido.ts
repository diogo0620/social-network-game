import { NumberValueAccessor } from "@angular/forms";
import { IUtilizador } from "./IUtilizador";

export interface IPedido{
    id: string;
    deUtilizador:IUtilizador;
    paraUtilizador:IUtilizador;
    utilizadorObjetivo:IUtilizador;
    mensagem:string;
    estado:string;
    tags: string[];
    forcaLigacao: number;
    data: string;

    tipo: string;

}