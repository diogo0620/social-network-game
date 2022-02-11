using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MDR.Migrations
{
    public partial class ChosenMigrationName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ligacoes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UtilizadorA = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UtilizadorB = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ForcaLigacao_valor = table.Column<int>(type: "int", nullable: true),
                    ForcaRelacao_likes = table.Column<int>(type: "int", nullable: true),
                    ForcaRelacao_dislikes = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ligacoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PedidosIntroducao",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DeUtilizador = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParaUtilizador = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UtilizadorObjetivo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ForcaLigacao_valor = table.Column<int>(type: "int", nullable: true),
                    MensagemIntroducao_value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MensagemLigacao_value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Estado = table.Column<int>(type: "int", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PedidosIntroducao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PedidosLigacao",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MensagemLigacao_value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeUtilizador = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParaUtilizador = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ForcaLigacao_valor = table.Column<int>(type: "int", nullable: true),
                    Estado = table.Column<int>(type: "int", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PedidosLigacao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Utilizadores",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Email_value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password_value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nome_value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataNascimento_value = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Telefone_codigoPais = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telefone_numero = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PerfilLinkedIn_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PerfilFacebook_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Avatar_value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Localizacao_pais = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Localizacao_cidade = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Descricao_value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstadoEmocional_emocao = table.Column<int>(type: "int", nullable: true),
                    EstadoEmocional_desde = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilizadores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ligacoes_Tags",
                columns: table => new
                {
                    LigacaoId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ligacoes_Tags", x => new { x.LigacaoId, x.Id });
                    table.ForeignKey(
                        name: "FK_Ligacoes_Tags_Ligacoes_LigacaoId",
                        column: x => x.LigacaoId,
                        principalTable: "Ligacoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PedidosIntroducao_Tags",
                columns: table => new
                {
                    PedidoIntroducaoId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PedidosIntroducao_Tags", x => new { x.PedidoIntroducaoId, x.Id });
                    table.ForeignKey(
                        name: "FK_PedidosIntroducao_Tags_PedidosIntroducao_PedidoIntroducaoId",
                        column: x => x.PedidoIntroducaoId,
                        principalTable: "PedidosIntroducao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PedidosLigacao_Tags",
                columns: table => new
                {
                    PedidoLigacaoId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PedidosLigacao_Tags", x => new { x.PedidoLigacaoId, x.Id });
                    table.ForeignKey(
                        name: "FK_PedidosLigacao_Tags_PedidosLigacao_PedidoLigacaoId",
                        column: x => x.PedidoLigacaoId,
                        principalTable: "PedidosLigacao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Utilizadores_Tags",
                columns: table => new
                {
                    UtilizadorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilizadores_Tags", x => new { x.UtilizadorId, x.Id });
                    table.ForeignKey(
                        name: "FK_Utilizadores_Tags_Utilizadores_UtilizadorId",
                        column: x => x.UtilizadorId,
                        principalTable: "Utilizadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ligacoes_Tags");

            migrationBuilder.DropTable(
                name: "PedidosIntroducao_Tags");

            migrationBuilder.DropTable(
                name: "PedidosLigacao_Tags");

            migrationBuilder.DropTable(
                name: "Utilizadores_Tags");

            migrationBuilder.DropTable(
                name: "Ligacoes");

            migrationBuilder.DropTable(
                name: "PedidosIntroducao");

            migrationBuilder.DropTable(
                name: "PedidosLigacao");

            migrationBuilder.DropTable(
                name: "Utilizadores");
        }
    }
}
