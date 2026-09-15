import { projects as curatedProjects } from '../data/projects.js';
import { featuredProjects as configuredFeatured } from '../data/projectConfig.js';
import { getProjectImage } from '../data/projectImageMap.js';

/**
 * Normalizes raw GitHub repository data and enriches it with curated portfolio metadata.
 * 
 * @param {Array} rawRepositories - Raw repository array from GitHub API
 * @param {Array} [customFeaturedConfig] - Optional override for featured repository names
 * @returns {Object} { allProjects, featuredProjects, validation }
 */
export function normalizePortfolioProjects(rawRepositories = [], customFeaturedConfig = configuredFeatured) {
  // Build lookup index for curated projects (by repository name)
  const curatedMap = new Map();
  curatedProjects.forEach((p) => {
    if (p.github) {
      const parts = p.github.trim().replace(/\/+$/, '').split('/');
      const repoNameFromUrl = parts[parts.length - 1]?.toLowerCase();
      if (repoNameFromUrl && !curatedMap.has(repoNameFromUrl)) {
        curatedMap.set(repoNameFromUrl, p);
      }
    }
  });

  // Track matched curated projects for validation report
  const matchedCuratedKeys = new Set();

  // 1. Normalize every valid repository from GitHub
  const allProjects = rawRepositories.map((repo) => {
    const lowerRepoName = (repo.name || '').toLowerCase();
    const curated = curatedMap.get(lowerRepoName);

    if (curated) {
      matchedCuratedKeys.add(lowerRepoName);
    }

    // Title: Curated title or clean repository name
    const title = curated?.title || repo.name;

    // Description: Curated description or repository description
    const description = curated?.description || repo.description || '';

    // Tech: Curated tech tags + language + topics (deduplicated)
    const rawTechList = [
      ...(curated?.tech || []),
      repo.language,
      ...(Array.isArray(repo.topics) ? repo.topics : []),
    ];
    const tech = Array.from(
      new Set(
        rawTechList
          .filter((t) => typeof t === 'string' && t.trim().length > 0)
          .map((t) => t.trim())
      )
    );

    // Live URL: Only valid HTTP/HTTPS URLs that differ from the GitHub URL
    let liveUrl = null;
    if (
      typeof repo.homepage === 'string' &&
      repo.homepage.trim().length > 0 &&
      repo.homepage.trim().startsWith('http') &&
      repo.homepage.trim().replace(/\/+$/, '') !== (repo.html_url || '').trim().replace(/\/+$/, '')
    ) {
      liveUrl = repo.homepage.trim();
    }

    // Image: Curated image or deterministic retro fallback
    const image = curated?.image || getProjectImage(repo.name);

    // Check if repository is in the manual featured list
    const isFeatured = customFeaturedConfig.some(
      (featName) => featName.toLowerCase() === lowerRepoName
    );

    return {
      id: repo.id,
      title,
      repoName: repo.name,
      description,
      tech,
      primaryLanguage: repo.language || null,
      githubUrl: repo.html_url,
      liveUrl,
      image,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      watchers: repo.watchers_count || 0,
      openIssues: repo.open_issues_count || 0,
      isArchived: Boolean(repo.archived),
      isFork: Boolean(repo.fork),
      isDisabled: Boolean(repo.disabled),
      isFeatured,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
    };
  });

  // 2. Resolve Featured Projects in EXACT manual configured order
  const projectsByLowerName = new Map(
    allProjects.map((p) => [p.repoName.toLowerCase(), p])
  );

  const featuredProjects = [];
  const missingFeatured = [];
  const duplicateFeatured = [];
  const seenFeatured = new Set();

  customFeaturedConfig.forEach((repoName) => {
    const lowerName = repoName.toLowerCase();

    if (seenFeatured.has(lowerName)) {
      duplicateFeatured.push(repoName);
      return;
    }
    seenFeatured.add(lowerName);

    const project = projectsByLowerName.get(lowerName);
    if (project) {
      featuredProjects.push(project);
    } else {
      missingFeatured.push(repoName);
    }
  });

  // 3. Check for any unmatched curated entries in projects.js
  const unmatchedCurated = [];
  curatedProjects.forEach((p) => {
    const parts = p.github?.trim().replace(/\/+$/, '').split('/');
    const repoNameFromUrl = parts[parts.length - 1]?.toLowerCase();
    if (repoNameFromUrl && !matchedCuratedKeys.has(repoNameFromUrl)) {
      unmatchedCurated.push({
        title: p.title,
        github: p.github,
      });
    }
  });

  return {
    allProjects,
    featuredProjects,
    validation: {
      totalDiscovered: allProjects.length,
      featuredCount: featuredProjects.length,
      configuredFeaturedCount: customFeaturedConfig.length,
      missingFeatured,
      duplicateFeatured,
      unmatchedCurated,
      isValid: missingFeatured.length === 0 && duplicateFeatured.length === 0,
    },
  };
}
