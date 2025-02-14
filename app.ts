// app.ts

interface ExchangeRateResponse {
    rates: { [key: string]: number };
    base: string;
    date: string;
  }
  
  // Se a API utilizada exigir chave de acesso, substitua "YOUR_API_KEY_HERE" pelo seu API Key
  const API_KEY = 'YOUR_API_KEY_HERE';
  // Exemplo de URL base para a API (algumas APIs não necessitam do API key na URL)
  // Neste exemplo usamos a "ExchangeRate API", que pode ser acessada via https://www.exchangerate-api.com/
  const API_URL = 'https://api.exchangerate-api.com/v4/latest/';
  
  /**
   * Função para obter as taxas de câmbio a partir da moeda base.
   * @param moedaBase - Moeda de origem para a consulta.
   */
  async function obterTaxasDeCambio(moedaBase: string): Promise<ExchangeRateResponse> {
    try {
      const response = await fetch(`${API_URL}${moedaBase}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar taxas de câmbio');
      }
      const data: ExchangeRateResponse = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  /**
   * Realiza a conversão do valor utilizando a taxa de câmbio.
   * @param valor - Valor original.
   * @param taxa - Taxa de conversão para a moeda de destino.
   */
  function converterValor(valor: number, taxa: number): number {
    return valor * taxa;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const inputValor = document.getElementById('valor') as HTMLInputElement;
    const selectMoedaOrigem = document.getElementById('moedaOrigem') as HTMLSelectElement;
    const selectMoedaDestino = document.getElementById('moedaDestino') as HTMLSelectElement;
    const btnConverter = document.getElementById('btnConverter') as HTMLButtonElement;
    const valorConvertido = document.getElementById('valorConvertido') as HTMLParagraphElement;
  
    btnConverter.addEventListener('click', async () => {
      const valor = parseFloat(inputValor.value);
      if (isNaN(valor)) {
        alert('Por favor, insira um valor válido.');
        return;
      }
  
      const moedaOrigem = selectMoedaOrigem.value;
      const moedaDestino = selectMoedaDestino.value;
  
      try {
        // Obtemos as taxas de câmbio a partir da moeda de origem
        const taxasData = await obterTaxasDeCambio(moedaOrigem);
        const taxaDestino = taxasData.rates[moedaDestino];
        if (!taxaDestino) {
          alert('Taxa de câmbio não encontrada para a moeda selecionada.');
          return;
        }
        const valorConvertidoFinal = converterValor(valor, taxaDestino);
        valorConvertido.innerText = `${valorConvertidoFinal.toFixed(2)} ${moedaDestino}`;
      } catch (error) {
        alert('Erro ao realizar a conversão. Tente novamente mais tarde.');
      }
    });
  });  