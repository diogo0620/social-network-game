using System;
using System.Linq;


namespace MDR.Utils
{
    public static class StringsUtils
    {
        public static bool temLetraMaiscula(string input)
        {
            return !input.ToLower().Equals(input);
        }

        public static bool temCaraterEspecial(string input)
        {
            return input.Any(ch => !Char.IsLetterOrDigit(ch));
        }

        public static string capitalizarInicial(string input)
        {

            input = input.ToLower();
            if (input.Length == 1)
                return char.ToUpper(input[0]).ToString();
            else
                return char.ToUpper(input[0]) + input.Substring(1);
        }



    }


}