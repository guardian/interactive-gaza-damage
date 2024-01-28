<script>
    import Grid from "$lib/components/Grid.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";
    import GridImage from "$lib/components/GridImage.svelte";
</script>

<div class="overlay" id="al-zahra-intro">
    <Grid>
        <div class="border border-header"></div>
        <h2 class="header" data-ignore="global-h2-styling">Khan Younis</h2>
        <div class="border border-body"></div>
        <div class="body">
            <p>Khan Younis, in southern Gaza, sits at the edge of northern Gaza’s former evacuation line. Initially considered a safe zone, the city took in fleeing and injured civilians when the war’s focus was in the north, but has been relentlessly bombarded since December after the IDF expanded its campaign.</p>
            <p>The Guardian’s analysis found multiple mosques destroyed beyond recognition, alongside destroyed greenhouses and residential blocks.</p>
            <p>Another sports ground has been destroyed, alongside an entire residential area with residential buildings and agricultural fields. Large craters and rubble remain where more than 100 greenhouses once stood.</p>
            <p>Pharmacies, supermarkets, schools and a kindergarten show signs of damage. Cratered roads surround al-Bandar al-Sharqi hospital.</p>
            <p>Khan Younis refugee camp, home to 41,000 people in 2017, was established after the 1948 Arab-Israeli war to accommodate Palestinian refugees expelled from their homes. The camp, which hosts several UN buildings including a UNRWA school, took several hits and showed signs of damage.</p>
            <div class="image">
                <AspectRatioBox aspectRatio=0.6>
                    <GridImage 
                        id="3009e261d808a12445a0fb2d46c2a1547305aa60" 
                        crop={"0_224_3376_2026"}
                        name="2000.jpg" 
                        altText="Palestinians cook among the houses destroyed in Israeli strikes, at Khan Younis refugee camp, on 29 November 2023. Reuters/Mohammed Salem"
                        caption="Palestinians cook among the houses destroyed in Israeli strikes, at Khan Younis refugee camp, on 29 November 2023. Reuters/Mohammed Salem"
                        />
                </AspectRatioBox>
            </div>
            <p>Azzouz said: "One of the most pressing questions to emerge now … how to give people a sense of home and belonging after enduring loss? How to remember the killed? And how to imagine a future where [...] Gaza is rebuilt again?"</p>
            <p>Panning through the satellite imagery below, taken on 5 January 2024, reveals how wide swathes of northern Khan Younis have been destroyed. Hovering over particular areas of damage changes the view to a satellite image from 16 May 2023.</p>
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

    .image {
        width: 100%;
        margin: 20px 0;
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