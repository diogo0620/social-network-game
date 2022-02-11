using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.Comentarios;
using MDR.Domain.Utilizadores;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public class ComentariosController : Controller
{

    private ComentarioService _comentarioService;

    public ComentariosController(ComentarioService service)
    {
        this._comentarioService = service;
    }


    [HttpGet()]
    public async Task<ActionResult<List<ComentarioDTO>>> GetComentarios()
    {
        string postId = Request.Query["post"];

        return await _comentarioService.GetComentariosByPost(postId);
    }




    [HttpPost()]
    public async Task<ActionResult<ComentarioDTO>> NovoComentario([FromBody] ComentarioDTO comentario)
    {

        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };
            comentario.Utilizador = autenticado;

            return await _comentarioService.CriarComentarioAsync(comentario);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }


    }

    [HttpPut("{id}/like")]
    public async Task<ActionResult<ComentarioDTO>> Like(string id)
    {
        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };

            return await _comentarioService.Like(id, new UtilizadorId(HttpContext.User.Identity.Name));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("{id}/dislike")]
    public async Task<ActionResult<ComentarioDTO>> Dislike(string id)
    {

        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };
            return await _comentarioService.Dislike(id, new UtilizadorId(HttpContext.User.Identity.Name));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{id}/like")]
    public async Task<ActionResult<ComentarioDTO>> TirarLike(string id)
    {
        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };

            return await _comentarioService.TirarLike(id, new UtilizadorId(HttpContext.User.Identity.Name));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{id}/dislike")]
    public async Task<ActionResult<ComentarioDTO>> TirarDislike(string id)
    {
        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };

            return await _comentarioService.TirarDislike(id, new UtilizadorId(HttpContext.User.Identity.Name));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }



}

