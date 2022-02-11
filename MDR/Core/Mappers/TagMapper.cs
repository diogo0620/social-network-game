using System.Collections.Generic;
using System.Linq;

namespace MDR.Mappers
{
    public class TagMapper
    {
        public static List<TagCloud> listaTagsToTagCloud(List<string> listaTags)
        {
            List<TagCloud> cloud = new List<TagCloud>();
            listaTags.ForEach(tag =>
            {
                var encontrado = cloud.Find(c => c.Tag.Equals(tag));

                if (encontrado == null)
                {
                    cloud.Add(new TagCloud { Tag = tag, Quantidade = 1 });
                }
                else
                {
                    encontrado.Quantidade = encontrado.Quantidade + 1;
                }

            });

            return cloud;

        }

    }
}

public class TagCloud
{
    public string Tag { get; set; }
    public int Quantidade { get; set; }
}