<script>
    export let length = 0;
    export let strokeWidth = 1;
    export let stroke = "#121212";
</script>

<svg width="1" 
    height={length}
    viewBox="0 0 1 {length}"
    xmlns="http://www.w3.org/2000/svg" 
    overflow="visible">

    <line y1={0} y2={length} stroke-width={strokeWidth} {stroke} />
</svg>
