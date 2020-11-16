# Another Tractatus Tree

Reading through the Tractatus Logico-Philosophicus by Ludwig Wittgenstein in print, I was very disappointed that there was no visual hierarchy for the branches of propositions.

This is how it looks:
![How the Tractatus appears in my printed edition](assets/tractatus-print.png)

I think the issue is the sub-propositions go up to 5 layers in from the first parent (2.0.1.2.3.1). How do you elegantly, or just interestingly, format that much hierarchy and in doing so tell stories about the book, or specific propositions? I wnat to experiment with that.


Note: This is forked from [Pierre Bellon's](https://pbellon.github.io/#!/en) D3 hierarchy visualization of the Tractatus; I gutted the repo and kept the JSON he scraped from [here](https://people.umass.edu/klement/tlp/tlp.html), which I'll use for each visualization I make.

## Development status:

You can see my first version, a virtually unformatted DOM-dump, [here](https://nchilla.github.io/tractatus-tree/dom)


### In Progress:
* Change preface from Ogden version to Pears/McGuinness to match the rest
* Fix image filepaths
