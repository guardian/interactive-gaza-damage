<script>
    import TextColumn from "$lib/components/TextColumn.svelte";
</script>

<div class="overlay">
    <TextColumn>
        <p>Combined sewer overflows (CSOs) were designed as a release valve to be used during periods of “unusually heavy rainfall”, to prevent excess water from backing up into the system.</p>
        <p>Environmental permits specify the conditions that water companies must meet to be allowed to spill raw sewage through these CSOs.</p>
        <p>One of these conditions is known as the “overflow setting”, which specifies a minimum volume to pass through full treatment while a CSO is in use. Failing to treat the required amount of sewage is known as “early spilling”.</p>
        <p>Our analysis suggests that last year, the majority of raw sewage discharges at Mogden and Oxford works fell into this category. No evidence of early spilling was found at the other two works last year.</p>

        <p>Violating permit conditions can carry hefty fines when prosecuted. Anglian Water <a href="https://www.gov.uk/government/news/anglian-water-fined-265m-after-sewage-discharged-into-north-sea">was recently fined</a> £2.65m after releasing 7.5m litres of untreated sewage into the North Sea.</p>
        <h2>The impact on rivers in England and Wales</h2>
        <p>Agriculture and rural land management is the biggest single contributor to river pollution in England, according to figures from the Environment Agency, as excess nutrients from fields and livestock end up in the water.</p>
        <p>But the water industry, with discharges of both treated and untreated sewage, is a close second.</p>
        <p>The most recent ratings for England and Wales, from 2019 and 2021 respectively, show that rivers are in poor chemical and ecological state.</p>
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