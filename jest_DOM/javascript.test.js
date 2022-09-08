import puppeteer from "puppeteer";
import { pageExtend } from 'puppeteer-jquery';
import prueba from "./javascript";
import nombresValidos from "./javascript";
import tipoNumber from "./javascript";
import resultadoNoVacio from "./javascript";
import identificadorValido from "./javascript";


describe("jest", () => {
    test("test", () => {
        expect(true).toBe(true);
    });
    
    test("should print 1 if receive 1", () => {
        const expected = 1;
        const result = prueba(1);
        expect(expected).toBe(result);
    });

    test("nombre_equipo no vacio", () =>{
        const equipoLocal = "";
        const equipoVisitante = "";
        const result = nombresValidos(equipoLocal, equipoVisitante);
        expect(result).toBeFalsy();
    });

    test("tipo numero", () =>{
        const resultado = "";        
        const result = tipoNumber(resultado);
        expect(result).toBeFalsy();
    });

    test("resultado no vacio", () =>{
        const resultado = "";        
        const result = resultadoNoVacio(resultado);
        expect(result).toBeFalsy();
    });

    test("identificador valido", () => {
        const identificador = "FinPartido_";
        const result = identificadorValido(identificador);
        expect(result).toContain('FinPartido_');
    });   

});

describe("navegador(puppeteer)", () => {
    test('insertar nuevo par equipo', async () => {
        const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
        });
        let page_blank = await browser.newPage();
        let page = pageExtend(page_blank);
        await page.goto('file:////.....index.html'); // Ruta absoluta al archivo index.html
        await page.click('input#Equipo_Casa');
        await page.type('input#Equipo_Casa', 'SPAIN');
        await page.click('input#Equipo_Visitante');
        await page.type('input#Equipo_Visitante', 'BRAZIL');
        await page.click('#BotonAddMatch');
        await page.jQuery('TablaResultados').append(`"<tr id="Partido_1"><th scope="row" id="Id_1">1</th><td id="Local_1">SPAIN</td><td id="ResultadoLocal_1">0</td><td id="Visitante_1">BRAZIL</td><td id="ResultadoVisitante_1">0</td><td><input type="date" id="Fecha_1" /></td><td><button type="button" class="btn btn-secondary" id="FinPartido_1" onclick="finPartido(this.id);">Fin Partido</button></td></tr>"`);
        const data = await page.$$eval('table tr td', tds => tds.map((td) => {
            return td.innerText + ",";
        }));
        console.log(data);
        let valor = await page.jQuery('#Partido_1').text();
        console.log(valor);        
        // let text = await page.jQuery('body i:last')
        //     .closest('div')
        //     .find('h3')
        //     .css('color', 'yellow')
        //     .parent()
        //     .find(':last')
        //     .text();
        expect(valor).toBe('1SPAIN0BRAZIL0Fin Partido');
    }, 20000)

    test("nombre_equipo no repetido", async () => {
        const browser = await puppeteer.launch({
            headless: true,
            // slowMo: 80,
            // args: ['--window-size=1920,1080']
            });
            let page_blank = await browser.newPage();
            let page = pageExtend(page_blank);
            await page.goto('file:////.....index.html'); // Ruta absoluta al archivo index.html
            await page.click('input#Equipo_Casa');
            await page.type('input#Equipo_Casa', 'GERMANY');
            await page.click('input#Equipo_Visitante');
            await page.type('input#Equipo_Visitante', 'FRANCE');
            await page.click('#BotonAddMatch');
            await page.jQuery('TablaResultados').append(`"<tr id="Partido_1"><th scope="row" id="Id_1">1</th><td id="Local_1">ESPAÑA</td><td id="ResultadoLocal_1">0</td><td id="Visitante_1">ALEMANIA</td><td id="ResultadoVisitante_1">0</td><td><input type="date" id="Fecha_1" /></td><td><button type="button" class="btn btn-secondary" id="FinPartido_1" onclick="finPartido(this.id);">Fin Partido</button></td></tr>"`);
            const data = await page.$$eval('TablaResultados tr td', tds => tds.map((td) => {
                console.log(td.innerText);
                return td.innerText;
            }));
            console.log(data);
    }, 20000); 

    test.todo("nuevo resultado mayor o igual");
    
})
