<template lang="html">
    <div class="header">
        <ul>
            <li>首页</li>
            <li>产品</li>
            <li>新闻</li>
            <li>服务</li>
            <li>关于</li>
            <li>论坛</li>
        </ul>
    </div>
</template>

<script>
export default {}
</script>

<style lang="css">
    .header ul{
        overflow:hidden;
    }
    .header ul li{
        float:left;
        list-style:none;
        padding:5px 10px;
        background:#5bc0de;
        color:#fff;
        margin-left:5px;
        border-radius:4px;
        transition:all 0.5s ease;
        cursor:pointer;
    }
    .header ul li:hover{
        background:#7c2845;
        transform:scale(1.2);
    }

</style>
