<script>
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";

    export let video;

    $: isPortrait = video.orientation && video.orientation === "portrait";
    $: aspectRatio = isPortrait ? 1.7792 : 0.5625;

    let containerSize = {width: 0, height: 0};

    let width = 0, height = 0;
    function updateSize(aspectRatio, containerSize) {
        const containerAspectRatio = containerSize.height / containerSize.width;

        if (aspectRatio > containerAspectRatio) {
            width = containerSize.height / aspectRatio;
            height = containerSize.height;
        } else {
            height = containerSize.width * aspectRatio;
            width = containerSize.width;
        }
    }
    
    $: updateSize(aspectRatio, containerSize)
</script>

<div class="video-overlay">
    <div class="video-wrapper" bind:clientWidth={containerSize.width} bind:clientHeight={containerSize.height}>
        <div class="aspect-ratio" style="width: {width}px; height: {height}px;">
            <VideoPlayer src={video.src} posterImage={video.posterImage} />
        </div>
    </div>
</div>

<style lang="scss">
    .video-overlay {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
    }

    .video-wrapper {
        position: relative;
        flex-basis: 100%;
        margin: 10px;
        max-width: 100%;

        @include mq($from: tablet) {
            flex-basis: 80%;
            margin: 0;
        }
    }

    .aspect-ratio {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>