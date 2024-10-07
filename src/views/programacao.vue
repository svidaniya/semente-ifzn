<template>
    <div id="programacao">
        <div class="scroller">
            <section class="vh-100" id="programacao-main">
                <navbar highlight='4' :fixed='true'></navbar>
                <evento 
                dia="26"
                />
            </section>
            <section class="vh-100">
                <evento 
                dia="26"
                :invertido="true"
                />
            </section>
        </div>

    </div>
</template>

<style>
    #programacao{
        width: 100%;
        #programacao-main{
            width: 100%;
            display: flex;
            flex-direction: column; 
            align-items: center;
        }
    }
</style>

<script> 
import navbar from '../components/navbar.vue'
import evento from '../components/evento.vue'
export default {
    name: 'programacao',
    components: {
        navbar,
        evento
    }
}
</script>