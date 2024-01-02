<script>
    import TextColumn from "$lib/components/TextColumn.svelte";
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";
</script>

<div class="overlay">
    <TextColumn>
        <div class="border"></div>
        <div class="body">
            <VideoPlayer />
            <h2 data-ignore="global-h2-styling">Beit Hanoun</h2>
            <p>Beit Hanoun, in the north-east of Gaza, was home to around 50,000 people in 2017. The IDF signalled it had full control over the area in December, with several neighbourhoods being reduced to rubble.</p>
            <p>Vast swathes of farmland, with crops like citrus fruit, potatoes and dragon fruit, were devastated. Satellite imagery from Planet Labs, taken on 30 November, shows that orchards were razed and greenhouses bulldozed. Heavy vehicle tracking and craters can be observed. A preliminary analysis by UNOSAT shows that 35% of agricultural areas in North Gaza have been damaged.</p>
            <p>Several neighbourhoods of Beit Hanoun have been virtually flattened. For example, to the north-west of these tank tracks, this entire neighbourhood, including its mosque, was levelled. A UN-run middle-school was blown up by Israeli forces in mid-December and captured on video.</p>
            <p>Other key parts of the city's critical infrastructure have been damaged or destroyed. Several educational facilities were destroyed or damaged. The Beit Hanoun hospital has been severely damaged. The Umm al-Nasr mosque, parts of which date back to 1239, was also damaged. Grocery stores and the town shopping mall have been damaged or destroyed, in addition to many residential buildings.</p>
            <p>The neighbourhood of ‘Izbat Beit Hanoun has been almost completely flattened, including its hospital and several tower blocks. Mosques and schools have also been hit. Many of the roads appear unserviceable.</p>
        </div>
    </TextColumn>
</div>

<style lang="scss">
    .overlay {
        background-color: #FFF;
    }

    .border {
        border-left: 1px solid #dcdcdc;
        grid-area: border; 
    }

    .body {
        grid-area: body;
        padding: 40px 0;
        max-width: 620px;
    }

    h2 {
        @include f-headline();
        font-size: 28px;
        line-height: 1.15;
        font-weight: 700;
        color: #121212;
        margin-top: 40px;
    }
    
    p {
        @include f-bodyCopy();
        font-size: 17px;
        line-height: 1.4;
        color: #121212;
        font-weight: 400;
        margin-bottom: 14px;
    }

    a {
        color: #C70000;
    }
</style>