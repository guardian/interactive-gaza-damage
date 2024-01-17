<script>
    import Grid from "$lib/components/Grid.svelte";
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";
</script>

<div class="overlay" id="al-zahra-intro">
    <Grid>
        <div class="border border-header"></div>
        <h2 class="header" data-ignore="global-h2-styling">Khan Younis</h2>
        <div class="media">
            <AspectRatioBox aspectRatio=0.5625>
                <VideoPlayer src="https://uploads.guim.co.uk/2023/12/22/beit-hanoun-walkthrough_SITE.mp4" posterImage="https://uploads.guim.co.uk/2024/01/02/out.png" />
            </AspectRatioBox>
        </div>
        <div class="border border-body"></div>
        <div class="body">
            <p>Khan Younis, in southern Gaza, sits at the edge of the northern Gaza former evacuation line. Initially considered a safe zone, it took in fleeing and injured civilians when the war’s focus was in the north, but now has been relentlessly bombarded in December after the IDF expanded its campaign.</p>
            <p>The Guardian’s analysis found multiple mosques destroyed beyond recognition, alongside destroyed greenhouses and residential blocks.
</p>
            <p>In a former sports stadium, a field hospital has been erected with tents to treat injured patients diverted from evacuated hospitals.</p>
            <p>Another sports ground has been destroyed, alongside an entire neighbourhood with residential buildings and agricultural fields. Large craters and rubble remain where over 100 greenhouses once stood. </p>
            <p>Pharmacies, supermarkets, schools and even a kindergarten show signs of damage. Cratered roads surround Al Bandar Al Sharqi hospital. 
</p>
            <p>Khan Yunis refugee camp, home to 41,000 people in 2017, was established following the 1948 Arab-Israeli War to accommodate Palestinian refugees expelled from their homes. The camp, which hosts several UN buildings including a UNRWA school, took several hits and showed signs of extensive damage. 
</p>
            <p>Azzouz sees a common thread uniting Iraq, Ukraine and Syria: “Behind every broken stone, there is a story of dreams[…]. There is a memory of a family, a story of love and grief. One of the most pressing questions to emerge now is how to reconstruct these cities? How to give people a sense of home and belonging after enduring loss? How to remember the killed? And how to imagine a future where[..] Gaza is rebuilt again? ”</p>
            <p>Panning through the satellite imagery below, taken on [DATE], reveals how wide swathes of northern Khan Younis have been left destroyed. </p>
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
        margin-bottom: 40px;
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