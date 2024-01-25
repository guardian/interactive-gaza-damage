<script>
    export let length = 0;
    export let strokeWidth = 2;
    export let stroke = "#121212";
</script>

<svg width="1" 
    height={length}
    viewBox="0 0 1 {length}"
    xmlns="http://www.w3.org/2000/svg" 
    overflow="visible">

    <line y1={0} y2={length} stroke-width={strokeWidth} {stroke} />
</svg>

<style>
    svg {
        position: absolute;
        top: 0;
        left: 0;
    }
    
    line {
        filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 1)) drop-shadow(0px 0px 14px rgba(0, 0, 0, 1));
    }
</style>
