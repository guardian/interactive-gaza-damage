<script>
    export let aspectRatio;
</script>

<div class="aspect-ratio-box" style="--aspect-ratio: {aspectRatio}">
    <slot />
</div>

<style>
    .aspect-ratio-box {
        width: 100%;
        position: relative;
    }

    .aspect-ratio-box::before {
        content: "";
        width: 1px;
        margin-left: -1px;
        float: left;
        height: 0;
        padding-top: calc(var(--aspect-ratio) * 100%);
    }

    .aspect-ratio-box::after { /* to clear float */
        content: "";
        display: table;
        clear: both;
    }
</style>