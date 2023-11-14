<template>
  <div
    class="modal"
    @click.self="$emit('close')">
    <form
      @submit.prevent="supaLogin"
      class="modal-card">
      <h2>Login</h2>
      <div class="inputs">
        <label for="email">E-mail</label
        ><input
          type="email"
          name="email"
          id="email"
          placeholder="Input you E-mail"
          v-model="emailRef" />
      </div>
      <div class="inputs">
        <label for="pass">Password</label
        ><input
          type="password"
          name="pass"
          id="pass"
          placeholder="input you Password"
          v-model="passwordRef" />
      </div>
      <h3 class="error">{{ errorRef }}</h3>
      <div class="container">
        <button @click="supaLogin">Login</button>
        <button @click.prevent="$emit('close')">Canncel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { supabase } from '../supabase'

  const emit = defineEmits(['close'])

  const userRef = ref(null),
    emailRef = ref(''),
    passwordRef = ref(''),
    errorRef = ref(''),
    getUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      userRef.value = data.session
    },
    supaLogin = async () => {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: emailRef.value,
        password: passwordRef.value,
      })
      if (error) {
        errorRef.value = error
      } else if (data) {
        errorRef.value = ''
        emit('close')
      }
    }

  // StorryLight78*

  getUser()
</script>

<style lang="scss" scoped>
  @import '../assets/colors';
  form {
    width: 50%;
    max-width: 640px;
    height: 50%;
    max-height: 400px;
    div.inputs {
      width: 75%;
      input {
        // border: soild 1px red;
        border-bottom: solid 1px;
        margin: 1em 0;
        width: 100%;
      }
    }
    button {
      padding: 0.5em;
      min-width: 50%;
    }
  }
</style>
