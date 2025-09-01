// utils/helpers.js
export const getImageUrl = (path, size = 'w500') => {
  return path 
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : '/placeholder-image.jpg';
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};