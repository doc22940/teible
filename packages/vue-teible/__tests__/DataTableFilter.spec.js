import { shallowMount } from '@vue/test-utils'
import idObj from 'identity-obj-proxy'
import DataTableFilter from '../src/DataTableFilter.vue'

describe('DataTableFilter', () => {
  it(`renders correctly`, () => {
    let wrapper = shallowMount(DataTableFilter, {
      propsData: {
        filter: 'default'
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('input').element.value = 'new value'
    wrapper.find('input').trigger('input')
    expect(wrapper.emitted()['update:filter']).toEqual([['new value']])

    wrapper.find('.datatable__x').trigger('click')
    expect(wrapper.emitted()['update:filter']).toEqual([['new value'], ['']])
  })
})
