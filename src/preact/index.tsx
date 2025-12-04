import { render } from 'preact'
import { PhotoGallery } from './components/PhotoGallery'
import { Weather } from './components/Weather'

export function mountPhotoGallery(container: HTMLElement, groups: any[]) {
  render(<PhotoGallery groups={groups} />, container)
}

export function mountWeather(container: HTMLElement, apiKey: string, iconBase: string) {
  render(<Weather apiKey={apiKey} iconBase={iconBase} />, container)
}