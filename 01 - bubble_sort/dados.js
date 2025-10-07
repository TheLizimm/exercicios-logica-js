// Arrays para teste do Bubble Sort
// Cada caso de teste contém um array não ordenado

const casosDeTeste = [
    {
        nome: "Array Pequeno (5 elementos)",
        array: [64, 34, 25, 12, 22],
        descricao: "Caso básico para testar a lógica fundamental"
    },
    {
        nome: "Array Médio (8 elementos)",
        array: [89, 45, 68, 90, 29, 34, 17, 55],
        descricao: "Teste com mais elementos"
    },
    {
        nome: "Array Quase Ordenado",
        array: [10, 20, 30, 25, 40, 50],
        descricao: "Verifica eficiência com array parcialmente ordenado"
    },
    {
        nome: "Array Ordem Inversa",
        array: [100, 90, 80, 70, 60, 50],
        descricao: "Pior caso - totalmente invertido"
    },
    {
        nome: "Array com Duplicatas",
        array: [5, 2, 8, 2, 9, 1, 5, 5],
        descricao: "Testa comportamento com valores repetidos"
    },
    {
        nome: "Array Já Ordenado",
        array: [1, 2, 3, 4, 5, 6, 7],
        descricao: "Melhor caso - verifica otimização"
    }
];