# mv-pagination

 MvPagination is a Meveo pagination component (based on lit-element) that provides pagination buttons.

## Features
* Renders in 3 styles: `button`, `text`, `none`
* Configurable max number of buttons for button style

## Dependencies
* [mv-button](https://github.com/meveo-org/mv-button)

## Quick Start

To experiment with the MvPagination component.   

1. Clone this repo.

2. Serve the project from the root directory with some http server (best served with meveo itself) 

3. Update the pagination demo component in demo.js file

## Sample usage
```html
<mv-pagination
  .page="${this.page}"                       // the current page
  .pages="${this.pages}"                     // the total number of pages
  .type="${this.type}"                       // the pagination type, default: button
  .justify="${this.justify}"                 // the position relative to the current container, default: center
  .max-buttons="${this["max-buttons"]}"      // the max number of buttons when using button type
  @change-page="${this.handlePageChange}"    // the custom event dispatched on page change
></mv-pagination>
```

You can also check this [demo](https://pagination.meveo.org/)
