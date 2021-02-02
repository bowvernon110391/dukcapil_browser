<template>
  <v-app>
    <v-app-bar app color="#0c00c0" dark>
      <!-- navbar icon -->
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <!-- title -->
      <v-toolbar-title>Dukcapil Browser</v-toolbar-title>
      <!-- space a lil -->
      <v-spacer></v-spacer>
      <!-- search button -->
      <v-btn icon @click="getDialogOpenState ? closeDialog() : openDialog()">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-5">
      <v-container>
        <v-alert v-model="errorShown" dismissible type="error">
          <div v-for="e in errors" :key="e">
            {{ e }}
          </div>
        </v-alert>
      </v-container>

      <!-- other components here -->
      <router-view />

      <!-- search dialog (modal) -->
      <search-dialog @submit="doSearch" />
    </v-main>

    <!-- overlay here? -->
    <overlay-photo/>
    
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import SearchDialog from "./components/SearchDialog.vue";
import OverlayPhoto from "./components/OverlayPhoto.vue";

export default {
  name: "App",

  components: {
    SearchDialog,
    OverlayPhoto
  },

  computed: {
    ...mapGetters(["getDialogOpenState", "isError", "api"]),
    ...mapState(["errors", "searchParams", "searchPage"]),

    errorShown: {
      get() {
        return this.isError;
      },
      set(v) {
        if (!v) {
          this.resetErrors();
        }
      },
    },
  },

  methods: {
    ...mapMutations([
      "closeDialog",
      "openDialog",
      "setSearchState",
      "setSearchResult",
      "setDirtyFlag",
      "setErrors",
      "resetErrors",
      "gotoPage",
    ]),

    doSearch(resumeSearch) {
      this.setSearchResult([]);
      this.setSearchState(true);
      this.setDirtyFlag(true);
      this.resetErrors();

      // if resumeSearch unset, reset page number
      if (typeof resumeSearch === "undefined") {
        this.gotoPage(1);
      }

      /* setTimeout(() => {
        this.setSearchState(false);
      }, 5000); */
      console.log();
      this.api
        .get("", {
          params: {
            methodName: "find-nik",
            params: {
              ...this.searchParams,
              page: this.searchPage,
            },
          },
        })
        .then((e) => {
          this.setSearchState(false);
          // if the first result is null, dismiss the rest
          if (e.data[0].NIK === null) {
            console.log("got empty result")
            return
          }
          this.setSearchResult(e.data);
          // scroll to top
          window.scrollTo(0,0)
          console.log("got data:", e.data);
        })
        .catch((e) => {
          this.setSearchState(false);
          console.log("error:", e);
        });
    },
  },

  data: () => ({
    //
  }),

  watch: {
    searchPage: {
      handler(newVal, oldVal) {
        console.log("Page moved to: ", newVal);
        if (!this.searching) {
          this.doSearch(true)
        }
      },
    },
  },
};
</script>
