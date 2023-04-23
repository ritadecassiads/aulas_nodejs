## Projeto
-> Para cada entidade(pode-se entender como uma classe com caracteristicas):
    - um schema(model)
    - uma controller
    - roteador(gerenciador de rotas)

-> Servidor(encaminha as rotas para cada Router responsavel) -> Router(manda a requisição pra a controller) -> Controller(metodos que farao o crud e se comunicará com a model)

-> Avalicação:
    - 28/04 - 1ª apresentação do projeto 

-> Tema:
    -> Gerenciador de tarefas:
    - Fazer relação um para muitos
        - muitos para muitos: ideia de um criador de tarefas e uma equipe que pode gerenciar a tarefa
        - equipe: entidade que vincula varios usuarios

## A mais
-> async: ajuda no processamento, faz a requisicao de forma assincrona, enquanto a resposta nao vem do servidor eu libero o processador | ajuda a não ocupar espaço na memoria do processador | nao trava recurso do processador
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
    - OK array de equipes dentro de tarefas (perguntar pro professor)
    - OK campo "integrantes" da equipe como array de usuario(perguntar pro professor)
    - OK campo data de conclusao (ver formatação das datas)

    - validar se o nome de login(não permitir nomes iguais)
    - atrelar cada tarefa ao usuario que criou(perguntar pro professor como da pra fazer)
    - ver gerador do codigo do professor
    - fazer validação pra mesma tarefa nao ser adiconada a lista duas vezes
    - fazer validação para quando for a primeira tarefa cadastrada do usuario(não usar o addTarefa quando a "tarefa" estiver null)

## Ver no material
    - fazer o relacionamento um para um 
    - muitos para muitos

-> cadastrar informação usando o codigo/idTarefa
    - criar validação no salvar para transformar idTarefa 

-> um para muitos
    - usar o valor do idTarefa para cadastrar objetos que se referenciam a outros

-> Usuario podem ser associados a tarefas e equipes associadas a usuarios e tarefas


## Json usados
# Usuario - cadastrar
    {
        "nome": "Rita",
        "username": "ritinha",
        "senha": "123456",
        "email": "rita@gmail.com",
        "telefone": "41997317647"
    }

    {
        "nome": "Leticia",
        "username": "lele",
        "senha": "123456",
        "email": "lele@gmail.com",
        "telefone": "41997317647",
        "tarefa": 3
    }

obs: posso associar o usuario a tarefa tanto pelo cadastro como pela alteração por id
    - posso criar um usuario sem tarefa

-> Atualizar/id atrelando a tarefa ao usuario
    {
        "tarefa": 3
    }