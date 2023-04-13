## Projeto
-> Para cada entidade:
    - uma controller
    - um schema
    - roteador(gerenciador de rotas)

-> Servidor(encaminha as rotas para cada Router responsavel) -> Router(manda a requisição pra a controller) -> Controller(metodos que farao o crud e se comunicará com a model)

-> Avalicação:
    - 28/04 - 1ª apresentação do projeto 

-> Tema:
    -> Gerenciador de tarefas:
    - Fazer relação um para muitos
        - muitos para muitos: ideia de um criador de tarefas e uma equipe que pode gerenciar a tarefa
        - equipe: entidade que vincula varios usuarios

## Entidades(pense como se fosse uma classe)
    - usuario (cadastro / login)
    - tarefa
    - equipe

-> Usuario
    - nome completo
    - usuario de login
    - senha
    - email
    - telefone

-> Tarefa
    - titulo
    - descrição
    - feito: false(por padrão)
    - data de criação: função js de data do dia()
    - data para conclusão
    - equipe(opcional)   

-> Equipe
    - criador
    - integrantes(usuarios)

## Funcionalidades
    - Criar login

## Fazer depois
    - array de equipes dentro de tarefas (perguntar pro professor)
    - campo "integrantes" da equipe como array de usuario(perguntar pro professor)
    - campo data de conclusao (ver formatação das datas)
    - implementar gerador de id automatico