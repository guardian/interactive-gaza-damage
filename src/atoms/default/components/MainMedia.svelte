<script>
  import { isMobile } from "$lib/stores/devices";

  $: poster = $isMobile ? "https://uploads.guim.co.uk/2024/01/10/Al_Zahra-short-mobile.jpg" : "https://uploads.guim.co.uk/2024/01/10/Al_Zahra_site.00_00_01_24.Still001.jpg";
  $: src = $isMobile ? "https://uploads.guim.co.uk/2024/01/10/alZahraShortMobile.mp4" : "https://uploads.guim.co.uk/2024/01/10/Al_Zahra-short.mp4";
</script>

<div class="main-media">
  <video
    class="uit-video uit-desktop"
    playsinline
    autoplay
    muted
    loop
    preload="none"
    {poster}
  >
    <source {src} />
  </video>
</div>

<style lang="scss">
  .main-media {
    width: 100%;
    height: calc(80vh - 48px);
    overflow: hidden;
    position: relative;

    @include mq($from: mobileLandscape) {
      height: calc(100vh - 48px);
    }
  }

  video {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
</style>
