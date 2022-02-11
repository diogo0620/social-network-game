using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using MDR.Domain.PedidosLigacao;
using MDR.Utils;
using MDR.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace MDR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PedidosLigacaoController : ControllerBase
    {
        private readonly PedidoLigacaoService _service;

        public PedidosLigacaoController(PedidoLigacaoService service)
        {
            _service = service;
        }

        // GET: api/PedidosLigacao
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoLigacaoDTO>>> GetAll()
        {

            UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);

            if (Request.Query.ContainsKey("estado"))
            {
                string query = Request.Query["estado"];
                var estado = EnumsUtils.valor(typeof(EstadoPedido), query);

                if (estado == null)
                {
                    return BadRequest("O seguinte estado de pedido não existe: " + query + ".");
                }
                else
                {
                    return await _service.GetByParaUtilizador_E_EstadoAsync(utilizadorQueFezPedido, (EstadoPedido)estado);
                }
            }

            return await _service.GetByParaUtilizadorAsync(utilizadorQueFezPedido);
        }

        // GET: api/PedidosLigacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoLigacaoDTO>> GetGetById(Guid id)
        {

            UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);
            var uti = await _service.GetByParaUtilizador_E_IdAsync(utilizadorQueFezPedido, new PedidoLigacaoId(id));

            if (uti == null)
            {
                return NotFound();
            }

            return uti;
        }

        // GET: api/PedidosLigacao/enviados
        [HttpGet("enviados")]
        public async Task<ActionResult<IEnumerable<PedidoLigacaoDTO>>> GetEnviados()
        {

            UtilizadorId utilizadorQueFezPedido = new UtilizadorId(HttpContext.User.Identity.Name);
            var uti = await _service.GetByDeUtilizadorAsync(utilizadorQueFezPedido);

            if (uti == null)
            {
                return NotFound();
            }

            return uti;
        }




        // POST: api/PedidosLigacao
        [HttpPost]
        public async Task<ActionResult<PedidoLigacaoDTO>> Create(CriarPedidoLigacaoDTO dto)
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


        // PUT: api/PedidosLigacao/5
        [HttpPut("{id}")]
        public async Task<ActionResult<UtilizadorDTO>> Update(Guid id, EditarPedidoLigacaoDTO dto)
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
        public async Task<ActionResult<PedidoLigacaoDTO>> SoftDelete(Guid id)
        {
            var prod = await _service.DeleteAsync(new PedidoLigacaoId(id));

            if (prod == null)
            {
                return NotFound();
            }

            return Ok(prod);
        }

    }
}