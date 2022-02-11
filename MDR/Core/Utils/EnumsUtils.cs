using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System;

namespace MDR.Utils
{
    public static class EnumsUtils
    {

        public static Array valores(Type enumType)
        {

            return Enum.GetValues(enumType);
        }

        public static object valor(Type enumType, int index)
        {
            return Enumerable.ToList(valores(enumType).Cast<object>())[index];
        }

        public static object valor(Type enumType, string valorString)
        {
            foreach (var valor in valores(enumType))
            {
                if (valor.ToString().Equals(valorString, StringComparison.OrdinalIgnoreCase))
                {
                    return valor;

                }
            }

            return null;
        }


    }


}