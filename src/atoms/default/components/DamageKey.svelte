<div class="damage-key drop-shadow-black">
	<div class='damage-sq'></div>
	<div class='damage-text'>Damage since 7 October 2023</div>
</div>

<style lang="scss">
  .damage-key {
		display: flex;
		align-items: center;
    position: absolute;
    top: 0;
    right: calc(154px + 0px);
    padding-top: 38px;
    padding-right: 20px;
		color: #fff;
		@include fs-textSans(2);
		font-weight: bold;

		@include mq($until:mobileLandscape) {
			padding-top: 35px;
			@include fs-textSans(1);
			right: 0;
			left: 10px;
		}
  }

	.damage-sq {
		width: 16px;
		height: 16px;
		background-color: #ad0006;
		border: 2px solid #880105;
		margin-right: 6px;
		opacity: 0.6;
	}

  .drop-shadow-black {
    filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.6)) drop-shadow(0px 0px 10px rgba(0,0,0,0.3));
    -webkit-filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.6)) drop-shadow(0px 0px 10px rgba(0,0,0,0.3));
  }

  .hidden {
    display: none;
  }
</style>
