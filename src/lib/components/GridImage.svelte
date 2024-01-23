<script>
    export let id;
    export let crop;
    export let name;
    export let altText;
    export let caption;

    let clientWidth;
    let imageSrc;

    $: if (clientWidth) {
        updateImageSource(clientWidth);
    }

    function updateImageSource(clientWidth) {
        const imageWidth = clientWidth;
        const dpr = Math.min(window.devicePixelRatio, 2);

        let newImageSrc = `https://i.guim.co.uk/img/media/${id}/${crop}/${name}?width=${imageWidth}&dpr=${dpr}&s=none`;
        if (newImageSrc !== imageSrc) {
            imageSrc = newImageSrc;
        }
    }
</script>
<figure class="grid-image" bind:clientWidth>
    <img src={imageSrc} alt={altText} />
    <figcaption><img class="camera-icon" src="__assetsPath__/icons/camera.svg" alt="Camera icon" />{caption}</figcaption>
</figure>

<style lang="scss">
    figure, img {
        width: 100%;
    }

    figcaption {
        @include f-textSans();
        font-size: 14px;
        line-height: 18px;
        color: #707070;
        margin-top: 4px;

        @include mq($from: tablet) {
            font-size: 0.875rem;
            line-height: 135%;
            margin-top: 0;
        }

        @include mq($from: leftCol) {
            padding: 0;
        }
    }

    .camera-icon {
        display: inline-block;
        width: 1em;
        margin-right: 4px;
    }
</style>