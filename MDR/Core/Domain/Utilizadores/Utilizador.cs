using MDR.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MDR.Domain.Utilizadores
{
    public class Utilizador : Entity<UtilizadorId>, IAggregateRoot
    {

        // TODO: O email tem de ser unico.
        public Email Email { get; private set; }
        public Password Password { get; private set; }
        public Nome Nome { get; private set; }
        public DataNascimento DataNascimento { get; private set; }
        public Telefone Telefone { get; private set; }
        public PerfilLinkedIn PerfilLinkedIn { get; private set; }
        public PerfilFacebook PerfilFacebook { get; private set; }
        public Avatar Avatar { get; private set; }
        public Localizacao Localizacao { get; private set; }
        public Descricao Descricao { get; private set; }
        public List<Tag> Tags { get; private set; }

        public EstadoEmocional EstadoEmocional { get; private set; }

        protected Utilizador() { }
        public Utilizador(Email email, Password password, Nome nome, DataNascimento dataNascimento, Telefone telefone, PerfilLinkedIn linkedIn, PerfilFacebook facebook, Avatar avatar, Localizacao localizacao, Descricao descricao, List<Tag> tags, EstadoEmocional estadoEmocional)
        {
            if (email == null)
            {
                throw new BusinessRuleValidationException("O email é obrigatório.");
            }


            if (estadoEmocional == null)
            {
                throw new BusinessRuleValidationException("O estado emocional é obrigatório.");
            }
            this.Id = new UtilizadorId(Guid.NewGuid());
            this.Email = email;
            alterarPassword(password);
            alterarNome(nome);
            alterarDataNascimento(dataNascimento);
            alterarTelefone(telefone);
            alterarPerfilLinkedIn(linkedIn);
            alterarPerfilFacebook(facebook);
            alterarAvatar(avatar);
            alterarLocalizacao(localizacao);
            alterarDescricao(descricao);
            alterarEstadoEmocional(estadoEmocional);
            alterarTags(tags);
        }

        public void alterarPassword(Password password)
        {
            if (password == null)
            {
                throw new BusinessRuleValidationException("A palavra passe é obrigatória.");
            }

            this.Password = password;
        }

        public void alterarNome(Nome nome)
        {
            this.Nome = nome;
        }

        public void alterarDataNascimento(DataNascimento dataNascimento)
        {
            if (dataNascimento == null)
            {
                throw new BusinessRuleValidationException("A data de nascimento é obrigatória.");
            }

            this.DataNascimento = dataNascimento;
        }

        public void alterarTelefone(Telefone telefone)
        {
            this.Telefone = telefone;
        }

        public void alterarPerfilLinkedIn(PerfilLinkedIn linkedIn)
        {
            this.PerfilLinkedIn = linkedIn;
        }

        public void alterarPerfilFacebook(PerfilFacebook facebook)
        {
            this.PerfilFacebook = facebook;
        }

        public void alterarAvatar(Avatar avatar)
        {
            this.Avatar = avatar;
        }

        public void alterarLocalizacao(Localizacao localizacao)
        {
            this.Localizacao = localizacao;
        }

        public void alterarDescricao(Descricao descricao)
        {
            this.Descricao = descricao;
        }

        public void alterarTags(List<Tag> tags)
        {
            if (tags == null || tags.Count == 0)
            {
                throw new BusinessRuleValidationException("É obrigatório definir pelo menos uma tag.");
            }

            this.Tags = tags;
        }

        public void alterarEstadoEmocional(EstadoEmocional estadoEmocional)
        {
            this.EstadoEmocional = estadoEmocional;
        }

        public override bool Equals(Object obj)
        {
            //Check for null and compare run-time types.
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                Utilizador u = (Utilizador)obj;
                return this.Id.Equals(u.Id);
            }
        }

        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }



    }
}