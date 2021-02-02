<template>
  <v-fade-transition>
    <v-overlay 
        :value="$store.state.overlayImgData !== null"
        @click.native="$store.commit('setOverlayImgData', null)"
        color="black"
        :opacity="0.85"
        >
      <v-img
        :src="$store.state.overlayImgData"
        min-height="400"
        max-height="600"
      />
    </v-overlay>
  </v-fade-transition>
</template>