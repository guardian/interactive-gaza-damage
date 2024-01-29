<script>
    import Grid from "$lib/components/Grid.svelte";
    import AspectRatioBox from "$lib/components/AspectRatioBox.svelte";
    import GridImage from "$lib/components/GridImage.svelte";
</script>

<div class="overlay" id="al-zahra-intro">
    <Grid>
        <div class="border border-header"></div>
        <h2 class="header" data-ignore="global-h2-styling">Al-Zahra and al-Mughraqa</h2>
        <div class="border border-body"></div>
        <div class="body">
            <p>Al-Zahra, one of the wealthiest neighbourhoods located in central Gaza, was home to tower blocks, universities and about 5,000 people before the war.</p>
            <p>To the north is a large wastewater treatment plant surrounded by armoured vehicle tracks over flattened farmland. New paths and fortifications carved out by Israeli forces have emerged over an older network of roads no longer recognisable.</p>
            <p>To the east, in the town of al-Mughraqa, a large crater is all that's left of one building, while a nearby school’s buildings have visible damage.</p>
            <p>Cratered roads surround the Turkish-Palestinian Friendship hospital. The hospital reported blast damage to two rooms and its oxygen and water supply.</p>
            <p>At the heart of al-Zahra sit three universities, mostly damaged and surrounded by craters.</p>
            <p>Of them, Israa University was blown up by Israeli forces this month, after being used as a military base. After footage of the explosion prompted the Biden administration to ask the IDF for clarification, they announced a probe into its circumstances. This occurred after the satellite image was taken.</p>
            <div class="image">
                <AspectRatioBox aspectRatio=0.6>
                    <GridImage 
                        id="bc539f3967b9b8289a49e20c4bf84767f60ae6a5" 
                        crop={"58_0_1800_1080"}
                        name="1000.jpg" 
                        altText="Screengrabs from a video circulating on social media show the moment Israa University in al Zahra was partially demolished by the Israeli army"
                        caption="Screengrabs from a video circulating on social media show the moment Israa University in al Zahra was partially demolished by the Israeli army"
                        />
                </AspectRatioBox>
            </div>
            <p>The al-Zahra tower blocks, reportedly home to more than 3,000 people, were flattened by Israeli bombing.</p>
            <p>“Gaza’s destruction is far worse in terms of the scale, ferocity and impact when compared to Ukraine, Syria or other conflicts,” said Balakrishnan Rajagopal, the UN special rapporteur on the right to adequate housing. Rajagopal called for domicide to be recognised as a crime under international law at the UN general assembly in 2022.</p>
            <p>Between 2013 and 2016, UN data shows that 40% of Aleppo’s structures were damaged during the Syrian civil war. As of 5 January, in less than three months of conflict, Rajagopal said that 60% of all structures have been damaged or destroyed in Gaza.</p>
            <p>Martin Coward, professor of international politics at Queen Mary University of London, said: “It is somewhat different [to Syria] – the IDF has been targeting the subsurface infrastructure that Hamas has set up in Gaza and to do that it has to go through the built environment of the surface. They have attempted to be precise in that targeting – although there has been a lot of collateral damage on civilian buildings.”</p>
            <p>Detailed satellite imagery from Planet, dated 31 December, reveals some of this damage. Hovering over particular areas of damage changes the view to satellite images from 20 and 30 May 2023.</p>
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

    .image {
        width: 100%;
        margin: 20px 0;
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