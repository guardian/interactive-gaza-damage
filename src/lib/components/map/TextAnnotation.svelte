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
    import Arc from "./ArcConnector.svelte";
    import Line from "./LineConnector.svelte";

    export let title;
    export let text = undefined;
    export let position = AnnotationPosition.bottomRight;
    export let textWidth = 200;
    export let textRadialOffset = 4;
    export let arcRadius = 0;
    export let extensionWidth = 0;
    export let lineLength = 0;
    export let lineStroke = "#121212";
    export let fontSize = 14;
    export let letterSpacing = undefined;
    export let backgroundColor = undefined;

    $: arcSize = { width: arcRadius + extensionWidth, height: arcRadius}

    const _textWidth = tweened(textWidth, {
        duration: 800,
        easing: quadInOut
    });
    $: _textWidth.set(textWidth);
    
    const _fontSize = tweened(fontSize, {
        duration: 800,
        easing: quadInOut
    });
    $: _fontSize.set(fontSize);
</script>

{#if arcRadius}
    <div class="arc {position}" style="width: {arcSize.width}px; height: {arcSize.height}px;">
        <Arc {arcRadius} {extensionWidth} />
    </div>
{/if}

{#if lineLength}
    <div class="line {position}" style="width: 1px; height: {lineLength}px;">
        <Line length={lineLength} stroke={lineStroke} />
    </div>

    <div class="dot" style="background-color: {lineStroke};"></div>
{/if}

<div class="text {position}" style="--text-width: {$_textWidth}px; --text-radial-offset:{textRadialOffset}px; --arc-width: {arcSize.width}px; --arc-height: {arcSize.height}px; --line-height:18px; --line-length: {lineLength}px; background-color: {backgroundColor || 'transparent'}; padding: {backgroundColor ? '4px 8px' : 0}">
    <h5 style="font-size: {$_fontSize}px; letter-spacing: {letterSpacing || "normal"};">{title}</h5>
    {#if text}
        <p>{text}</p>
    {/if}
</div>


<style lang="scss">
    .arc {
        position: absolute;

        // defaults to bottom-right position
        top: 0;
        left: 0;
    }

    .arc.bottom-left {
        transform: scaleX(-1) translateX(100%);
    }

    .arc.top-left {
        transform: scale(-1, -1) translate(100%, 100%);
    }

    .arc.top-right {
        transform: scaleY(-1) translateY(100%);
    }

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
        top: calc(var(--arc-height) - var(--line-height) * 0.75);
        left: calc(var(--arc-width) + var(--text-radial-offset));
    }

    .text.center {
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }

    .text.bottom-left {
        top: var(--arc-height);
        transform: translateY(-50%);
        left: calc(var(--arc-width) * (-1) - var(--text-width) - var(--text-radial-offset));
    }

    .text.bottom-middle {
        top: calc(var(--line-length) + var(--text-radial-offset));
        transform: translateX(-50%);
    }

    .text.top-left {
        top: calc(var(--arc-height) * (-1));
        transform: translateY(-50%);
        left: calc(var(--arc-width) * (-1) - var(--text-width) - var(--text-radial-offset));
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
        top: calc(var(--arc-height) * (-1));
        transform: translateY(-50%);
    }

    h5, p {
        --shadow-color: #f1efec;
        @include f-textSans();
        font-size: 14px;
        line-height: var(--line-height);
        color: #121212 !important;
        text-shadow:
            -1px -1px 0 var(--shadow-color),  
            1px -1px 0 var(--shadow-color),
            -1px 1px 0 var(--shadow-color),
            1px 1px 0 var(--shadow-color);
    }

    h5 {
        font-weight: 700;
    }

    p {
        margin: 0;
    }
</style>