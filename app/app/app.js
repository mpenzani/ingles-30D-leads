const params = new URLSearchParams(window.location.search);
const alunoNome = params.get('aluno') || 'jose-eduardo';

async function carregarAluno() {
  const response = await fetch(`../alunos/${alunoNome}.json`);
  const aluno = await response.json();
  renderizar(aluno);
}

function renderizar(aluno) {
  document.querySelector('h1').textContent = `Inglês 30D - Plano do ${aluno.nome}`;
  
  const container = document.getElementById('dias');
  aluno.plano.forEach(dia => {
    const html = `
      <div class="dia-card" data-dia="${dia.id}">
        <h2>Dia ${dia.id}: ${dia.titulo}</h2>
        <p>⏱ ${dia.tempo}</p>
        <h3>Objetivo</h3>
        <p>${dia.objetivo}</p>
        <h3>Atividades</h3>
        <ol>${dia.atividades.map(a => `<li>${a}</li>`).join('')}</ol>
        <h3>Resultado</h3>
        <p>${dia.resultado}</p>
        <button onclick="marcarConcluido(${dia.id})">Concluir Dia ${dia.id}</button>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
  
  carregarProgresso();
}

function marcarConcluido(diaId) {
  let concluidos = JSON.parse(localStorage.getItem(`${alunoNome}_concluidos`) || '[]');
  if (!concluidos.includes(diaId)) {
    concluidos.push(diaId);
    localStorage.setItem(`${alunoNome}_concluidos`, JSON.stringify(concluidos));
    location.reload();
  }
}

function carregarProgresso() {
  const concluidos = JSON.parse(localStorage.getItem(`${alunoNome}_concluidos`) || '[]');
  concluidos.forEach(id => {
    const btn = document.querySelector(`[data-dia="${id}"] button`);
    if (btn) btn.textContent = '✅ Concluído!';
  });
}

carregarAluno();
