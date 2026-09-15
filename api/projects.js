/**
 * Vercel Serverless Function: GET /api/projects
 * Fetches public GitHub repositories for the configured username using the GitHub REST API.
 * 
 * Security:
 * - Credentials remain strictly on the server-side via process.env.
 * - GITHUB_TOKEN is never logged, exposed, or transmitted to the client.
 */
import process from 'node:process';

export default async function handler(req, res) {
  // 1. Enforce GET method only
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Only GET requests are supported.',
    });
  }

  // 2. Read configuration from environment variables
  const username = process.env.GITHUB_USERNAME || 'Vishallakshmikanthan';
  const token = process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.trim() : null;

  // 3. Prepare GitHub API request headers
  const headers = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'Retro-Portfolio-V2',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // 4. Paginate through all public repositories
    const perPage = 100;
    let page = 1;
    let allRepos = [];
    let hasMore = true;
    const maxPages = 10; // Safety cap (up to 1,000 repositories)

    while (hasMore && page <= maxPages) {
      const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&page=${page}&sort=pushed&direction=desc&type=all`;

      const response = await fetch(url, { headers });

      // Handle non-200 responses
      if (!response.ok) {
        const status = response.status;

        if (status === 404) {
          return res.status(404).json({
            success: false,
            error: `GitHub user '${username}' not found.`,
          });
        }

        if (status === 401) {
          return res.status(500).json({
            success: false,
            error: 'GitHub API authentication failed. Check server-side token configuration.',
          });
        }

        if (status === 403) {
          const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
          if (rateLimitRemaining === '0') {
            return res.status(429).json({
              success: false,
              error: 'GitHub API rate limit exceeded. Please try again later.',
            });
          }
          return res.status(403).json({
            success: false,
            error: 'Access to GitHub API was forbidden.',
          });
        }

        return res.status(502).json({
          success: false,
          error: `GitHub API responded with status ${status}.`,
        });
      }

      const repos = await response.json();

      if (!Array.isArray(repos) || repos.length === 0) {
        hasMore = false;
      } else {
        allRepos.push(...repos);
        if (repos.length < perPage) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    // 5. Transform and sanitize repository metadata (exclude sensitive/internal fields)
    const sanitizedRepositories = allRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || null,
      html_url: repo.html_url,
      homepage: repo.homepage || null,
      private: Boolean(repo.private),
      fork: Boolean(repo.fork),
      archived: Boolean(repo.archived),
      disabled: Boolean(repo.disabled),
      language: repo.language || null,
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      watchers_count: repo.watchers_count || 0,
      open_issues_count: repo.open_issues_count || 0,
      default_branch: repo.default_branch || 'main',
      size: repo.size || 0,
      license: repo.license
        ? {
            key: repo.license.key,
            name: repo.license.name,
            spdx_id: repo.license.spdx_id || null,
          }
        : null,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
    }));

    // 6. Return standard structured response
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json({
      success: true,
      username,
      count: sanitizedRepositories.length,
      repositories: sanitizedRepositories,
    });
  } catch (error) {
    // Network failure or unexpected error
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching repositories from GitHub.',
    });
  }
}
