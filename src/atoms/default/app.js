import './styles/main.scss';
import { selectorAppOrDCR } from '$lib/helpers/util';
import Atom from './components/Atom.svelte';
import MainMedia from './components/MainMedia.svelte';

// create scrollbar width CSS variable
import '$lib/helpers/scrollbarWidth';

let mainMediaContainer = document.querySelector("article.content--interactive");
if (!mainMediaContainer) {
	mainMediaContainer = document.querySelector(selectorAppOrDCR("media"));
}
const mainMedia = document.createElement("div");
mainMedia.classList.add("drone-footage");
mainMediaContainer.prepend(mainMedia);

const headerImage = new MainMedia({
  target: mainMedia,
  hydrate: true,
  props: {},
});

const articleHeader = document.querySelector(selectorAppOrDCR("articleHeader"));
const bylineElement = document.querySelector(selectorAppOrDCR("byline"));
articleHeader.append(bylineElement);

const app = new Atom({
	target: document.getElementById('gv-atom'),
	hydrate: true,
	props: {},
});

export default {
	headerImage,
	app,
};