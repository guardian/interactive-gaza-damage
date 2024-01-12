<script>
    import { fade } from "svelte/transition";
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";

    export let video;

</script>

<div class="video-overlay" transition:fade>
    <div class="video-wrapper">
        <AspectRatioBox aspectRatio=0.5625>
            <VideoPlayer src={video.src} posterImage={video.posterImage} />
        </AspectRatioBox>
    </div>
</div>

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