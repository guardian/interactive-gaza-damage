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
    .debug {
        // FOR DEBUGGING
        border-bottom: 2px solid #C70000;
    }
    .overlay {
        width: 100%;
        padding-bottom: 80vh;
    }

    .scrolly-box {
        box-sizing: border-box;
        width: 100%;
        padding-bottom: 100vh;
    }
</style>