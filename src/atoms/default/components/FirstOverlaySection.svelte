<script>
    import TextColumn from "$lib/components/TextColumn.svelte";
</script>

<div class="overlay">
    <TextColumn>
        <p>The lawsuit alleges that the true number of spills is higher, with official data being skewed due to a lack of accurate reporting to the Environment Agency and Ofwat, the regulator for England and Wales.</p>
        <p>Knowing how much of what we flush down the toilet actually ends up in rivers and seas is complicated by the fact that publicly available information is scarce. Thames Water is one of the few companies that shares information on spilling events in real-time, through their <a href="https://www.thameswater.co.uk/edm-map">storm discharge map</a>.</p>
        <p>And the volume of raw sewage released through overflow systems, as far as this is measured, is not published for the majority of them.</p>
        <p>There have been attempts at estimating though. A recent study suggested that a sample of 30 wastewater treatment works spilled as much as <a href="https://www.theguardian.com/environment/2023/may/27/30-water-treatment-works-11bn-litres-raw-sewage-a-year">11bn litres of raw sewage</a> in 2020.</p>
        <p>The number of discharges that breach permit regulations – and are therefore illegal – is disputed, and reliable data is not readily available.</p>
        <p>However, the Guardian has seen data on four out of more than 350 wastewater treatment works operated by Thames Water, which released the data on these selected works in response to environmental information requests. All four had previously been accused of spilling outside permitted criteria, and should not be seen as representative of Thames Water or the wider country.</p>
    </TextColumn>
</div>

<style lang="scss">
    .overlay {
        padding: 40px 0;
    }

    h2 {
        @include f-headline();
        font-size: 20px;
        line-height: 1.15;
        font-weight: 700;
        color: #404244;
    }
    
    p {
        @include f-bodyCopy();
        font-size: 17px;
        line-height: 1.4;
        color: #404244;
        font-weight: 400;
        margin-bottom: 14px;
    }

    a {
        color: #C70000;
    }
</style>