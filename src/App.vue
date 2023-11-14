<template>
  <div
    id="main"
    class="theme"
    :class="{ dark: darkMode, light: !darkMode }">
    <header :class="{ lightBB: !darkMode }">
      <h1>Shopping list</h1>
      <button
        class="login"
        v-if="userRef == null"
        @click="showLogin = true">
        <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
      </button>
      <button
        v-else
        @click="logout">
        <font-awesome-icon icon="fa-solid fa-door-open" />
      </button>
    </header>
    <section id="add-sec">
      <form
        v-if="userRef != null"
        @submit.prevent="addSupa"
        id="add-item">
        <input
          type="text"
          v-model="addText" />
        <button id="add">
          <font-awesome-icon icon="fa-solid fa-cart-plus" />
        </button>
        <br />
      </form>
    </section>
    <h4
      v-if="addError"
      class="container error">
      {{ addError }}
    </h4>
    <section
      id="list"
      class="">
      <div
        class="item"
        v-for="item in items"
        :key="item.id">
        <p>{{ item.item }}</p>
        <button
          v-if="userRef != null"
          @click="delSupa(item.id)">
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </button>
      </div>
    </section>
    <div class="popups">
      <LoginPop
        v-if="showLogin"
        @close="closeLog" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { supabase } from './supabase'
  import LoginPop from './components/LoginPop.vue'

  const darkMode = ref(true),
    addText = ref(''),
    addError = ref(null),
    showLogin = ref(false),
    userRef = ref(null),
    items = ref([]),
    handelDelete = id => {
      items.value = items.value.filter(function (obj) {
        return obj.id !== id
      })
    },
    fetchList = async () => {
      const { data, error } = await supabase.from('shoppingList').select('*')
      items.value = data
    },
    addSupa = async () => {
      if (!addText.value) {
        return
      }
      const { data, error } = await supabase
        .from('shoppingList')
        .insert([{ item: addText.value }])
        .select()

      if (error) {
        if (error.code === '42501') {
          addError.value = 'login required'
          return
        } else {
          addError.value = error
          return
        }
      }
      if (data) {
        addText.value = ''
        fetchList()
      }
    },
    delSupa = async id => {
      const { error } = await supabase
        .from('shoppingList')
        .delete()
        .eq('id', id)
      fetchList()
    },
    getUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      userRef.value = data.session
    },
    logout = async () => {
      let { error } = await supabase.auth.signOut()
      getUser()
    },
    closeLog = () => {
      showLogin.value = false
      getUser()
    }

  fetchList()
  getUser()
</script>

<style lang="scss">
  @import './assets/colors';

  #main {
    height: 100%;
    width: 100%;
    header {
      height: 10%;
      // grid-area: head;

      background: var(--TX-Color);
      color: var(--BG-Color);
      display: flex;
      align-items: center;
      button {
        border: solid 1px var(--BG-Color);
        border-radius: 50%;
        padding: 0.75em;
        margin-left: auto;
        margin-right: 0.5em;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
        &:active.login {
          background: $gold;
        }
        svg {
          fill: var(--BG-Color);
        }
      }
      h1 {
        margin-left: 0.5em;
      }
      &.lightBB {
        border-bottom: solid 0.5px;
        border-color: var(--TX-Color);
      }
    }
    #add-sec {
      height: 10%;

      #add-item {
        height: 3em;
        width: 600px;
        max-width: 75%;
        margin: 1em auto;
        border: 1px solid;
        border-radius: 5em;
        display: flex;

        input {
          height: 100%;
          width: 75%;
          border-right: 1px solid;
          padding-left: 1em;
        }
        #add {
          width: 25%;
          border: none;
          padding: 0;
          flex-direction: row;
          text-align: center;
          border-top-right-radius: 5em;
          border-bottom-right-radius: 5em;
          svg {
            fill: var(--TX-Color);
          }
          &:active {
            background: $success;
          }
        }
      }
    }

    #list {
      height: 75%;
      width: 400px;
      max-width: 75%;
      display: flex;
      align-items: center;
      justify-content: center;
      // flex-wrap: wrap;
      flex-direction: column;
      overflow: auto;
      margin: auto;
      // padding-bottom: auto;
      .item {
        min-height: 3em;
        width: 50%;
        min-width: 300px;
        border: solid 1px;
        border-radius: 0.2em;
        display: flex;
        margin: 1px 0;
        p {
          height: 100%;
          width: 75%;
          padding-left: 1em;
          display: flex;
          align-items: center;
        }
        button {
          // width: 50px;
          width: 25%;
          height: 100%;
          border: none;
          border-left: solid 1px;
          margin-left: auto;
          padding: 0;
          flex-direction: row;
          text-align: center;
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
          border-top-right-radius: 0.2em;
          border-bottom-right-radius: 0.2em;
          svg {
            fill: var(--TX-Color);
          }
        }
        &:first-child {
          border-top-left-radius: 0.5em;
          border-top-right-radius: 0.5em;
          button {
            border-top-right-radius: 0.5em;
          }
        }
        // &:nth-child(2) {
        // }
        &:last-child {
          border-bottom-left-radius: 0.5em;
          border-bottom-right-radius: 0.5em;
          margin-bottom: auto;
          button {
            border-bottom-right-radius: 0.5em;
          }
        }
      }
    }
  }

  #app {
    background: $dark;
    color: $light;
  }
</style>

$`C?46p1cC5CZ&I;~I~=`%LxDqUZo+TX