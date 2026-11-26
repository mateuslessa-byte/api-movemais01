import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import app from "../src/app.js";
let server;
let baseUrl;
before(() => {
    server = app.listen(0);
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    baseUrl = `http://127.0.0.1:${address.port}`;
});
after(() => new Promise((resolve, reject) => {
    server.close((error) => {
        if (error) {
            reject(error);
            return;
        }
        resolve();
    });
}));
test("GET / retorna status 200", async () => {
    const response = await fetch(baseUrl);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "Codificação BackEnd");
});
test("GET /livros/:id inválido retorna status 400", async () => {
    const response = await fetch(`${baseUrl}/livros/id-invalido`);
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
        mensagem: "ID de livro inválido.",
    });
});
//# sourceMappingURL=app.test.js.map