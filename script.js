document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('register-form');
  const submitButton = document.getElementById('submit-button');
  
  // Formatando o campo de WhatsApp
  const whatsappInput = document.querySelector('input[name="whatsapp"]');
  whatsappInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (!value.startsWith('55')) {
      value = '55' + value;
    }
    e.target.value = '+' + value.slice(0, 13);
  });
  
  // Envio do formulário
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
      nome: form.nome.value,
      email: form.email.value,
      whatsapp: form.whatsapp.value,
      // NOVO CAMPO ADICIONADO AOS DADOS
      profissao: form.profissao.value, 
      valor_investimento: form.valor_investimento.value
    };
    
    // Validação atualizada
    if (!formData.nome || !formData.email || !formData.whatsapp || formData.whatsapp.length < 14 || !formData.profissao || !formData.valor_investimento) {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }
    
    // Simulando envio
    submitButton.disabled = true;
    submitButton.textContent = 'ENVIANDO...';
    
    try {
      // Simulação de envio para webhooks
      const response1 = await fetch('https://n8nwebhook.arck1pro.shop/webhook/lp-rd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const response2 = await fetch('https://n8nwebhook.arck1pro.shop/webhook/lp-ari-rdstationcrm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response1.ok && response2.ok) {
        
        alert('Cadastro realizado com sucesso. Redirecionando...');
        
        // Limpa o formulário
        form.reset();
        
        // Redireciona após 1 segundo
        /*setTimeout(() => {
          window.location.href = "https://obrigado.arck1pro.com.br/";
        }, 1000);*/
      } else {
        throw new Error('Erro ao enviar formulário');
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