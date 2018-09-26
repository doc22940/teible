# Vue Teible
## Introduction
Teible is yet another table component. I know we have [enough of them](https://github.com/vuejs/awesome-vue#table) but it is something else.

### Features
- Straightforward column definition using template
- Flexible cell render using slot
- Support asynchronous data
- Feature-bloat free

Teible is heavily inspired by [vue-table-component](https://github.com/spatie/vue-table-component). The way columns are defined totally got me at the first sight. But it's deprecated in favor of the "traditional" way and has a lot of fancy features you may never need: data type, date format, caching, etc. So if you're looking for a simple but flexible component, take a look at the below example, you may fall in love with teible.

### Demo
See [https://hiendv.github.io/teible/](https://hiendv.github.io/teible/) or [the fiddle](https://jsfiddle.net/o4m7k1z6/6/)

## Installation & Usage
### Direct <script/> include
Load the script [vueteible.iife.js](https://cdn.jsdelivr.net/npm/vue-teible@latest/dist/vueteible.iife.js), `vueteible` will be registered as a global variable.

```js
let {
  DataTable,
  DataColumn
} = vueteible

DataTable
// {name: "DataTable", components: {…}, props: {…}, data: ƒ, computed: {…}, …}

DataColumn
// {name: "DataColumn", props: {…}, _Ctor: {…}}
```

#### CDN
[![](https://data.jsdelivr.com/v1/package/npm/vue-teible/badge)](https://www.jsdelivr.com/package/npm/vue-teible)
```html
<script src="https://cdn.jsdelivr.net/npm/vue-teible@latest/dist/vueteible.iife.js"></script>
```

[unpkg.com](https://unpkg.com/vue-teible)
```html
<script src="https://unpkg.com/vue-teible@latest/dist/vueteible.iife.js"></script>
```
**Note: We recommend linking to a specific version number that you can update manually**

### NPM
```bash
npm install --save vue-teible
# or with yarn
yarn add vue-teible
```

```vue
<script>
// import components
import { DataTable, DataColumn } from 'vue-teible'

// initiate a Vue instance
new Vue({
  el: '#app',
  components: { DataTable, DataColumn },
  data: {
    items: [{
      id: 'id-1',
      name: 'foo'
    }, {
      id: 'id-2',
      name: 'bar'
    }, {
      id: 'id-3',
      name: 'qux'
    }]
  },
  methods: {
    destroy (x) {
      this.items = this.items.filter(item => {
        return item.id !== x.id
      })
    }
  }
})
</script>

// write your table
<template>
  <data-table :items="items">
    <data-column field="id" label="ID"/>
    <data-column field="name" label="Name" width="50%"/>
    <data-column label="Action" :sortable="false">
      <template slot-scope="props">
        <button @click.prevent="destroy(props.item)">Delete</button>
      </template>
    </data-column>
  </data-table>
</template>
```

If you're looking for a more complicated use-case, see **[vue-teible-example](/packages/vue-teible-example)**.
## Documentation
### DataTable
#### Props
```js
{
  items: { // Data. Parameters for the function: filtering, sorting, paging
    type: [Array, Function],
    required: true
  },
  perPage: { // Number of records for each page
    type: Number,
    default: 10
  },
  sortBy: { // Sorting field
    type: String,
    default: ''
  },
  sortDesc: { // Descending sort
    type: Boolean,
    default: false
  },
  filter: { // Search query
    type: String,
    default: ''
  },
  render: { // Formating function
    type: Function
  }
}
```
#### Methods
```js
{
  loadSlots () {
    // Manually reload columns
  },
  loadItems () {
    // Manually reload data
  }
}
```
#### Events
+ loaded (items): loaded items

### DataColumn
#### Props
```js
{
  label: { // Column label
    type: String,
    required: true
  },
  field: { // Column field from data
    type: String,
    default: ''
  },
  sortable: {
    type: Boolean,
    default: true
  },
  filterable: {
    type: Boolean,
    default: true
  }
}
```

## Development & Testing
Please check the [Contributing Guidelines](https://github.com/hiendv/teible/blob/master/CONTRIBUTING.md).

## Contribution
Issues and PRs are welcome !
