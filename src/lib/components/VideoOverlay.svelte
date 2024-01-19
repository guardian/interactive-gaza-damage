<script>
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";

    export let video;

    $: isPortrait = video.orientation && video.orientation === "portrait";
</script>

<div class="video-overlay">
    <div class="video-wrapper">
        <AspectRatioBox aspectRatio={isPortrait ? 1.7792 : 0.5625 }>
            <VideoPlayer src={video.src} posterImage={video.posterImage} />
        </AspectRatioBox>
    </div>
</div>

<style lang="scss">
    .video-overlay {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .video-wrapper {
        flex-basis: 100%;
        margin: 0 10px;
        max-width: 1024px;
        background-color: #FFF;

        @include mq($from: tablet) {
            flex-basis: 80%;
            margin: 0;
        }
    }
</style>