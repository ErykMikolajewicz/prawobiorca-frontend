import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PublicRegulationCard from '../PublicRegulationCard.vue'
import { preparePublicRegulation } from '@/api/regulations'
import type { regulationRepresentation } from '@/types/api/regulations'

vi.mock('@/api/regulations', () => ({
  deletePublicRegulation: vi.fn(),
  preparePublicRegulation: vi.fn(),
}))

vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('PublicRegulationCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders search action and router-link when regulation is prepared', () => {
    const regulation: regulationRepresentation = {
      id: 'uuid-1',
      presentationName: 'Ustawa testowa',
      isPrepared: true,
      regulationType: 'ACT',
    }

    const wrapper = mount(PublicRegulationCard, {
      props: {
        regulation,
        isAdmin: false,
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a class="router-link-stub"><slot /></a>',
          },
          ElCard: {
            template: '<div class="el-card"><slot /></div>',
          },
          RegulationTypeBadge: true,
          IconMotion: true,
          ElPopconfirm: true,
        },
      },
    })

    expect(wrapper.find('.router-link-stub').exists()).toBe(true)
    expect(wrapper.find('form.form-action').exists()).toBe(false)
  })

  it('renders settings prepare button when regulation is not prepared and user is admin', async () => {
    const regulation: regulationRepresentation = {
      id: 'uuid-2',
      presentationName: 'Nieprzygotowana ustawa',
      isPrepared: false,
      regulationType: 'ACT',
    }

    const wrapper = mount(PublicRegulationCard, {
      props: {
        regulation,
        isAdmin: true,
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a class="router-link-stub"><slot /></a>',
          },
          ElCard: {
            template: '<div class="el-card"><slot /></div>',
          },
          RegulationTypeBadge: true,
          IconMotion: true,
          ElPopconfirm: true,
        },
      },
    })

    expect(wrapper.find('.router-link-stub').exists()).toBe(false)
    const form = wrapper.find('form.form-action')
    expect(form.exists()).toBe(true)

    vi.mocked(preparePublicRegulation).mockResolvedValueOnce()
    await form.trigger('submit.prevent')

    expect(preparePublicRegulation).toHaveBeenCalledWith('uuid-2')
    expect(wrapper.emitted('prepared')?.[0]).toEqual(['uuid-2'])
    expect(wrapper.find('.router-link-stub').exists()).toBe(true)
  })

  it('does not render prepare button or search link when regulation is not prepared and user is not admin', () => {
    const regulation: regulationRepresentation = {
      id: 'uuid-3',
      presentationName: 'Nieprzygotowana ustawa',
      isPrepared: false,
      regulationType: 'ACT',
    }

    const wrapper = mount(PublicRegulationCard, {
      props: {
        regulation,
        isAdmin: false,
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a class="router-link-stub"><slot /></a>',
          },
          ElCard: {
            template: '<div class="el-card"><slot /></div>',
          },
          RegulationTypeBadge: true,
          IconMotion: true,
          ElPopconfirm: true,
        },
      },
    })

    expect(wrapper.find('.router-link-stub').exists()).toBe(false)
    expect(wrapper.find('form.form-action').exists()).toBe(false)
  })
})
