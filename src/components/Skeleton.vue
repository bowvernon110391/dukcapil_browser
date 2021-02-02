<template>
    <v-row>
        <v-col
            cols="12"
            md="3"
            v-for="i in new Array(10)" :key="i"
        >
            <v-skeleton-loader
                type="card"
            >
            </v-skeleton-loader>
        </v-col>
    </v-row>
</template>