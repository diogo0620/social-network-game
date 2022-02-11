using System;


namespace MDR.Utils
{
    public static class DatasUtils
    {
        public static int calcularIdade(DateTime dataNascimento)
        {
            var hoje = DateTime.Today;
            var idade = hoje.Year - dataNascimento.Year;

            if (dataNascimento.Date > hoje.AddYears(-idade)) idade--;

            return idade;
        }

        public static string duracaoToString(DateTime desde)
        {
            var diferenca = DateTime.Now - desde;

            if (diferenca.Days > 0)
            {
                return diferenca.Days + " dia(s) ";
            }

            if (diferenca.Hours > 0)
            {
                return diferenca.Hours + " hora(s) ";
            }

            if (diferenca.Minutes > 0)
            {
                return diferenca.Minutes + " minuto(s) ";
            }

            return diferenca.Seconds + " segundo(s)";


        }



    }


}