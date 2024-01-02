<script context="module">
  let current;
  let muteAll = true;
</script>

<script>
  import { onMount } from "svelte";
  import { isDesktop } from "$lib/stores/devices.js";

  export let src;
  export let posterImage;
  export let showControls = true;
  export let rewindOnPause = false;

  let video, currentTime, duration;
  let paused = true;
  let muted = muteAll;
  let hasStartedPlaying = false;

  function onPlay() {
    hasStartedPlaying = true;

    // pause other videos
    if (current && current !== video) {
      current.pause();
    }

    current = video;

    // sync muted state
    muted = muteAll;
  }

  function onPause() {
    if (rewindOnPause) {
      // seek to start on pause
      video.currentTime = 0;
    }
  }

  function onVolumeChange() {
    muteAll = video.muted;
  }

  function playPause() {
    if ($isDesktop) return; // disable button on desktop
    paused = !paused;
  }

  function toggleMuted() {
    muted = !muted;
  }

  //////////////////////////////
  /// Video scrubbing behaviour
  ////////////////////////////

  // Used to track time of last mouse down event
  let lastMouseDown;
  let unmuteButton;

  // DOMRect does not exist when prerendering
  if (typeof document !== "undefined") {
    // Extend DOMRect object with contains function
    DOMRect.prototype.contains = function (x, y) {
      return (
        this.x <= x &&
        x <= this.x + this.width &&
        this.y <= y &&
        y <= this.y + this.height
      );
    };
  }

  function handleMove(e) {
    if (!duration) return; // video not loaded yet
    if (e.type !== "touchmove" && !(e.buttons & 1)) return; // mouse not down

    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const { left, right } = this.getBoundingClientRect();
    currentTime = (duration * (clientX - left)) / (right - left);
  }

  // we can't rely on the built-in click event, because it fires
  // after a drag — we have to listen for clicks ourselves
  function handleMousedown(e) {
    lastMouseDown = new Date();
  }

  function handleMouseup(e) {
    if (!$isDesktop) return;

    if (new Date() - lastMouseDown < 300) {
      const unmuteButtonRect = unmuteButton.getBoundingClientRect();
      if (!unmuteButtonRect.contains(e.clientX, e.clientY)) {
        paused = !paused;
      }
    }
  }

  //////////////////////////////
  /// onMount
  ////////////////////////////

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const startVideo = entry.intersectionRatio >= 0.75;
          if (startVideo && video.readyState >= 2) {
            paused = false;
          } else {
            paused = true;
          }
        });
      },
      {
        threshold: [0, 0.75, 1],
      }
    );
    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  });
</script>

<div
  class="video-wrapper"
  on:mousemove={handleMove}
  on:mousedown={handleMousedown}
  on:mouseup={handleMouseup}
>
  <img
    alt="poster for video"
    class="poster"
    class:hidden={hasStartedPlaying}
    src={posterImage}
  />

  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    bind:this={video}
    on:play={onPlay}
    on:pause={onPause}
    on:volumechange={onVolumeChange}
    on:click={playPause}
    bind:paused
    bind:muted
    bind:currentTime
    bind:duration
    class="video"
    preload="auto"
    poster={posterImage}
    playsinline="true"
    loop="true"
  >
    <source src />
  </video>

  {#if showControls}
    <button class="play-button" class:hidden={!paused} on:click={playPause}>
      <img alt="play video" src="__assetsPath__/icons/play-button.svg" />
    </button>
  {/if}

  {#if showControls}
    <button
      class="unmute-button"
      bind:this={unmuteButton}
      on:click={toggleMuted}
    >
      <span class="hide-mobile" class:hidden={!muted}>UNMUTE</span>
      <span class="hide-desktop" class:hidden={!muted}>UNMUTE</span>
      <img
        alt="unmute"
        class:hidden={!muted}
        src="__assetsPath__/icons/unmute.svg"
      />
      <img
        alt="mute"
        class:hidden={muted}
        src="__assetsPath__/icons/mute.svg"
      />
    </button>
  {/if}

  <div class="progress-wrapper">
    <progress value={currentTime / duration || 0} />
  </div>
</div>

<style lang="scss">
  .video-wrapper {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    box-shadow: none !important;
  }

  .play-button {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .unmute-button {
    position: absolute;
    top: 0;
    right: 0;
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    height: 44px;
    z-index: 11;
  }

  .unmute-button span {
    color: #fff;
    @include f-textSans();
    font-size: 14px;
    line-height: 44px;
    font-weight: 700;
    text-shadow: 1px 1px 0 #121212;
  }

  .play-button img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
  }

  .progress-wrapper {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 12px;
    max-height: 4px;
    transition: max-height 0.2s ease-in-out;
  }

  @include mq($from: desktop) {
    .video-wrapper:hover .progress-wrapper {
      max-height: 12px;
    }
  }

  progress {
    display: block;
    width: 100%;
    height: 100%;
    appearance: none;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
  }

  progress::-webkit-progress-bar {
    background-color: rgba(0, 0, 0, 0.3);
  }

  progress::-webkit-progress-value {
    background-color: #c70000;
  }

  progress::-moz-progress-bar {
    background-color: #c70000;
  }

  .hidden {
    display: none;
  }

  .hide-mobile {
    @include mq($until: desktop) {
      display: none;
    }
  }

  .hide-desktop {
    @include mq($from: desktop) {
      display: none;
    }
  }
</style>
