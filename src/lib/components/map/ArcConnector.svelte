<script>
    export let arcRadius = 20;
    export let strokeWidth = 1;
    export let extensionWidth = 0;

    let curvedPath;
    $: {
        // define starting point
        let path = `M 0 0`;

        // draw arc
        path += `a ${arcRadius} ${arcRadius} 0 0 0 ${arcRadius} ${arcRadius}`

        if (extensionWidth > 0) {
            // draw optional extension
            path += `l ${extensionWidth} 0`;
        }
     
        curvedPath = path;
    } 
</script>

<svg width={arcRadius + extensionWidth} 
    height={arcRadius} 
    viewBox="0 0 {arcRadius + extensionWidth} {arcRadius}" 
    xmlns="http://www.w3.org/2000/svg" 
    overflow="visible">

    <path 
        d={curvedPath} 
        fill="none"
        stroke="#121212"
        stroke-width="{strokeWidth}px"
        vector-effect="non-scaling-stroke"
    />
</svg>
