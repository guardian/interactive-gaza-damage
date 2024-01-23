<script>
    import { fly } from "svelte/transition";

    export let isShowingBefore;
</script>

<div class="hint" transition:fly={{y: -100}}>
    {#if isShowingBefore}
        <p>Situation on [date]</p>
    {:else}
        <p>Hover to see before</p>
    {/if}
</div>

<style lang="scss">
    .hint {
        display: flex;
        justify-content: center;
        padding-top: 20px;
    }

    p {
        background-color: rgba(18, 18, 18, 0.8);
        @include f-textSans();
        font-size: 16px;
        color: #FFF;
        line-height: 32px;
        border-radius: 20px;
        padding: 4px 12px;
    }
</style>
