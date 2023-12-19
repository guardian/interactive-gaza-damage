<script>
    export let title;
    export let subtitle = undefined;
    export let colourScale = undefined;
    export let categories = undefined;
    export let image = undefined;

    const linearGradient = (colourScale) => {
        const stops = colourScale.map(stop => {
            return `${stop.colour} ${stop.position}`
        });

        return "linear-gradient(90deg," + stops.join(",") + ")"
    }
</script>

<div class="color-key">
    <h3>{ title }</h3>

    {#if subtitle}
        <h4>{ subtitle }</h4>
    {/if}

    {#if colourScale}
        <div class="gradient-box" style="background: {linearGradient(colourScale)};"></div>
        <div class="labels">
            {#each colourScale as stop }
                {#if stop.label }
                    <span class="label tick-label" style="left: {stop.position}">{ stop.label }</span> 
                {/if}
            {/each}
        </div>
    {:else if categories}
        <div class="categories">
            {#each categories as category }
                <div class="category">
                    <span class="bar" style="background-color:{category.colour};"></span>
                    <span class="label category-label">{ category.label }</span>
                </div>            
            {/each}
        </div>
    {:else if image}
        <img src={image} alt="Map legend" />
    {/if}
</div>


<style lang="scss">
    .color-key {
        width: var(--width);
        // margin-top: 12px;
    }

    h3 {
        @include f-textSans();
        font-size: 16px;
        line-height: 1.35;
        font-weight: bold;
        color: #121212;
    }

    h4 {
        @include f-textSans();
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 8px;
        color: #707070;
    }


    .labels {
        position: relative;
        height: 20px;
    }

    .label {
        display: inline-block;
        @include f-textSans();
        font-size: 13px;
        color: #121212;
    }

    .tick-label {
        position: absolute;
        transform: translateX(-50%);
    }

    .gradient-box {
        width: 100%;
        height: 8px;
        margin-bottom: 4px;
    }

    .categories {
        display: flex;
        flex-direction: row;
        
        @include mq($from: desktop) {
            flex-direction: column;
        }
    }

    .category {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 4px 0;
        margin-right: 8px;
        
        @include mq($from: desktop) {
            margin-right: 8px;
        }
    }

    .bar {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 4px;

        @include mq($from: desktop) {
            margin-right: 8px;
        }
    }

    img {
        margin-top: 12px;
    }
</style>