const status = {
    ZERADO: 'zerado',
    INICIADO: 'iniciado',
    PAUSADO: 'pausado',
    PARADO: 'parado'
}

let _temporizadorId = null;
let _intervalo = 1000;
let _dataHoraAtual = null;
let _dataHoraInicial = null;
let _dataHoraFinal = null;
let _cronometroStatus = null;

//Exposições
function CarregamentoPagina(){
    ZerarCronometro();
}

function IniciarCronometro(){   
    if(_cronometroStatus == status.PAUSADO){
        ContinuarCronometro();      
    }
    if(_cronometroStatus != status.INICIADO && _cronometroStatus != status.PAUSADO){
        IniciarNovoCronometro();
    }
}

function PausarCronometro(){
    if(_cronometroStatus == status.INICIADO){
        AlterarStatus(status.PAUSADO);
        clearInterval(_temporizadorId);
        PreencherLabels();
    }
}

function PararCronometro(){
    if(_cronometroStatus == status.INICIADO || _cronometroStatus == status.PAUSADO){
        AlterarStatus(status.PARADO);
        _dataHoraFinal = _dataHoraAtual;
        clearInterval(_temporizadorId);
        PreencherLabels();
    }
}

function ZerarCronometro(){
    AlterarStatus(status.ZERADO);
    _dataHoraAtual = "0000-00-00 00:00:00";
    _dataHoraInicial = "0000-00-00 00:00:00";
    _dataHoraFinal = "0000-00-00 00:00:00";

    PreencherLabels();
}

// Métodos Auxiliares
function ContinuarCronometro(){
    AlterarStatus(status.INICIADO);
    _temporizadorId = setInterval(ObterNovaDataHora, _intervalo);
}

function IniciarNovoCronometro(dataHora){
    ZerarCronometro();
    
    if(dataHora != undefined && dataHora != null)
        _dataHoraAtual = new Date(dataHora);
    else
        _dataHoraAtual = DataHoraAtual();
    
    _dataHoraInicial = _dataHoraAtual;  

    AlterarStatus(status.INICIADO);
    _temporizadorId = setInterval(ObterNovaDataHora, _intervalo);
}

function AlterarStatus(statusCronometro){
    _cronometroStatus = statusCronometro;
}

function ObterNovaDataHora(){
    IncrementarDataHoraAual();
    PreencherLabels();
}

function IncrementarDataHoraAual(){
    let novaDataHora = new Date(_dataHoraAtual);
    novaDataHora = new Date(novaDataHora.getTime() + _intervalo);
    _dataHoraAtual = novaDataHora;
}

function PreencherLabels(){
    let cronometroData = document.getElementById("cronometroData");
    let cronometroHora = document.getElementById("cronometroHora");
    let datahoraInicio = document.getElementById("datahoraInicio");
    let datahoraFim = document.getElementById("datahoraFim");  
    let statusCronometro = document.getElementById("status");

    cronometroData.innerHTML = ObterDataFormatada(_dataHoraAtual);
    cronometroHora.innerHTML = ObterHoraFormatada(_dataHoraAtual);
    datahoraInicio.innerHTML = ObterDataHoraFormatada(_dataHoraInicial);
    datahoraFim.innerHTML = ObterDataHoraFormatada(_dataHoraFinal);
    statusCronometro.innerHTML = _cronometroStatus;
}

function DataHoraAtual(){
    let dataHoraAtual = new Date();
    let ano = dataHoraAtual.getFullYear();
    let mes = pad(dataHoraAtual.getMonth()+1);
    let dia = pad(dataHoraAtual.getDate());
    let hora = pad(dataHoraAtual.getHours());
    let minuto = pad(dataHoraAtual.getMinutes());
    let segundo = pad(dataHoraAtual.getSeconds());

    return ano + "-" + mes + "-" + dia + " " + hora + ":" + minuto + ":" + segundo;
}

function ObterDataHoraFormatada(dataHora){
    return ObterDataFormatada(dataHora) + " " + ObterHoraFormatada(dataHora);
}

function ObterDataFormatada(dataHora){
    let data = new Date(dataHora);
    let ano = data.getFullYear();
    let mes = pad(data.getMonth()+1);
    let dia = pad(data.getDate());

    if(isNaN(ano)) 
        return "0000-00-00";

    return ano + "-" + mes + "-" + dia;
}

function ObterHoraFormatada(dataHora){
    let data = new Date(dataHora);
    let hora = pad(data.getHours());
    let minuto = pad(data.getMinutes());
    let segundo = pad(data.getSeconds());

    if(isNaN(hora)) 
        return "00:00:00";
    return hora + ":" + minuto + ":" + segundo;
}

function pad(n) {
    return n<10 ? '0'+n : n;
}