// 1. O Mapa (Gaveta)
const meuMapa = {};
// --- AÇÕES ---

// 2. ADICIONAR
meuMapa.nome = 'João';
meuMapa.idade = 30;
meuMapa.cidade = 'São Paulo';

// 3. LER
console.log(`O nome é: ${meuMapa.nome}`);
// Saída: O nome é: João

// 4. ATUALIZAR
meuMapa.idade = 31;
console.log(`Nova idade: ${meuMapa.idade}`);
// Saída: Nova idade: 31

// 5. REMOVER 
delete meuMapa.cidade;

// 6.RESULTADO FINAL
console.log(meuMapa);
// Saída: { nome: 'João', idade: 31 }

//OUTRO EXERCICIO    --------------------------------------------------------

const frutas = ['maçã', 'banana', 'laranja', 'maçã', 'uva', 'banana', 'maçã'];

// 1. Criar o Mapa para armazenar as contagens
const contagemFrutas = new Map();

// 2. Iterar sobre a lista de frutas
for (const fruta of frutas) {
  // Pega a contagem atual (se não existir, é 0)
  const contagemAtual = contagemFrutas.get(fruta) || 0;
  // Define a nova contagem: contagem atual + 1
  contagemFrutas.set(fruta, contagemAtual + 1);
}

console.log(contagemFrutas);
// Saída: Map(4) { 'maçã' => 3, 'banana' => 2, 'laranja' => 1, 'uva' => 1 }

//Atividade completa -----------------------

//Configuração
const CAPACIDADE_INICIAL = 16;
const FATOR_CARGA = 0.75;
const NUMERO_PRIMO = 31; 

class HashMap {
  constructor() {
    this.capacidade = CAPACIDADE_INICIAL;
    // O array principal onde armazena
    this.buckets = new Array(this.capacidade).fill(null); 
    this.tamanho = 0; // Contador de pares
  }

  // 1. hash(key)
  // Gera o índice do bucket
  hash(key) {
    let codigoHash = 0;
    const modulo = this.capacidade;
    for (let i = 0; i < key.length; i++) {
      // Aplica o módulo em cada passo para evitar overflow
      codigoHash = (NUMERO_PRIMO * codigoHash + key.charCodeAt(i)) % modulo
    }

    return codigoHash;
  }

  // 2. set(key, value)
  // Adiciona ou atualiza um par
  set(key, value) {
    const indice = this.hash(key)
    // Se o bucket estiver vazio, inicializa com um array
    if (!this.buckets[indice]) {
      this.buckets[indice] = []
    }
    const bucket = this.buckets[indice];
    // Verifica se a chave JÁ EXISTE no bucket (Atualização)
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Sobrescreve o valor
        return; 
      }
    }
    // Chave NOVA: adiciona o novo par [key, value]
    bucket.push([key, value])
    this.tamanho++
    this._verificarECrescer()
  }

  // 3. get(key)
  // Retorna o valor pela chave, ou null.
  get(key) {
    const indice = this.hash(key)
    const bucket = this.buckets[indice]
    if (!bucket) {
      return null
    }
    // Procura no array (cadeia) dentro do bucket
    for (const [k, v] of bucket) {
      if (k === key) {
        return v
      }
    }
    return null
  }

  // 4. has(key)
  // Verifica se a chave existe (true/false).
  has(key) {
    const indice = this.hash(key)
    const bucket = this.buckets[indice]
    if (!bucket) {
      return false
    }
    for (const [k] of bucket) {
      if (k === key) {
        return true
      }
    }
    return false
  }

  // 5. remove(key)
  // Remove a entrada pela chave (true/false).
  remove(key) {
    const indice = this.hash(key)
    const bucket = this.buckets[indice]
    if (!bucket) {
      return false
    }
    // Encontra e remove o par [key, value]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1) // Remove o item do array do bucket
        this.tamanho--
        return true
      }
    }
    return false;
  }
  // 6. length()
  // Retorna o número total de entradas.
  length() {
    return this.tamanho;
  }

  // 7. clear()
  // Limpa o mapa hash.
  clear() {
    this.buckets = new Array(this.capacidade).fill(null);
    this.tamanho = 0;
  }

  // 8. keys()
  // Retorna um array com todas as chaves.
  keys() {
    const arrayChaves = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [k] of bucket) {
          arrayChaves.push(k);
        }
      }
    }
    return arrayChaves;
  }

  // 10. entries()
  // Retorna um array de pares [chave, valor].
  entries() {
    const arrayEntradas = []
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const entrada of bucket) {
          arrayEntradas.push(entrada)
        }
      }
    }
    return arrayEntradas;
  }

  // MÉTODOS DE REDIMENSIONAMENTO INTERNO
  _verificarECrescer() {
    // Se (tamanho / capacidade) for maior que o fator de carga (0.75)
    if (this.tamanho / this.capacidade > FATOR_CARGA) {
      this._aumentarBuckets()
    }
  }
  _aumentarBuckets() {
    const entradasAntigas = this.entries() //Salva todas as entradas
    //Dobra a capacidade
    this.capacidade *= 2
    //Reinicializa os buckets com a nova capacidade
    this.buckets = new Array(this.capacidade).fill(null)
    this.tamanho = 0
    //insere todas as entradas salvas (Re-hashing)
    // O .set() recalcula o novo índice (hash) para cada item
    for (const [key, value] of entradasAntigas) {
      this.set(key, value); 
    }
  }
}

const teste = new HashMap()
console.log(`${teste.capacidade}`) //inicial 16
console.log(`${teste.length()}`) //inicial 0
//Popular até o limite
teste.set('apple', 'red')
teste.set('banana', 'amarelo')
teste.set('cenoura', 'laranja')
teste.set('ceu', 'azul')
teste.set('cachorro', 'marrom')
teste.set('elefante', 'cinza')
teste.set('sapo', 'verd')
teste.set('uva', 'roxa')
teste.set('chapeu', 'preto')
teste.set('sorvete', 'branco')
teste.set('gato', 'rosa')
teste.set('leao', 'dourado')
console.log(`${teste.length()}`) //agora 12 pois recebeu 12 valores
//Sobrescrever algo  (NÂO PODE MUDAR O TAMANHO)
teste.set('apple', 'green')
console.log(`${teste.get('apple')}`)
console.log(`${teste.length()}`)
//teste de grow (adicionar um 13 item faz com que 13/16 > 0.75)
teste.set('moon', 'silver')
console.log(`${teste.length()}`) //13 itens
console.log(`${teste.capacidade}`) //32 (16 * 2)
console.log(`${teste.has('cenoura')}`) //verificou se existe cenoura
console.log(`${teste.remove('banana')}`) //removeu banana
console.log(`${teste.length()}`) //verificou o tamanho 
