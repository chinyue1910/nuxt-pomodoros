<template lang="pug">
div(style="background-color: rgba(0,0,0,0.8)")
  nuxt.nuxt(keep-alive)
  #navbar.w-100
    .container
      nuxt-link(to="/")
        font-awesome-icon.icon(size="3x", icon="home")
      nuxt-link(to="/setting")
        font-awesome-icon.icon(size="3x", icon="cog")
      nuxt-link(to="/ringtone")
        font-awesome-icon.icon(size="3x", icon="bell")
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: "微軟正黑體";
  box-sizing: border-box;
}
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nuxt {
  align-items: center;
  height: calc(100vh - 58px);
  background: url("~assets/bg.jpg") no-repeat fixed center/cover;
}
#navbar {
  position: fixed;
  background-color: darkgray;
  bottom: 0;
  padding: 10px 0;
  display: flex;
  justify-content: center;
}
.icon {
  color: #fff;
  filter: drop-shadow(1px 1px 1px black);
  &:hover {
    transition: .3s;
    filter: drop-shadow(5px 5px 5px black);
  }
  &:active{
    transition: .3s;
    filter: none;
    color: black;
  }
}
</style>
