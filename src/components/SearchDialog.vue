<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="600"
    scrollable
    v-model="dialogShown"
  >
    <template #default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title> Parameter Pencarian </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark icon @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- <v-card-title>Parameter pencarian</v-card-title> -->
        <v-divider></v-divider>

        <v-card-text>
          <!-- Put something here -->
          <search-form ref="frmSearch" v-model="searchParams" />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn color="secondary" @click="reset"> Reset </v-btn>
          <v-btn
            color="primary"
            :disabled="!paramsValid"
            @click="close"
          >
            <v-icon>mdi-magnify</v-icon>
            Search
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import SearchForm from "./SearchForm";

export default {
  components: {
    SearchForm,
  },
  methods: {
    ...mapMutations(["closeDialog", "openDialog", "resetSearchParams"]),

    reset() {
      // reset search params?
      this.resetSearchParams();
      // reset form too? focus etc
      setTimeout(this.$refs.frmSearch.reset(), 400);
    },

    close() {
        this.closeDialog()
        this.$emit('submit');
    }
  },
  computed: {
    ...mapGetters(["getDialogOpenState"]),
    dialogShown: {
      get() {
        return this.getDialogOpenState;
      },

      set(value) {
        if (!value) {
          this.closeDialog();
        } else {
          this.openDialog();
        }
      },
    },

    searchParams: {
      get() {
        return this.$store.state.searchParams;
      },

      set(v) {
        this.$store.commit("setSearchParams", v);
      },
    },

    paramsValid() {
      for (const [key, value] of Object.entries(this.searchParams)) {
        // console.log(`${key} = ${value}`)
        if (value.length > 0) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>