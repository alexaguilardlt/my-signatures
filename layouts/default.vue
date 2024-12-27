<template>
  <div class="wrapper">
    <Navbar></Navbar>
    <main>
      <slot />
    </main>
    <footer>
      <p>Esto es el footer de mi pagina</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
}

footer {
  background-color: red;
  color: white;
}
</style>
