import './styles/main.scss';
import { selectorAppOrDCR } from '$lib/helpers/util';
import Atom from './components/Atom.svelte';
import HeaderImage from './components/HeaderImage.svelte';

// create scrollbar width CSS variable
import '$lib/helpers/scrollbarWidth';

const headerContainer = document.querySelector(selectorAppOrDCR("header"));
const mainMedia = document.createElement("div");
mainMedia.classList.add("drone-footage");
headerContainer.prepend(mainMedia);

const headerImage = new HeaderImage({
  target: mainMedia,
  hydrate: true,
  props: {},
});

const articleHeader = document.querySelector(selectorAppOrDCR("articleHeader"));
const bylineElement = document.querySelector(selectorAppOrDCR("byline"));
articleHeader.append(bylineElement);

// const app = new Atom({
// 	target: document.getElementById('gv-atom'),
// 	hydrate: true,
// 	props: {},
// });

export default {
	headerImage,
	app,
};