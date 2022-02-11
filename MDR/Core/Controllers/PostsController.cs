using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using MDR.Domain.Posts;
using MDR.Domain.Utilizadores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MDR.Mappers;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public class PostsController : Controller
{

    private PostService _postsService;

    public PostsController(PostService postsService)
    {
        this._postsService = postsService;
    }


    [HttpGet()]
    public async Task<ActionResult<List<PostDTO>>> GetPosts()
    {
        UtilizadorId utilizadorId = new UtilizadorId(Request.Query["utilizador"]);

        return await _postsService.GetByUtilizadorAsync(utilizadorId);
    }


    [HttpGet("amigos")]
    public async Task<ActionResult<List<PostDTO>>> GetPostsDosAmigos()
    {
        UtilizadorId utilizadorId = new UtilizadorId(Request.Query["utilizador"]);

        return await _postsService.GetDosAmigosAsync(utilizadorId);
    }

    [HttpPost()]
    public async Task<ActionResult<PostDTO>> NovoPost([FromBody] PostDTO post)
    {

        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };
            post.Utilizador = autenticado;

            return await _postsService.CriarPostAsync(post);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("{id}/like")]
    public async Task<ActionResult<PostDTO>> Like(string id)
    {
        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };


            return await _postsService.Like(id, new UtilizadorId(HttpContext.User.Identity.Name));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


    [HttpDelete("{id}/like")]
    public async Task<ActionResult<PostDTO>> TirarLike(string id)
    {
        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };

            return await _postsService.TirarLike(id, new UtilizadorId(HttpContext.User.Identity.Name));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{id}/dislike")]
    public async Task<ActionResult<PostDTO>> TirarDislike(string id)
    {
        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };

            return await _postsService.TirarDislike(id, new UtilizadorId(HttpContext.User.Identity.Name));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }



    [HttpPut("{id}/dislike")]
    public async Task<ActionResult<PostDTO>> Dislike(string id)
    {

        try
        {
            UtilizadorDTO autenticado = new UtilizadorDTO { Id = HttpContext.User.Identity.Name };
            return await _postsService.Dislike(id, new UtilizadorId(HttpContext.User.Identity.Name));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }




}

