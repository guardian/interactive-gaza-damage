<script context="module">
	export const AnnotationPosition = {
        center: 'center',
        topLeft: 'top-left',
        topMiddle: 'top-middle',
        topRight: 'top-right',
        rightMiddle: 'right-middle',
        bottomLeft: 'bottom-left',
        bottomMiddle: 'bottom-middle',
        bottomRight: 'bottom-right',
    };
</script>

<script>
    import { tweened } from 'svelte/motion';
    import { quadInOut } from 'svelte/easing';
    import Line from "./LineConnector.svelte";

    export let title = undefined;
    export let text = undefined;
    export let position = AnnotationPosition.bottomRight;
    export let textWidth = 200;
    export let textRadialOffset = 8;
    export let lineLength = 0;
    export let lineStroke = "#FFF";
    export let letterSpacing = undefined;
    export let backgroundColor = undefined;

    const _textWidth = tweened(textWidth, {
        duration: 800,
        easing: quadInOut
    });
    $: _textWidth.set(textWidth);
</script>

{#if lineLength}
    <div class="line {position}" style="width: 1px; height: {lineLength}px;">
        <Line length={lineLength} stroke={lineStroke} />
    </div>

    <!-- <div class="dot" style="background-color: {lineStroke};"></div> -->
{/if}

<div class="text {position}" style="--text-width: {$_textWidth}px; --text-radial-offset:{textRadialOffset}px; --line-length: {lineLength}px; background-color: {backgroundColor || 'transparent'}; padding: {backgroundColor ? '4px 8px' : 0}">
    {#if title}
        <h5 style="letter-spacing: {letterSpacing || "normal"};">{title}</h5>
    {/if}
    {#if text}
        <p>{text}</p>
    {/if}
</div>


<style lang="scss">
    .line {
        position: absolute;

        // defaults to bottom-middle position
        top: 0;
        left: 0;
    }

    .line.top-middle {
        transform: translateY(-100%); 
    }

    .line.right-middle {
        transform-origin: 0 0;
        transform: rotate(-90deg);
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #121212;
        transform: translate(-50%, -50%);
    }

    .text {
        position: absolute;
        width: var(--text-width);

        // defaults to bottom-right position
        top: calc(var(--line-height) * 0.75);
        left: var(--text-radial-offset);
    }

    .text.center {
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }

    .text.bottom-left {
        top: 0;
        transform: translateY(-50%);
        left: calc(var(--text-width) - var(--text-radial-offset));
    }

    .text.bottom-middle {
        top: calc(var(--line-length) + var(--text-radial-offset));
        transform: translateX(-50%);
    }

    .text.top-left {
        top: 0;
        transform: translateY(-50%);
        left: calc(var(--text-width) - var(--text-radial-offset));
    }

    .text.top-middle {
        top: calc(var(--line-length) * (-1) + var(--text-radial-offset) * (-1));
        left: 0;
        transform: translate(-50%, -100%);
    }

    .text.right-middle {
        top: 0;
        left: calc(var(--line-length) + var(--text-radial-offset));
        transform: translateY(-50%);
    }

    .text.top-right {
        top: 0;
        transform: translateY(-50%);
    }

    h5, p {
        font-family: 'Guardian Text Sans Web Medium', Arial, sans-serif;
        font-size: 18px;
        line-height: 21px;
        font-weight: 700;
        color: #FFF !important;
        text-shadow: 0px 0px 2px #000000, 
                     0px 0px 14px rgba(0,0,0,0.5),
                     0px 0px 20px rgba(0,0,0,0.5);
    }

    h5 {
        font-weight: 700;
    }

    p {
        margin: 0;
    }
</style>