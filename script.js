document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('register-form');
  const submitButton = document.getElementById('submit-button');
  
  // --- INICIALIZAÇÃO DA BIBLIOTECA DE TELEFONE ---
  const phoneInput = document.querySelector("#phone");
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "br", // Define o país inicial (Brasil)
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
  // -------------------------------------------------

  // Envio do formulário
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validação para ver se o número de telefone é válido
    if (!iti.isValidNumber()) {
      alert('Por favor, insira um número de telefone válido.');
      return;
    }

    // Pega o número completo no formato internacional (ex: +5511999999999)
    const fullPhoneNumber = iti.getNumber();

    const formData = {
      nome: form.nome.value,
      email: form.email.value,
      // Envia o número já formatado (DDI + DDD + Numero)
      whatsapp: fullPhoneNumber,
      profissao: form.profissao.value, 
      valor_investimento: form.valor_investimento.value
    };
    
    // Validação dos outros campos
    if (!formData.nome || !formData.email || !formData.profissao || !formData.valor_investimento) {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }
    
    // Desabilitando o botão durante o envio
    submitButton.disabled = true;
    submitButton.textContent = 'ENVIANDO...';
    
    try {
      // Envio para os webhooks
      const response1 = await fetch('https://n8nwebhook.arck1pro.shop/webhook/site-arck1pro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const response2 = await fetch('https://n8nwebhook.arck1pro.shop/webhook/lp-site-arck-investidor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response1.ok && response2.ok) {
        alert('Cadastro realizado com sucesso. Em breve você receberá uma mensagem da nossa equipe!');
        form.reset();
        iti.setCountry("br"); // Reseta o seletor para o Brasil
      } else {
        throw new Error('Erro ao enviar formulário para um ou ambos os webhooks');
      }
    } catch (error) {
      alert('Ocorreu um erro ao enviar o cadastro. Tente novamente.');
      console.error(error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'QUERO ME REGISTRAR';
    }
  });
});

// ===============================================
// FUNÇÃO PARA ROLAGEM DOS BOTÕES DAS NOVAS SEÇÕES
// ===============================================

function scrollToForm() {
  // O ID continua no formulário, então começamos por ele
  const formElement = document.getElementById('register-form');
  
  if (formElement) {
    // MODIFICAÇÃO 1: Em vez de rolar para o form, vamos procurar o "pai" dele
    // que tem a classe '.form-container'. Esse é o alvo correto.
    const containerParaRolar = formElement.closest('.form-container');

    if (containerParaRolar) {
      // MODIFICAÇÃO 2: Adicionamos a opção "block: 'center'" para garantir
      // que o container fique bem no meio da tela na vertical.
      containerParaRolar.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

  } else {
    // Se o formulário não for encontrado, rola para o topo da página.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
