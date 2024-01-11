<script>
    import { fade } from "svelte/transition";
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";

    export let step;

    $: showVideo = step === 5;
</script>

{#if showVideo}
    <div class="video-overlay" transition:fade>
        <div class="video-wrapper">
            <AspectRatioBox aspectRatio=0.5625>
                <VideoPlayer src="https://uploads.guim.co.uk/2023/12/22/unrwa-school-beit-hanoun.mp4" posterImage="https://uploads.guim.co.uk/2024/01/02/out.png" />
            </AspectRatioBox>
        </div>
    </div>
{/if}

<style>
    .video-overlay {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .video-wrapper {
        flex-basis: 80%;
        background-color: #FFF;
    }
</style>