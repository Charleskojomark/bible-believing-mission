import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { dataset, projectId } from '../env'

const imageBuilder = imageUrlBuilder({
    projectId: projectId || 'your_project_id_here',
    dataset: dataset || 'production',
})

export function urlForImage(source: SanityImageSource) {
    return imageBuilder?.image(source).auto('format').fit('max')
}
