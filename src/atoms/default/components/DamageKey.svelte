<script>
  import TextColumn from "$lib/components/TextColumn.svelte";
</script>

<TextColumn>
  <div class="damage-key">
    <div class="damage-sq"></div>
    <div class="damage-text">Damage since 7 October 2023</div>
  </div>
</TextColumn>

<style lang="scss">
  .damage-key {
    display: flex;
    align-items: center;
  }

  .damage-text {
    @include fs-textSans(1);
    font-weight: bold;
    color: #fff;
    text-shadow:
      0px 0px 4px rgba(0, 0, 0, 0.8),
      0px 0px 14px rgba(0, 0, 0, 0.7),
      0px 0px 20px rgba(0, 0, 0, 0.8);

    @include mq($from: mobileLandscape) {
      font-size: 15px;
    }
  }

  .damage-sq {
    width: 16px;
    height: 16px;
    background-color: #ad0006;
    border: 1px solid #FFF;
    margin-right: 6px;
    opacity: 0.6;
    box-shadow:
      0px 0px 2px rgba(0, 0, 0, 1),
      0px 0px 4px rgba(0, 0, 0, 0.5);
  }
</style>
