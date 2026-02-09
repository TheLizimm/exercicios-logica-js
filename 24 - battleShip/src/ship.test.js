import Ship from './ship'

describe('Ship Factory/class' , () => {
    test('deve criar um navio com as propriedades corretas', () => {
        const ship = new Ship(3)
        expect(ship.length).toBe(3)
        expect(ship.hits).toBe(0)
        expect(ship.isSunk()).toBe(false)
    })
    
    test('o método hit() deve incrementar o numero de acertos', () => {
        const ship = new Ship(3)
        ship.hit()
        expect(ship.hits).toBe(1)
        ship.hit()
        expect(ship.hits).toBe(2)
    })
    
    test('isSunk() deve retornar true se os acertos forem iguais ao comprimento', () => {
        const ship = new Ship(2)
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(true)
    })
    
    test('isSunk() deve retornar false se o navio estiver totalmente atingido', () => {
        const ship = new Ship(4)
        ship.hit()
        expect(ship.isSunk()).toBe(false)
    })
})