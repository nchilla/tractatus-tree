# Another Tractatus Tree

## About
Ludwig Wittgenstein’s *Tractatus Logico-Philosophicus* is a landmark philosophical text composed of propositions arranged in a hierarchical structure (e.g. 2, 2.1, 2.1.1, etc). This project aims to explore different methods of presenting and visualizing the *Tractatus*, with more or less practical utility. I am not the first to have this idea; you can find a collection of predecessors to my project [here](https://www.are.na/nico-chilla/tractatus-visualizations).


## Publishing information
This project can be viewed in either the Pears/McGuinness English translation or the original German. It uses a JSON version of the text scraped by [Pierre Bellon](https://pbellon.github.io/#!/en) from [Kevin C. Klement’s page](https://people.umass.edu/klement/tlp/tlp.html) and adjusted/cleaned by me. The *Tractatus<* is in the public domain.


## Development
This project wouldn't have been possible without the following libraries/plugins: [D3.js](https://github.com/d3), [Scrollama](https://github.com/russellgoldenberg/scrollama), [Matter.js](https://github.com/liabru/matter-js/), [matter-dom-plugin](https://github.com/elopezga/matter-dom-plugin), and [matter-collision-events](https://github.com/dxu/matter-collision-events).

If you notice any discrepancies with the text please feel free to submit an issue.


## Colophon
Body text is set in [Signifier](https://klim.co.nz/retail-fonts/signifier/) by Kris Sowersby; Numbering and logic statements are set in [Aktiv Grotesk](https://fonts.adobe.com/fonts/aktiv-grotesk) by Dalton Maag; Header is set in [Panama](https://typefaces.temporarystate.net/preview/Panama) by Roman Gornitsky.


### Ideas/to-do:
For **Tabs** iteration:
- [X] tab markers
- [x] preface access
- [x] header bar
- [x] better indicator for when a prop has children
- [ ] mobile navigation
- [X] way to search for props, and URL queries
- [X] some information about the project and translation in header

For **Context Map** iteration:
- [X] A flexible width dendrogram showing you only the nodes and depths that are relevant to the context of the proposition you are reading
- [X] The map redraws itself according to which proposition is focused on screen, using Russell Goldenberg's [Scrollama](https://github.com/russellgoldenberg/scrollama/)
- [X] Add Preface to text and visualize it somewhere.
- [X] Clicking on a prop's circle should scroll you to its place in the text and redraw the map
- [ ] when you hover over a prop, it will expand a horizontal menu showing its children
- [ ] mobile navigation
- [X] some information about the project and translation in header


Across the board:
- [X] Add German support
- [X] Finish header and nav
- [ ] Find sections missing from the scrape and add them to the JSON. So far I've noticed problems with:
  * missing content:
    * 5.101
  * redraw graphic:
    * 6.36111
  * wrap full expression:
    * 6, 5.5301, 5.525, 5.5301, 5.5351, 5.5352
