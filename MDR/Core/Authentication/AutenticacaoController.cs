using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MDR.Authentication
{

    [Route("api/[controller]")]
    public class AutenticacaoController : ControllerBase
    {

        private readonly UtilizadorService _service;
        private readonly IConfiguration _configuration;


        public AutenticacaoController(UtilizadorService service, IConfiguration configuration)
        {
            _service = service;
            _configuration = configuration;
        }



        [HttpPost]
        public async Task<ActionResult<SessaoDTO>> Login([FromBody] LoginDTO dto)
        {

            try
            {
                if (dto.Email == null)
                    throw new BusinessRuleValidationException("O email é necessário para o login.");

                if (dto.Password == null)
                    throw new BusinessRuleValidationException("A password é necessária para o login.");

                var utiDTO = await _service.GetByEmail_E_Password(new Email(dto.Email), new Password(dto.Password));

                if (utiDTO != null)
                {
                    UtilizadorSistema utilizador = new UtilizadorSistema();
                    utilizador.UserName = utiDTO.Id;

                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name,utilizador.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddHours(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );


                    return new SessaoDTO { Utilizador = utiDTO.Id, Token = new JwtSecurityTokenHandler().WriteToken(token), Expiracao = token.ValidTo.Year + "-" + token.ValidTo.Month + "-" + token.ValidTo.Day + ", " + token.ValidTo.ToShortTimeString() };
                }
            }
            catch (BusinessRuleValidationException)
            {
                return Unauthorized(new { Message = "As credenciais introduzidas não pertencem a nenhum utilizador." });
            }
            return Unauthorized(new { Message = "As credenciais introduzidas não pertencem a nenhum utilizador." });
        }
    }
}
