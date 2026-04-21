export const getLatestSermonsQuery = `*[_type == "sermon"] | order(date desc)[0...3] {
  title,
  speaker,
  date,
  type,
  videoUrl,
  "imageUrl": thumbnail.asset->url
}`

export const getAllSermonsQuery = `*[_type == "sermon"] | order(date desc) {
  title,
  speaker,
  date,
  type,
  videoUrl,
  "imageUrl": thumbnail.asset->url
}`

export const getUpcomingEventsQuery = `*[_type == "event" && isWeeklyService != true] | order(date asc) {
  title,
  description,
  date,
  time,
  location,
  "imageUrl": image.asset->url
}`

export const getWeeklyServicesQuery = `*[_type == "event" && isWeeklyService == true] | order(date asc) {
  title,
  description,
  time,
  serviceType
}`

export const getFounderQuery = `*[_type == "founder"][0] {
  name,
  title,
  quote,
  bio,
  "imageUrl": image.asset->url
}`

export const getPageQuery = `*[_type == "page" && slug.current == $slug][0] {
  title,
  heading,
  subheading,
  content,
  secondaryContent,
  "imageUrl": image.asset->url
}`
