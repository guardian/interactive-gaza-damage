<script>
  import { isMobile } from "$lib/stores/devices";
  import { onMount } from "svelte";

  let video;
 
  $: poster = $isMobile ? "https://uploads.guim.co.uk/2024/01/10/Al_Zahra-short-mobile.jpg" : "https://uploads.guim.co.uk/2024/01/10/Al_Zahra_site.00_00_01_24.Still001.jpg";
  $: src = $isMobile ? "https://uploads.guim.co.uk/2024/01/10/alZahraShortMobile.mp4" : "https://uploads.guim.co.uk/2024/01/10/Al_Zahra-short.mp4";

  onMount(() => {
    let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                } else if (video.paused) {
                    video.play();
                }
            });
        },
        { threshold: 0.2 }
    );
    observer.observe(video);
  })
</script>

<div class="main-media">
  <video
    bind:this={video}
    class="uit-video uit-desktop"
    playsinline
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
