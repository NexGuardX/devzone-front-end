/**
 * Get bookmarks array for a specific tool with toolId parameter
 * @param {id} toolId Id of the tool
 * @param {array} bookmarks Array of bookmarks grouped by tool
 * @returns {array} Array of bookmarks
 */
export const getToolBookmarks = (toolId, bookmarks) =>
  bookmarks.length ? bookmarks.find((tool) => tool.toolId === toolId)?.bookmarks : [];

/**
 * Check if url is already in bookmarks array of bookmarks (for a specific tool)
 * @param {string} url
 * @param {id} toolId
 * @param {array} bookmarks Array of bookmarks grouped by tool
 * @returns {boolean} url is in array ?
 */
export const isBookmarked = (url, toolId, bookmarks) => {
  if (!bookmarks.length) {
    return false;
  }

  // Get array of bookmarks for toolID
  const toolBookmarks = getToolBookmarks(toolId, bookmarks);
  console.log('⏩ ~ isBookmarked ~ toolBookmarks:', toolBookmarks);

  // Get only links and put them in an array
  const bookmarksLinks = toolBookmarks.reduce((acc, bookmark) => {
    if (!acc.includes(bookmark.link)) {
      acc.push(bookmark.link);
    }
    return acc;
  }, []);

  // Return boolean
  return bookmarksLinks.includes(url);
};
