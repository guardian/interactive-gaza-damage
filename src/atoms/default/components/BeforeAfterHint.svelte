<script>
    import { fly } from "svelte/transition";
    import { isMobile } from "$lib/stores/devices";

    export let isShowingBefore;
    export let isShowingInset;
    export let area;

    function beforeDateForArea(area) {
        if (!area) return ""
        if (area === 'beit-hanoun') {
            return "20 May 2023"
        } else if (area === 'al-zahra') {
            return "30 May 2023"
        } else if (area === 'khan-younis') {
            return "16 May 2023"
        }
    }

    function afterDateForArea(area) {
        if (!area) return ""
        if (area === 'beit-hanoun') {
            return "30 November 2023"
        } else if (area === 'al-zahra') {
            return "31 December 2023"
        } else if (area === 'khan-younis') {
            return "5 January 2024"
        }
    }

    $: beforeDate = beforeDateForArea(area)
    $: afterDate = afterDateForArea(area)
</script>

<div class="hint" transition:fly={{y: -100}}>
    {#if isShowingInset}
        <p>Satellite image from {afterDate}</p>
    {:else if isShowingBefore}
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
        color: #FFF;
        font-size: 14px;
        line-height: 22px;
        border-radius: 14px;
        padding: 4px 12px;

        @include mq($from: tablet) {
            font-size: 16px;
            line-height: 32px;
            border-radius: 20px;
            padding: 4px 12px;
        }
    }
</style>
