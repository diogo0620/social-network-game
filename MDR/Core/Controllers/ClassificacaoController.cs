using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.Classificacao;
using MDR.Domain.Ligacoes;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ClassificacaoController : Controller
{

    private ClassificacaoService _service;

    public ClassificacaoController(ClassificacaoService service)
    {
        this._service = service;
    }


    [HttpGet()]
    public async Task<ActionResult<List<InformacaoRedeDTO>>> GetClassificacao()
    {
        return await _service.getClassificacaoAsync();
    }
}
