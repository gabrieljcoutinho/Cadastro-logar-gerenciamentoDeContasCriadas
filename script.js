// Função para obter contas salvas
function getContas() {
  return JSON.parse(localStorage.getItem("contas")) || [];
}

// Função para salvar contas
function salvarContas(contas) {
  localStorage.setItem("contas", JSON.stringify(contas));
}

// Cadastro
const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
  formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let contas = getContas();

    // Verificar se já existe email
    if (contas.some(conta => conta.email === email)) {
      document.getElementById("mensagem").innerText = "Esse email já está cadastrado!";
      return;
    }

    contas.push({ nome, email, senha });
    salvarContas(contas);

    document.getElementById("mensagem").innerText = "Cadastro realizado com sucesso!";
    formCadastro.reset();
  });
}

// Login
const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    let contas = getContas();
    let conta = contas.find(c => c.email === email && c.senha === senha);

    if (conta) {
      document.getElementById("mensagemLogin").innerText = "Login realizado com sucesso!";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      document.getElementById("mensagemLogin").innerText = "Email ou senha incorretos!";
    }
  });
}

// Listagem de contas
const listaContas = document.getElementById("listaContas");
if (listaContas) {
  function renderContas() {
    listaContas.innerHTML = "";
    let contas = getContas();

    if (contas.length === 0) {
      listaContas.innerHTML = "<li>Nenhuma conta cadastrada.</li>";
      return;
    }

    contas.forEach((conta, index) => {
      let li = document.createElement("li");
      li.textContent = `Nome: ${conta.nome} | Email: ${conta.email} | Senha: ${conta.senha}`;

      let btn = document.createElement("button");
      btn.textContent = "Excluir";
      btn.style.marginLeft = "10px";

      btn.onclick = () => {
        let contasAtualizadas = getContas();
        contasAtualizadas.splice(index, 1);
        salvarContas(contasAtualizadas);
        renderContas(); // atualiza lista depois de excluir
      };

      li.appendChild(btn);
      listaContas.appendChild(li);
    });
  }

  // Renderiza a lista quando abrir a página
  document.addEventListener("DOMContentLoaded", renderContas);
}
