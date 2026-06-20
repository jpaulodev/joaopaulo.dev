import { ref } from 'vue'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'jp-theme'

function current(): Theme {
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'light' ? 'light' : 'dark'
}

const theme = ref<Theme>(current())

export function useTheme() {
  function apply(next: Theme) {
    theme.value = next
    document.documentElement.setAttribute('data-theme', next)
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      next === 'dark' ? '#0A0A0B' : '#FAFAFA',
    )
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore private-mode storage errors */
    }
  }

  function toggle() {
    apply(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggle }
}
