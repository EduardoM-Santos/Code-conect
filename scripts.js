const uploadbtn = document.getElementById("upload-btn")
const inputupload = document.getElementById("imagem-upload")

uploadbtn.addEventListener("click", () => {
    inputupload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemprincipal = document.querySelector(".main-imagem");
const nomedaimagem = document.querySelector(".container-imagem-nome p");

inputupload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemprincipal.src = conteudoDoArquivo.url;
            nomedaimagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputags = document.getElementById("input-tags");
const listatags = document.getElementById("lista-tags");



listatags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")){
        const tagQueremoveremos = evento.target.parentElement;
        listatags.removeChild(tagQueremoveremos)
    }
})

const tagsdisponiveis = ["Front-End", "Programação", "Data science", "HTML", "CSS", "full-Stack", "Java-Script"];
async function verificatagsdisponiveis (tagtexto){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsdisponiveis.includes(tagtexto));
        }, 1000);
    })
}

inputags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputags.value = "";
                } else {
                    alert("Tag não foi encontrada.");
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console.")
            }
        }
    }
})

const Publicar = document.querySelector(".botao-publicar");


async function publicarprojeto(NomeDoprojeto, DescricaoDoProjeto, tagsProjeto){
return new Promise((resolve, reject) => {
    setTimeout(() => {
        const deucerto = Math.random() > 0.5;

        if (deucerto) {
            resolve("Projeto publicado com suceso!")
        }else{
            reject("Erro ao publicar o projeto.")
        }
    }, 2000);
})
}

Publicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const NomeDoprojeto = document.getElementById("nome").value
    const DescricaoDoProjeto = document.getElementById("descricao").value
    const tagsProjeto = Array.from(listatags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarprojeto(NomeDoprojeto, DescricaoDoProjeto, tagsProjeto);
        console.log(resultado)
        alert("Deu tudo Certo!")
    }catch (error) {
        console.log("Deu errado:", error)
        alert("Tem algo errado!")
    }

})

const descartar = document.querySelector(".botao-descartar")

descartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemprincipal.src = "./img/imagem1.png";
    nomedaimagem.textContent = "imagem-projeto.png";

    listatags.innerHTML = "";
})