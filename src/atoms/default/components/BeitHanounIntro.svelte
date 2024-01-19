<script>
    import Grid from "$lib/components/Grid.svelte";
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";
</script>

<div class="overlay" id="beit-hanoun-intro">
    <Grid>
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
            <p>Vast swathes of farmland have been rendered barren, clearly visible in satellite imagery from Planet Labs, taken on 30 November. Most of the greenhouses and solar panels have been destroyed, with craters from munitions and tracks from armoured vehicles across the area. An analysis by UNOSAT found that 39% of agricultural land in North Gaza has been damaged.</p>
            <p>An entire residential neighbourhood of more than 150 buildings has been flattened. Also destroyed were schools, including one run by the UN that was blown up by Israeli forces in mid-December.</p>
            <p>Schools and hospitals have special protection, with international humanitarian law dictating that the principles of proportionality be taken into account when targeting them. The Beit Hanoun hospital has been severely damaged, and the Balsam hospital destroyed.</p>
            <p>Our analysis found a cemetery bulldozed, and mosques systematically damaged or destroyed. Among them is the Umm al-Nasr mosque, parts of which date back to 1239. The destruction of religious objects may amount to a war crime.</p>
            <p>Azzouz explained: “Domicide’s impact unfolds with time. Its pain spreads not only across those who lost their homes in Gaza, but also for those whose homes remain intact as their wider infrastructure has been targeted.”</p>
            <p>“The main purpose of domicide is depopulation [...] to make life impossible, to push people into extremis.”</p>
            <p>By zooming into Beit Hanoun further, the scale of the damage becomes clear to see.</p>
        </div>
        
    </Grid>
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
        // margin-bottom: 40px;
    }

    .media {
        grid-area: media;
        display: none;
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
        padding: 20px 0;
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