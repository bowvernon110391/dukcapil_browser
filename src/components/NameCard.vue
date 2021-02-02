<template>
    <v-card
        v-on="$listeners"
        v-bind="$attrs"
        :loading="!imgLoaded"
    >
        <!-- show anonymous image while loading? -->
        <v-img
            max-height="300"
            :src="usableImage"
            :class="{ 'clickable' : imgData }"
            @click="handleClick"
        />
        <v-card-title>
            {{ value.NAMA_LGKP }}
        </v-card-title>
        <v-card-subtitle>
            NIK : {{ value.NIK }}
        </v-card-subtitle>
        <v-card-text>
            <!-- Alamat -->
            <v-row>
                <v-col>
                    <v-icon>mdi-home</v-icon>
                    {{ value.ALAMAT }}
                </v-col>
            </v-row>
            <!-- TTL -->
            <v-row>
                <v-col>
                    <v-icon>mdi-calendar</v-icon>
                    {{ value.TMPT_LHR }}, {{ value.TGL_LHR }}
                </v-col>
            </v-row>
        </v-card-text>
        <!-- actions -->
        <v-divider></v-divider>
        <v-card-actions>
            <!-- get NIK -->
            <v-btn
                color="red lighten-2"
                text
            >
            Get NIK
            </v-btn>
            <!-- get KK -->
            <v-btn
                color="teal"
                text
            >
            Get KK
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

const anonPic = require('../assets/anon.png')

export default {
    inheritAttrs: false,
    props: {
        value: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapGetters(['api']),

        usableImage() {
            if (!this.imgData) return anonPic
            return `data:image/png;base64,${this.imgData}`
        },

        clickable() {
            return this.imgData !== null
        }
    },

    data() {
        return {
            imgData: null,
            imgLoaded: false
        }
    },

    methods: {
        ...mapMutations(['pushError', 'setOverlayImgData']),

        handleClick() {
            if (this.clickable) {
                // alert("You just click: " + this.value.NAMA_LGKP)
                this.setOverlayImgData(this.usableImage)
            }
        }
    },

    mounted() {
        // load image, and stops loading?
        /* setTimeout(() => {
            this.imgLoaded = true
        }, 2000) */
        this.api.get('', {
            params: {
                methodName: 'get-foto',
                params: {
                    nik: this.value.NIK
                }
            }
        })
        .then(e => {
            this.imgLoaded = true
            console.log('got image data: ', e.data)

            // the first array dot FOTO is the image data
            if (e.data[0].FOTO) {
                console.log('This one has Image: ', e.data[0].FOTO)
                this.imgData = e.data[0].FOTO
            }
        })
        .catch(e => {
            this.imgLoaded = true
            this.pushError(e.message)
        })
    }
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>