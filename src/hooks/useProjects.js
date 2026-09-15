import { useState, useEffect } from 'react';
import { fetchProjects } from '../services/projectsService';
import { projects as staticProjects } from '../data/projects';
import { featuredProjects as configuredFeatured } from '../data/projectConfig';

/**
 * Fallback generator when /api/projects is unavailable.
 * Safely transforms curated static projects into normalized format without fabricating stats.
 */
function getFallbackProjects() {
  const normalizedStatic = staticProjects.map((p, idx) => {
    const parts = p.github ? p.github.trim().replace(/\/+$/, '').split('/') : [];
    const repoName = parts[parts.length - 1] || p.title.replace(/\s+/g, '-');
    const lowerRepo = repoName.toLowerCase();
    const isFeatured = configuredFeatured.some((f) => f.toLowerCase() === lowerRepo);

    return {
      id: p.id || `static-${idx}`,
      title: p.title,
      repoName,
      description: p.description || '',
      tech: p.tech || [],
      primaryLanguage: p.tech && p.tech.length > 0 ? p.tech[0] : null,
      githubUrl: p.github || '',
      liveUrl: null,
      image: p.image,
      stars: null,
      forks: null,
      watchers: null,
      openIssues: null,
      isArchived: false,
      isFork: false,
      isDisabled: false,
      isFeatured,
      createdAt: null,
      updatedAt: null,
      pushedAt: null,
    };
  });

  // Preserve configured order for featured projects
  const staticByRepoName = new Map(
    normalizedStatic.map((p) => [p.repoName.toLowerCase(), p])
  );

  let fallbackFeatured = [];
  configuredFeatured.forEach((name) => {
    const found = staticByRepoName.get(name.toLowerCase());
    if (found) {
      fallbackFeatured.push(found);
    }
  });

  if (fallbackFeatured.length === 0) {
    fallbackFeatured = normalizedStatic.slice(0, 6);
  }

  return {
    allProjects: normalizedStatic,
    featuredProjects: fallbackFeatured,
  };
}

/**
 * Custom hook to fetch and expose normalized project data.
 * 
 * Exposes:
 * - allProjects: complete portfolio dataset
 * - featuredProjects: initial 6 featured projects in configured order
 * - loading: loading state indicator
 * - error: error message if API call fails
 * - isFallback: boolean indicating if static fallback is currently active
 */
export function useProjects() {
  const [allProjects, setAllProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        const data = await fetchProjects();
        if (isMounted) {
          setAllProjects(data.allProjects);
          setFeaturedProjects(data.featuredProjects);
          setError(null);
          setIsFallback(false);
        }
      } catch (err) {
        console.error('Failed to load dynamic projects from /api/projects, activating fallback:', err);
        if (isMounted) {
          const fallback = getFallbackProjects();
          setAllProjects(fallback.allProjects);
          setFeaturedProjects(fallback.featuredProjects);
          setError(err.message || 'Error fetching projects');
          setIsFallback(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    allProjects,
    featuredProjects,
    loading,
    error,
    isFallback,
  };
}

export default useProjects;
