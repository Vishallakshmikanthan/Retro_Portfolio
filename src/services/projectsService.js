/**
 * Projects Client Service
 * 
 * Fetches normalized project data from the serverless API endpoint (/api/projects).
 * Never communicates directly with the GitHub API from the client to prevent
 * rate limits and token exposure.
 */

export async function fetchProjects() {
  const response = await fetch('/api/projects');

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error || `API request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch project data.');
  }

  return {
    allProjects: data.projects || [],
    featuredProjects: data.featuredProjects || [],
    count: data.count || 0,
    featuredCount: data.featuredCount || 0,
    validation: data.validation || null,
  };
}
