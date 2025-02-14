"use strict";
// app.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Se a API utilizada exigir chave de acesso, substitua "YOUR_API_KEY_HERE" pelo seu API Key
const API_KEY = 'YOUR_API_KEY_HERE';
// Exemplo de URL base para a API (algumas APIs não necessitam do API key na URL)
// Neste exemplo usamos a "ExchangeRate API", que pode ser acessada via https://www.exchangerate-api.com/
const API_URL = 'https://api.exchangerate-api.com/v4/latest/';
/**
 * Função para obter as taxas de câmbio a partir da moeda base.
 * @param moedaBase - Moeda de origem para a consulta.
 */
function obterTaxasDeCambio(moedaBase) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}${moedaBase}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar taxas de câmbio');
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
/**
 * Realiza a conversão do valor utilizando a taxa de câmbio.
 * @param valor - Valor original.
 * @param taxa - Taxa de conversão para a moeda de destino.
 */
function converterValor(valor, taxa) {
    return valor * taxa;
}
document.addEventListener('DOMContentLoaded', () => {
    const inputValor = document.getElementById('valor');
    const selectMoedaOrigem = document.getElementById('moedaOrigem');
    const selectMoedaDestino = document.getElementById('moedaDestino');
    const btnConverter = document.getElementById('btnConverter');
    const valorConvertido = document.getElementById('valorConvertido');
    btnConverter.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const valor = parseFloat(inputValor.value);
        if (isNaN(valor)) {
            alert('Por favor, insira um valor válido.');
            return;
        }
        const moedaOrigem = selectMoedaOrigem.value;
        const moedaDestino = selectMoedaDestino.value;
        try {
            // Obtemos as taxas de câmbio a partir da moeda de origem
            const taxasData = yield obterTaxasDeCambio(moedaOrigem);
            const taxaDestino = taxasData.rates[moedaDestino];
            if (!taxaDestino) {
                alert('Taxa de câmbio não encontrada para a moeda selecionada.');
                return;
            }
            const valorConvertidoFinal = converterValor(valor, taxaDestino);
            valorConvertido.innerText = `${valorConvertidoFinal.toFixed(2)} ${moedaDestino}`;
        }
        catch (error) {
            alert('Erro ao realizar a conversão. Tente novamente mais tarde.');
        }
    }));
});
