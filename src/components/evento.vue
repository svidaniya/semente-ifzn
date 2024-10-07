<template>
    <div :style="{backgroundColor: invertido ? '#3DBB99' : '#1F6363'}"  id="evento">
        <div class="vh-100" id="evento-conteudo">
            <div id="evento-datas">
                <h1 :style="{color: invertido ? '#3DBB99' : '#1F6363', backgroundColor: invertido ? '#1F6363' : '#3DBB99'}" class="evento-dia">{{dia}}</h1>
                <h2 class="evento-mes">{{mes}}</h2>
                <p class="evento-hora">{{hora}}</p>
                <p class="evento-organizador">{{organizador}}</p>
                <p class="evento-local">{{local}}</p>
            </div>
            <div :style="{backgroundColor: invertido ? '#1F6363' : '#3DBB99'}" id="evento-separador"></div>
            <div id="evento-infos">
                <div id="evento-titulo-subtitulo">
                    <h1 class="evento-titulo">{{titulo}}</h1>
                    <h5 class="evento-subtitulo">{{subtitulo}}</h5>
                </div>
                <div id="evento-lista-informacoes">
                    <ul class="evento-informacoes">
                        <li>Hórario - {{horario[0]}} as {{horario[1]}}</li>
                        <li v-if="informacoes" v-for="informacao in informacoes" :key="informacao">{{informacao}}</li>
                    </ul>
                </div>
    
    
            </div>
    
        </div>
    </div>
    
</template>

<style> 
    #evento{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        #evento-conteudo{
            
            font-family: 'Lato';
            width: 80%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
            #evento-datas{
                display: flex;
                flex-direction: column;
                .evento-dia{
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                    padding: 5px 50px;
                    border-radius: 25px;
                    font-size: 65px;
                    font-weight: bold;
                    margin-bottom: 25px;
                }
                .evento-mes{
                    text-align: center;
                    font-size: 30px;
                    padding: 5px;
                    font-weight: bold;
                    color: #3DBB99;
                    background-color: #FBEE8A;
                    border-radius: 25px;
                    margin-bottom: 25px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                }
                .evento-hora, .evento-organizador, .evento-local{
                    color: white;
                    text-align: right;
    
                }
                .evento-hora{
                    font-size: 35px;
                    font-weight: bold;
                }
                .evento-organizador, .evento-local{
                    font-weight: 300;
                    font-size: 20px;
                }
            }
            #evento-separador{
                width: 6px;
                height: 200px;
            }
            #evento-infos{
                color: white;
                display: flex;
                flex-direction: column;
                #evento-titulo-subtitulo{
                    display: flex;
                    flex-direction: column;
                    .evento-titulo{
                        font-weight: bold;
                        font-size: 30px;
                    }
                    .evento-subtitulo{
                        font-size: 30px;
                        margin-bottom: 25px;
                    }
                }
            }
        }
    }
    
</style>

<script>
export default {
    name: 'evento',
    props: {
        dia: {
            type: String,
            default: 'dia'
        },
        mes: {
            type: String,
            default: 'mês'
        },
        hora: {
            type: String,
            default: '00:00'
        },
        organizador: {
            type: String,
            default: 'Organizador'
        },
        local: {
            type: String,
            default: 'Local'
        },
        horario: {
            type: Array,
            default: function() {
                return ['00:00', '00:00']
            }
        },
        titulo: {
            type: String,
            default: 'Título do evento'
        },
        subtitulo: {
            type: String,
            default: 'Subtítulo do evento'
        },
        informacoes: {
            type: Array,
            default: undefined
        },
        invertido: {
            type: Boolean,
            default: false
        }
    }
}
</script>
