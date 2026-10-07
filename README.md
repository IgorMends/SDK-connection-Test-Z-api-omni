# OmniZapi SDK Tester — V2

## Rodar

```bash
npm install
npm run dev
```

Abra:

http://localhost:5173

## Importante

O projeto foi feito para funcionar mesmo sem o SDK carregado. A interface não depende do SDK para renderizar.

Para testar a chamada real, o SDK precisa estar disponível como:

```js
window.OmniZapi
```

O código usado pelo botão é:

```js
const client = OmniZapi.newClient({
  publicKey: 'SUA_PUBLIC_KEY'
});

const response = await client.connect({
  channelId: 'ID_DO_CANAL'
});
```

Se o SDK for fornecido por uma URL/script, adicione no `index.html`, antes do `main.jsx`, por exemplo:

```html
<script src="URL_DO_SDK"></script>
```

Se você me fornecer o arquivo ou URL oficial do SDK, substitua essa parte pelo carregamento real.
