<script>
    import Grid from "$lib/components/Grid.svelte";
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";
</script>

<div class="overlay" id="al-zahra-intro">
    <Grid>
        <div class="border border-header"></div>
        <h2 class="header" data-ignore="global-h2-styling">Al Zahra</h2>
        <div class="media">
            <AspectRatioBox aspectRatio=0.5625>
                <VideoPlayer src="https://uploads.guim.co.uk/2023/12/22/beit-hanoun-walkthrough_SITE.mp4" posterImage="https://uploads.guim.co.uk/2024/01/02/out.png" />
            </AspectRatioBox>
        </div>
        <div class="border border-body"></div>
        <div class="body">
            <p>Al Zahra, one of the wealthiest neighbourhoods located in central Gaza, was home to iconic tower blocks, universities and around 5,000 people.</p>
            <p>To the north is a large wastewater treatment plant surrounded by armoured vehicle tracks over flattened farmland. New paths and fortifications carved out by Israeli forces have emerged over an older network of roads no longer recognisable.</p>
            <p>To the east, in the town of Al Mughraqa, a large crater is all that's left of one building. A large school is surrounded by signs of Israeli military vehicle activity and damaged buildings.</p>
            <p>Cratered roads and tracks from Israeli armoured cars surround the Turkish-Palestinian Friendship hospital. The hospital reported blast damage to two rooms and its oxygen and water supply.</p>
            <p>At the heart of Al Zahra sit multiple university buildings, mostly damaged and surrounded by craters. Amidst the destruction, the law school at one university has a quote referring to the Geneva Convention: “Wars Have Limits”.</p>
            <p>The signature Al Zahra tower blocks, reportedly home to over 3,000 people, were flattened by Israeli bombing.</p>
            <p>“Gaza’s destruction is far worse in terms of the scale, ferocity and impact when compared to Ukraine, Syria or other conflicts,” says Balakrishnan Rajagopal, the UN Special Rapporteur on the Right to Adequate Housing.</p>
            <p>Between 2013 and 2016, UN data shows that 40% of Aleppo’s structures were damaged during the Syrian civil war. As of 5 November, in less than three months of conflict, Rajagopal said that 56% of all structures have been damaged or destroyed in Gaza and in Northern Gaza, with the damage as high as 82% in some areas.</p>
            <p>Martin Coward, Professor of International Politics at Queen Mary University of London, Coward said: “It is somewhat different – the IDF has been targeting the subsurface infrastructure that Hamas has set up in Gaza and to do that it has to go through the built environment of the surface. They have attempt to be precise in that targeting – although there has been a lot of collateral damage on civilian buildings.”</p>
            <p>Detailed satellite imagery from Planet, dated 31 December, reveals some of this damage.</p>
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