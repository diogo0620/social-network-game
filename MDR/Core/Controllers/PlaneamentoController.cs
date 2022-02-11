using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using MDR.Domain.Planeamento;
using MDR.Domain.Utilizadores;
using MDR.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;


[Route("api/[controller]")]
[ApiController]
[Authorize]
[EnableCors("EnableCORS")]
public class PlaneamentoController : Controller
{


    private PlaneamentoService _service;

    public PlaneamentoController(PlaneamentoService service)
    {
        _service = service;
    }


    [HttpGet("caminhoMaisCurto")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoMaisCurto()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoMaisCurtoAsync(de, para, maxLigacoes, emocoesProibidas);
    }

    [HttpGet("caminhoMaisCurtoMulticriterio")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoMaisCurtoMulticriterio()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoMaisCurtoMulticriterioAsync(de, para, maxLigacoes, emocoesProibidas);
    }


    [HttpGet("caminhoMaisForte")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoMaisForte()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoMaisForteAsync(de, para, maxLigacoes, emocoesProibidas);

    }

    [HttpGet("caminhoMaisForteMulticriterio")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoMaisForteMulticriterio()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoMaisForteMulticriterioAsync(de, para, maxLigacoes, emocoesProibidas);

    }


    [HttpGet("caminhoMaisSeguro")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoMaisSeguro()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        int forcaMinima = int.Parse(Request.Query["forcaMinima"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoMaisSeguroAsync(de, para, maxLigacoes, forcaMinima, emocoesProibidas);
    }

    [HttpGet("caminhoMaisSeguroMulticriterio")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoMaisSeguroMulticriterio()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        int forcaMinima = int.Parse(Request.Query["forcaMinima"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoMaisSeguroMulticriterioAsync(de, para, maxLigacoes, forcaMinima, emocoesProibidas);
    }

    [HttpGet("dfs")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoDfs()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoDfsAsync(de, para, maxLigacoes, emocoesProibidas);
    }

    [HttpGet("dfsMulticriterio")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoDfsMulticriterio()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoDfsMulticriterioAsync(de, para, maxLigacoes, emocoesProibidas);
    }

    [HttpGet("aStar")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoAstar()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoAstarAsync(de, para, maxLigacoes, emocoesProibidas);
    }

    [HttpGet("aStarMulticriterio")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoAstarMulticriterio()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoAstarMulticriterioAsync(de, para, maxLigacoes, emocoesProibidas);
    }

    [HttpGet("bestFirst")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoBestFirst()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoBestFirstAsync(de, para, maxLigacoes, emocoesProibidas);
    }

    [HttpGet("bestFirstMulticriterio")]
    public async Task<ActionResult<CaminhoDTO>> GetCaminhoBestFirstMulticriterio()
    {
        UtilizadorId de = new UtilizadorId(HttpContext.User.Identity.Name);
        UtilizadorId para = new UtilizadorId(Request.Query["para"]);
        string emocoesProibidas = Request.Query["emocoesProibidas"];
        int maxLigacoes = int.Parse(Request.Query["maxLigacoes"]);

        return await _service.getCaminhoBestFirstMulticriterioAsync(de, para, maxLigacoes, emocoesProibidas);
    }



}


