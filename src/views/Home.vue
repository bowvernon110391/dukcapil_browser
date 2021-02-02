<template>
  <v-container class="grey lighten-5">
    <!-- show skeleton when search is in progress -->
    <template v-if="searching">
      <skeleton />
    </template>

    <!-- either we got result or we got errors -->
    <template v-else>
      <!-- 1st time alert info -->
      <v-row>
        <v-col>
          <v-alert dismissible dense text type="success" v-show="!searchDirty">
            Hasil pencarian akan ditampilkan di bawah, untuk memulai pencarian,
            klik tombol <v-icon color="grey">mdi-magnify</v-icon>
          </v-alert>
        </v-col>
      </v-row>

      <!-- show pagination control for the top all the time -->
      <template v-if="searchResult.length > 0 && !isError">
        <!-- make a control to swipe left and right? -->
        <pagination-controls/>

        <!-- show something here -->
        <v-row>
          <v-col
            cols="12"
            md="3"
            v-for="person in searchResult"
            :key="person.NIK"
          >
            <name-card :value="person" />
          </v-col>
        </v-row>
        <!-- <pre>{{ searchResult }}</pre> -->
        <!-- show another pagination controls -->
        <pagination-controls/>
      </template>

      <template v-else-if="searchDirty">
        <!-- show alert of empty result? -->
        <v-alert type="info">
          Your search produced no result :/ 
          <v-btn
            v-if="searchPage > 1"
            color="secondary"
            @click="gotoPage(searchPage-1)"
            >
            Go Back
          </v-btn>
        </v-alert>
      </template>

      <!-- <v-row>
        <v-col>
          <v-btn color="green lighten-2" @click="setDirtyFlag(!searchDirty)">
            DirtyFlag: {{ searchDirty }}, flip it
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="red lighten-1" @click="pushError('error message #1')">
            Test error
          </v-btn>
        </v-col>
      </v-row>

      <v-divider />

      <pre>{{ $store.state.searchParams }}</pre> -->
    </template>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import NameCard from "../components/NameCard.vue";
import Skeleton from '../components/Skeleton.vue';
import PaginationControls from '../components/PaginationControls.vue';

export default {
  methods: {
    ...mapMutations(["setDirtyFlag", "pushError", "gotoPage"]),
  },
  computed: {
    ...mapState(["searchDirty", "searching", "searchResult", "searchPage"]),
    ...mapGetters(["isError"]),
  },
  components: {
    NameCard,
    Skeleton,
    PaginationControls
  },
};
</script>