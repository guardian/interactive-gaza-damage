<script>
    import TextColumn from "$lib/components/TextColumn.svelte";

    export let type = 'scrolly-box'; // scrolly-box, overlay
</script>

<div class="scrolly-foreground-element {type}">
    {#if type === 'scrolly-box'}
        <TextColumn>
            <slot/>
        </TextColumn>
    {:else if type === 'overlay'}
        <slot/>
    {/if}
</div>

<style lang="scss">
    .overlay {
        width: 100%;
        margin-bottom: 90vh;
    }

    .scrolly-box {
        box-sizing: border-box;
        width: 100%;
        padding-bottom: 100vh;
    }
</style>