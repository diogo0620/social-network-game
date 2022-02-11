using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using MDR.Domain.Sistema;

namespace MDR.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("EnableCORS")]
    public class UtilizadoresController : ControllerBase
    {
        private readonly UtilizadorService _service;

        private readonly SistemaService _sistema;

        public UtilizadoresController(UtilizadorService service, SistemaService sistema)
        {
            _service = service;
            this._sistema = sistema;
        }

        // GET: api/Utilizadores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UtilizadorDTO>>> GetAll()
        {

            if (Request.Query.ContainsKey("nome") || Request.Query.ContainsKey("email") || Request.Query.ContainsKey("pais") || Request.Query.ContainsKey("cidade"))
            {
                Email e = !Request.Query.ContainsKey("email") ? null : new Email(Request.Query["email"]);
                Nome n = !Request.Query.ContainsKey("nome") ? null : new Nome(Request.Query["nome"]);
                Localizacao l = !Request.Query.ContainsKey("pais") && !Request.Query.ContainsKey("cidade") ? null : new Localizacao(Request.Query["pais"], Request.Query["cidade"]);
                return await _service.GetByParametrosAsync(e, n, l);
            }

            return await _service.GetAllAsync();
        }


        [HttpGet("sugestoes")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UtilizadorDTO>>> GetSugestoesRecemRegistado()
        {

            UtilizadorId id = new UtilizadorId(HttpContext.User.Identity.Name);

            return await _service.GetSugestoesRecemRegistadoAsync(id);
        }

        [HttpGet("tagCloud")]
        public async Task<ActionResult<IEnumerable<TagCloud>>> GetTagCloud()
        {

            if (Request.Query.ContainsKey("utilizador"))
            {
                return await _service.GetTagCloudByUtilizador(new UtilizadorId(Request.Query["utilizador"]));
            }

            return await _service.GetTagCloud();
        }



        // GET: api/Utilizadores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UtilizadorDTO>> GetGetById(Guid id)
        {
            var uti = await _service.GetByIdAsync(new UtilizadorId(id));

            if (uti == null)
            {
                return NotFound();
            }

            return uti;
        }

        // POST: api/Utilizadores
        [HttpPost]
        public async Task<ActionResult<UtilizadorDTO>> Create(CriarUtilizadorDTO dto)
        {

            try
            {
                var uti = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = uti.Id }, uti);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

        }


        // PUT: api/Utilizadores/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<UtilizadorDTO>> Update(Guid id, EditarUtilizadorDTO dto)
        {

            dto.Id = HttpContext.User.Identity.Name;

            if (id.ToString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var uti = await _service.UpdateAsync(dto);

                if (uti == null)
                {
                    return NotFound();
                }
                return Ok(uti);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UtilizadorDTO>> SoftDelete(Guid id)
        {
            var prod = await _service.DeleteAsync(new UtilizadorId(id));

            if (prod == null)
            {
                return NotFound();
            }

            return Ok(prod);
        }

        [HttpDelete()]
        [Authorize]
        public async Task<ActionResult<UtilizadorDTO>> DeleteMe()
        {
            UtilizadorId utilizador = new UtilizadorId(HttpContext.User.Identity.Name);
            var uti = await _sistema.ApagarContaAsync(utilizador);

            if (uti == null)
            {
                return NotFound();
            }

            return Ok(uti);
        }





    }
}