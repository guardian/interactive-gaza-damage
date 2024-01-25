<script>
    import { fly } from "svelte/transition";
    import { isMobile } from "$lib/stores/devices";

    export let isShowingBefore;
    export let area;

    function dateForArea(area) {
        if (!area) return ""
        if (area === 'beit-hanoun') {
            return "20 May 2023"
        } else if (area === 'al-zahra') {
            return "30 May 2023"
        } else if (area === 'khan-younis') {
            return "16 May 2023"
        }
    }

    $: beforeDate = dateForArea(area)
</script>

<div class="hint" transition:fly={{y: -100}}>
    {#if isShowingBefore}
        <p>Situation on {beforeDate}</p>
    {:else if $isMobile }
        <p>Tap and hold screen to see before</p>
    {:else}
        <p>Hover over highlighted areas to see before</p>
    {/if}
</div>

<style lang="scss">
    .hint {
        display: flex;
        justify-content: center;
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
