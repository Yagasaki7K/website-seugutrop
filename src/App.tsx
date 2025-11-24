import './App.css';
import { useState } from 'react';
import { toast } from 'sonner';

function App() {
    const [wordReverse, setWordReverse] = useState('');

    function reverseWordsInString(inputString: string) {
        const wordsArray = inputString.split(' ');

        const reversedWordsArray = wordsArray.map(word => {
            let reversedWord = word.split('').reverse().join('');

            const upperCaseLetters = word.split('').map((char, index) => {
                return char === char.toUpperCase() ? index : -1;
            }).filter(index => index !== -1);

            reversedWord = reversedWord.toLowerCase();

            upperCaseLetters.forEach((index) => {
                reversedWord = reversedWord.substr(0, index) + reversedWord.charAt(index).toUpperCase() + reversedWord.substr(index + 1);
            });

            return reversedWord;
        });

        const result = reversedWordsArray.join(' ');

        setWordReverse(result);
    }

    function alertIfCopy() {
        navigator.clipboard.writeText(wordReverse).then(() => toast.success('Texto copiado!'));
    }

    return (
        <main className="layout">
            <header className="hero">
                <p className="eyebrow">Conversor instantâneo</p>
                <h1>Sêugutrop</h1>
                <p className="lead">Converta Português para Sêugutrop em segundos, em qualquer dispositivo.</p>
            </header>

            <form className="converter" onSubmit={(event) => event.preventDefault()}>
                <label className="label" htmlFor="input-text">Texto em Português</label>
                <textarea id="input-text" onChange={(e) => reverseWordsInString(e.target.value)} placeholder='Escreva seu texto'></textarea>
            </form>

            <section className="result" aria-live="polite">
                <div className="label">Resultado</div>
                <div className="output" role="status">
                    {wordReverse || 'Digite algo para ver o resultado aqui.'}
                </div>
            </section>

            {
                wordReverse ? <button className="copy" onClick={() => alertIfCopy()}>Copiar texto</button> : null
            }
        </main>
    );
}

export default App;
