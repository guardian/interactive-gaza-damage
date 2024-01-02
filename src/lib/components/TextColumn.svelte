<div class="content-wrapper">
    <div class="text-column">
        <slot />
    </div>
</div>

<style lang="scss">
    .content-wrapper {
        box-sizing: border-box;
        width: 100%;
        margin: 0 auto;

        @include mq($from: tablet, $until: desktop) {
            max-width: 740px;
        }

        @include mq($from: desktop, $until: leftCol) {
            max-width: 980px;
        }

        @include mq($from: leftCol, $until: wide) {
            max-width: 1140px;
        } 

        @include mq($from: wide) {
            max-width: 1300px;
        } 

        @include mq($until: mobileLandscape) {
            padding: 0 10px;
        }

        @include mq($from: mobileLandscape, $until: tablet) {
            padding: 0 20px;
        }

        @include mq($from: tablet) {
            padding: 0 1px;
        }
    }

    .text-column {
        box-sizing: border-box;
        width: 100%;

        @include mq($from: tablet) {
            max-width: 620px;
        }

        @include mq($from: tablet, $until: leftCol) {
            margin-left: 20px;
        }

        @include mq($from: leftCol, $until: wide) {
            margin-left: 180px;
        }

        @include mq($from: wide) {
            margin-left: 260px;
        }
    }
</style>