let fans = [];

// Adiciona evento ao formulário
document.getElementById('fanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const numero = document.getElementById('numero').value.trim();
    
    // Validação simples do CPF
    if (!validarCPF(cpf)) {
        alert("CPF inválido. Verifique o formato.");
        return;
    }
    
    // Verifica se o CPF já está cadastrado
    if (fans.some(f => f.cpf === cpf)) {
        alert("CPF já cadastrado.");
        return;
    }

    const newFan = { nome, cpf, email, numero, numShows: 0, numCamarim: 0 };
    fans.push(newFan);
    atualizarTabela();
    this.reset();
});

// Funções para registrar shows e camarins
function registrarShow() {
    const cpf = prompt("Digite o CPF do fã:");
    const fan = fans.find(f => f.cpf === cpf);
    
    if (fan) {
        fan.numShows++;
        atualizarTabela();
        mostrarMensagem("Registro de show atualizado!");
    } else {
        mostrarMensagem("Fã não encontrado!", true);
    }
}

function registrarCamarim() {
    const cpf = prompt("Digite o CPF do fã:");
    const fan = fans.find(f => f.cpf === cpf);
    
    if (fan) {
        fan.numCamarim++;
        atualizarTabela();
        mostrarMensagem("Registro de camarim atualizado!");
    } else {
        mostrarMensagem("Fã não encontrado!", true);
    }
}

// Consulta um fã pelo CPF
function consultarFan() {
    const cpf = document.getElementById('cpfConsulta').value.trim();
    const fan = fans.find(f => f.cpf === cpf);
    
    const resultadoDiv = document.getElementById('resultadoConsulta');
    resultadoDiv.innerHTML = ''; // Limpa resultados anteriores
    
    if (fan) {
        resultadoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${fan.nome}</p>
            <p><strong>CPF:</strong> ${fan.cpf}</p>
            <p><strong>Email:</strong> ${fan.email}</p>
            <p><strong>Número:</strong> ${fan.numero}</p>
            <p><strong>Shows:</strong> ${fan.numShows}</p>
            <p><strong>Camarim:</strong> ${fan.numCamarim}</p>
        `;
    } else {
        resultadoDiv.innerHTML = '<p>Fã não encontrado!</p>';
    }
}

// Atualiza a tabela de fãs
function atualizarTabela() {
    const tbody = document.querySelector('#fanTable tbody');
    tbody.innerHTML = '';
    
    fans.forEach(fan => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fan.nome}</td>
            <td>${fan.cpf}</td>
            <td>${fan.email}</td>
            <td>${fan.numero}</td>
            <td>${fan.numShows}</td>
            <td>${fan.numCamarim}</td>
        `;
        tbody.appendChild(row);
    });
}

// Valida o CPF (formato simples)
function validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
}

// Exibe mensagens ao usuário
function mostrarMensagem(mensagem, erro = false) {
    const div = document.createElement('div');
    div.textContent = mensagem;
    div.style.color = erro ? 'red' : 'green';
    div.style.marginTop = '10px';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000); // Remove a mensagem após 3 segundos
}

// Exemplo de chamada da função consultarFan em um botão
document.getElementById('consultarButton').addEventListener('click', consultarFan);
function toggleFanList() {
    const fanList = document.getElementById('fanList');
    const toggleButton = document.getElementById('toggleFanList');
    
    if (fanList.style.display === 'none') {
        fanList.style.display = 'block';
        toggleButton.textContent = 'Ocultar Lista de Fãs'; // Altera o texto do botão
    } else {
        fanList.style.display = 'none';
        toggleButton.textContent = 'Mostrar Lista de Fãs'; // Altera o texto do botão
    }
}
function toggleFanList() {
    const fanList = document.getElementById('fanList');
    const toggleButton = document.getElementById('toggleFanList');
    
    // Verifica se a lista está visível
    if (fanList.style.display === 'none' || fanList.style.display === '') {
        fanList.style.display = 'block'; // Mostra a lista
        toggleButton.textContent = 'Ocultar Lista de Fãs'; // Altera o texto do botão
    } else {
        fanList.style.display = 'none'; // Oculta a lista
        toggleButton.textContent = 'Mostrar Lista de Fãs'; // Altera o texto do botão
    }
}
