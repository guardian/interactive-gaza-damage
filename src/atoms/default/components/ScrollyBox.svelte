<div class="scrolly-box">
    <div class="scrolly-box-inner">
        <slot />
    </div>
</div>

<style lang="scss">
    .scrolly-box {
        width: 100%;
        padding-bottom: 90vh;
    }

    .scrolly-box:last-child {
        padding-bottom: 0;
    }

    .scrolly-box-inner {
        padding: 4px 10px 12px 10px;
        background-color: var(--background-color, rgba(246, 245, 243, 0.9));
        margin: 0 auto;
        max-width: 420px;
        border-top: 1px solid #999;

        @include mq($from: tablet) {
            margin: 0 -20px 0 -20px;
        }
    }
</style>