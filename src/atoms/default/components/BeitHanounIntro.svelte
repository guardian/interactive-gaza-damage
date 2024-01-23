<script>
    import Grid from "$lib/components/Grid.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";
    import GridImage from "$lib/components/GridImage.svelte";
</script>

<div class="overlay" id="beit-hanoun-intro">
    <Grid>
        <div class="border border-header"></div>
        <h2 class="header" data-ignore="global-h2-styling">Beit Hanoun</h2>
        <div class="border border-body"></div>
        <div class="body">
            <p>Beit Hanoun, a mostly agricultural area in north-east Gaza, was home to about 50,000 people in 2017. The Israel Defense Forces announced full control of the area in December. The area was depopulated and several neighbourhoods reduced to rubble.</p>
            <p>Swathes of agricultural land have been erased, visible in satellite imagery from Planet Labs taken on 30 November. Most of the agricultural greenhouses have been destroyed and new paths from armoured vehicles are now strewn across the growing area. An <a href="https://unosat.org/products/3772">analysis by Unosat</a> in December found that 39% of agricultural land in north Gaza had been damaged.</p>
            <p>An entire residential neighbourhood of more than 150 buildings has been flattened. Also destroyed were schools, including one run by the UN that was blown up by Israeli forces in mid-December.</p>
            <p>The Beit Hanoun hospital has been severely damaged, and the Balsam hospital destroyed. Schools and hospitals have special protection, with international humanitarian law dictating that the principles of proportionality be taken into account when targeting them.</p>
            <div class="image">
                <AspectRatioBox aspectRatio=0.6>
                    <GridImage 
                        id="a36a8919095e8620ca39d4412fb17bb7420d86db" 
                        crop={"0_222_4032_2419"}
                        name="2000.jpg" 
                        altText="A view of Burj al-Nada and Burj al-Awda buildings destroyed due to Israeli attacks on the fourth day of the humanitarian pause between Israel and Hamas in Beit Hanoun, Gaza on November 27, 2023."
                        caption="A view of Burj al-Nada and Burj al-Awda buildings destroyed due to Israeli attacks on the fourth day of the humanitarian pause between Israel and Hamas in Beit Hanoun, Gaza on November 27, 2023. Photograph: Fadi Alwhidi/Anadolu via Getty Images"
                        />
                </AspectRatioBox>
            </div>
            <p>The analysis found a cemetery bulldozed and mosques damaged or destroyed. Among them is the Umm al-Nasr mosque, parts of which date back to 1239, which is damaged.</p>
            <p>Ammar Azzouz, a research fellow at the University of Oxford and author of a book on domicide, whose own city Homs in Syria was severely damaged in 2012, said: “Domicide’s impact unfolds with time. Its pain spreads not only across those who lost their homes in Gaza, but also for those whose homes remain intact as their wider infrastructure has been targeted.”</p>
            <p>By zooming into Beit Hanoun further, the scale of the damage becomes clear to see. Hovering over particular areas of damage changes the view to a satellite image from 20 May 2023.</p>
        </div>
        
    </Grid>
</div>

<style lang="scss">
    .overlay {
        border-top: 4px solid #121212;
        border-bottom: 4px solid #121212;
        background-color: rgb(255, 255, 255);
    }

    .header {
        grid-area: header;
        margin-top: 4px;
    }

    .image {
        width: 100%;
        margin: 20px 0;
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
        pointer-events: all;
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