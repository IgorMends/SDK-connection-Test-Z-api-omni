import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import OmniZapi from '@omnizapi/connect';
import './style.css';

function App() {
  const [publicKey, setPublicKey] = useState('');
  const [channelId, setChannelId] = useState('');
  const [status, setStatus] = useState('Pronto para testar');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const runSDK = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setStatus('Conectando...');

    try {
      if (!publicKey.trim()) {
        throw new Error('Informe a Public Key.');
      }

      if (!channelId.trim()) {
        throw new Error('Informe o Channel ID.');
      }

      const client = OmniZapi.newClient({
        publicKey: publicKey.trim()
      });

      const response = await client.connect({
        channelId: channelId.trim(),

        getQRCode: async () => {
          console.log('SDK solicitou o QR Code');

          // Aqui entra o seu backend.
          // Exemplo:
          //
          // const response = await fetch(
          //   'https://seu-backend.com/qrcode'
          // );
          //
          // return await response.json();

          throw new Error(
            'A função getQRCode foi chamada, mas o backend do QR Code ainda não foi configurado.'
          );
        }
      });

      console.log('Resposta do SDK:', response);

      setResult(response);

      if (response?.connected) {
        setStatus('WhatsApp conectado!');
      } else {
        setStatus('Conexão iniciada');
      }

    } catch (err) {
      console.error('Erro no SDK:', err);

      setError(err?.message || String(err));
      setStatus('Erro no teste');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">

        <header>
          <div className="badge">Z-API OMNI</div>

          <h1>Teste do OmniZapi SDK</h1>

          <p>
            Teste a conexão de um canal WhatsApp utilizando
            diretamente o pacote <strong>@omnizapi/connect</strong>.
          </p>
        </header>

        <section className="card">

          <h2>Dados da conexão</h2>

          <div className="field">
            <label>Public Key</label>

            <input
              type="text"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="SUA_PUBLIC_KEY"
            />
          </div>

          <div className="field">
            <label>Channel ID</label>

            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder="ID_DO_CANAL"
            />
          </div>

          <button
            className="primary"
            onClick={runSDK}
            disabled={loading}
          >
            {loading ? 'Conectando...' : 'Conectar WhatsApp'}
          </button>

        </section>

        <section className="status">
          <div className={`indicator ${error ? 'danger' : ''}`} />

          <div>
            <span>Status</span>
            <strong>{status}</strong>
          </div>
        </section>

        {error && (
          <section className="result error">
            <h2>Erro</h2>

            <pre>
              {error}
            </pre>
          </section>
        )}

        {result && (
          <section className="result">

            <h2>Resposta do SDK</h2>

            <pre>
              {JSON.stringify(result, null, 2)}
            </pre>

          </section>
        )}

      </div>
    </div>
  );
}

createRoot(
  document.getElementById('root')
).render(
  <App />
);