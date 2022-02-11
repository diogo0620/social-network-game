IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220103094224_Migracao')
BEGIN
    CREATE TABLE [Ligacoes] (
        [Id] nvarchar(450) NOT NULL,
        [UtilizadorA] nvarchar(max) NULL,
        [UtilizadorB] nvarchar(max) NULL,
        [ForcaLigacao_valor] int NULL,
        [ForcaRelacao_likes] int NULL,
        [ForcaRelacao_dislikes] int NULL,
        CONSTRAINT [PK_Ligacoes] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220103094224_Migracao')
BEGIN
    CREATE TABLE [PedidosIntroducao] (
        [Id] nvarchar(450) NOT NULL,
        [DeUtilizador] nvarchar(max) NULL,
        [ParaUtilizador] nvarchar(max) NULL,
        [UtilizadorObjetivo] nvarchar(max) NULL,
        [ForcaLigacao_valor] int NULL,
        [MensagemIntroducao_value] nvarchar(max) NULL,
        [MensagemLigacao_value] nvarchar(max) NULL,
        [Estado] int NOT NULL,
        [Data] datetime2 NOT NULL,
        CONSTRAINT [PK_PedidosIntroducao] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220103094224_Migracao')
BEGIN
    CREATE TABLE [PedidosLigacao] (
        [Id] nvarchar(450) NOT NULL,
        [MensagemLigacao_value] nvarchar(max) NULL,
        [DeUtilizador] nvarchar(max) NULL,
        [ParaUtilizador] nvarchar(max) NULL,
        [ForcaLigacao_valor] int NULL,
        [Estado] int NOT NULL,
        [Data] datetime2 NOT NULL,
        CONSTRAINT [PK_PedidosLigacao] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220103094224_Migracao')
BEGIN
    CREATE TABLE [Utilizadores] (
        [Id] nvarchar(450) NOT NULL,
        [Email_value] nvarchar(max) NULL,
        [Password_value] nvarchar(max) NULL,
        [Nome_value] nvarchar(max) NULL,
        [DataNascimento_value] datetime2 NULL,
        [Telefone_codigoPais] nvarchar(max) NULL,
        [Telefone_numero] nvarchar(max) NULL,
        [PerfilLinkedIn_url] nvarchar(max) NULL,
        [PerfilFacebook_url] nvarchar(max) NULL,
        [Avatar_value] nvarchar(max) NULL,
        [Localizacao_pais] nvarchar(max) NULL,
        [Localizacao_cidade] nvarchar(max) NULL,
        [Descricao_value] nvarchar(max) NULL,
        [EstadoEmocional_emocao] int NULL,
        [EstadoEmocional_desde] datetime2 NULL,
        CONSTRAINT [PK_Utilizadores] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220103094224_Migracao')
BEGIN
    CREATE TABLE [Ligacoes_Tags] (
        [LigacaoId] nvarchar(450) NOT NULL,
        [Id] int NOT NULL IDENTITY,
        [value] nvarchar(max) NULL,
        CONSTRAINT [PK_Ligacoes_Tags] PRIMARY KEY ([LigacaoId], [Id]),
        CONSTRAINT [FK_Ligacoes_Tags_Ligacoes_LigacaoId] FOREIGN KEY ([LigacaoId]) REFERENCES [Ligacoes] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220103094224_Migracao')
BEGIN
    CREATE TABLE [PedidosIntroducao_Tags] (
        [PedidoIntroducaoId] nvarchar(450) NOT NULL,
        [Id] int NOT NULL IDENTITY,
        [value] nvarchar(max) NULL,
        CONSTRAINT [PK_PedidosIntroducao_Tags] PRIMARY KEY ([PedidoIntroducaoId], [Id]),
        CONSTRAINT [FK_PedidosIntroducao_Tags_PedidosIntroducao_PedidoIntroducaoId] FOREIGN KEY ([PedidoIntroducaoId]) REFERENCES [PedidosIntroducao] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220103094224_Migracao')
BEGIN
    CREATE TABLE [PedidosLigacao_Tags] (
        [PedidoLigacaoId] nvarchar(450) NOT NULL,
        [Id] int NOT NULL IDENTITY,
        [value] nvarchar(max) NULL,
        CONSTRAINT [PK_PedidosLigacao_Tags] PRIMARY KEY ([PedidoLigacaoId], [Id]),
        CONSTRAINT [FK_PedidosLigacao_Tags_PedidosLigacao_PedidoLigacaoId] FOREIGN KEY ([PedidoLigacaoId]) REFERENCES [PedidosLigacao] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220103094224_Migracao')
BEGIN
    CREATE TABLE [Utilizadores_Tags] (
        [UtilizadorId] nvarchar(450) NOT NULL,
        [Id] int NOT NULL IDENTITY,
        [value] nvarchar(max) NULL,
        CONSTRAINT [PK_Utilizadores_Tags] PRIMARY KEY ([UtilizadorId], [Id]),
        CONSTRAINT [FK_Utilizadores_Tags_Utilizadores_UtilizadorId] FOREIGN KEY ([UtilizadorId]) REFERENCES [Utilizadores] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220103094224_Migracao')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220103094224_Migracao', N'5.0.0');
END;
GO

COMMIT;
GO

