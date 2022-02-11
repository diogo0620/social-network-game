using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using MDR.Domain.Ligacoes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace MDR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [EnableCors("EnableCORS")]
    public class LigacoesController : ControllerBase
    {
        private readonly LigacaoService _service;

        public LigacoesController(LigacaoService service)
        {
            _service = service;
        }

        // GET: api/Ligacoes
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<LigacaoDTO>>> GetAll()
        {

            if (HttpContext.User.Identity.Name == null)
            {
                return await _service.GetAllAsync();
            }
            if (Request.Query.ContainsKey("utilizador"))
            {
                string utilizadorId = Request.Query["utilizador"];
                return await _service.GetByUtilizadorAAsync(new UtilizadorId(utilizadorId));

            }
            else
            {

                UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);
                return await _service.GetByUtilizadorAAsync(utilizadorQueFezPedido);
            }
        }


        [HttpGet("tagCloud")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<TagCloud>>> GetTagCloud()
        {

            if (Request.Query.ContainsKey("utilizador"))
            {
                return await _service.GetTagCloudByUtilizador(new UtilizadorId(Request.Query["utilizador"]));
            }

            return await _service.GetTagCloud();
        }

        [HttpGet("rede")]
        public async Task<ActionResult<List<List<LigacaoDTO>>>> GetRede()
        {
            var nivel = 2;
            if (Request.Query.ContainsKey("nivel"))
            {
                nivel = int.Parse(Request.Query["nivel"]);
            }

            UtilizadorId utilizador = new UtilizadorId(HttpContext.User.Identity.Name);
            if (Request.Query.ContainsKey("utilizador"))
            {
                utilizador = new UtilizadorId(Request.Query["utilizador"]);
            }


            var result = await _service.GetRedeByUtilizadorNivelAsync(utilizador, nivel);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        [HttpGet("dimensao")]
        public async Task<ActionResult<int>> GetDimensao()
        {
            UtilizadorId utilizador = new UtilizadorId(HttpContext.User.Identity.Name);
            if (Request.Query.ContainsKey("utilizador"))
            {
                utilizador = new UtilizadorId(Request.Query["utilizador"]);
            }

            return await _service.GetDimensaoRede(utilizador);
        }

        [HttpGet("fortaleza")]
        public async Task<ActionResult<int>> GetFortaleza()
        {
            UtilizadorId utilizador = new UtilizadorId(HttpContext.User.Identity.Name);
            if (Request.Query.ContainsKey("utilizador"))
            {
                utilizador = new UtilizadorId(Request.Query["utilizador"]);
            }

            return await _service.GetFortalezaRede(utilizador);
        }

        [HttpGet("emComum")]
        public async Task<ActionResult<List<UtilizadorDTO>>> GetAmigosEmComum()
        {
            var utilizadorA = new UtilizadorId(HttpContext.User.Identity.Name);
            var utilizadorB = new UtilizadorId(Request.Query["utilizadorB"]);

            return await _service.GetAmigosEmComum(utilizadorA, utilizadorB);
        }

        [HttpGet("sugestoes")]
        public async Task<ActionResult<List<UtilizadorDTO>>> GetSugestoes()
        {
            var utilizadorA = new UtilizadorId(HttpContext.User.Identity.Name);

            return await _service.GetSugestoes(utilizadorA);
        }

        [HttpGet("sugestoesGrupos")]
        public async Task<ActionResult<List<SugestaoGrupoDTO>>> GetSugestoesGrupos()
        {
            //var utilizadorA = new UtilizadorId(HttpContext.User.Identity.Name);
            var utilizador = new UtilizadorId(HttpContext.User.Identity.Name);
            var numeroUtilizadores = int.Parse(Request.Query["numeroUtilizadores"]);
            var numeroTags = int.Parse(Request.Query["numeroTags"]);
            var tagsObrigatorias = Request.Query["tagsObrigatorias"];

            Console.WriteLine("##################" + tagsObrigatorias);


            return await _service.GetSugestoesGrupo(utilizador, numeroTags, numeroUtilizadores, tagsObrigatorias);
        }

        [HttpGet("sugestoesUtilizadores")]
        public async Task<ActionResult<List<UtilizadorDTO>>> GetSugestoesUtilizadores()
        {
            //var utilizadorA = new UtilizadorId(HttpContext.User.Identity.Name);
            var utilizador = new UtilizadorId(HttpContext.User.Identity.Name);
            var numeroTags = int.Parse(Request.Query["numeroTags"]);

            return await _service.GetSugestoesPorTags(utilizador, numeroTags);
        }






        [HttpGet("rede/informacao")]
        public async Task<ActionResult<InformacaoRedeDTO>> GetInformacaoRede()
        {
            UtilizadorId utilizador = new UtilizadorId(HttpContext.User.Identity.Name);
            if (Request.Query.ContainsKey("utilizador"))
            {
                utilizador = new UtilizadorId(Request.Query["utilizador"]);
            }

            return await _service.GetInformacaoRede(utilizador);
        }



        // GET: api/Ligacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LigacaoDTO>> GetGetById(Guid id)
        {
            UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);
            var uti = await _service.GetByUtilizadorA_E_IdAsync(utilizadorQueFezPedido, new LigacaoId(id));

            if (uti == null)
            {
                return NotFound();
            }

            return uti;
        }






        // POST: api/Ligacoes
        [HttpPost]
        public async Task<ActionResult<LigacaoDTO>> Create(CriarLigacaoDTO dto)
        {
            try
            {
                dto.UtilizadorAId = HttpContext.User.Identity.Name;
                var lig = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = lig.Id }, lig);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // PUT: api/Ligacoes/5
        [HttpPut("{id}")]
        public async Task<ActionResult<LigacaoDTO>> Update(Guid id, EditarLigacaoDTO dto)
        {
            if (id.ToString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);
                var lig = await _service.UpdateAsync(dto, utilizadorQueFezPedido);

                if (lig == null)
                {
                    return NotFound();
                }
                return Ok(lig);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<LigacaoDTO>> SoftDelete(Guid id)
        {
            var prod = await _service.DeleteAsync(new LigacaoId(id));

            if (prod == null)
            {
                return NotFound();
            }

            return Ok(prod);
        }


        [HttpDelete()]
        public async Task<ActionResult<LigacaoDTO>> DeleteAll()
        {
            UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);
            var prod = await _service.DeleteAllAsync(utilizadorQueFezPedido);

            return Ok(prod);
        }



    }
}