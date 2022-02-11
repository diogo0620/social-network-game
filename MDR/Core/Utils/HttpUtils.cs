using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MDR.Utils
{
    public static class HttpUtils
    {
        public static async Task<E> getRequestAsync<E>(string baseUrl, string queryUrl)
        {
            using (var client = new HttpClient())
            {

                Console.WriteLine("########## " + baseUrl + "" + queryUrl + " #########");
                client.BaseAddress = new Uri(baseUrl);

                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //Sending request to find web api REST service resource GetDepartments using HttpClient  
                HttpResponseMessage Res = await client.GetAsync(queryUrl);

                if (Res.IsSuccessStatusCode)
                {
                    var ObjResponse = Res.Content.ReadAsStringAsync().Result;
                    return JsonConvert.DeserializeObject<E>(ObjResponse);
                }

                return default(E);
            }
        }

        public static async Task<E> deleteRequestAsync<E>(string baseUrl, string queryUrl)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(baseUrl);

                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //Sending request to find web api REST service resource GetDepartments using HttpClient  
                HttpResponseMessage Res = await client.DeleteAsync(queryUrl);

                if (Res.IsSuccessStatusCode)
                {
                    var ObjResponse = Res.Content.ReadAsStringAsync().Result;
                    try
                    {
                        return JsonConvert.DeserializeObject<E>(ObjResponse);
                    }
                    catch (Exception)
                    {
                        return default(E);
                    }

                }

                return default(E);
            }
        }

        public static async Task<E> postRequestAsync<E, B>(string baseUrl, string context, B objeto)
        {


            using (var client = new HttpClient())
            {
                //Passing service base url  
                client.BaseAddress = new Uri(baseUrl);

                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //Sending request to find web api REST service resource GetDepartments using HttpClient  
                var myContent = JsonConvert.SerializeObject(objeto);


                var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
                var byteContent = new ByteArrayContent(buffer);
                byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");


                var response = await client.PostAsync(context, byteContent);
                var netResults = await response.Content.ReadAsStringAsync();
                if (response.IsSuccessStatusCode)
                {
                    E criado = JsonConvert.DeserializeObject<E>(netResults);
                    return criado;
                }
                else
                {
                    throw new Exception(netResults);
                }

            }
        }

        public static async Task<E> requestAsync<E, B>(string tipoPedido, string baseUrl, string context, B objeto)
        {
            switch (tipoPedido)
            {
                case "put":
                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri(baseUrl);
                        client.DefaultRequestHeaders.Clear();
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        var myContent = JsonConvert.SerializeObject(objeto);


                        var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
                        var byteContent = new ByteArrayContent(buffer);
                        byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                        var response = await client.PutAsync(context, byteContent);
                        var netResults = await response.Content.ReadAsStringAsync();
                        if (response.IsSuccessStatusCode)
                        {
                            E criado = JsonConvert.DeserializeObject<E>(netResults);
                            return criado;
                        }
                        else
                        {

                            Console.WriteLine(netResults.ToString());
                            throw new Exception(netResults);
                        }
                    }
                default:
                    return default(E);
            }
        }



    }
}


