const inputTitulo = document.getElementById('titulo-livro');
const inputAutor = document.getElementById('autor-livro');
const inputGenero = document.getElementById('genero-livro');
const selectStatus = document.getElementById('status-livro');
const inputData = document.getElementById('data-inicio');
const listaLivros = document.getElementById('lista-livros');
const campoEdit = document.getElementById('campo-edit');
const conteudoContainer = document.getElementById('conteudo-container');
let livroSelecionado = null; 

function formatarData(dataISO) {
    if (!dataISO) return '';
    const partes = dataISO.split('-'); 
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

const btnEfetuarEdit = document.createElement('button');
const btnFecharEdit = document.createElement('button');
const divBtns = document.getElementById('btns-editar');

btnEfetuarEdit.classList.add('btn');
btnFecharEdit.classList.add('btn');
btnFecharEdit.style.backgroundColor = 'rgb(241, 30, 30)';

btnEfetuarEdit.innerText = 'Editar';
btnFecharEdit.innerText = 'Fechar';

divBtns.appendChild(btnFecharEdit);
divBtns.appendChild(btnEfetuarEdit);

function adicionarLivro(event) {
    event.preventDefault();

    let spanContadorLidos = Number(document.getElementById('contador-livros').innerText);
    let spanContadorTotalLivros = Number(document.getElementById('total-livros').innerText);

    if (inputAutor.value == '' || inputTitulo.value == '' || selectStatus.value == '') {
        alert('Insira todas as informações para prosseguir!');
    } else {

        document.getElementById('total-livros').innerHTML = spanContadorTotalLivros + 1;

        let tituloLivro = inputTitulo.value;
        let autorLivro = inputAutor.value;
        let generoLivro = inputGenero.value;
        let statusLivro = selectStatus.value;
        let dataInicioLeitura = formatarData(inputData.value);

        const novoLivro = document.createElement('div');
        novoLivro.classList.add('item-livro');
        listaLivros.appendChild(novoLivro);

        const informacoesLivro = document.createElement('div');
        informacoesLivro.classList.add('informacoes-livro');
        novoLivro.appendChild(informacoesLivro);

        const tituloh3 = document.createElement('h3');
        tituloh3.innerText = tituloLivro;

        const spanAutor = document.createElement('span');
        spanAutor.innerText = autorLivro;

        const divLine = document.createElement('div');

        const pStatus = document.createElement('p');
        pStatus.innerText = statusLivro;

        if (statusLivro == 'Lido') {
            document.getElementById('contador-livros').innerHTML = spanContadorLidos + 1;
            pStatus.style.backgroundColor = 'rgb(53, 161, 53)';
        } else if (statusLivro == 'Lendo') {
            pStatus.style.backgroundColor = 'rgb(224, 238, 37)';
        } else {
            pStatus.style.backgroundColor = 'rgba(128, 128, 128, 0.11)';
        }

        const spanGenero = document.createElement('span');
        spanGenero.innerText = generoLivro;

        const spanData = document.createElement('span');
        spanData.innerText = dataInicioLeitura;

        const divFunctions = document.createElement('div');
        divFunctions.classList.add('funcoes');

        const btnEditar = document.createElement('img');
        btnEditar.src = 'assets/editar.png';
        btnEditar.alt = 'Editar';
        btnEditar.classList.add('btn');

        const btnExcluir = document.createElement('img');
        btnExcluir.src = 'assets/excluir.png';
        btnExcluir.alt = 'Excluir';
        btnExcluir.classList.add('btn');

        divFunctions.appendChild(btnEditar);
        divFunctions.appendChild(btnExcluir);

        btnExcluir.addEventListener('click', () => {
            let contadorLidos = Number(document.getElementById('contador-livros').innerText);
            let contadorTotal = Number(document.getElementById('total-livros').innerText);

            const statusAtual = pStatus.innerText;

            if (statusAtual === 'Lido' && contadorLidos > 0) {
                document.getElementById('contador-livros').innerText = contadorLidos - 1;
            }

            if (contadorTotal > 0) {
                document.getElementById('total-livros').innerText = contadorTotal - 1;
            }

            if (livroSelecionado && livroSelecionado.tituloh3 === tituloh3) {
                livroSelecionado = null;
                campoEdit.style.display = 'none';
                conteudoContainer.style.filter = 'blur(0px)';
            }

            novoLivro.remove();
        });

        informacoesLivro.appendChild(tituloh3);
        informacoesLivro.appendChild(spanAutor);
        informacoesLivro.appendChild(divLine);

        divLine.appendChild(pStatus);
        divLine.appendChild(spanGenero);
        divLine.appendChild(spanData);

        novoLivro.appendChild(divFunctions);

        const inputEditarTitulo = document.getElementById('titulo-edit');
        const inputEditarAutor = document.getElementById('autor-edit');
        const inputEditarGenero = document.getElementById('genero-edit');
        const selectStatusEdit = document.getElementById('status-edit');
        const inputDataEdit = document.getElementById('data-edit');

        btnEditar.addEventListener('click', () => {
            livroSelecionado = {
                tituloh3,
                spanAutor,
                spanGenero,
                pStatus,
                spanData
            };

            inputEditarTitulo.value = tituloh3.innerText;
            inputEditarAutor.value = spanAutor.innerText;
            inputEditarGenero.value = spanGenero.innerText;
            selectStatusEdit.value = pStatus.innerText;

            const partes = spanData.innerText.split('/');
            inputDataEdit.value = `${partes[2]}-${partes[1]}-${partes[0]}`;

            campoEdit.style.display = 'inline-flex';
            conteudoContainer.style.filter = 'blur(5px)';
        });

        btnFecharEdit.addEventListener('click', () => {
            campoEdit.style.display = 'none';
            conteudoContainer.style.filter = 'blur(0px)';
            livroSelecionado = null;
        });

        if (!btnEfetuarEdit.dataset.listenerAttached) {
            btnEfetuarEdit.addEventListener('click', () => {
                if (!livroSelecionado) return;

                if (inputEditarTitulo.value === '' || inputEditarAutor.value === '' || inputEditarGenero.value === '' ||
                    selectStatusEdit.value === '' || inputDataEdit.value === '') {
                    alert('Insira todas as informações para prosseguir!');
                    return;
                }

                const statusAnterior = livroSelecionado.pStatus.innerText;
                const novoStatus = selectStatusEdit.value;

                livroSelecionado.tituloh3.innerText = inputEditarTitulo.value;
                livroSelecionado.spanAutor.innerText = inputEditarAutor.value;
                livroSelecionado.spanGenero.innerText = inputEditarGenero.value;
                livroSelecionado.pStatus.innerText = novoStatus;
                livroSelecionado.spanData.innerText = formatarData(inputDataEdit.value);

                if (novoStatus === 'Lido') {
                    livroSelecionado.pStatus.style.backgroundColor = 'rgb(53, 161, 53)';
                } else if (novoStatus === 'Lendo') {
                    livroSelecionado.pStatus.style.backgroundColor = 'rgb(224, 238, 37)';
                } else {
                    livroSelecionado.pStatus.style.backgroundColor = 'rgba(128, 128, 128, 0.11)';
                }

                const spanContadorLidosElement = document.getElementById('contador-livros');
                let contadorLidos = Number(spanContadorLidosElement.innerText);

                if (statusAnterior !== 'Lido' && novoStatus === 'Lido') {
                    spanContadorLidosElement.innerText = contadorLidos + 1;
                } else if (statusAnterior === 'Lido' && novoStatus !== 'Lido') {
                    spanContadorLidosElement.innerText = contadorLidos - 1;
                }

                campoEdit.style.display = 'none';
                conteudoContainer.style.filter = 'blur(0px)';
                livroSelecionado = null;
            });

            btnEfetuarEdit.dataset.listenerAttached = "true";
        }
    }
}
