import axios from "axios"

// Replace with actual WordPress REST API URL
const WP_API_URL = "https://example.com/wp-json/wp/v2/posts"

export async function getPosts() {
  try {
    const res = await axios.get(WP_API_URL, {
      params: {
        per_page: 10, // Limit posts
        _embed: true, // Get featured images
      },
    })
    return res.data
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}
