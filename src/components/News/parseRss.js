import youtubeLogo from '../../assets/images/youtube.png';

/**
 * Return Logo for JSON : logo url in Json OR specified logo
 * @param {any} json
 * @returns {any} Logo source
 */
const getLogoFromJson = (json) => {
  const logo = {
    'www.youtube.com': youtubeLogo,
    'dev.to': 'https://d2fltix0v2e0sb.cloudfront.net/dev-black.png',
  };

  // Extract domain from json link
  const domain = json.link.replace(/^https?:\/\/(.*?)\/.*/g, '$1');
  return json?.image?.url || logo[domain] || null;
};

/**
 * Extract entries (unique by title) from json (fetch)
 * @param {object} json Retrieved from fetch
 * @returns {array} Entries
 */
export const getEntriesFromRssJson = (json) => {
  if (!json) {
    return [];
  }
  let entries = json?.entry || json?.item;
  entries = entries
    .map((entry) => ({
      ...entry,
      logo: getLogoFromJson(json),
    }))
    .filter(
      (entry, index, array) => array.findIndex((item) => item.title === entry.title) === index
    );
  return entries;
};

/**
 * Description
 * @param {object} entry Entry object with author key to find
 * @returns {string} author
 */
export const getAuthorFromEntry = (entry) =>
  entry['dc:creator'] ||
  entry.author.name ||
  entry.author.replace('hello@smashingmagazine.com', '');

/**
 * Description
 * @param {object} entry Entry object with image key to find
 * @returns {string} image link
 */
export const getImageFromEntry = (entry) => {
  let image =
    (entry['media:content'] && entry['media:content']['@_url']) ||
    (entry['media:group'] &&
      entry['media:group']['media:thumbnail'] &&
      entry['media:group']['media:thumbnail']['@_url']) ||
    (entry?.enclosure && entry?.enclosure['@_url']) ||
    null;

  if (!image) {
    const regexp = /.*?<img src=\\"(.*?)\\".*/;
    const findImageInDescription = JSON.stringify(
      entry['content:encoded'] || entry.content || entry.description || ''
    ).replace(regexp, '$1');
    image = findImageInDescription.match('<') ? null : findImageInDescription;
  }

  return image;
};

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
