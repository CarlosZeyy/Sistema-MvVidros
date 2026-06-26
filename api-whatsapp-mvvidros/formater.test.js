const { formatNumber } = require("./formater");

test("Deve adicionar o DDD 11 se o usuário digitar apenas 9 números", () => {
  expect(formatNumber("999999999")).toBe("5511999999999@c.us");
});

test('Não deve duplicar o "55" se o usuário digitar o código do país', () => {
  expect(formatNumber("5511999999999")).toBe("5511999999999@c.us");
});

test("Deve remover os traços e espaços do número", () => {
  expect(formatNumber("(11) 99999-9999")).toBe("5511999999999@c.us");
});
