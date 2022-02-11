using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDR.Domain.Shared;
using MDR.Domain.PedidosIntroducao;
using MDR.Domain.Utilizadores;
using MDR.Domain.PedidosLigacao;
using Microsoft.AspNetCore.Authorization;

namespace MDR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PedidosIntroducaoController : ControllerBase
    {
        private readonly PedidoIntroducaoService _service;

        public PedidosIntroducaoController(PedidoIntroducaoService service)
        {
            _service = service;
        }

        // GET: api/PedidoIntroducoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoIntroducaoDTO>>> GetAll()
        {
            UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);
            return await _service.GetByParaUtilizadorAsync(utilizadorQueFezPedido);
        }

        // GET: api/PedidoIntroducoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoIntroducaoDTO>> GetGetById(Guid id)
        {
            UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);
            var uti = await _service.GetByParaUtilizador_E_IdAsync(utilizadorQueFezPedido, new PedidoIntroducaoId(id));

            if (uti == null)
            {
                return NotFound();
            }

            return uti;
        }

        // POST: api/PedidoIntroducoes
        [HttpPost]
        public async Task<ActionResult<PedidoIntroducaoDTO>> Create(CriarPedidoIntroducaoDTO dto)
        {
            try
            {
                dto.DeUtilizadorId = HttpContext.User.Identity.Name;
                var ped = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = ped.Id }, ped);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        // PUT: api/PedidoIntroducoes/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PedidoIntroducaoDTO>> Update(Guid id, EditarPedidoIntroducaoDTO dto)
        {

            if (id.ToString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);
                var uti = await _service.UpdateAsync(dto, utilizadorQueFezPedido);

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
        public async Task<ActionResult<PedidoIntroducaoDTO>> SoftDelete(Guid id)
        {
            var prod = await _service.DeleteAsync(new PedidoIntroducaoId(id));

            if (prod == null)
            {
                return NotFound();
            }

            return Ok(prod);
        }
    }
}