<template>
  <v-form>
    <v-row>
      <!-- nama -->
      <v-col cols="12" md="6">
        <v-text-field ref="fieldNama" label="Nama" required clearable v-model.lazy.trim="value.nama"/>
      </v-col>
      <!-- Nama Ibu -->
      <v-col cols="12" md="6">
        <v-text-field label="Nama Ibu" clearable v-model.lazy.trim="value.namaIbu"/>
      </v-col>
    </v-row>

    <v-row>
      <!-- Tempat lahir -->
      <v-col cols="12" md="3">
        <v-text-field type="text" label="Kota Lahir" clearable v-model.lazy.trim="value.tempatLahir"/>
      </v-col>
      <!-- Tanggal lahir -->
      <v-col cols="12" md="4">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              clearable
              v-model="value.tglLahir"
              label="Tanggal Lahir"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="value.tglLahir" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
      <!-- NIP -->
      <!-- <v-col cols="12" md="5">
        <v-text-field type="text" label="NIP" clearable v-model.lazy.trim="value.nip"/>
      </v-col> -->
    </v-row>
    <v-row>
        <!-- KTP -->
        <v-col
          cols="12"
          md="6">
          <v-text-field
            label="NIK (KTP)"
            clearable
            v-model.lazy.trim="value.nik"
            />
        </v-col>
        <!-- KK -->
        <v-col
          cols="12"
          md="6">
          <v-text-field
            label="Nomor KK"
            clearable
            v-model.lazy.trim="value.noKK"
            />
        </v-col>
    </v-row>
    <v-row>
        <!-- provinsi -->
        <v-col
          cols="12"
          md="3">
          <v-text-field
            label="Provinsi"
            clearable
            v-model.lazy.trim="value.provinsi"
            />
        </v-col>
        <!-- Kabupaten -->
        <v-col
          cols="12"
          md="3">
          <v-text-field
            label="Kabupaten"
            clearable
            v-model.lazy.trim="value.kabupaten"
            />
        </v-col>
        <!-- Kecamatan -->
        <v-col
          cols="12"
          md="3">
          <v-text-field
            label="Kecamatan"
            clearable
            v-model.lazy.trim="value.kecamatan"
            />
        </v-col>
        <!-- Kelurahan -->
        <v-col
          cols="12"
          md="3">
          <v-text-field
            label="Kelurahan"
            clearable
            v-model.lazy.trim="value.kelurahan"
            />
        </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menu2: false,
      date: null//new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    reset() {
      this.$refs.fieldNama.$el.focus()
    }
  }
};
</script>