<template>
    <div class="box">
        <div class="box">
            <cmpHeader/>

            <form action="localhost:8088">
                用户名:
                <input type="text">
                <br>
                密码啊:
                <input type="password">
                <br>
                <input type="submit" value="登陆">
                <a href="#/reg">我要注册</a>
            </form>
            <cmpFooter/>
        </div>
    </div>
</template>

<script>
import cmpHeader from '@/components/cmpHeader'
import cmpFooter from '@/components/cmpFooter'
export default {
  name: 'login',
  components: { cmpHeader, cmpFooter }
}
</script>

<style scoped>

</style>
