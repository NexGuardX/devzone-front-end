/**
 * Description
 * @param {object} entry Entry object with author key to find
 * @returns {string} author
 */
export const getAuthorFromEntry = (entry) => entry['dc:creator'] || entry.author.name;

/**
 * Description
 * @param {object} entry Entry object with image key to find
 * @returns {string} image link
 */
export const getImageFromEntry = (entry) =>
  (entry['media:content'] && entry['media:content']['@_url']) ||
  (entry['media:group'] &&
    entry['media:group']['media:thumbnail'] &&
    entry['media:group']['media:thumbnail']['@_url']) ||
  (entry?.enclosure && entry?.enclosure['@_url']) ||
  null;

/**
 * Description
 * @param {object} entry Entry object with Date key to find and to transform
 * @returns {number} Date transformed to integer
 */
export const getDateFromEntry = (entry) =>
  Date.parse(entry?.published || entry?.pubDate || entry?.lastBuildDate);

/**
 * Parse RSS entries and return sorted array of objects (with image not null) with needed keys
 * @param {array} entries to parse
 * @returns {array} sorted array with selected and transformed entries
 */
export const parseAndSortFetchedData = (entries) =>
  entries
    .map((entry) => ({
      author: getAuthorFromEntry(entry),
      title: entry.title,
      date: getDateFromEntry(entry),
      image: getImageFromEntry(entry),
      link: entry.link,
      logo: entry.logo,
      isVideo: !!entry.link.match('youtube.com'),
    }))
    .filter((entry) => entry.image)
    .sort((a, b) => b.date - a.date);
