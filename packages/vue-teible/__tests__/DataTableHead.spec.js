import { mount } from '@vue/test-utils'
import idObj from 'identity-obj-proxy'
import DataTableHead from '../src/DataTableHead.vue'

describe('DataTableHead', () => {
  it(`renders correctly`, () => {
    let wrapper = mount(DataTableHead, {
      propsData: {
        sortBy: 'name',
        sortDesc: false,
        columns: [{ field: 'id', label: 'ID', sortable: true }, { field: 'name', sortable: true }, { field: '' }]
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`renders slots correctly`, () => {
    let wrapper = mount(DataTableHead, {
      propsData: {
        sortBy: 'name',
        sortDesc: false,
        columns: [{ field: 'id', label: 'ID', sortable: true }, { field: 'name', label: 'Name', sortable: true }, { scopedSlots: {
          header (props) {
            return 'Yo'
          }
        } }]
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.findAll('th').at(2).find('span').trigger('click')
    expect(wrapper.emitted()).toEqual({})
  })

  it(`emits update:sortDesc when clicking the active column`, () => {
    let wrapper = mount(DataTableHead, {
      propsData: {
        sortBy: 'id',
        sortDesc: false,
        columns: [{ field: 'id', label: 'ID', sortable: true }, { field: 'name', label: 'Name', sortable: true }]
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('th').trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:sortDesc': [[true]] })

    wrapper.setProps({ // fake two-way binding
      'sortDesc': true
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`emits update:sortField when clicking other columns`, () => {
    let wrapper = mount(DataTableHead, {
      propsData: {
        sortBy: 'name',
        sortDesc: false,
        columns: [{ field: 'id', label: 'ID', sortable: true }, { field: 'name', label: 'Name', sortable: true }]
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('th').trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:sortBy': [['id']] })

    wrapper.setProps({ // fake two-way binding
      'sortBy': 'id'
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`emits nothing without field`, () => {
    let wrapper = mount(DataTableHead, {
      propsData: {
        columns: [{ field: 'id' }, { field: 'name' }]
      },
      provide: () => ({
        $theme: () => idObj
      })
    })

    wrapper.vm.updateSort('')
    expect(wrapper.emitted()['update:sortBy']).toBeFalsy()
  })

  it(`emits nothing when clicking on not-sortable columns`, () => {
    let wrapper = mount(DataTableHead, {
      propsData: {
        sortBy: 'name',
        sortDesc: false,
        columns: [{ field: 'id', label: 'ID', sortable: true }, { field: 'name', label: 'Name', sortable: false }]
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.findAll('th').at(1).find('span').trigger('click')
    expect(wrapper.emitted()['update:sortBy']).toBeFalsy()
  })
})
