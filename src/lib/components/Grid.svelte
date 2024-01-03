<div class="content-wrapper">
  <div class="grid">
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

  .grid {
    display: grid;

    grid-template-columns: 1fr;
    grid-column-gap: 0px;
    grid-template-areas: "header"
                          "media"
                          "body";

    @include mq($from: desktop) {
      grid-template-columns: 1fr 300px;
      grid-column-gap: 20px;
      grid-template-areas: "header  ."
                           "media   media"
                           "body    .";
    }
    

    @include mq($from: leftCol) {
      grid-template-columns: 140px 1px 620px 300px;
      grid-column-gap: 10px;
      grid-template-areas: ".          border-header     header      ."
                           "media      media             media       media"
                           ".          border-body       body        .";
    }

    @include mq($from: wide) {
      grid-template-columns: 219px 1px 1fr 300px;
    }
  }
</style>
