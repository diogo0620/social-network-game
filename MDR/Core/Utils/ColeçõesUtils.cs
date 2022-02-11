using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MDR.Utils
{
    public static class ColecoesUtils
    {
        public static string ListToString<E>(List<E> lista)
        {
            var stringbuilder = new StringBuilder();
            for (var i = 0; i < lista.Count; i++)
            {
                if (i == 0)
                {
                    stringbuilder.Append(lista.ElementAt(i).ToString());
                }
                else
                {
                    stringbuilder.Append("," + lista.ElementAt(i).ToString());
                }
            }
            return stringbuilder.ToString();
        }



    }
}
