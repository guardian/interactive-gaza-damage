<script context="module">
    export const LineDirection = {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right',
    };
	export const TextPosition = {
        start: 'start',
        center: 'center',
        end: 'end',
    };
</script>

<script>
    import { tweened } from 'svelte/motion';
    import { quadInOut } from 'svelte/easing';
    import Line from "./LineConnector.svelte";

    export let lineDirection = LineDirection.up;
    export let lineLength = 0;
    export let lineStroke = "#FFF";

    // spacing between line and text box
    export let textRadialOffset = 8;

    export let title = undefined;
    export let text = undefined;
    export let textWidth = 200;
    export let textPosition = TextPosition.center;
    export let letterSpacing = undefined;

    export let backgroundColor = undefined;

    const lineHeight = 21;

    const _textWidth = tweened(textWidth, {
        duration: 800,
        easing: quadInOut
    });
    $: _textWidth.set(textWidth);
</script>

{#if lineLength}
    <div class="line {lineDirection}" style="width: 1px; height: {lineLength}px;">
        <Line length={lineLength} stroke={lineStroke} />
    </div>
{/if}

<div class="text line-{lineDirection} {textPosition}" style="--text-width: {$_textWidth}px; --text-radial-offset:{textRadialOffset}px; --line-length: {lineLength}px; --line-height: {lineHeight}px; background-color: {backgroundColor || 'transparent'}; padding: {backgroundColor ? '4px 8px' : 0}">
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

        // default to direction 'down'
        top: 0;
        left: 0;
    }

    .line.up {
        transform: translateY(-100%); 
    }

    .line.right {
        transform-origin: 0 0;
        transform: rotate(-90deg);
    }

    .line.left {
        transform-origin: 0 0;
        transform: rotate(90deg);
    }

    .text {
        position: absolute;
        width: var(--text-width);

        top: 0;
        left: 0;

        &.line-down {
            top: calc(var(--line-length) + var(--text-radial-offset));

            &.start {
                left: calc(var(--text-radial-offset) * -1);
                transform: none;
            }

            &.center {
                transform: translateX(-50%);
            }

            &.end {
                transform: translateX(-100%);
            }
        }

        &.line-up {
            top: calc((var(--line-length) + var(--text-radial-offset)) * -1);

            &.start {
                left: calc(var(--text-radial-offset) * -1);
                transform: translateY(-100%);
            }

            &.center {
                transform: translate(-50%, -100%);
            }

            &.end {
                left: calc(var(--text-radial-offset) * 2);
                transform: translate(-100%, -100%);
            }
        }

        &.line-left {
            left: calc((var(--line-length) + var(--text-radial-offset)) * -1);

            &.start {
                top: calc(var(--line-height) / 2 * -1);
                transform: none;
            }

            &.center {
                transform: translate(-100%, -50%);
            }

            &.end {
                top: calc(var(--line-height) / 2);
                transform: translate(-100%, -100%);
            }
        }

        &.line-right {
            left: calc(var(--line-length) + var(--text-radial-offset));

            &.start {
                top: calc(var(--line-height) / 2 * -1);
                transform: none;
            }

            &.center {
                transform: translateY(-50%);
            }

            &.end {
                top: calc(var(--line-height) / 2);
                transform: translateY(-100%);
            }
        }
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