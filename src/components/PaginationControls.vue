<template>
    <v-row justify="center">
        <v-col cols="4">
            <div style="text-align: center">Page : {{ searchPage }}</div>
        </v-col>
        <v-col cols="4">
            <v-btn block :disabled="!canGoBack" @click="goBackward" color="primary">
                &lt;&lt;
            </v-btn>
        </v-col>
        <v-col cols="4">
            <v-btn block :disabled="!canGoForward" @click="goForward" color="primary">
                &gt;&gt;
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['searchPage', 'searchResult']),

        canGoBack() {
            return this.searchPage > 1
        },

        canGoForward() {
            return this.searchResult.length >= 10
        }
    },

    methods: {
        ...mapMutations(['gotoPage']),

        goForward() {
            if (this.canGoForward) {
                this.gotoPage(this.searchPage+1)
            }
        },

        goBackward() {
            if (this.canGoBack) {
                this.gotoPage(this.searchPage-1)
            }
        }
    }
}
</script>