<template>
    <div class="box">
        <cmpHeader></cmpHeader>
        <form action="localhost:8088">
            用户名:
            <input type="text">
            <br>
            密码:
            <input type="password">
            <br>
            <input type="submit" value="注册">
            <a href="#/">返回登陆</a>
        </form>
        <cmpFooter></cmpFooter>
    </div>
</template>

<script>
import cmpHeader from '@/components/cmpHeader'
import cmpFooter from '@/components/cmpFooter'
export default {
    name: 'reg',
    components: { cmpHeader, cmpFooter }
}

</script>

<style scoped>

</style>
