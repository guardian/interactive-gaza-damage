<script>
    import TextColumn from "$lib/components/Grid.svelte";
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";
</script>

<div class="overlay">
    <TextColumn>
        <div class="border border-header"></div>
        <h2 class="header" data-ignore="global-h2-styling">Beit Hanoun</h2>
        <div class="media">
            <AspectRatioBox aspectRatio=0.5625>
                <VideoPlayer src="https://uploads.guim.co.uk/2023/12/22/beit-hanoun-walkthrough_SITE.mp4" posterImage="https://uploads.guim.co.uk/2024/01/02/out.png" />
            </AspectRatioBox>
        </div>
        <div class="border border-body"></div>
        <div class="body">
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
        pointer-events: all;
        border-top: 4px solid #121212;
        border-bottom: 4px solid #121212;
        background-color: rgb(255, 255, 255);
    }

    .header {
        grid-area: header;
        margin-top: 4px;
        margin-bottom: 40px;
    }

    .media {
        grid-area: media;
    }

    .border {
        border-left: 1px solid #dcdcdc;
    }

    .border-header {
        grid-area: border-header;
    }

    .border-body {
        grid-area: border-body; 
    }

    .body {
        grid-area: body;
        padding: 40px 0;
        max-width: 620px;
    }

    h2 {
        @include f-headline();
        font-size: 40px;
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

    // a {
    //     color: #C70000;
    // }
</style>