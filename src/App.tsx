import './App.css';
import { useState } from 'react';
import { toast } from 'sonner'

function App() {
    const [wordReverse, setWordReverse] = useState(''); // Estado para armazenar o resultado

    function reverseWordsInString(inputString: string) {
        // Separa a string em um array de palavras
        const wordsArray = inputString.split(' ');

        // Usa map para inverter cada palavra individualmente e manipular as letras maiúsculas
        const reversedWordsArray = wordsArray.map(word => {
            // Inverte a palavra
            let reversedWord = word.split('').reverse().join('');

            // Mapeia as letras maiúsculas da palavra original
            const upperCaseLetters = word.split('').map((char, index) => {
                return char === char.toUpperCase() ? index : -1;
            }).filter(index => index !== -1);

            // Converte a palavra invertida para minúsculas
            reversedWord = reversedWord.toLowerCase();

            // Reposiciona as letras maiúsculas na palavra invertida
            upperCaseLetters.forEach((index) => {
                reversedWord = reversedWord.substr(0, index) + reversedWord.charAt(index).toUpperCase() + reversedWord.substr(index + 1);
            });

            return reversedWord;
        });

        // Junta as palavras invertidas de volta em uma string e atualiza o estado
        const result = reversedWordsArray.join(' ');

        setWordReverse(result);
    }

        
    function alertIfCopy() {
        navigator.clipboard.writeText(wordReverse).then(() => toast.success('Texto copiado!'));  
    }

    return (
        <>
            <h1>Sêugutrop</h1>
            <p>Converta Português para Sêugutrop em segundos!</p>
            <form>
                <textarea onChange={(e) => reverseWordsInString(e.target.value)} placeholder='Escreva seu texto'></textarea>
            </form>

            <p>
                {wordReverse}
            </p>
            
            {
                wordReverse ? <button onClick={() => alertIfCopy()}>Copiar texto</button> : null
            }
        </>
    );
}

export default App;
