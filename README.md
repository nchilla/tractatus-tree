# Another Tractatus Tree

## The idea
Reading through the Tractatus Logico-Philosophicus by Ludwig Wittgenstein in print, I was puzzled by the lack of visual hierarchy for the branches of propositions.

This is how it looks:
![How the Tractatus appears in my printed edition](assets/tractatus-print.png)

The issue is the sub-propositions go up to 5 layers in from the first parent (2.0.1.2.3.1). That's very difficult to elegantly format in a way that makes sense and is informative.

I have two objectives:

**In print** I want to take on the task of typesetting the Tractatus such that the hierarchy is present and informative.

**On the web** I want to experiment with both informative and experimental digital formats to map/present propositions.

## Ways other people have tried this

I'm not the first person to have this idea! I've tracked down a collection of researchers who have tried to come up with innovative digital formats to read or visualize the Tractatus. Here are a few examples:
c1|c2
---|---
![http://tractatus.lib.uiowa.edu/map/](assets/uiowa.png)|![https://pbellon.github.io/tractatus-tree/](assets/pierrebellon.png)
![http://daxoliver.com/tractatus/](assets/daxoliver.png)|![http://www.tractatuslogico-philosophicus.com/](assets/tractatuscom.png)
![https://people.umass.edu/klement/tlp/tlp.html](assets/klement.png)|![https://chart-studio.plotly.com/~greicius/2/tractatus-logico-philosophicus/?share_key=EhGs4nhYbvwLzr9HFSn6Ul#/plot](assets/plotly.png)

The sources and my growing collection can be found in [this Are.na channel](https://www.are.na/nico-chilla/tractatus-visualizations)



## Development status:


This is forked from [Pierre Bellon's](https://pbellon.github.io/#!/en) D3 hierarchy visualization of the Tractatus; I gutted the repo and kept the JSON he scraped from [here](https://people.umass.edu/klement/tlp/tlp.html), which I'll use for each visualization I make.

You can see my first test, an indented DOM-dump, [here](https://nchilla.github.io/tractatus-tree/dom)


### In Progress:
* Change preface from Ogden version to Pears/McGuinness to match the rest
* Fix image filepaths
