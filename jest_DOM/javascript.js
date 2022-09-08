const partidos = new Map(); // todo crear coleccion para manejarlo en memoria
var numerolinea = 0; 
function addMatch(equipoLocal, equipoVisitante){ 
    if (nombresValidos(equipoLocal,equipoVisitante)){        
        // todo comprobar par nombre equipos no repetidos
        numerolinea++;
        let html = '<tr id="Partido_' + numerolinea + '">';
        html += '<th scope="row" id="Id_' + numerolinea + '">' + numerolinea + '</th>';
        html += '<td id="Local_' + numerolinea + '">' + equipoLocal+ '</td><td id="ResultadoLocal_' + numerolinea + '">0</td>';
        html += '<td id="Visitante_' + numerolinea + '">' + equipoVisitante + '</td><td id="ResultadoVisitante_' + numerolinea + '">0</td>';
        html += '<td><input type="date" id="Fecha_' + numerolinea + '" /></td>';
        html += '<td><button type="button" class="btn btn-secondary" id="FinPartido_' + numerolinea + '" onclick="finPartido(this.id);">Fin Partido</button></td>';
        html += '</tr>';
        $('#TablaResultados').find('tbody').append(html);
        document.getElementById('Fecha_' + numerolinea).valueAsDate = new Date();        
    }    
}

function nuevoResultadoMayorOIgual(nuevoResultado_Local,nuevoResultado_Visitante){
    const anteriorResultado_Local = "";
}

function finPartido(identificador){
    if (identificadorValido(identificador)){
        var esteIdentificador = identificador.split("_");
        $("#Partido_" + esteIdentificador[1]).hide();
        partidos.set("NumeroLinea" + esteIdentificador[1], esteIdentificador[1]);
        partidos.set("Equipo_Local" + esteIdentificador[1], $("#Local_" + esteIdentificador[1]).text());
        partidos.set("Resultado_Local" + esteIdentificador[1], $("#ResultadoLocal_" + esteIdentificador[1]).text());
        partidos.set("Equipo_Visitante" + esteIdentificador[1], $("#Visitante_" + esteIdentificador[1]).text());
        partidos.set("Resultado_Visitante" + esteIdentificador[1], $("#ResultadoVisitante_" + esteIdentificador[1]).text());
        partidos.set("Fecha" + esteIdentificador[1], $("#Fecha_" + esteIdentificador[1]).val());
    }
}

function add1Local(idPartido){
    if (tipoNumber(idPartido)){
        let resultado = Number(document.getElementById('ResultadoLocal_' + idPartido).textContent);
        if (resultadoNoVacio(resultado) && tipoNumber(resultado)){
            resultado++;
            document.getElementById('ResultadoLocal_' + idPartido).textContent = resultado;
        }
    }
}

function add1Visitante(idPartido){
    if (tipoNumber(idPartido)){
        let resultado = Number(document.getElementById('ResultadoVisitante_' + idPartido).textContent);
        if (resultadoNoVacio(resultado) && tipoNumber(resultado)){
            resultado++;
            document.getElementById('ResultadoVisitante_' + idPartido).textContent = resultado;
        }
    }
}

function actualizarMarcadores(idPartido,marcadorLocal,marcadorVisitante){    
    if (nombresValidos(equipoLocal,equipoVisitante) && tipoNumber(idPartido)){
        if (resultadoNoVacio(marcadorLocal) && resultadoNoVacio(marcadorVisitante)){
            document.getElementById('ResultadoLocal_' + idPartido).textContent = marcadorLocal;
            document.getElementById('ResultadoVisitante_' + idPartido).textContent = marcadorVisitante;
        }
    }
}

function mostrarResultados(){
    $("#ZonaResultados").html("");
    var html = "<hr><br><table class='table table-dark table-striped'>";
    html += "<thead>";
    html += "<tr>";
    html += "<th scope='col'>#</th>";
    html += "<th scope='col'>CASA</th>";
    html += "<th scope='col'>RESULTADO</th>";
    html += "<th scope='col'>VISITANTE</th>";
    html += "<th scope='col'>RESULTADO</th>";
    html += "<th scope='col'>FECHA</th>";
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    partidos.forEach((value, key) => {
        console.log(`${key} = ${value}`);
        html += "<td id=" + key + ">"+value+"</td>";
        if (key.includes("Fecha")){
            html += "</tr>";
        }
    });
    html +="</table>";
    $("#ZonaResultados").append(html);

    // partidos.sort((a,b)=>{
    //     return new Date(b.Fecha) - new Date(a.Fecha); // <= ordenar por fecha
    // })
}

function prueba(num){
    return num;
}

function nombresValidos(local,visitante){
    if (local != "" && visitante!= ""){  
        return true;    
    }else{
        return false;
    }
}

function tipoNumber(x){
    if (typeof(x) === 'number'){
        return true;
    }else{
        return false;
    }
}

function resultadoNoVacio(resultado){
    if (resultado!=""){
        return true;
    }else{
        return false;
    }
}

function identificadorValido(identificador){
    if (identificador.match("FinPartido_")){
        return true;
    }else{
        return false;
    }
}

module.exports = prueba,nombresValidos,tipoNumber,resultadoNoVacio, identificadorValido;